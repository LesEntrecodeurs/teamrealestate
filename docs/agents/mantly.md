# Mantly

This repo is documented by the Mantly project **`LesEntrecodeurs/teamrealestate`**, pinned in `.mantly/project.json`. That file is the binding: read the project from it, and resolve it again only if the repo moves.

Mantly holds what this repo cannot state — what people asserted about this project, and how other projects already handled a problem. Everything the code says stays in the code, and every decision stays in `docs/adr/` here.

## Before designing, read what people asserted

Opening a design session on this project? Read its **business inputs** first (`list_business_inputs`), before asking anyone to re-explain the client's constraints. They are few, short, and returned in full.

## Anything more is the `mantly` skill

How to read what comes back, how to search another project for a **precedent** and judge whether it transfers, and how to capture what someone asserts in this session: run the `/mantly` skill. It owns the discipline, so it stays in one place and cannot go stale in this file.

## When Mantly is unreachable

Say so once, then carry on with the repo alone. Mantly being down or a project being undocumented is a normal state, not a fault — and it is never a reason to write project documentation somewhere else.
