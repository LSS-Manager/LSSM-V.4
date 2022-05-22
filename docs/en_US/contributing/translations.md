---
title: Translations
lang: en_US
sidebarDepth: 2
---

# Translation guide

Each language has its own, short language-code (often called langcode) for easy identification.
If you don't know the correct language-code for your version, please ask the LSSM-Team.

In the following texts, we will use `{lang}` as a placeholder for langcodes.
When translating, please make sure to replace it with your specific langcode.

:::tip Language-Codes, Specification
Each Code follows the format `xx_YY`, where xx is the language code specified in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and YY is the country according to [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
:::

## Paths
There are a few points where the translation files are stored:
- Docs aka. Wiki
	- `/docs/{lang}/` The main pages for the wiki
		- such as Home, FAQ, App Store etc. Basically all files you can find in the sidebar on the left, except the modules.
		- E.g. `suggestions.md` is found [here](../suggestions.md)
	-  `/docs/.vuepress/i18n/{lang}.json` Some static strings
		- Eg. `home: "Back to home"`
- Main files (these are required for LSSM to be available in your language)
	- `/src/i18n/{lang}.ts`
	- there may also be a folder `/src/i18n/{lang}/` which contains additional translations (currently only for the charts) but they are not relevant for LSSM to work correctly
- Modules (where `{module}` represents one of the available modules)
	- `/src/modules/{module}/i18n/` The translations for the modules
	- `/src/modules/{module}/docs/` The wiki pages
		- Some wiki folders will contain a subfolder called `assets`, which reserved for images in the wiki page: `/src/modules/{module}/docs/assets/{lang}/`
			- The images can be embedded with: `![Description](./imageName.png)`

To start a new translation create a new file by clicking on "Add file" and select "Create new file"
![](../images/contributing/translations/GH_create_new_file.png)

:::tip
If you need to create a new folder just do the same procedure but place a `/` behind the folder name and continue with the name of your file.

![](../images/contributing/translations/GH_create_Folder.png)

would create the folder `de_DE` containing a file `dummy.file`.
:::

## "Best practice"
Every folder contains at least a german and an english translation. The easiest way is to copy the content from this file into your new file. This prevents you to miss a bracket or comma.

## Doing translations
All `.json` files follow the same scheme which is `"key": value`. When translating, all you have to do is updating the values to your language.

Example:

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

could be translated to german the following way:

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

Note, how only the values has been changed.

Some translations may have different forms for singular and plural, or even more complex forms. Line 4 shows such an example case and how the forms are split up with pipes `|`. Also, the variable `{n}` will be replaced with the according number.

Also, sometimes variables will occur in translation files (see Line 9). They are always enclosed in curly braces `{}` and you are not allowed to change the name inside, because it is a placeholder for a dynamic value.

:::warning Numbers in translation files
Sometimes, weird looking numbers may appear within translations. These typically indicate the usage of IDs, which are game-specific.
If you're unsure about the correct IDs, please contact the LSSM-Team and ask for help.

Example for **buildings**:

[`/src/modules/buildingListFilter/i18n/en_GB.root.json`, lines 2-44](https://github.com/LSS-Manager/LSSM-V.4/blob/0a3ba77eb595056f5049afab361eef20e418dd5b/src/modules/buildingListFilter/i18n/en_GB.root.json#L2-L44).
Here, the numbers represent Building-Types and may need to be adjusted, as the UK-Version has different buildings than e.g. the US-Version, as you can see in [`/src/modules/buildingListFilter/i18n/en_US.root.json`, lines 2-58](https://github.com/LSS-Manager/LSSM-V.4/blob/0a3ba77eb595056f5049afab361eef20e418dd5b/src/modules/buildingListFilter/i18n/en_US.root.json#L2-L58)
:::

## Committing & creating a PR

Please refer to the main [contribution guide](../contributing.md#general-workflow) on how to do this.

## Guides

### Implementing a Content-Pack

In general, these updates are necessary:
* `/src/i18n/{lang}.ts`
  * Update vehicles
  * Update vehicle categories
  * Update building categories
  * Update schoolings
  * Update buildings-lists
    * `vehicleBuildings`, `cellBuildings`, `cellExtensions`, `bedBuildings`, `schoolBuildings`, `dispatchCenterBuildings`
* `/src/i18n/{lang}/buildings.ts`
  * Update [buildings/extensions](#buildings-extensions)
* `/src/modules/buildingListFilter/i18n/{lang}.root.json`
  * update default
* `/src/modules/extendedCallWindow/i18n/{lang}.js`
  * update vehicleGroups & staffGroups
* `/src/modules/extendedCallWindow/i18n/{lang}.root.json`
  * update tailoredTabs default
* `/src/modules/missionHelper/i18n/{lang}.json`
  * update translations
    * `prerequisites`
    * `requirements`
    * `vehicles`

### Finding IDs

If you don't know an ID or the required ID is not (yet) available in our [API](https://api.lss-manager.de), please use these guides to find them out.

The URLs in here will use `missionchief.com` for demonstration. Please replace it with the URL of your game.

:::tip Executing code in the browser console
Doing so is simple but can be dangerous. If you don't trust us and the code we want you to execute, this **is fine**! Just contact the LSSM-Team, and we will provide the IDs for you.

To open the console, press `F12`, `Ctrl+Shift+K` or `Ctrl+Shift+I` (some browsers allow all these keys, some only one of them). If the console is not yet visible, please click on the `Console` tab in the popup.

You can now copy the code from our code snippets provided below and paste it in the console. Some Browsers (such as Firefox) require you to type a short sentence. Just type it, Firefox will replace it with the code, once you finished the sentence.

When the code is pasted into console, just press the `Enter` Key on your keyboard to execute the snippet. The result will automatically appear in the console but some of them may take few seconds.
:::

:::warning API disclaimer
the API is generated from the translation files and thus may contain wrong values. In case of insecurity, please always use information available in game!
:::

#### Vehicles

API: `https://api.lss-manager.de/{lang}/vehicles`

Go to `https://missionchief.com/vehicle_graphics/new` and create a new graphic set. If you already own one, you can also go to its edit page.

Execute the following code in your browser console. It will return a list of vehicles and their ID:
```js
Object.fromEntries(Array.from(document.querySelectorAll('table tbody tr')).map(row => [new URL(row.querySelector('a[href^="/vehicle_graphics/"][href*="/vehicle_graphic_images/"][href$="/edit"]')?.href ?? '/', window.location.origin).pathname.split('/')[4], row.querySelector('td:first-child')?.textContent.trim()]).filter(([id, name]) => id && name)) 
```

#### Buildings

API: `https://api.lss-manager.de/{lang}/buildings`

Go to `https://missionchief.com/buildings/new`, the form for creating a new building should be shown.

Execute the following code in your browser console. It will return a list of buildings and their ID:
```js
Object.fromEntries(Array.from(document.querySelectorAll('#building_building_type option')).map(option => [option.value, option.textContent.trim()]).filter(([id, name]) => id && name))
```

#### Missions

There's an official List of missions: `https://missionchief.com/einsaetze.json`.

For getting all missions, grouped by their start and end date, execute the following code in game: *(replace `missionchief.com` with your game of course)*
```js
fetch('https://www.missionchief.com/einsaetze.json').then(res => res.json()).then(m => {const g = {}; m.forEach(e => {const d = `${e.additional.date_start} - ${e.additional.date_end}`; if(!g[d]) {g[d] = []} g[d].push(e)}); console.log(g)})
```

Each group is an Object of IDs with the corresponding mission name.

#### POIs

To get an up-to-date list of POIs for `/src/i18n/{lang}.ts`, go to `https://www.missionchief.com/mission_positions/new` and execute the following code in your browser console:
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
  * if the extension cannot be disabled (e.g. prison cells), add:
    * `cannotDisable` which must always be `true`
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
