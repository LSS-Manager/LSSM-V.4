---
title: Création d'un \"Pull Request\"
lang: fr_FR
sidebarDepth: 2
---

# Création d'un "Pull Request"

Lorsque vous vous sentez prêt à mettre vos modifications à la disposition des bêta-testeurs, il est temps de transférer vos améliorations dans le référentiel LSSM.
Cela peut être après la mise à jour d'un seul module, d'une simple page wiki, de plusieurs modules ou simplement après avoir apporté de petites corrections aux traductions existantes.
GitHub vous montrera un message dans votre dépôt.
![](../images/contributing/prs/GH_create_pr.png)

Cliquez sur "contribute" et "Open pull request".
![](../images/contributing/prs/GH_create_pr_2.png)

Cela vous mènera à un aperçu où vous pourrez voir toutes vos modifications. Veuillez vous assurer que vous fusionnez dans le bon dépôt (LSS-manager/LSSM-V.4) et dans la bonne branche (dev).
![](../images/contributing/prs/GH_create_pr_3.png)

Vous pouvez également définir un titre pour le "Pull Request", si vous ne trouvez rien de mieux : copiez le message du commit.

:::tip Comment rendre l'équipe LSSM heureuse ?
* donner du chocolat (même le chocolat virtuel est bien :chocolate_bar::yum :)
* donner un titre significatif à la Pull Request (PR), en respectant le schéma `🔀{gitmojis} [{module}] {short_description}``.
    * Nous changerons parfois le titre, mais si vous en fournissez un bon dès le début, les chances sont plus faibles.
    * Si vous voulez nous rendre encore plus heureux, ajoutez également le drapeau de votre traduction après le globe `🌐` (par exemple `🇫🇷` pour la langue `fr_FR`), lorsque vous faites des traductions.
:::

**Assurez-vous que la case à cocher "Autoriser les modifications par les responsables" est activée**, sinon l'équipe LSSM ne sera pas en mesure d'effectuer des modifications et de fournir des correctifs rapides.
![](../images/contributing/prs/GH_create_pr_4.png)

Quelqu'un doit maintenant réviser vos modifications et un système de construction automatique vérifiera qu'il n'y a pas d'erreurs de syntaxe (virgule manquante, parenthèse, etc.).

Si la révision et la vérification sont positives, les modifications seront fusionnées dans la branche de développement et votre code sera disponible pour les bêta-testeurs. Avec la prochaine version, il sera disponible pour tous les utilisateurs.

**Félicitations, vous avez contribué à la LSSM, merci pour votre soutien**.

:::tip Quelle est la prochaine étape ?
* Lire l'une des sections spéciales pour les sujets de contribution

:::
