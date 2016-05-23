/**
 *News Events Container Templates
 * Header - Authoring Scripts
 * @author dkevey@unimelb.edu.au 
 */

var nam = 'ContentTemplateNewsEvents';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.0',
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
      
      
      //rest of your container template code
      var templateKeyArr = {
        'block-listing': {'id': 1962358},
        'block-listing-narrow': {'id': 1962359},
        'news-listing': {'id': 1962357},
        'news-listing-dense': {'id': 1962355}	
      }


      var toggleTemplateType = function(parentScope){
          
		  // select field style
          var $templateSelect = $('[id$="_metadata_field_select_1961328"]',parentScope);
		  var $templateSelectDefault = $('[id$="_metadata_field_select_1961328_default"]',parentScope);
          var $templateSelectDefaultLabel = $('[for$="_metadata_field_select_1961328_default"]',parentScope);
		  
		  var $styleSelect = $('[id$="_metadata_field_select_1961337"]',parentScope);
		  var $styleSelectDefault = $('[id$="_metadata_field_select_1961337_default"]',parentScope);
          var $styleSelectDefaultLabel = $('[for$="_metadata_field_select_1961337_default"]',parentScope);
          
		  // related asset style
	//	  var $eventsLinkField = $('[id$="_metadata_field_related_asset_1961341_default"]',parentScope);
//          var $eventsLinkFieldLabel = $('[for$="_metadata_field_related_asset_1961341_default"]',parentScope);
//		  
//		  var $newsLinkField = $('[id$="_metadata_field_related_asset_1961346_default"]',parentScope);
//          var $newsLinkFieldLabel = $('[for$="_metadata_field_related_asset_1961346_default"]',parentScope);
//		  
//		  var $moreeventsLinkField = $('[id$="_metadata_field_related_asset_1961352_default"]',parentScope);
//          var $moreeventsLinkFieldLabel = $('[for$="_metadata_field_related_asset_1961352_default"]',parentScope);
//		  
//		  var $morenewsLinkField = $('[id$="_metadata_field_related_asset_1961351_default"]',parentScope);
//          var $morenewsLinkFieldLabel = $('[for$="_metadata_field_related_asset_1961351_default"]',parentScope);
		  
		  // text field style
		 //var $twitterTextField = $('[id$="_metadata_field_text_1961358_default"]',parentScope);
          //var $twitterTextFieldLabel = $('[for$="_metadata_field_text_1961358_default"]',parentScope);
		  
		 // var $twitterLinkField = $('[id$="_metadata_field_text_1961359_default"]',parentScope);
          //var $twitterLinkFieldLabel = $('[for$="_metadata_field_text_1961359_default"]',parentScope);
		  
	//	  		  
//		  var $facebookTextField = $('[id$="_metadata_field_text_1961360_default"]',parentScope);
//          var $facebookTextFieldLabel = $('[for$="_metadata_field_text_1961360_default"]',parentScope);
//		  
//		  var $facebookLinkField = $('[id$="_metadata_field_text_1961361_default"]',parentScope);
//          var $facebookLinkFieldLabel = $('[for$="_metadata_field_text_1961361_default"]',parentScope);	  
//		  
//		  
//		  var $instagramTextField = $('[id$="_metadata_field_text_1961362_default"]',parentScope);
//          var $instagramTextFieldLabel = $('[for$="_metadata_field_text_1961362_default"]',parentScope);
//		  
//		  var $instagramLinkField = $('[id$="_metadata_field_text_1961363_default"]',parentScope);
//          var $instagramLinkFieldLabel = $('[for$="_metadata_field_text_1961363_default"]',parentScope);
//		  
		  
		  // define the rows you want to show and hide  
		  var $morenewsTextRow = $('.row_5',parentScope);
		  var $moreeventsTextRow = $('.row_6',parentScope);
		  var $twitterTextRow = $('.row_7',parentScope);
		  var $twitterLinkRow = $('.row_8',parentScope); 
		  var $facebookTextRow = $('.row_9',parentScope);
		  var $facebookLinkRow = $('.row_10',parentScope); 
		  var $instagramTextRow = $('.row_11',parentScope);
		  var $instagramLinkRow = $('.row_12',parentScope); 
          
          //hide redundant heading sections
          $('.schemaHeading_0').hide();
          $('.sectionHeading_0').hide();
          
         //uncheck and hide any redundant default checkboxes
         if ( $templateSelectDefault.prop('checked') ){
              $templateSelectDefault.click();                       
          }
          
          $templateSelectDefault.addClass('visuallyhidden');
          $templateSelectDefaultLabel.addClass('visuallyhidden'); 
		  
		  
		  if ( $styleSelectField.prop('checked') ){
              $styleSelectField.click();
          }
          
          $styleSelectField.addClass('visuallyhidden');
          $styleSelectFieldLabel.addClass('visuallyhidden'); 
		  
		  
		  // show/hide additional fields in template
		  // note: this fires on page load
		   if ($templateSelect.val() === 'block-listing'
		      $templateSelect.val() === 'news-listing' ||
			  $templateSelect.val() === 'news-listing-dense')	
			  
			    {
			  	  $morenewsTextRow.hide();
			  	  $moreeventsTextRow.hide();
				  $twitterTextRow.hide();
				  $twitterLinkRow.hide();
				  $facebookTextRow.hide();
				  $facebookLinkRow.hide();
				  $instagramTextRow.hide();
				  $instagramLinkRow.hide();
				
			 	} else if ($templateSelect.val() === 'block-listing-narrow') 
				
				{
				  $morenewsTextRow.show();
			  	  $moreeventsTextRow.show();
				  $twitterTextRow.show();
				  $twitterLinkRow.show();
				  $facebookTextRow.show();
				  $facebookLinkRow.show();
				  $instagramTextRow.show();
				  $instagramLinkRow.show(); 
				
              	} 
		     
          // toggle additional fields when changing template
		  // note: after page load this is how you change templates - basically the same as above
          $templateSelect.change(function(evt){

              if (evt.target.value === 'block-listing-narrow' ) 
				  
				{
                  $morenewsTextRow.show();
			  	  $moreeventsTextRow.show();
				  $twitterTextRow.show();
				  $twitterLinkRow.show();
				  $facebookTextRow.show();
				  $facebookLinkRow.show();
				  $instagramTextRow.show();
				  $instagramLinkRow.show();  
            
              } else if (evt.target.value === 'block-listing'||
						 evt.target.value === 'news-listing' ||
					 	 evt.target.value === 'news-listing-dense') 
				{
                  $morenewsTextRow.hide();
			  	  $moreeventsTextRow.hide();
				  $twitterTextRow.hide();
				  $twitterLinkRow.hide();
				  $facebookTextRow.hide();
				  $facebookLinkRow.hide();
				  $instagramTextRow.hide();
				  $instagramLinkRow.hide();
				  
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


/*@@ Note this only needs to be called once per page, but because it is included for each content template,
 *   it might get called multiple times. So we'll check if already initialised.
 @@*/
if (!window[nam].initialised)
{
  window[nam].init();
}