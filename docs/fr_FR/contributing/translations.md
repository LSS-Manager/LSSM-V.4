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

### Help on particular translation topics

#### Buildings & extensions

The translations can be found in the file `/src/i18n/{lang}/buildings.ts`. It follows the simple structure `[buildingType: number]: BuildingInformation`. You can retrieve the type ID of each building as described in [Finding IDs: Buildings](#buildings).

A `BuildingInformation` consists of several required information:
* `caption` (string, required): The name of the building. Must be the same as in game.
* `color` (string, required): Choose a color (hex-code with `#`-prefix) that fits to the building. E.g. for fire stations, a red tone is a good choice.
    * The colors will be used within [Dashboard][module-dashboard] module.
* `credits` (number, required): How much this building costs in Credits.
    * If the price is changing with having more buildings, please note this in `special`.
* `coins` (number, required): How much this building costs in Coins.
* `extensions` (list of extensions, required): The extensions that are available to be built at this building.
    * Each extension requires at least the following attributes:
        * `caption` (string, required): The name of this extension. Must be the same as in game.
        * `credits` (number, required): How much this extension costs in Credits.
        * `coins` (number, required): How much this extension costs in Coins.
        * `duration` (string, required): How long it takes to build this extension
            * this could e.g. be `7 days`
    * some extensions cannot be bought without having other extensions at this station. They require the following attributes:
        * `requiredExtensions` (list of numbers): Which extension IDs this extension depends on.
            * Extension IDs start counting at `0` for each building type
    * some extensions may be restricted by the amount of buildings (e.g. an expansion that can be bought once every 10 fire stations). They should contain following attributes:
        * `maxExtensionsFunction` (function): returns a number indicating how many of these extensions can currently be built. It takes the following parameters:
            * `buildingsByType`: `Record<number, Building[]>` where `Building` is a building as returned from in-game's buildings API
        * `canBuyByAmount` (function): returns a boolean whether more extensions of this type can be bought. It takes the following parameters:
            * `boughtExtensionsAmountByType`: `Record<number, Record<number, number>>` lists how many of each extension type are already bought for each building type
            * `maxExtensions`: `number` will be the result of `maxExtensionsFunction` function
    * if an extension adds one or more new classrooms to the building, following attributes are required: *Note that the building MUST have the attribute `startClassrooms` then*
        * `newClassrooms` (number): indicating the amount of classrooms added by finishing this extension.
    * if an extension adds one or more new prison cells to the building, following attributes are required: *Note that the building MUST have the attribute `startCells` then*
        * `newCells` (number): indicating the amount of prison cells added by finishing this extension.
    * if finishing this extension unlocks new vehicles for this station, gives new parking lots or gifts vehicles, the following attributes are possible:
        * `isVehicleExtension` must always be `true`
        * `givesParkingLots` (number, required): how many new parking lots are added by finishing this extension
            * even if the lot is pre-filled with a vehicle (the vehicle is gifted), it needs to be mentioned here
            * if the extension does not add new parking lots, please set `0` as a value
        * `givesParkingLotsPerLevel` (number, optional): if the extension gives one or more parking lots for each station level
        * `unlocksVehicleTypes` (list of numbers, optional): a list of vehicle type IDs that are unlocked for this station by finishing the extension
        * `parkingLotReservations` (list of list of numbers, optional): specifies if newly added parking lots are reserved for certain vehicle types
            * this is multi-nested list because each element represents a parking lot and which vehicle-types can be put on it
        * `giftsVehicles` (list of numbers, optional): can list vehicle type Ids for vehicles that are automatically added to the station by finishing the extension
* `levelcost` (list of strings, required): You can give information on how much it costs to increase the level in here.
    * The information will be shown in [Overview][module-overview] module
* `maxBuildings` (string or number, required): This indicates how many buildings one can buy of this type.
    * The information will be shown in [Overview][module-overview] module
    * If there is no limit, you can use e.g. `'no limit'`
* `maxLevel` (number, required): Set here how often this building can be expanded / leveled up.
    * If this building cannot be leveled up, choose `0` as value
* `special` (string, required): This attribute allows you to give additional information on this building.
    * The information will be shown in [Overview][module-overview] module

If the amount of buildings of a type is restricted by the total amount of buildings the player has, set the following attributes:
* `maxBuildingsFunction` (function): returns a number indicating how many buildings can currently be built. Takes the following parameters:
    * `buildingsAmountTotal` (number) the amount buildings the player currently has

Some buildings may have classrooms or extensions that add classrooms. They need to have the following attributes set:
* `startClassrooms` (number)

Some buildings may have prison cells or extensions that add prison cells.  They need to have the following attributes set:
* `startCells` (number)

Some buildings may have hospital beds.  They need to have the following attributes set:
* `startBeds` (number)
    * this automatically enables that `level` also increases the amount of beds available

If a building is a dispatch center, it needs to have the following attributes:
* `isDispatchCenter` must always be `true`

If a building is a staging area, it needs to have the following attributes:
* `isStagingArea` must always be `true`

If a building can have vehicles, these attributes are possible in addition:
* `startPersonnel` (number, required): how much staff the building has initially
* `startVehicles` (list of strings, required): which vehicles can be selected as first vehicle (or if it's always the same vehicle)
    * empty list, if none can be selected
    * list of strings because it's only shown in [Overview][module-overview] and not processed any further
* `startParkingLots` (number, required): how many parking lots there are initially
* `schoolingTypes` (list of strings, required): which of the schools this building type is shown in
    * **important**: after starting a new schooling / course, the name of the schooling will have the form `{schoolType} - {schoolingName}`. This attribute's values need to be the `{schoolType}` part, not the name of the school itself!
* `startParkingLotReservations` (list of list of numbers, optional): if the initial parking lots are reserved for certain vehicle types
    * this is multi-nested list because each element represents a parking lot and which vehicle-types can be put on it
* `parkingLotsPerLevel` (number, optional): if each level does not give 1 new parking lot, the number needs to be changed in here

[module-overview]: ../modules/overview/
[module-dashboard]: ../modules/dashboard/
