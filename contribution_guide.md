# Contribution Guide
You want to contribute to LSS-Manager? Here are some tips on how to contribute!

> *Please keep this file up to date!*

## Styleguide
**Please use ESLint before commiting files!** 

## How and where to add new vehicles/buildings/schoolings when they are added to the game?

### vehicles
* The main i18n file of the lang:
    * add the caption and a fitting color.
        * The color should fit to the color of the building.
        * Create a new category if needed - choose a fitting color by yourself therefore.
* Add the vehicle to i18n file of the module `overview` in the right category.
    * Create a new category if needed.
    * Provide the common attributes. Have an eye on existing vehicles therefore.
* Add the vehicle to the requirement list in the i18n file of module `extendedCallWindow`

### buildings
* The main i18n file of the lang:
    * add the caption and a fitting color.
        * Choose a color that fits to other colors of that organization-category.
        * Create a new category if needed - choose a fitting color by yourself therefore.
    * Add, if needed, to further ID-Lists provided in the file.
        * example: If it is a building that has beds (such as a hospital), add it to `bedBuildings`.
* Add a fitting Icon for the building in the i18n file of module `buildingHover`.
* Add the building to the i18n file of module `overview`.
    * Provide the common attributes. Have an eye on existing buildings therefore.

### schoolings
* Add the schooling to the i18n file of module `schoolingOverview`.
    * If a new school is used, add a new tab with the school.
