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
:::

## Committing & creating a PR

Please refer to the main [contribution guide](../contributing.md#general-workflow) on how to do this.
