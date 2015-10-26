/**
 *  User supplied configuration options. These should be moved into a configuration
 *  js file asset within matrix once the system is ready to be installed
 */
var EasyEditConfig = {
    
    // Internal debugging flag
    debug:                      true,
    
    // The title bar that is displayed for EES. @asset_name@ is a dynamic replacement
    // for the current assets name
    titleBar:                   "@asset_name@ : Squiz Matrix : Easy Edit Suite",
    
    // Lock refresh interval in seconds
    lockRefreshInterval:        120,
    
    // Asset screen cache - If set to true asset data will be cached between screen
    // switches. Default is false which ensures each screen load dynamically references
    // current server data for status and attributes at the cost of extra ajax calls
    // Setting this to true may improve performance on some systems, but will result
    // in stale data if users are likely to be editing the same asset at the same time.
    assetScreenCache:           false,
    
    // JS API configuration options, replace with key provided by details screen of EES JS API asset.
    JSAPI: {
        key:                    "49341721"
    },
    
    // Suffixes for matrix urls - This needs to match matrix system configuration values
    editSuffix:                 "_edit",
    adminSuffix:                "_admin",
    recacheSuffix:              "_recache",
    nocacheSuffix:              "_nocache",
    loginSuffix:                "_login",
    
    // Cascade status change threshold
    // If the number of children affected by a cascade status change exceeds this value
    // the user will be warned
    cascadeThreshold:           1,

    
    // Timeout to show a warning for overlays that are active for more than X number of
    // seconds. This is usually because of an ajax function that has for whatever
    // reason failed to return successfully and could indicate server error.
    overlayTimeout:             180,

    // An array of asset id's to use as extra locations (like main news folder) in the first panel of
    // the asset finder. Assets will be listed below the configured root node (usually the current site asset)
    // and be navigable. Example = [xxxx,xxxx,xxxx] where xxxx is a parent asset id.
    assetFinderLocations:       [],

    // PERFORMANCE FEATURE.
    // Maximum number of assets to show in an asset finder panel before
    // pagination occurs.
    // If missing from config pagination will default to 100.
    // 0 = no pagination.
    assetFinderMaxAssets:         100,

    // PERFORMANCE FEATURE.
    // Cache manager default expiry, minutes expressed as a whole number.
    cacheManagerDefaultExpiry:    2,
    
    // The default mode to use on initial load. Can be 'edit' or 'preview'.
    // Can be overridden in the url by using the hash #mode=mode_name e.g. #mode=preview.
    // If missing from config defaults to edit mode.
    defaultMode:                'edit',

    // Default screen to use on initial edit mode load.
    // Can be overridden in the url by using the hash #screen=screen_name e.g. #screen=content.
    // If missing from config defaults to details screen.
    defaultScreen:              'details',

    // Should the ?SQ_ACTION=diff flag be used in preview mode?
    // If missing from config or set to false preview mode will require
    // user interaction with the 'Compare to Live' button.
    showDifferencesInPreviewMode: false,

    // Show 'Set Thumbnail' section on details screen.
    // Adds the ability to add/remove/update a thumbnail to all assets.
    // If missing from config thumbnail will show by default, set to false to hide.
    useThumbnail:                true,

    // Display and allow editing of future statuses via the details screen.
    // If missing from config or false the details screen will not display 'Show Future Status'.
    allowFutureStatusChange:     true,

    // PERFORMANCE FEATURE.
    // Display a list of direct children on the link screen.
    // If missing from config or false the linking screen will not display 'Direct Children'.
    showChildrenOnLinkingScreen: true,

    // If following setting is set to TRUE, the Asset Finder will always request new
    // data from the Asset Map. If FALSE, cached data will be used; a "Refresh
    // Assets" button will clear the cache. TRUE is the default setting.
    alwaysRefreshAssetFinder: true,
				
    // Enable asset finder to use the cache manager. Each panel will be cached
    // after being called dynamically for the each page visited for a short period of time.
    // Recommended when the asset finder needs to be used frequently.
    assetFinderCacheEnabled:    false,

    // Default expiry time (minutes) for any cached items stored by the cache manager
    cacheManagerDefaultExpiry:  2,

    // [OPTIONAL] - [PLUS only]
    // If markdown is enabled setting this value to true will allow the creation of
    // markdown divs in content pages. Requires Markdown to be installed and enabled
    // in the system configuration menu. Check with your system administrator before
    // enabling this.
    //markdownEnabled:            true,

    // Display and allow editing of future statuses via the details screen.
    // If missing from config or false the details screen will not display 'Show Future Status'.
    allowFutureStatusChange:     true

}; // End EasyEditConfig.