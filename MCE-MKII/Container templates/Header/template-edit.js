/**
 * Header Container Templates
 * Header - Authoring Scripts
 * @author dkevey@unimelb.edu.au 
 */

var nam = 'ContentTemplateHeader';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.1',
    className: 'content-template-header',
    classNameInit: 'content-template-header--initialised',

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
        // console.log(self.name, self.version, 'initialised');
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
		'header-blue': {'id': 3752},  
        'header-image-mid-align': {'id': 758},
        'header-image-mid-align-enhanced': {'id': 759},
        'header-image-bottom-align': {'id': 760},
        'header-image-bottom-align-flat': {'id': 761},
        'header-image-box': {'id': 762},
        'header-banner-simple': {'id': 764},
        'header-banner-course': {'id': 765},
        'header-image-course': {'id': 766},
        'article-bottom-align': {'id': 767},
        'article-mid-align': {'id': 768}
      }


      var toggleTemplateType = function(parentScope){
          
          var $templateSelect = $('[id$="_metadata_field_select_740"]',parentScope);
		  var $templateSelectDefault = $('[id$="_metadata_field_select_740_default"]',parentScope);
          var $templateSelectDefaultLabel = $('[for$="_metadata_field_select_740_default"]',parentScope);
		  
		  var $imageSelectField = $('[id$="_metadata_field_related_asset_741_default"]',parentScope);
          var $imageSelectFieldLabel = $('[for$="_metadata_field_related_asset_741_default"]',parentScope);
          
		  var $buttonTextField = $('[id$="_metadata_field_related_asset_744_default"]',parentScope);
          var $buttonTextFieldLabel = $('[for$="_metadata_field_related_asset_744_default"]',parentScope);
		  
		  var $buttonLinkField = $('[id$="_metadata_field_related_asset_745_default"]',parentScope);
          var $buttonLinkFieldLabel = $('[for$="_metadata_field_related_asset_745_default"]',parentScope);
		  
		  var $authorNameField = $('[id$="_metadata_field_related_asset_746_default"]',parentScope);
          var $authorNameFieldLabel = $('[for$="_metadata_field_related_asset_746_default"]',parentScope);
		  
		  var $authorLocationField = $('[id$="_metadata_field_related_asset_747_default"]',parentScope);
          var $authorLocationLabel = $('[for$="_metadata_field_related_asset_747_default"]',parentScope);
		  	  
		  // define the rows you want to show and hide
		  var $backgroundImageRow = $('.row_2',parentScope);
		  var $buttonTextRow = $('.row_5',parentScope);
		  var $buttonLinkRow = $('.row_6',parentScope);
		  var $authorNameRow = $('.row_7',parentScope);
          var $authorLocationRow = $('.row_8',parentScope);	  
          
          //hide redundant heading sections
          $('.schemaHeading_0').hide();
          $('.sectionHeading_0').hide();
          
         //uncheck and hide any redundant default checkboxes
         if ( $templateSelectDefault.prop('checked') ){
              $templateSelectDefault.click();                       
          }
          
          $templateSelectDefault.addClass('visuallyhidden');
          $templateSelectDefaultLabel.addClass('visuallyhidden'); 
		  
		  
		  if ( $imageSelectField.prop('checked') ){
              $imageSelectField.click();
          }
          
          $imageSelectField.addClass('visuallyhidden');
          $imageSelectFieldLabel.addClass('visuallyhidden'); 
		  
		  
		  // show/hide additional fields in template
		  // note: this fires on page load
		   if ($templateSelect.val() === 'article-mid-align')	
			  
			    {
              	  $authorNameRow.show();
              	  $authorLocationRow.show();
			  	  $buttonTextRow.hide();
			  	  $buttonLinkRow.hide();
				  $backgroundImageRow.show();
				
			 	} else if ($templateSelect.val() === 'article-bottom-align' ||
						  $templateSelect.val() === 'header-image-bottom-align' ||
					 	  $templateSelect.val() === 'header-image-bottom-align-flat' ||
					 	  $templateSelect.val() === 'header-image-box' ||		
					 	  $templateSelect.val() === 'header-banner-course' ||	 
					 	  $templateSelect.val() === 'header-image-course' ) 
				
				{
				  $authorNameRow.hide();
				  $authorLocationRow.hide();
				  $buttonTextRow.hide();
				  $buttonLinkRow.hide(); 
				  $backgroundImageRow.show();
				
              	} else if ( $templateSelect.val() === 'header-image-mid-align' ||
		  			   	  $templateSelect.val() === 'header-image-mid-align-enhanced' ||
					 	  $templateSelect.val() === 'header-banner-simple')
				{
				  $authorNameRow.hide();
				  $authorLocationRow.hide();
				  $buttonTextRow.show();
				  $buttonLinkRow.show(); 
				  $backgroundImageRow.show();
				} 
				
				else if ( $templateSelect.val() === 'header-blue')
				{
				  $authorNameRow.hide();
				  $authorLocationRow.hide();
				  $buttonTextRow.hide();
				  $buttonLinkRow.hide(); 
				  $backgroundImageRow.hide();
				} 
		     
          // toggle additional fields when changing template
		  // note: after page load this is how you change templates - basically the same as above
          $templateSelect.change(function(evt){

             if  (evt.target.value === 'header-blue' ) 
				  
				{
                  $authorNameRow.hide();
				  $authorLocationRow.hide();
				  $buttonTextRow.hide();
				  $buttonLinkRow.hide(); 
				  $backgroundImageRow.hide();
            
              } else if (evt.target.value === 'header-image-mid-align' ||
			      evt.target.value === 'header-image-mid-align-enhanced' ||
				  evt.target.value === 'header-banner-simple' ) 
				  
				{
                  $authorNameRow.hide();
                  $authorLocationRow.hide();
				  $buttonTextRow.show();
			  	  $buttonLinkRow.show(); 
				  $backgroundImageRow.show();
            
              } else if (evt.target.value === 'article-bottom-align'||
						 evt.target.value === 'header-image-bottom-align' ||
					 	 evt.target.value === 'header-image-bottom-align-flat' ||
					 	 evt.target.value === 'header-image-box' ||	
					 	 evt.target.value === 'header-banner-course' ||	 
					 	 evt.target.value=== 'header-image-course') 
				{
                  $authorNameRow.hide();
				  $authorLocationRow.hide();
				  $buttonTextRow.hide();
				  $buttonLinkRow.hide(); 
				  $backgroundImageRow.show();
				  
              } else if ( evt.target.value === 'article-mid-align' ) 
				{
                  $authorNameRow.show();
              	  $authorLocationRow.show();
			  	  $buttonTextRow.hide();
			  	  $buttonLinkRow.hide();
				  $backgroundImageRow.show();
              	}
          });
	
    
      };



      var populateTemplateThumbs = function(){
       $('.header-container-template-metadata').each(function(){
           var $thisPrime = $(this);
     
           toggleTemplateType($thisPrime);
           
           //if template selector type is a dropdown
           var $selectElm = $('select[id$="_metadata_field_select_740"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_740_field"]', $thisPrime);
           
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
          
                  var $radioLabelElm = $('label[for$="_metadata_field_select_740_' + key + '"]',$thisPrime);
                  
            
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