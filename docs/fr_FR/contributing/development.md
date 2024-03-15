---
title: Développement local
lang: fr_FR
sidebarDepth: 2
---

# Développement local

## Prérequis


- [Node.js](https://nodejs.org/en/) (version 20.x)
- [Yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)
- Windows: Bash (e.g. [Git Bash](https://gitforwindows.org/))
- [Tampermonkey](https://www.tampermonkey.net/) or [Greasemonkey](https://www.greasespot.net/)

## ## Installation

Pour travailler localement sur LSSM, suivez les étapes suivantes :

1. Clonez le dépôt sur votre machine locale et utilisez la branche `dev` :
   ``bash
   git clone -b dev https://github.com/LSS-Manager/LSSM-V.4.git
    ```
2. Installez les dépendances :
   ``bash
   yarn install
   ```
3. Modifiez la variable `urls.server` dans `src/config.ts` pour qu'elle pointe vers votre machine locale :
   ``ts
    export default {
        //...
        urls : {
            server : 'https://localhost:8080/',
            //...
        },
        //...
    } comme Config ;
   ```
4. Lancez la version de développement :
   ``bash
   yarn dev
   ```

    :::tip DX notes
    L'option `dev` essaiera d'installer Node.js via NVM ainsi que Yarn.
    Si vous les avez déjà installés ou si vous voulez les installer vous-même, exécutez les commandes suivantes à la place :
       ``bash
       bash build/build.sh --dependencies
       bash build/build.sh --quick
       bash build/build.sh --userscript
       bash build/build.sh --prebuild
       bash build/build.sh --webpack
       ```
    :: :


5. Démarrez le serveur de développement, qui utilisera le dossier `dist` sur `https://localhost:8080/` :
   ``bash
   yarn dev:serve
   ```

   :::tip DX notes
   Si vous avez utilisé une autre adresse à l'étape 3, vous devrez ajuster le host/post dans le script `dev:serve` dans `package.json`.
   :: :

6. Installez le script utilisateur dans votre navigateur :
   Ouvrez Tampermonkey/Greasemonkey et créez un nouveau script.
   Copiez le contenu de `dist/static/lssm-v4.user.js` dans le script et sauvegardez-le.

   :::warning Attention aux scripts dupliqués
   Veuillez désactiver la version de production de LSSM avant d'activer la version de développement.
   :: :

7. Visitez https://localhost:8080/ dans votre navigateur et acceptez le certificat auto-signé non sécurisé.
8. Rechargez le site web du jeu et vous devriez voir la version de développement de LSSM.
