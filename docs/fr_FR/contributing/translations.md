---
title: Traduction
lang: fr_FR
sidebarDepth: 2
---

# Guide de la traduction

Chaque langue possède son propre code de langue (souvent appelé langcode) pour une identification facile.
Si vous ne connaissez pas le code de langue correct pour votre version, veuillez demander à l'équipe LSSM.

Dans les textes suivants, nous utiliserons `{lang}` comme espace pour les codes de langue.
Lors de la traduction, assurez-vous de le remplacer par votre code de langue spécifique.
Exemple: `fr_FR` est le code de traduction pour le français de France.

:::tip Codes de langue, spécification
Chaque code suit le format `xx_YY`, où xx est le code de langue spécifié en [ISO 639-1] (https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) et YY est le pays selon [ISO 3166-1 alpha-2] (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) .
:::

## Paths
Il y a quelques points où les fichiers de traduction sont stockés :
- Docs alias le Wiki
	- `/docs/{lang}/` Les pages principales du wiki
		- telles que Accueil, FAQ, App Store etc. En gros, tous les fichiers que vous pouvez trouver dans la barre latérale à gauche, sauf les modules.
		- Par exemple, on trouve `suggestions.md`. [Ici](../suggestions.md)
	-  `/docs/.vuepress/i18n/{lang}.json` certaines phrases statiques
		- Exemple `home: "Retour à l'accueil"`
- Fichiers principaux (ils sont nécessaires pour que LSSM soit disponible dans votre langue)
	- `/src/i18n/{lang}.ts`
	- il peut aussi y avoir un dossier `/src/i18n/{lang}/` qui contient des traductions supplémentaires (actuellement seulement pour les tableaux) mais elles ne sont pas pertinentes pour que LSSM fonctionne correctement.
- Modules (où `{module}` représente un des modules disponibles)
	- `/src/modules/{module}/i18n/` Les traductions des modules
	- `/src/modules/{module}/docs/` Les pages du wiki
		- Certains dossiers wiki contiennent un sous-dossier appelé `assets`, réservé aux images de la page wiki : `/src/modules/{module}/docs/assets/{lang}/`.
			- Les images peuvent être incorporées avec : `![Description](./imageName.png)`

Pour commencer une nouvelle traduction, créez un nouveau fichier en cliquant sur "Add file" et sélectionnez "Create new file".
![](../images/contributing/translations/GH_create_new_file.png)

:::tip
Si vous devez créer un nouveau dossier, procédez de la même manière mais placez un `/` derrière le nom du dossier et continuez avec le nom de votre fichier.

![](../images/contributing/translations/GH_create_Folder.png)

va créer le dossier `de_DE` contenant un fichier `dummy.file`.
:::

## "Meilleure pratique"
Chaque dossier contient au moins une traduction allemande et une traduction anglaise. Le plus simple est de copier le contenu de ce fichier dans votre nouveau fichier. Cela vous permet d'éviter d'oublier une parenthèse ou une virgule.

## Faire des traductions
Tous les fichiers `.json` suivent le même schéma qui est `"key" : value`. Lors de la traduction, tout ce que vous avez à faire est de mettre à jour les valeurs dans votre langue.

Exemple:

```json{4,9}
{
	"name": "Appstore",
	"description": "The Appstore is a User-Interface to enable and disable modules.",
	"changes": "There are no changes|There is 1 change|There are {n} changes",
	"buttons": {
		"save": "Save",
		"close": "Close"
	}
	"incompatible": "Unfortunately, {newModule} is incompatible with {currentModule}. They cannot be enabled at the same time currently."
}
```

pourrait être traduit en allemand de la manière suivante :

```json
{
	"name": "Appstore",
	"description": "Der Appstore bietet eine Benutzeroberfläche zum (de-)aktivieren von Modulen.",
	"changes": "Es gibt keine Änderungen|Es gibt eine Änderung|Es gibt {n} Änderungen",
	"buttons": {
		"save": "Speichern",
		"close": "Schließen"
	},
	"incompatible": "Leider ist {newModule} mit dem Modul {currentModule} inkompatibel, sodass diese nicht gleichzeitig aktiviert sein können."
}
```

