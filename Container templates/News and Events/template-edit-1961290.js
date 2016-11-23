/**
 * News events Container Templates
 * News events Authoring Scripts
 * @author dkevey@unimelb.edu.au 
 */

var nam = 'ContentTemplateNewsEvents';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.1',
    className: 'content-template-newsevents',
    classNameInit: 'content-template-newsevents--initialised',

    init: function() {
      var self = this;

      if (!this.initialised) {

        // Initialise container editor when authoring interface is ready
        if (typeof EasyEditEventManager != 'undefined'){

          // Initialise for Edit+ each time Content tab is loaded
          EasyEditEventManager.bind('EasyEditScreenLoad',function(){
            if (EasyEditScreens.currentScreen == 'contentPageStandard') {
              self.onScreenLoad();
            }
          });

        } else {

          // Initialise for Admin Interface
          $(document).ready($.proxy(self.onScreenLoad,self));
        }

        this.initialised = true;
        console.log(self.name, self.version, 'initialised');
      }

    },

    onScreenLoad: function() {
      // Initialise all Content Template listing
      var self = window[nam];
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');
      
      // Show any WYSIWIGS that got randomly hidden. They get hidden because of `.viper__box, .plus .ees_viperEditCallToAction {display: none;}`. David C - Will investigate later.
        $('.htmlarea-div').each(function() {
          $(this).show();
        });
      
      
      // thumbnail images 
      var templateKeyArr = {
		'block-listing': {'id': 1962358},  
        'news-listing': {'id': 1962357},
        'news-listing-dense': {'id': 1962355}
      }


      var toggleTemplateType = function(parentScope){
          
          var $assetTypeSelect = $('[id$="_metadata_field_select_2079026"]',parentScope);
		  var $assetTypeSelectDefault = $('[id$="_metadata_field_select_2079026_default"]',parentScope);
          var $assetTypeSelectDefaultLabel = $('[for$="_metadata_field_select_2079026_default"]',parentScope);
         
          var $newsTemplateSelect = $('[id$="_metadata_field_select_1961328"]',parentScope);
		  var $newsTemplateSelectDefault = $('[id$="_metadata_field_select_1961328_default"]',parentScope);
          var $newsTemplateSelectDefaultLabel = $('[for$="_metadata_field_select_1961328_default"]',parentScope);
          
          var $eventTypeSelect = $('[id$="_metadata_field_select_2080829"]',parentScope);
		  var $eventTypeSelectDefault = $('[id$="_metadata_field_select_2080829_default"]',parentScope);
          var $eventTypeSelectDefaultLabel = $('[for$="_metadata_field_select_2080829_default"]',parentScope);
          
          var $bgStyleSelect = $('[id$="_metadata_field_select_1961337"]',parentScope);
		  var $bgStyleSelectDefault = $('[id$="_metadata_field_select_1961337_default"]',parentScope);
          var $bgStyleSelectDefaultLabel = $('[for$="_metadata_field_select_1961337_default"]',parentScope);
          
          var $showMoreSelect = $('[id$="_metadata_field_select_2078723"]',parentScope);
		  var $showMoreSelectDefault = $('[id$="_metadata_field_select_2078723_default"]',parentScope);
          var $showMoreSelectDefaultLabel = $('[for$="_metadata_field_select_2078723_default"]',parentScope);
		  
		  // related asset field 
		  var $parentIdField = $('[id$="_metadata_field_related_asset_1961341_default"]',parentScope);
          var $parentIdFieldLabel = $('[for$="_metadata_field_related_asset_1961341_default"]',parentScope);
		  	  
		  // define the rows you want to show and hide
		  var $eventTypeRow = $('.row_2',parentScope)
		  var $newsTemplateRow = $('.row_3',parentScope); 
		  //var $showMoreRow = $('.row_8',parentScope); 
          
          //hide redundant heading sections
          $('.schemaHeading_0').hide();
          $('.sectionHeading_0').hide();
          
         //uncheck and hide any redundant default checkboxes
         if ( $assetTypeSelectDefault.prop('checked') ){
              $assetTypeSelectDefault.click();                       
          }
          
          $assetTypeSelectDefault.addClass('visuallyhidden');
          $assetTypeSelectDefaultLabel.addClass('visuallyhidden'); 
         
         if ( $newsTemplateSelectDefault.prop('checked') ){
              $newsTemplateSelectDefault.click();                       
          }
          
          $newsTemplateSelectDefault.addClass('visuallyhidden');
          $newsTemplateSelectDefaultLabel.addClass('visuallyhidden'); 
          
          if ( $eventTypeSelectDefault.prop('checked') ){
              $eventTypeSelectDefault.click();                       
          }
          
          $eventTypeSelectDefault.addClass('visuallyhidden');
          $eventTypeSelectDefaultLabel.addClass('visuallyhidden');
          
           if ( $bgStyleSelectDefault.prop('checked') ){
              $bgStyleSelectDefault.click();                       
          }
          
          $bgStyleSelectDefault.addClass('visuallyhidden');
          $bgStyleSelectDefaultLabel.addClass('visuallyhidden');
          
          if ( $parentIdField.prop('checked') ){
              $parentIdField.click();                       
          }
          
          $parentIdField.addClass('visuallyhidden');
          $parentIdFieldLabel.addClass('visuallyhidden');
          
          if ( $showMoreSelectDefault.prop('checked') ){
              $showMoreSelectDefault.click();                       
          }
          
          $showMoreSelectDefault.addClass('visuallyhidden');
          $showMoreSelectDefaultLabel.addClass('visuallyhidden');
		  
		  
		  // show or hide additional fields in template
		  // note: this fires on page load
		   if ($assetTypeSelect.val() === 'news')	
			  
			    {
              	  $eventTypeRow.hide();
              	  $newsTemplateRow.show();
				
			 	} else if ($assetTypeSelect.val() === 'events') 
				
				{
				  $eventTypeRow.show();
				  $newsTemplateRow.hide();
				
              	} 

		     
          // toggle additional fields when changing template
		  // note: after page load this is how you change templates - basically the same as above
          $assetTypeSelect.change(function(evt){

             if  (evt.target.value === 'events') 
				  
				{
                  $eventTypeRow.show();
				  $newsTemplateRow.hide();
            
              } else if (evt.target.value === 'news') 
				  
				{
                  $eventTypeRow.hide();
              	  $newsTemplateRow.show();
            
              }
          });
		  
    
      };



      var populateTemplateThumbs = function(){
       $('.newsevents-container-template-metadata').each(function(){
           var $thisPrime = $(this);
     
           toggleTemplateType($thisPrime);
           
           //if template selector type is a dropdown
           var $selectElm = $('select[id$="_metadata_field_select_1961328"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_1961328_field"]', $thisPrime);
           
           // test to see if selector is a dropdown not radio buttons
           if ($selectElm.length > 0) {
               $('<div>', {class: 'select-thumb'}).appendTo($selectElmParent);
               
               
               $('.select-thumb', $thisPrime).addClass('selected-' + $selectElm.val() );
               
               $selectElm.change(function(evt){
                   
                   $('.select-thumb', $thisPrime).prop('class','select-thumb');
                   $('.select-thumb', $thisPrime).addClass('selected-' + evt.target.value );
                   
               });
               
           }
           
            for (var key in templateKeyArr) {
              if (templateKeyArr.hasOwnProperty(key)) {
          
                  var $radioLabelElm = $('label[for$="_metadata_field_select_1961328_' + key + '"]',$thisPrime);
                  
            
                  $radioLabelElm.each(function(){
                      var $this = $(this);
                      if ( $('span.radio-thumb', $this).length === 0 ) {          

                          $('<span>', {class: 'radio-thumb'}).appendTo($radioLabelElm);
                      }
    
                  });
            
              }

          }
     
       });

      }

      populateTemplateThumbs();

    }, //onScreenLoad()

  };
}



if (!window[nam].initialised)
{
  window[nam].init();
}