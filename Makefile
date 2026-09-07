COMPOSE := docker compose -p teamrealestate --env-file .env -f docker/docker-compose-dev.yml
WAIT_DB := until $(COMPOSE) exec -T db pg_isready -U $$(grep '^DB_USER=' .env | cut -d= -f2) -d $$(grep '^DB_NAME=' .env | cut -d= -f2) >/dev/null 2>&1; do sleep 1; done

.PHONY: start-infra stop-infra logs db-bootstrap db-reset bootstrap

# ─── Infra ─────────────────────────────────────────────────────────────────

start-infra:
	@$(COMPOSE) up -d
	@echo "Services démarrés avec succès."

stop-infra:
	@$(COMPOSE) down
	@echo "Services arrêtés avec succès."

logs:
	@$(COMPOSE) logs -f

# ─── Database ──────────────────────────────────────────────────────────────

# Apply migrations. Idempotent — safe to re-run.
db-bootstrap:
	@$(WAIT_DB)
	@yarn workspace @repo/db db:migrate:dev
	@echo "DB bootstrap done."

# Wipe + re-migrate. Use when migrations diverge or you need a clean slate.
db-reset:
	@$(WAIT_DB)
	@yarn workspace @repo/db prisma migrate reset --force
	@echo "DB reset done."

# Full setup for fresh clones: infra up + deps + DB ready.
bootstrap:
	@$(COMPOSE) up -d db
	@$(WAIT_DB)
	@yarn install
	@yarn workspace @repo/db db:generate
	@yarn workspace @repo/db db:migrate:dev
	@echo ""
	@echo "✓ Project bootstrapped. Run 'yarn dev' to start the web + api."
