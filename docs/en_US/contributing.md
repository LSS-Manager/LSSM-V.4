---
title: Contributing
lang: en_US
sidebarDepth: 2
---

# Translation guide
First: This is a guide for absolute beginners. If you are familiar with Git and GitHub (GH), please ignore the first chapters.

:::tip Do you need help?
Of Course, you can ask for support via one of the ways mentioned in [Support](./support.md).

Especially, on our <discord/> are many volunteer translators who love to help newcomers too.
:::

## Introduction
There is a german saying "Viele Wege führen nach Rom" (All roads lead to Rome), which means there are many ways to do a job. This is especially correct for git, and it's ecosystem. There are a billion ways to accomplish the result, but we will stick to the easiest.

### Glossary

| Git speak  | Rest of the world                                                                            |
|------------|----------------------------------------------------------------------------------------------|
| Repository | Basically a folder where all the files are stored. Can do some neat tricks                   |
| Commit     | Point where you saved the project. It is possible to jump back to this point every time      |
| Branch     | Individual part of development. Won't affect anything on other branches (eg. dev and master) |
| Fork       | Copy of the whole repository for own development/customization                               |


### Requirements
You will need:
1. A Laptop/PC
2. An account on GitHub
    -  [Tutorial](https://docs.github.com/en/get-started/signing-up-for-github/signing-up-for-a-new-github-account)

### Setup
For security reasons, remember every beta user will get the latest build from the dev branch, only a few people are allowed to commit their changes directly to the branches. Everyone else has to create a Pull Request to get their changes merged into the dev branch. To accomplish this we need to create a fork to copy the repository.
![](./images/GH_fork.png)

You can leave anything at is and click on "create fork". This could take a few seconds.

![](./images/GH_fork_settings.png)

Now we should make sure to be up-to-date with the original repository. If you have your fork for a longer time please press the "fetch upstream"-Button occasionally, especially if GH tells you to do so. Please also make sure to be on the `dev` branch. Otherwise, you may miss the latest changes (and maybe translations which have been already made).

## Translating

Each language has its own, short language-code (often called langcode) for easy identification.
If you don't know the correct language-code for your version, please ask the LSSM-Team.

In the following texts, we will use `{lang}` as a placeholder for langcodes.
When translating, please make sure to replace it with your specific langcode.

:::tip Language-Codes, Specification
Each Code follows the format `xx_YY`, where xx is the language code specified in [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) and YY is the country according to [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements).
:::

### Paths
There are a few points where the translation files are stored:
- Docs aka. Wiki
     - `/docs/{lang}/` The main pages for the wiki
         - such as Home, FAQ, App Store etc. Basically all files you can find in the sidebar on the left, except the modules. 
	     - E.g. `suggestions.md` is found [here](./suggestions.md)
     -  `/docs/.vuepress/i18n/{lang}.json` Some static strings
         - E.g. `home: "Back to home"`
- Main files (these are required for LSSM to be available in your language)
    - `/src/i18n/{lang}.ts`
    - there may also be a folder `/src/i18n/{lang}/` which contains additional translations (currently only for the charts) but they are not relevant for LSSM to work correctly
- Modules (where `{module}` represents one of the available modules)
    - `/src/modules/{module}/i18n/` The translations for the modules
    - `/src/modules/{module}/docs/` The wiki pages
        - Some wiki folders will contain a subfolder called `assets`, which reserved for images in the wiki page: `/src/modules/{module}/docs/assets/{lang}/`
            - The images can be embedded with: `![Description](./imageName.png)`

To start a new translation create a new file by clicking on "Add file" and select "Create new file"
![](./images/GH_create_new_file.png)

:::tip
If you need to create a new folder just do the same procedure but place a `/` behind the folder name and continue with the name of your file.

![](./images/GH_create_Folder.png)

would create the folder `de_DE` containing a file `dummy.file`.
:::

### "Best practice"
Every folder contains at least a german and an english translation. The easiest way is to copy the content from this file into your new file. This prevents you to miss a bracket or comma.

### Doing translations
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

## After translation
After you translated a file you need to write a commit message. If you want to make us happy please use [gitmojis](https://gitmoji.dev) followed by the module name in square brackets and a quick summary (half sentence) what you changed (eg. translations es). Some long module names got unofficial abbreviations over the development.

### Abbreviation list
| Abbreviation | Module                 | Submodule               |
|--------------|------------------------|-------------------------|
| dcs          | dailyCreditsSummary    ||
| eb           | extendedBuilding       ||
| ab           | asyncButtons           ||
| blf          | buildingListFilter     ||
| ecl          | extendedCallList       ||
| ecw          | extendedCallWindow     ||
| emv          | extendedCallWindow     | enhancedMissingVehicles |
| tt           | extendedCallWindow     | tailored Tabs           |
| em           | extendedMap            ||
| ge           | generalExtensions      ||
| mh           | missionHelper          ||
| sap          | ShareAlliancePost      ||
| docs         | docs (main pages only) ||

![](./images/GH_commit_msg.png)

## Creating a pull request

When you feel ready for your translations to be made available for beta-testers, it's time to transfer your improvements into the LSSM repository.
This may be after translating a single module, a simple wiki-page, many modules or just after doing small fix to existing translations.
GitHub will show you a messages in your repository.
![](./images/GH_create_pr.png)
Click on "contribute" and "Open pull request"

![](./images/GH_create_pr_2.png)

This will lead you to an overview where you can see all your changes. Please make sure that you merge in the right repository (LSS-manager/LSSM-V.4) and in the right branch (dev)
![](./images/GH_create_pr_3.png)

You can also set a title for the pull request, if you don't know any good: copy the commit message.

:::tip How to make the LSSM-Team happy
* donating chocolate (even virtual chocolate is fine :chocolate_bar::yum:)
* giving the PullRequest (PR) a meaningful title, sticking to the scheme `🔀🌐 [{module}] add/update/fix {lang} translations`
  * We will sometimes change the title but if you are providing a good one from the beginning, chances are lower
  * If you want to make us even happier, also add the flag of your translation after the globe `🌐` (e.g. `🇨🇿` for lang `cs_CZ`)
:::

**Make sure that the checkbox "Allow edits by maintainers" is set**

Otherwise, the person who reviews the changes would not be able to make any changes and provide quick-fixes.
![](./images/GH_create_pr_4.png)

Now somebody needs to review your changes and an automated build-system will check that there will be no syntax errors (missing comma, bracket, etc.).

If the review and the check is positive it will be merged into the development branch and your code is live for the beta testers. With the next release it will be available for every user.

**Congrats, you contributed to the LSSM, thank you for your support!**
