# M3 Coiffure

Site vitrine du salon **M3 Coiffure**, salon de coiffure et institut de beauté à Paris 13e (44 Av. d'Ivry, galerie Oslo des Olympiades).

Site statique, sans étape de build : `index.html`, `style.css`, `scripts.js`, `favicon.svg` et les images du dossier `images/`. Toutes les informations du salon (tarifs, horaires, adresse, contact) sont écrites directement dans `index.html`.

Pour le voir en local, il suffit d'ouvrir `index.html` dans un navigateur.

## Déploiement

Le site est hébergé gratuitement par **GitHub Pages** :

1. Sur GitHub, ouvrir le dépôt, puis **Settings → Pages**.
2. Dans « Build and deployment », choisir **Deploy from a branch**, branche `main`, dossier `/ (root)`, puis **Save**.
3. Le fichier `CNAME` (qui contient `www.m3coiffure.com`) indique à GitHub le domaine à utiliser. Il ne faut pas le supprimer.
4. Chez le registrar du domaine (là où `m3coiffure.com` a été acheté), ajouter dans la zone DNS un enregistrement :
   - type `CNAME`, nom `www`, valeur `marcolap13.github.io`
5. Une fois le DNS propagé (de quelques minutes à 24 h), revenir dans **Settings → Pages** et cocher **Enforce HTTPS**.

Chaque modification poussée sur `main` est mise en ligne automatiquement en une à deux minutes.
