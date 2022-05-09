---
title: Métadonnées
lang: fr_FR
sidebarDepth: 0
---

# Collecte des métadonnées des utilisateurs

En utilisant le `LSSM` (Leitstellenspiel Manager, extension pour le navigateur), l'utilisateur accepte que des métadonnées soient collectées. Les données suivantes sont stockées :
* Identifiant de l'utilisateur
  * Y compris l' id Secret unique (chaîne de caractères unique et non publique pour l'identification)
* Nom d'utilisateur
* Nombre de bâtiments`
* Le navigateur web utilisé
  * Avec sa version
* La date de la collecte des métadonnées
* Les modules activés
* La langue du jeux 
  *  Y compris si vous utilisez la version police ou pas
* Le type de carte actif (OSM ou Mapkit)
* la version LSSM

Ces données sont utilisées pour améliorer l'extension ainsi que pour guider le développement de modules existants ou futurs.
Elles constituent également la base de statistiques passionnantes, qui peuvent être publiées, par exemple sous forme de news (pour plus d'informations, voir [ci-dessous](#publication-de-statistiques)).

**L'utilisateur peut (dés)activer la collecte de ces données à tout moment dans les [paramètres] (settings.md).**

**La suppression des données déjà collectées peut être demandée à tout moment en envoyant un message aux développeurs par l'un des moyens énumérés sur [support](support.md) ou en envoyant un e-mail à `developer[at]lss-manager.de`.**

Chaque fois que la page principale du jeu est ouverte, les données télémétriques (si elles sont activées) sont envoyées au serveur LSSM.
Si un enregistrement de données existe déjà pour l'utilisateur, il sera écrasé, l'historique des données individuelles ne sera pas sauvegardé.
Si un enregistrement de données n'a pas été mis à jour depuis plus de 6 mois, il sera automatiquement supprimé.

## Publication de statistiques

Les statistiques télémétriques suivantes peuvent être publiées par l'équipe LSSM:
* le nombre total d'enregistrements télémétriques actuels pour les périodes suivantes:
  * 6 derniers mois
  * 30 derniers jours
  * 7 derniers jours
  * 24 derniers heures
  * la date du calendrier d'aujourd'hui selon l'heure allemande
* nombre d'entrées télémétriques des utilisateurs avec ou sans compte premium
* nombre d'entrées télémétriques par version linguistique
  * y compris la répartition entre la version police et la version "normale", si disponible
* nombre d'entrées télémétriques par navigateur
  * y compris la répartition en fonction de la version majeure du navigateur. Par exemple, "Firefox 100.3" et "Firefox 100.4" sont regroupés sous "Firefox 100".
* nombre d'entrées télémétriques par type de carte
* nombre d'entrées télémétriques par version de LSSM
* nombre d'entrées télémétriques pour chacun des modules disponibles.

Il n'est **pas** possible de faire des déductions sur des enregistrements individuels à partir de ces statistiques.

## Collecte de métadonnées par des fournisseurs tiers

LSSM lui-même n'utilise pas d'outils, de bibliothèques, d'utilitaires ou autres qui pourraient collecter les métadonnées des utilisateurs.
Avec l'utilisation d'un navigateur et d'un gestionnaire de scripts utilisateur, tel que [Tampermonkey](https://tampermonkey.net), la collecte des métadonnées de ces derniers ne peut être évitée.
Toutes ces données collectées ne sont pas accessibles ou consultables par l'équipe de LSSM et ne peuvent être empêchées, favorisées ou manipulées par LSSM.
Les informations sur la collecte de données des logiciels utilisés se trouvent dans les sources d'information de ces logiciels.
