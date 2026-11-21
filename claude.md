# CLAUDE.md — Refonte du site M3 Coiffure

## Contexte

- Dépôt : https://github.com/marcolap13/m3coiffure (public)
- Domaine : `www.m3coiffure.com` (fichier `CNAME` à conserver tel quel)
- Site actuel : 3 pages statiques (`index.html`, `tarifs.html`, `contact.html`), un `style.css`, un `scripts.js` vide, des images `.webp` dans `images/`. Le site n'est plus déployé et son design est daté.
- Objectif : **refonte complète** pour obtenir un site moderne, élégant, rapide et responsive, sans perdre aucune information existante (tarifs, horaires, adresse, contact).

## Le salon (contenu de référence — ne rien inventer)

- **M3 Coiffure** : salon de coiffure et institut de beauté, Paris 13e, à l'entrée de la galerie marchande Oslo des Olympiades.
- Adresse : 44 Av. d'Ivry, 75013 Paris
- Téléphone : 01 44 23 83 72
- E-mail : m3coiffure@gmail.com
- Horaires : du lundi au samedi, 9h30–19h ; fermé le dimanche
- Prestations : coiffure femme, homme et enfant, coloration et mèches, permanente, défrisage, chignons, manucure et beauté des pieds, extensions de cheveux, extensions et rehaussement de cils, sourcils et épilation.
- Les tarifs complets se trouvent dans `tarifs.html` (version actuelle). **Reprends chaque prix à l'identique.** Ne modifie, n'arrondis ni n'ajoute aucun prix.
- **Toutes les infos du salon (tarifs, horaires, adresse, téléphone, e-mail, prestations) restent écrites dans le code du site**, directement dans le HTML. Pas de service externe ni de fichier chargé à distance : elles doivent rester visibles même sans JavaScript, et Google doit pouvoir les lire.
- Avant de supprimer l'ancien `tarifs.html`, vérifie que **chaque ligne de tarif** (catégorie, prestation, prix, longueur) se retrouve dans le nouveau code. Aucune prestation ne doit disparaître.

### Points à vérifier avec moi avant de publier (ne pas corriger seul)

- L'accueil indique « Coupe Femme : à partir de 25€ » alors que la page tarifs indique 24€ (shampoing coupe brush 20 cm).
- « Extension cheveux 3,00 € » et « Dépose extensions 0,50 € » : probablement un prix par mèche. Il faut confirmer l'unité avant de l'afficher.
- Fautes à corriger dans le texte : « ongle naturelle » → « ongle naturel », « Vernis au pieds » → « Vernis aux pieds », « lèvre supérieur » → « lèvre supérieure », « semi-permanente » → « semi-permanent ».
- Le copyright « © 2024 » doit afficher l'année en cours (générée automatiquement en JS).

## Choix techniques

- **Site statique, sans étape de build** : HTML5 + CSS moderne + un peu de JavaScript vanilla. Aucun framework, aucune dépendance npm. Le but est de pouvoir déployer directement sur GitHub Pages.
- Polices : Google Fonts autorisées (2 familles maximum, par exemple un serif élégant pour les titres et un sans-serif lisible pour le texte), chargées avec `display=swap`.
- Pas de jQuery, Bootstrap ni Tailwind par CDN. Écris un CSS propre avec des variables (`:root { --color-…; --space-…; }`).
- Garde les images existantes dans `images/`. Renomme celles qui ont des accents ou des espaces (par exemple `meufstylé.webp` → `coiffure-femme.webp`) et mets à jour toutes les références. Ajoute `loading="lazy"`, `width`/`height` et un `alt` descriptif en français à chaque image.
- Ne supprime pas le fichier `CNAME`.

## Direction artistique

- Ambiance : salon de beauté haut de gamme mais accessible, chaleureux, en quartier.
- Palette suggérée : tons neutres et chauds (crème, sable, noir doux) avec un accent (doré, terracotta ou vieux rose). Contraste texte/fond conforme WCAG AA.
- Mise en page aérée : grandes images, beaucoup d'espace blanc, typographie soignée.
- Mobile first : la majorité des visiteurs arrivent sur téléphone. Les boutons « Appeler » et « Itinéraire » doivent être visibles immédiatement sur mobile.
- Animations discrètes uniquement (fondu au scroll, survol), en respectant `prefers-reduced-motion`.

