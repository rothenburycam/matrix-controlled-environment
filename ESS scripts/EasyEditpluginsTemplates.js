/**
 * Edit+ Plugin to restrict Templates
 */


var EasyEditTemplatesConfig = $.extend({}, {
    pageTemplateMetadataId: 1385719,
}, EasyEditTemplatesConfig);


EasyEdit.plugins.Templates = {
    
    /**
     * Initialise the plugin
     */
    init: function()
    {
        var self = this;
        
        // Add a function to the after ees load event
        EasyEditEventManager.bind('EasyEditScreenLoad',self.screenLoad);
    },// End init
    
    screenLoad: function()
    {
    	var templateList;
        // If Metadata screen is loaded

        if(EasyEditScreens.currentScreen == "metadataDefault"){

           $("#metadata_field_select_"+EasyEditTemplatesConfig.pageTemplateMetadataId+"_field").hide();
        	//get site asset and load metadata CONFIG_TemplateList
	        EasyEditAssetManager.getCurrentAsset(function(asset){            
			  EasyEditAssetManager.getAsset(asset.siteId,function(site_asset){
				 EasyEditAssetManager.getMetadata(site_asset,function(site_metadata){
				   //remove white spaces from metadata	
				   templateList = jQuery.trim(site_metadata.SITE_TemplateList);   
				   //split values into array
				   templateList = templateList.split(";");  
                     
		            $("#metadata_field_select_"+EasyEditTemplatesConfig.pageTemplateMetadataId+" option").each(function(){
		            	selectTemplate = $(this);
		            	selectTemplate.prop("disabled", true);
		  				var templateMatch = false;
		  				//compare available templates with selected site templates
		  				templateList.forEach(function(template){
		                    if(jQuery.trim(selectTemplate.val()) == jQuery.trim(template)){
		                    	templateMatch = true;
		                    	selectTemplate.prop("disabled", false);
		                    }
		  				});
		  				//remove any templates from dropdown if not selected as a site template
		  				if(!templateMatch){
		  				   $(selectTemplate).remove();
		  				}
		            });		

				 });
			  });                                                                                   
			}); 
            $("#metadata_field_select_"+EasyEditTemplatesConfig.pageTemplateMetadataId+"_field").show();

        } // end if Metadata screen
               

    }// End afterLoad    
};