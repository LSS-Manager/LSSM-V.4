# Contribution Guide
You want to contribute to LSS-Manager? Here are some tips on how to contribute!

**If you got any questions on contributing, you can contact LSSM Team at any time!**

> *Please keep this file up to date!*

## Styleguide
**Please use ESLint before commiting files!**

## Doing first translation for a new locale
replace `xx_XX` with the lang-code

### docs
1. Create a folder `/docs/xx_XX`
2. Copy all files from `/docs/en_US` into your new folder
    * **do not copy the `/docs/en_US/modules/` folder!**
3. Start translating each file in `/docs/xx_XX`

### the main i18n file
1. duplicate the file `/src/i18n/en_US.ts` to `/src/i18n/xx_XX.ts`
2. Translate each key. Do not forget to escape `'` to `\'`.
    * example: `key: 'A value that\'s containing a singlequote',`
3. Special keys:
    * `vehicles`
        * Add all vehicles in correct order in here. Correct order is same order as shown in vehicle_graphics. (Ordered by ID).
        * Each vehicle must contain `caption`, `color`, `coins`, `credits`, `minPersonnel` and `maxPersonnel`.
        * If the vehicle carries water, add how much with key `wtank`.
        * If there is something special about that vehicle, add the `special` key.
        * Vehicles that require a schooling do need a key `schooling`. The text must be exactly what is shown in the schoolings market!
            * The attribute `shownSchooling` must be what is shown in the personnel list of a station. As the texts can be different from each other, we require both keys.
    * `buildings`
        * Ask a LSSM Team member for help with buildings. They are more complex if you are not familiar with JavaScript / TypeScript!
        * Buildings need keys `caption`, `color`, `coins`, `credits`, `expansions` (see below), `levelcost`, `maxBuildings`, `maxLevel`, `special`, `startPersonnel` and `startVehicles`.
        * Some buildings can get a `maxBuildingsFunction`
        * Expansions need to be sorted by Expansion-ID and contain `caption`, `credits`, `coins`, `duration`. Some expansions can get a `maxExtensionsFunction`
    * `buildingCategories`
        * The categories for dashboard. each category has a `color` and `buildings` which is a list of the IDs of building-types that belong to this category.
    * `vehicleCategories`
        * Each category as a `color` similar to buildingCategories.
        * The `vehicles` attribute is an object where keys are the names of the vehicle group, value is a list of vehicle-type IDs
    * `small_buildings` 
        * key: the type of station that has a small version
        * value: the ID of the small station
    * `vehicleBuildings`
        * List of all buildings you can put vehicles on
    * `cellBuildings`
        * List of all buildings you can build cells for prisoners at
    * `cellExtensions`
        * List of all extensions that can be cells. Requires strings of format `<BuildingType>_<ExtensionID>`
    * `bedBuildings`
        * List of all buildings that can treat patients
    * `schoolBuildings`
        * List of all buildings that are schools
    * `dispatchCenterBuildings`
        * List of all buildings that work as dispatch centers
    * `schoolings`
        * key: type of the school
        * Value: object with `caption` and `duration` of each schooling at that school
    * `fmsReal2Show`
        * if a `fms_real` value is different from a `fms_show` value, map that here.
    * `buildingIcons`
        * in order of building types: Find a Icon for each building type from [Font Awesome Free Icons][FA]
    * `pois`
        * list all POIs ordered by ID
    * `only_alliance_missions`
        * list of all mission types that are alliance only
    * `transfer_missions`
        * list of all missions that are transfer missions
        
### each module
for each module in `/src/modules/` there is a `i18n` folder containing a root-file for each locale and optionally a normal file. Example: `en_US.root.json` and `en_US.ts`.

Duplicate both files and replace the `en_US` part with your locale. You can then start translating.


Also each module contains a `docs` folder. Add a `xx_XX.md` file in there and start writing a page for the Wiki. You can of course use existing Wiki pages for reference.

## How and where to add new vehicles/buildings/schoolings when they are added to the game?

### vehicles
* The main i18n file of the lang:
    * add the caption and a fitting color.
        * The color should fit to the color of the building.
        * Create a new category if needed - choose a fitting color by yourself therefore.
    * add costs, min- and max-personnel as well as the required schooling and if needed also a `special` attribute
    * Have a look at existing vehicles
* Add the vehicle to the requirement list in the i18n file of module `extendedCallWindow`

### buildings
* The main i18n file of the lang:
    * add the caption and a fitting color.
        * Choose a color that fits to other colors of that organization-category.
        * Create a new category if needed - choose a fitting color by yourself therefore.
    * add costs, extensions and further attributes provided in existing buildings.
    * Add, if needed, to further ID-Lists provided in the file.
        * example: If it is a building that has beds (such as a hospital), add it to `bedBuildings`.
    * Add a fitting Icon for the building in `buildingIcons`

### schoolings
* Add the schooling to the main i18n file of your language.
    * If a new school is used, add a new key for the school.

[FA]: https://fontawesome.com/icons?d=gallery&m=free
