Pour ce faire, les pages du jeu sont peu à peu redessinées, c'est-à-dire entièrement remaniées.
L'objectif est de rendre l'ensemble du jeu plus rapide.
Malheureusement, l'avancement dans ce module est lent,
car la refonte rend rapidement inutilisables d'autres scripts sans adaptation.

## La refonte n'offre pas que des avantages

<!-- markdownlint-disable line-length -->

|                 Avantages                 |                                                                                                    Désavantage                                                                                                    |
| :---------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| L'ensemble du jeu tourne un peu plus vite | Il se peut que certains scripts ne fonctionnent pas sans travail supplémentaire avec le nouveau design. Nous veillerons bien sûr à ce que tous les scripts courants soient compatibles avant la sortie du module. |
|             Un design moderne             |                                                                                                                                                                                                                   |

<!-- markdownlint-enable line-length -->

## Profil

<!-- markdownlint-disable line-length -->

|                        Personnel                        |                     D'un joueur de l'alliance                      |                     Des autres joueurs                      |
| :-----------------------------------------------------: | :----------------------------------------------------------------: | :---------------------------------------------------------: |
|      ![Personnel : Text](assets/fr_FR/profiles/self/text.png)      |      ![Alliance : Text](assets/fr_FR/profiles/alliance_members/text.png)      |     ![autre joueur : Text](assets/fr_FR/profiles/others/text.png)      |
|      ![Personnel : Carte](assets/fr_FR/profiles/self/map.png)      |      ![Alliance : Carte](assets/fr_FR/profiles/alliance_members/map.png)      |                                                             |
| ![Personnel : Bâtiments](assets/fr_FR/profiles/self/buildings.png) | ![Alliance : Bâtiments](assets/fr_FR/profiles/alliance_members/buildings.png) |                                                             |
| ![Personnel : Récompenses](assets/fr_FR/profiles/self/awards.png)  | ![Alliance : Récompenses](assets/fr_FR/profiles/alliance_members/awards.png)  | ![autre joueur : Récompenses](assets/fr_FR/profiles/others/awards.png) |
|                                                         |                                                                    |   ![autre joueur : ignoré](assets/fr_FR/profiles/others/ignore.png)    |

<!-- markdownlint-enable line-length -->

### Caractéristiques

* Bord gauche :
    * Boutons connus
    * Brèves informations (grade, crédits gagnés, alliances).
        * Dans le profil personnel, bien sûr aussi la date de connexion
        * Pour les membres de l'alliances : Le(s) rôle(s)
    * Photo de profil
    * Petit graphique pour un aperçu des récompenses
        * Le nombre maximal semble déroutant au premier abord :
            pourquoi peut-on avoir 23 récompenses sur 15 ?
            Mais le nombre maximum vient du fait qu'un utilisateur qui
            s'inscrit maintenant peut recevoir tant de récompenses peut être obtenu.
* le texte du profil
* Carte avec le filtre de carte (boutons au-dessus de la carte)
    * seulement pour les membres de l'association et dans le propre profil
* Liste des bâtiments
    * triée par centre de contrôle
    * avec filtre et recherche
    * Sauter à chaque bâtiment sur la carte du profil avec la petite icône
        à côté du nom du bâtiment.
* Liste des récompense
* Les fenêtres "Modifier le texte du profil" et "Modifier la photo du profil"
    ont également été redessinées afin d'obtenir une meilleure expérience globale.

## RAI

:::danger Attention
Les RAI sont actuellement encore en cours d'élaboration,
c'est pourquoi nous ne donnons malheureusement ici qu'un aperçu
de la manière dont nous envisageons les choses.
Nous ne pouvons qu'espérer que l'ensemble du projet aboutira.
:::

![Aperçu RAI](assets/fr_FR/aao/overview.png)

## Liste des alliances et le classement des joueurs

<!-- markdownlint-disable line-length -->

