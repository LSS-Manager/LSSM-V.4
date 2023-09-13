---
title: Testez vos modifications localement
lang: fr_FR
sidebarDepth: 2
---

# Testez vos modifications localement
Si vous souhaitez vérifier que vos modifications fonctionnent correctement, vous pouvez les exécuter localement.
::: warning Attentions
Sachez que cette partie est une partie avancé, vous devez savoir ce que vous faites.
:::

## Configuration
1. Une version supportée de node.js doit être installée.
2. Exécutez `yarn run local` ou `node run local` pour démarrer le serveur local sur le port **36551**.
    1. Si vous voulez un port différent, exécutez `build/build.sh --local --port 1234`
4. Installez le fichier `static/lssm-v4.local.user.js` dans votre navigateur et désactivez tous les autres scripts liés à LSSM-v4.

:::tip Quelles sont les prochaines étapes ?
* Lire [Comment Création d'un "Pull Request"](./prs.md)
* Lire l'une des sections spéciales pour les sujets de contribution
  :::