## Structure cible

Une seule page d'accueil riche, plus une page tarifs détaillée (ou une seule page avec ancres, à toi de proposer) :

1. **Header** fixe : logo texte « M3 Coiffure », navigation (Accueil, Prestations, Tarifs, Infos pratiques), bouton « Appeler » (`tel:+33144238372`). Menu burger accessible sur mobile.
2. **Hero** : grande image, accroche courte, deux boutons (Appeler / Voir les tarifs).
3. **À propos** : 2–3 phrases sur le salon, photo de l'équipe (`Equipe.webp`).
4. **Prestations** : cartes visuelles (Elle, Lui, Enfants, Manucure, Extensions, Cils), chacune avec son image et un lien vers la bonne section des tarifs.
5. **Tarifs** : présentation claire par catégorie, avec onglets ou accordéons accessibles. Pour les prix qui dépendent de la longueur (20/30/40 cm), utiliser un petit tableau lisible sur mobile.
6. **Infos pratiques** : horaires (mettre en évidence le jour en cours et afficher « Ouvert maintenant » ou « Fermé » en JS), adresse, carte Google Maps intégrée (reprendre l'iframe existante de `index.html`, avec `loading="lazy"` et un `title`), téléphone, e-mail.
7. **Footer** : coordonnées, horaires résumés, année dynamique.

## SEO et accessibilité (obligatoire)

- `<html lang="fr">`, un seul `<h1>` par page, hiérarchie de titres logique.
- `<title>` et `<meta name="description">` uniques et utiles (par exemple « M3 Coiffure — Salon de coiffure et institut de beauté à Paris 13e, Olympiades »).
- Balises Open Graph et favicon.
- Données structurées JSON-LD `HairSalon` (nom, adresse, téléphone, horaires, URL).
- Navigation au clavier fonctionnelle, focus visible, `aria-expanded` sur le menu burger et les accordéons.
- Viser un score Lighthouse ≥ 90 dans toutes les catégories.

## Méthode de travail

1. Commence par lire tous les fichiers existants et me résumer ce que tu as compris.
2. Propose-moi en quelques lignes la direction artistique (palette, polices, structure) **avant** d'écrire du code. Attends ma validation.
3. Travaille sur une branche `refonte` et jamais directement sur `main`.
4. Fais des commits petits et clairs, en français (par exemple « Ajoute la section tarifs en accordéon »).
5. Supprime l'ancien CSS et l'ancien HTML une fois la nouvelle version complète, sans laisser de code mort.
6. Avant de dire que c'est terminé, vérifie :
   - que chaque prix de l'ancien `tarifs.html` est présent à l'identique dans le nouveau site ;
   - qu'aucun lien n'est cassé et qu'aucune image ne manque ;
   - que le rendu tient à 375 px, 768 px et 1280 px de large ;
   - que la console du navigateur ne contient aucune erreur.
7. Ouvre une Pull Request `refonte` → `main` avec un résumé des changements et la liste des points à vérifier ci-dessus.

## Déploiement

- Cible : **GitHub Pages** (Settings → Pages → branche `main`, dossier `/`), avec le domaine `www.m3coiffure.com` grâce au fichier `CNAME`.
- Ajoute un court paragraphe « Déploiement » dans le `README.md` (en UTF-8, l'actuel est en UTF-16 et s'affiche mal) qui explique comment mettre le site en ligne et configurer le DNS (enregistrement CNAME `www` → `marcolap13.github.io`).

## À ne pas faire

- N'invente pas de faux avis clients, de récompenses ou de prestations qui n'existent pas.
- N'ajoute pas de prise de rendez-vous en ligne ni de formulaire qui envoie des données sans me demander d'abord.
- N'utilise pas d'images trouvées sur internet sans me le demander. Si une image manque, laisse un emplacement clairement signalé.