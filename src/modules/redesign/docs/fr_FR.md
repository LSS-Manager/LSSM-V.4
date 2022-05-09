Pour ce faire, les pages du jeu sont peu à peu redessinées, c'est-à-dire entièrement remaniées. 
L'objectif est de rendre l'ensemble du jeu plus rapide. 
Malheureusement, l'avancement dans ce module est lent, car la refonte rend rapidement inutilisables d'autres scripts sans adaptation.

## La refonte n'offre pas que des avantages :

|                 Avantages                 |                                                                                                    Désavantage                                                                                                    |
|:-----------------------------------------:|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
| L'ensemble du jeu tourne un peu plus vite | Il se peut que certains scripts ne fonctionnent pas sans travail supplémentaire avec le nouveau design. Nous veillerons bien sûr à ce que tous les scripts courants soient compatibles avant la sortie du module. |
|             Un design moderne             |                                                                                                                                                                                                                   |

## Profil 

|                        Personnel                        |                     D'un joueur de l'alliance                      |                     Des autres joueurs                      |
|:-------------------------------------------------------:|:------------------------------------------------------------------:|:-----------------------------------------------------------:|
|      ![Personnel : Text](./profiles/self/text.png)      |      ![Alliance : Text](./profiles/alliance_members/text.png)      |     ![autre joueur : Text](./profiles/others/text.png)      |
|      ![Personnel : Carte](./profiles/self/map.png)      |      ![Alliance : Carte](./profiles/alliance_members/map.png)      |                                                             |
| ![Personnel : Bâtiments](./profiles/self/buildings.png) | ![Alliance : Bâtiments](./profiles/alliance_members/buildings.png) |                                                             |
| ![Personnel : Récompenses](./profiles/self/awards.png)  | ![Alliance : Récompenses](./profiles/alliance_members/awards.png)  | ![autre joueur : Récompenses](./profiles/others/awards.png) |
|                                                         |                                                                    |   ![autre joueur : ignoré](./profiles/others/ignore.png)    |

### Caractéristiques :

* Bord gauche :
	* Boutons connus
	* Brèves informations (grade, crédits gagnés, alliances).
		* Dans le profil personnel, bien sûr aussi la date de connexion
		* Pour les membres de l'alliances : Le(s) rôle(s)
	* Photo de profil
	* Petit graphique pour un aperçu des récompenses
		* Le nombre maximal semble déroutant au premier abord : pourquoi peut-on avoir 23 récompenses sur 15 ? 
		  * Mais le nombre maximum vient du fait qu'un utilisateur qui s'inscrit maintenant peut recevoir tant de récompenses peut être obtenu.* Texte du profil
* le texte du profil
* Carte avec le filtre de carte (boutons au-dessus de la carte) => seulement pour les membres de l'association et dans le propre profil
* Liste des bâtiments
	* triée par centre de contrôle
	* avec filtre et recherche
	* Sauter à chaque bâtiment sur la carte du profil avec la petite icône à côté du nom du bâtiment.
* Liste des récompense
* Les fenêtres "Modifier le texte du profil" et "Modifier la photo du profil" ont également été redessinées afin d'obtenir une meilleure expérience globale.

## RAI

:::danger Attention
Les RAI sont actuellement encore en cours d'élaboration, c'est pourquoi nous ne donnons malheureusement ici qu'un aperçu de la manière dont nous envisageons les choses.
Nous ne pouvons qu'espérer que l'ensemble du projet aboutira.
:::

![Aperçu RAI](./aao/overview.png)

## Liste des alliances et le classement des joueurs

|                        Liste des alliances                        |                   Le classement des joueurs                    |
|:-----------------------------------------------------------------:|:--------------------------------------------------------------:|
|         ![Liste des alliances](./alliance_list/list.png)          |         ![Classement des joueurs](./toplist/list.png)          | 
| ![Liste des alliances avec recherche](./alliance_list/search.png) | ![Classement des joueurs avec recherche](./toplist/search.png) | 
	
## Page des alliances

|                               Photos                                |                               Photos                                |
|:-------------------------------------------------------------------:|:-------------------------------------------------------------------:|
|        ![Présentation de l'alliances](./alliances/intro.png)        |                 ![Règlement](./alliances/rules.png)                 | 
|            ![Candidatures](./alliances/applications.png)            |            ![Liste des membres](./alliances/members.png)            | 
| ![Banque de l'alliance (desactivé)](./alliances/funds_disabled.png) |   ![Banque de l'alliance (activé)](./alliances/funds_enabled.png)   | 
|      ![zones de rassemblement](./alliances/staging_areas.png)       |        ![Bâtiment de l'alliance](./alliances/buildings.png)         |
|                ![Journal](./alliances/protocol.png)                 | ![Cours de formation : résumé](./alliances/schoolings/overview.png) | 
|        ![Cours de formation](./alliances/schoolings/own.png)        |     ![Formations ouvertes](./alliances/schoolings/alliance.png)     | 

## Page des crédits et des pièces

|                                Photos                                 |                                  Photos                                  |
|:---------------------------------------------------------------------:|:------------------------------------------------------------------------:|
|       ![Transactions individuelles](./credits/credits_list.png)       | ![Transactions individuelles](./credits/credits_list_multiple_pages.png) | 
|               ![Aperçu](./credits/credits_summary.png)                |                                                                          | 
|         ![Résumé de la journée](./credits/credits_daily.png)          |       ![Résumé de la journée](./credits/credits_daily_filter.png)        | 
| ![Résumé de la journée](./credits/credits_daily_filter_yesterday.png) |                                                                          | 
|            Entre-temps, il existe même un nouveau filtre:             | ![Le nouveau filtre du résumé quotidien](./credits/daily_new_filter.png) |
|                    ![Piéces](./credits/coins.png)                     |              ![Piéces](./credits/coins_multiple_pages.png)               |

## Page des Véhicules

|                           Photos                           |                             Remarques                             |
|:----------------------------------------------------------:|:-----------------------------------------------------------------:|
|            ![Missions](./vehicles/missions.png)            |                                                                   |
|    ![Missions (triés)](./vehicles/missions_sorted.png)     |                    Triés par patients restants                    |
|   ![Choisir un hôpital](./vehicles/choose_hospital.png)    |   Demande de deplacement de patients avec fonctions de filtrage   |
|    ![Choisir une prison](./vehicles/choose_prison.png)     | Demande de déplacement des prisonniers, avec fonction de filtrage |
| ![Véhicule d'un autre joueur](./vehicles/other_player.png) |                    Véhicule d'un autre joueur                     |

## Tâches

Nous avons aussi la page [Tâches et événements](https://www.operateur112.fr/tasks/index) qui a été modifié:

![Tâches](./tasks/full_size.png)

![Tâches à l'état réduit](./tasks/collapsed.png)
