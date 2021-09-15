// Module Registering can happen in a register.js or in a register.json file
// in both cases there are some configuration options, explained below:

module.exports = {
    /***
     * type:    Boolean
     * default: false
     * defines if the module should be active by default
     */
    active: false,

    /***
     * type:    Boolean
     * default: false
     * defines if the module is in alpha state (only available to beta users)
     */
    alpha: false,

    /***
     * type:    Boolean
     * default: false
     * defines if the module is in beta state (available to all users but with a hint that it is still in development)
     */
    dev: false,

    /***
     * type:    Number | null
     * default: null
     * If there exists a GitHub-Issue as reference for this module, set the issues ID here so that it gets referenced automatically in the docs
     */
    github: 0,

    /***
     * type:    RexExp or String
     * default: RegExp('.*')
     * The module will only be executed on pages matching this parameter. It must match window.location.pathname
     */
    location: /.*/,

    /***
     * type:    null or Array of Strings
     * default: null
     * Restrict the games this module is available in by listing the locales of supported games. Null supports all games
     */
    locales: null,

    /***
     * type:    null or Array of Strings
     * default: null
     * Modules that cannot be activated with this module must be listed here
     */
    collisions: null,

    /***
     * type:    Boolean
     * default: false
     * set this value to true to prevent it from being listed in Appstore. Active is recommended to be set to true then
     */
    noapp: true,

    /***
     * type:    Boolean
     * default: false
     * set this value to true if it is not available with the mapkit map
     */
    noMapkit: false,

    /***
     * type:    Boolean
     * default: false
     * set this value to true if the module has a own settings.ts file to register settings
     */

    settings: false,
};
