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
  * Update buildings/extensions
  * Update building categories
  * Update schoolings
  * Update buildings-lists
    * `vehicleBuildings`, `cellBuildings`, `cellExtensions`, `bedBuildings`, `schoolBuildings`, `dispatchCenterBuildings`
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
fetch('https://www.missionchief.com/einsaetze.json').then(res => res.json()).then(m => console.log(m.groupBy(m => `${m.additional.date_start} - ${m.additional.date_end}`)))
```

Each group is an Object of IDs with the corresponding mission name.

#### POIs

To get an up-to-date list of POIs for `/src/i18n/{lang}.ts`, go to `https://www.missionchief.com/mission_positions/new` and execute the following code in your browser console:
```js
Array.from(document.querySelectorAll('#mission_position_poi_type option')).map(option => [option.value, option.textContent.trim()]).sort(([idA], [idB]) => idA - idB).map(([, caption]) => caption)
```
