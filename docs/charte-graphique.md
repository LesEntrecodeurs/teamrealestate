# Charte graphique — Team Real Estate

Référence exécutable de l'identité visuelle du site. Les valeurs qui font foi sont dans le code (`apps/web/src/app/globals.css`) ; ce document explique le choix et les écarts assumés par rapport aux éléments fournis par le client, pas l'inverse.

## Sources fournies par le client

- **Logo** : `team-toolbox-logo.zip` — wordmark "TEAM" en navy, "A" formé de trois silhouettes, icône fenêtre/maison en cyan, "REAL ESTATE" en cyan. Livré découpé en 3 parties (Symbole / Logo / Text), formats AI/PDF/PNG/JPG, RVB/CMJN + négatif. Copié dans `apps/web/public/logo/` et `apps/web/src/app/icon.png` / `apple-icon.png`.
- **Maquette de référence** : `Présentation SITE WEB.pptx`, proposée par l'agence de communication du client — direction que Jonathan a validée comme point de départ, pas comme spec figée ("faites encore mieux si vous avez d'autres idées").
- Pas de charte graphique officielle du client au-delà de ces deux éléments — cf. réunion de kickoff.

## Palette

Échantillonnée directement dans les pixels du logo (`Logo/PNG/team_logo_RVB.png`) :

| Token | Valeur | Usage |
|---|---|---|
| `--navy-900` | `#152740` | Couleur de marque principale — header, footer, texte |
| `--cyan-500` | `#3689a7` | Accent secondaire — liens, badges, éléments interactifs |
| `--ecru-50` | `#faf9f6` | Fond de page — **blanc cassé, jamais blanc pur** (consigne explicite de Jonathan) |

Nuanciers complets dans `globals.css` (`--navy-50` à `--navy-950`, `--cyan-100` à `--cyan-600`).

### Écart assumé : accent terracotta plutôt qu'orange franc

La maquette de l'agence de com utilise un orange vif (`#e8703a`-ish) en CTA. On a repris la **teinte** (chaude, complémentaire au navy/cyan) mais avec un terracotta plus désaturé (`--terracotta-500: #d1622c`) — direction validée avec le développeur comme plus éditoriale/premium que l'orange brut, cohérente avec la consigne de Jonathan d'éviter le style « américain » trop saturé.

## Typographie

- **Fraunces** (serif, `--font-display`) — titres, accroches. Absent de la maquette brute (qui n'utilise qu'une police sans-serif) : ajouté pour donner du caractère et se différencier de la concurrence (cf. contre-exemple `lexembourg.rs`, jugé illisible).
- **Inter** (sans-serif, `--font-sans`) — corps de texte, UI.

## Logo — usage

- Le logo négatif (blanc) s'utilise sur fond `navy-900`/`navy-950` (header sticky, footer).
- Le logo positif (navy) s'utilise sur fond clair.
- Le symbole seul (silhouettes + icône, sans le texte) sert de favicon, composé sur fond navy.
- Le logo est découpable (Symbole / Texte séparés) — pas encore exploité dans l'UI actuelle au-delà du favicon ; à réutiliser pour des touches ponctuelles (loaders, accents) si besoin.

## À éviter (consigne client explicite)

- Fond noir pur avec texte jaune/blanc façon site « américain » — contre-exemple cité : `lexembourg.rs`.
- Formulaires ou barres de recherche qui cassent les conventions standards (champs illisibles, où-cliquer ambigu).
- Arriver directement sur la liste complète des annonces en page d'accueil — priorité à la barre de recherche et à 1-2 biens phares.

## Photos de l'équipe

Les 5 photos affichées dans la section équipe (`apps/web/public/team/`) sont extraites de la maquette de l'agence de com. Les styles sont visiblement incohérents entre elles (portrait studio, photo de bureau, plan serré fond blanc, photo lifestyle) — signe probable de **photos stock** choisies pour maquetter la mise en page, pas les vraies photos des personnes nommées. À confirmer avec Jonathan avant mise en production ; remplacer par les vraies photos dès réception.

## Statut des informations de contact

Adresse, téléphone et numéro RCS affichés dans le footer et les mentions légales (`12 place de la Gare`, `+352 27 99 14 00`, `RCS B000000`) sont repris de la maquette de l'agence de com et **non confirmés** par Jonathan — probables placeholders (le RCS à zéros en particulier). À vérifier avant mise en production.
