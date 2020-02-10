module.exports = {
    /***
     * type:    Boolean
     * default: false
     * defines if the module should be active by default
     */
    active: false,

    /***
     * type:    RexExp or String
     * default: RegExp('.*')
     * The module will only be executed on pages matching this parameter
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
};