|                        Liste des alliances                        |                   Le classement des joueurs                    |
| :---------------------------------------------------------------: | :------------------------------------------------------------: |
|         ![Liste des alliances](assets/fr_FR/alliance_list/list.png)          |         ![Classement des joueurs](assets/fr_FR/toplist/list.png)          |
| ![Liste des alliances avec recherche](assets/fr_FR/alliance_list/search.png) | ![Classement des joueurs avec recherche](assets/fr_FR/toplist/search.png) |

<!-- markdownlint-enable line-length -->

## Page des alliances

<!-- markdownlint-disable line-length -->

|                               Photos                                |                               Photos                                |
| :-----------------------------------------------------------------: | :-----------------------------------------------------------------: |
|        ![Présentation de l'alliances](assets/fr_FR/alliances/intro.png)        |                 ![Règlement](assets/fr_FR/alliances/rules.png)                 |
|            ![Candidatures](assets/fr_FR/alliances/applications.png)            |            ![Liste des membres](assets/fr_FR/alliances/members.png)            |
| ![Banque de l'alliance (desactivé)](assets/fr_FR/alliances/funds_disabled.png) |   ![Banque de l'alliance (activé)](assets/fr_FR/alliances/funds_enabled.png)   |
|      ![zones de rassemblement](assets/fr_FR/alliances/staging_areas.png)       |        ![Bâtiment de l'alliance](assets/fr_FR/alliances/buildings.png)         |
|                ![Journal](assets/fr_FR/alliances/protocol.png)                 | ![Cours de formation : résumé](assets/fr_FR/alliances/schoolings/overview.png) |
|        ![Cours de formation](assets/fr_FR/alliances/schoolings/own.png)        |     ![Formations ouvertes](assets/fr_FR/alliances/schoolings/alliance.png)     |

<!-- markdownlint-enable line-length -->

## Page des crédits et des pièces

<!-- markdownlint-disable line-length -->

|                                Photos                                 |                                  Photos                                  |
| :-------------------------------------------------------------------: | :----------------------------------------------------------------------: |
|       ![Transactions individuelles](assets/fr_FR/credits/credits_list.png)       | ![Transactions individuelles](assets/fr_FR/credits/credits_list_multiple_pages.png) |
|               ![Aperçu](assets/fr_FR/credits/credits_summary.png)                |                                                                          |
|         ![Résumé de la journée](assets/fr_FR/credits/credits_daily.png)          |       ![Résumé de la journée](assets/fr_FR/credits/credits_daily_filter.png)        |
| ![Résumé de la journée](assets/fr_FR/credits/credits_daily_filter_yesterday.png) |                                                                          |
|            Entre-temps, il existe même un nouveau filtre:             | ![Le nouveau filtre du résumé quotidien](assets/fr_FR/credits/daily_new_filter.png) |
|                    ![Piéces](assets/fr_FR/credits/coins.png)                     |              ![Piéces](assets/fr_FR/credits/coins_multiple_pages.png)               |

<!-- markdownlint-enable line-length -->

## Page des Véhicules

<!-- markdownlint-disable line-length -->

|                           Photos                           |                             Remarques                             |
| :--------------------------------------------------------: | :---------------------------------------------------------------: |
|            ![Missions](assets/fr_FR/vehicles/missions.png)            |                                                                   |
|    ![Missions (triés)](assets/fr_FR/vehicles/missions_sorted.png)     |                    Triés par patients restants                    |
|   ![Choisir un hôpital](assets/fr_FR/vehicles/choose_hospital.png)    |   Demande de deplacement de patients avec fonctions de filtrage   |
|    ![Choisir une prison](assets/fr_FR/vehicles/choose_prison.png)     | Demande de déplacement des prisonniers, avec fonction de filtrage |
| ![Véhicule d'un autre joueur](assets/fr_FR/vehicles/other_player.png) |                    Véhicule d'un autre joueur                     |

<!-- markdownlint-enable line-length -->

## Tâches

Nous avons aussi la page [Tâches et événements](https://www.operateur112.fr/tasks/index)
qui a été modifié :

![Tâches](assets/fr_FR/tasks/full_size.png)

![Tâches à l'état réduit](assets/fr_FR/tasks/collapsed.png)