Notez, comment seulement les valeurs ont été changées.

Certaines traductions peuvent avoir des formes différentes pour le singulier et le pluriel, ou même des formes plus complexes. La ligne 4 montre un tel exemple de cas et comment les formes sont séparées avec les tubes `|`. De plus, la variable `{n}` sera remplacée par le nombre correspondant.

De plus, des variables peuvent parfois apparaître dans les fichiers de traduction (voir ligne 9). Elles sont toujours entourées d'accolades `{}` et vous n'êtes pas autorisé à changer le nom à l'intérieur, car il s'agit d'un espace réservé pour une valeur dynamique.

:::warning Nombres dans les fichiers de traduction
Parfois, des nombres à l'aspect étrange peuvent apparaître dans les traductions. Ils indiquent généralement l'utilisation d'identifiants, qui sont spécifiques au jeu.
Si vous n'êtes pas sûr des ID corrects, veuillez contacter l'équipe LSSM et demander de l'aide.

Exemple pour **bâtiments** :

[`/src/modules/buildingListFilter/i18n/en_GB.root.json`, lines 2-44](https://github.com/LSS-Manager/LSSM-V.4/blob/0a3ba77eb595056f5049afab361eef20e418dd5b/src/modules/buildingListFilter/i18n/en_GB.root.json#L2-L44).
Ici, les chiffres représentent les types de bâtiments et peuvent devoir être ajustés, car la version britannique a des bâtiments différents de ceux de la version américaine, comme vous pouvez le voir dans le tableau ci-dessous. [`/src/modules/buildingListFilter/i18n/en_US.root.json`, lines 2-58](https://github.com/LSS-Manager/LSSM-V.4/blob/0a3ba77eb595056f5049afab361eef20e418dd5b/src/modules/buildingListFilter/i18n/en_US.root.json#L2-L58)
:::

## Contribution et création d'un PR

Veuillez consulter le [guide de contribution](../contributing.md#Guide-de-contribution) pour savoir comment procéder.

## Guides

### Mise en œuvre du contenu

En général, ces mises à jour sont nécessaires :
* `/src/i18n/{lang}.ts`
  * Mise à jour des véhicules
  * Mise à jour des catégories de véhicules
  * Mise à jour des catégories de bâtiments
  * Mise à jour des écoles
  * Mise à jour des listes de bâtiments
    * `vehicleBuildings`, `cellBuildings`, `cellExtensions`, `bedBuildings`, `schoolBuildings`, `dispatchCenterBuildings`
* `/src/i18n/{lang}/fr_FR.ts`
  * Mise à jour des [bâtiments/extensions](#buildings-extensions)
* `/src/modules/buildingListFilter/i18n/{lang}.root.json`
  * mise à jour par défaut
* `/src/modules/extendedCallWindow/i18n/{lang}.js`
  * mise à jour de `vehicleGroups` et `staffGroups`
* `/src/modules/extendedCallWindow/i18n/{lang}.root.json`
  * Mise à jour des onglets personnalisés par défaut
* `/src/modules/missionHelper/i18n/{lang}.json`
  * mettre à jour les traductions
    * `prerequisites`
    * `requirements`
    * `vehicles`

### Trouver des identifiants

Si vous ne connaissez pas un identifiant ou si l'identifiant requis n'est pas (encore) disponible dans notre [API](https://api.lss-manager.de), veuillez utiliser ces guides pour le trouver.

Les URLs présentées ici utilisent `operateur112.fr` pour la démonstration. Veuillez la remplacer par l'URL de votre jeu.

:::tip Exécuter du code dans la console du navigateur
Cette opération est simple mais peut être dangereuse. Si vous n'avez pas confiance en nous et au code que nous voulons que vous exécutiez, cela **est bien** ! Contactez simplement l'équipe LSSM, et nous vous fournirons les identifiants.

Pour ouvrir la console, appuyez sur `F12`, `Ctrl+Shift+K` ou `Ctrl+Shift+I` (certains navigateurs autorisent toutes ces touches, d'autres une seule). Si la console n'est pas encore visible, veuillez cliquer sur l'onglet `Console` dans le popup.

Vous pouvez maintenant copier le code de nos extraits de code fournis ci-dessous et le coller dans la console. Certains navigateurs (comme Firefox) vous demandent de taper une courte phrase. Tapez-la simplement, Firefox la remplacera par le code, une fois que vous aurez terminé la phrase.

Lorsque le code est collé dans la console, il suffit d'appuyer sur la touche `Enter` de votre clavier pour exécuter l'extrait. Le résultat apparaîtra automatiquement dans la console, mais certains d'entre eux peuvent prendre quelques secondes.
:::

:::warning Avis de non-responsabilité de l'API
L'API est générée à partir des fichiers de traduction et peut donc contenir des valeurs erronées. En cas d'insécurité, veuillez toujours utiliser les informations disponibles dans le jeu !
:::

#### Véhicules

API: `https://api.lss-manager.de/{lang}/vehicles`

Allez sur `https://www.operateur112.fr/vehicle_graphics/new` et créez un nouvel ensemble graphique. Si vous en possédez déjà un, vous pouvez également vous rendre sur sa page d'édition.

Exécutez le code suivant dans la console de votre navigateur. Il retournera une liste de véhicules et leur ID :
```js
Object.fromEntries(Array.from(document.querySelectorAll('table tbody tr')).map(row => [new URL(row.querySelector('a[href^="/vehicle_graphics/"][href*="/vehicle_graphic_images/"][href$="/edit"]')?.href ?? '/', window.location.origin).pathname.split('/')[4], row.querySelector('td:first-child')?.textContent.trim()]).filter(([id, name]) => id && name)) 
```

#### Bâtiments

API : `https://api.lss-manager.de/{lang}/buildings`

Allez sur `https://www.operateur112.fr/buildings/new`, le formulaire pour créer un nouveau bâtiment devrait être affiché.

Exécutez le code suivant dans la console de votre navigateur. Il retournera une liste de bâtiments et leur ID :
```js
Object.fromEntries(Array.from(document.querySelectorAll('#building_building_type option')).map(option => [option.value, option.textContent.trim()]).filter(([id, name]) => id && name))
```

#### Missions

Il y a une liste officielle des missions : `https://www.operateur112.fr/einsaetze.json`.

Pour obtenir toutes les missions, groupées par leur date de début et de fin, exécutez le code suivant dans le jeu : *(remplacez `www.operateur112.fr` par votre jeu bien sûr)*
```js
fetch('https://www.operateur112.fr/einsaetze.json').then(res => res.json()).then(m => {const g = {}; m.forEach(e => {const d = `${e.additional.date_start} - ${e.additional.date_end}`; if(!g[d]) {g[d] = []} g[d].push(e)}); console.log(g)})
```

Chaque groupe est un objet d'IDs avec le nom de mission correspondant.

#### POIs

Pour obtenir une liste à jour des POIs pour `/src/i18n/{lang}.ts`, allez sur `https://www.operateur112.fr/mission_positions/new` et exécutez le code suivant dans la console de votre navigateur :
```js
Array.from(document.querySelectorAll('#mission_position_poi_type option')).map(option => [option.value, option.textContent.trim()]).sort(([idA], [idB]) => idA - idB).map(([, caption]) => caption)
```

### Aide sur des thèmes de traduction particuliers

#### Bâtiments et extensions

Les traductions se trouvent dans le fichier `/src/i18n/{lang}/buildings.ts`. Il suit la structure suivante`[buildingType: number]: BuildingInformation`. Vous pouvez récupérer l'ID de type de chaque bâtiment comme décrit dans la section [Trouvé les IDs: Bâtiments](#batiments).

Le `BuildingInformation` est composé de plusieurs informations obligatoires : 
* `caption` (texte, obligatoire): Le nom du bâtiment. Doit être le même que dans le jeu.
* `color` (texte, obligatoire): Choisissez une couleur (code hexadécimal avec le préfixe `#`) qui convient au bâtiment. Par exemple, pour les casernes de pompiers, un ton rouge est un bon choix.
    * Les couleurs seront utilisées dans le module [Tableau de bord][module-dashboard].
* `credits` (nombre, obligatoire): Combien coûte ce bâtiment en crédits.
    * Si le prix change avec l'augmentation du nombre de bâtiments, veuillez le noter dans `special`.
* `coins` (nombre, obligatoire): Combien coûte le bâtiment en Pièces.
* `extensions` (liste des extensions, obligatoire): Les extensions qui sont disponibles pour être construites dans ce bâtiment.
    * Chaque extension requiert au moins les attributs suivants 
        * `caption` (texte, obligatoire): Le nom de l'extension. Doit être le même que dans le jeu.
        * `credits` (nombre, obligatoire): Combien coûte l'extension en crédits.
        * `coins` (nombre, obligatoire): Combien coûte l'extension en Pièces.
        * `duration` (texte, obligatoire): Combien de temps il faut pour construire l'extension
            * cela pourrait être par exemple "7 jours".
	* certaines extensions ne peuvent être achetées sans avoir d'autres extensions à cette station. Elles nécessitent les attributs suivants :
        * `requiredExtensions` (liste de nombre) : Les ID d'extension dont dépend cette extension.
            * Les ID d'extension commencent à compter à `0` pour chaque type de bâtiment.
    * certaines extensions peuvent être limitées par le nombre de bâtiments (par exemple, une extension qui peut être achetée une fois toutes les 10 casernes de pompiers). Ils doivent contenir les attributs suivants :
        * `maxExtensionsFunction` (fonction) : renvoie un nombre indiquant combien de ces extensions peuvent actuellement être construites. Elle prend les paramètres suivants :
            * `buildingsByType` : `Record<number, Building[]>` où `Building` est un bâtiment tel que retourné par l'API des bâtiments du jeu.
        * `canBuyByAmount` (fonction) : renvoie un booléen indiquant si des extensions supplémentaires de ce type peuvent être achetées. Elle prend les paramètres suivants :
            * `boughtExtensionsAmountByType` : `Record<number, Record<number, number>>` liste le nombre d'extensions déjà achetées pour chaque type de bâtiment.
            * `maxExtensions` : `number` sera le résultat de la fonction `maxExtensionsFunction`.
    *Si une extension ajoute une ou plusieurs nouvelles salles de classe au bâtiment, les attributs suivants sont requis : *Notez que le bâtiment DOIT avoir l'attribut `startClassrooms` alors*
        * `newClassrooms` (nombre) : indique le nombre de salles de classe ajoutées en terminant cette extension.
    * si une extension ajoute une ou plusieurs nouvelles cellules de prison au bâtiment, les attributs suivants sont requis : *Notez que le bâtiment DOIT avoir l'attribut `startCells` alors*
        * `newCells` (nombre) : indique le nombre de cellules de prison ajoutées en terminant cette extension.			
   * si le fait de terminer cette extension débloque de nouveaux véhicules pour cette station, donne de nouveaux parkings ou des véhicules cadeaux, les attributs suivants sont possibles :
        * `isVehicleExtension` doit toujours être `true`.
        * `givesParkingLots` (nombre, obligatoire) : Combien de nouveaux parkings sont ajoutés à la fin de cette extension ?
            * même si le lot est pré-rempli avec un véhicule (le véhicule est doué), il faut le mentionner ici
            * Si l'extension n'ajoute pas de nouveaux parkings, mettez la valeur "0".
        * `givesParkingLotsPerLevel` (nombre, optionnel) : Si l'extension donne un ou plusieurs parkings pour chaque niveau de station.
        * `unlocksVehicleTypes` (liste de nombre, optionnel) : Une liste de types de véhicules qui sont débloqués pour cette station en terminant l'extension.
        * `parkingLotReservations` (liste de nombre, optionnel) : Spécifie si les parkings nouvellement ajoutés sont réservés pour certains types de véhicules.
            * Il s'agit d'une liste à plusieurs éléments, car chaque élément représente un parc de stationnement et les types de véhicules qui peuvent y être placés.
        * `giftsVehicles` (liste de nombre, optionnel) : Peut lister les Ids des types de véhicules qui sont automatiquement ajoutés à la station en terminant l'extension
    * si l'extension ne peut pas être désactivée (par exemple, les cellules de prison), ajoutez :
        * `cannotDisable` qui doit toujours être `true`
* `levelcost` (liste de texte, obligatoire) : Vous pouvez donner ici des informations sur ce que coûte l'augmentation du niveau.
    * Ces informations seront affichées dans le module [Aperçu général][module-overview].
* `maxBuildings` (texte ou nombre, obligatoire) : Ceci indique combien de bâtiments on peut acheter de ce type.
    * L'information sera affichée dans le module [Aperçu général] [module-overview].
    * S'il n'y a pas de limite, vous pouvez utiliser par exemple ``no limit'``.
* `maxLevel` (nombre, obligatoire) : Définit ici le nombre de fois que ce bâtiment peut être agrandi / mis à niveau.
    * Si ce bâtiment ne peut pas être augmenté, choisissez "0" comme valeur.
* `special` (texte, obligatoire) : Cet attribut vous permet de donner des informations supplémentaires sur ce bâtiment.
    * Ces informations seront affichées dans le module [Aperçu général][module-overview].		
	
Si le nombre de bâtiments d'un type donné est limité par le nombre total de bâtiments que possède le joueur, définissez les attributs suivants :
* `maxBuildingsFunction` (fonction) : renvoie un nombre indiquant combien de bâtiments peuvent être construits actuellement. Prend les paramètres suivants :
    * `buildingsAmountTotal` (nombre) le nombre de bâtiments que le joueur possède actuellement.

Certains bâtiments peuvent avoir des salles de classe ou des extensions qui ajoutent des salles de classe. Les attributs suivants doivent être définis pour ces bâtiments :
* `startClassrooms` (nombre)

Certains bâtiments peuvent avoir des cellules de prison ou des extensions qui ajoutent des cellules de prison.  Les attributs suivants doivent être définis pour ces bâtiments :
* `startCells` (nombre)

Certains bâtiments peuvent comporter des lits d'hôpital.  Les attributs suivants doivent être définis pour eux :
* `startBeds` (nombre)
    * ceci permet automatiquement que `level` augmente aussi le nombre de lits disponibles

Si un bâtiment est un centre de régulation, il doit avoir les attributs suivants :
* `isDispatchCenter` doit toujours être `true`.

Si un bâtiment est une zone de transit, il doit avoir les attributs suivants :
* `isStagingArea` doit toujours être `true`.

Si un bâtiment peut avoir des véhicules, les attributs suivants sont possibles en plus :
* `startPersonnel` (nombre, obligatoire) : combien de personnes le bâtiment a au départ
* `startVehicles` (liste de texte, obligatoire) : quels véhicules peuvent être sélectionnés comme premier véhicule (ou si c'est toujours le même véhicule)
* liste vide, si aucun véhicule ne peut être sélectionné
    * liste de chaînes de caractères, car elle n'est affichée que dans [Aperçu général][module-overview] et n'est pas traitée par la suite.
* `startParkingLots` (nombre, obligatoire) : combien de parkings il y a au départ.
* `schoolingTypes` (liste de texte, obligatoire) : dans quelles écoles ce type de bâtiment est affiché.
    **important** : après avoir commencé une nouvelle école / un nouveau cours, le nom de l'école aura la forme `{schoolType} - {schoolingName}`. Les valeurs de cet attribut doivent être la partie `{schoolType}`, pas le nom de l'école elle-même !
* `startParkingLotReservations` (liste de nombre, optionnel) : si les parkings initiaux sont réservés à certains types de véhicules.
    * Il s'agit d'une liste multi-niveaux car chaque élément représente un parking et les types de véhicules qui peuvent y être mis.
* `parkingLotsPerLevel` (nombre, optionnel) : si chaque niveau ne donne pas un nouveau parking, le nombre doit être changé ici.

[module-overview]: ../modules/overview/
[module-dashboard]: ../modules/dashboard/
