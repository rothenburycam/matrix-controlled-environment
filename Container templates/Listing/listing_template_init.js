/**
 * MCE Container Templates
 * Pathfinder - Authoring Scripts
 *
 * @authors dcook@squiz.net
            mvaldman@squiz.net

 * @requires ContentTemplates
 */

var nam = 'ContentTemplateListing';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.0',
    className: 'content-template-listing',
    classNameInit: 'content-template-listing--initialised',

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

      $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Update section description label     
        var $sectionDescriptionLabel = $contentTemplate.find(ContentTemplates.rowSelector).find('span:contains("Section Description")');
        $sectionDescriptionLabel.text($sectionDescriptionLabel.text().replace("Section", "listing"));

        //initialise each instance of your container here

      });
      
      
      //rest of your container template code
      var templateKeyArr = {	    
          'listing': {'id': 1894859},
          'feature-listing-3': {'id': 1894842},
          'feature-listing': {'id': 1894824},
          'hero-listing': {'id': 1894807},
          'nav-with-text': {'id': 1894951},
          'nav-linked-header': {'id': 1894898},
          'nav-unlinked-header': {'id': 1894969},
          'nav-block-with-text': {'id': 1894978},
          'wide': {'id': 1894987},
          'narrow': {'id': 1894916},
          'stacked': {'id': 1894933}
      }




      var toggleAuthType = function(parentScope){
          
          var $templateSelectDefault = $('[id$="_metadata_field_select_1892134_default"]',parentScope);
          var $templateSelectDefaultLabel = $('[for$="_metadata_field_select_1892134_default"]',parentScope);
          
    
          var $authTypeSelect = $('[id$="_metadata_field_select_1924464"]',parentScope);
          var $authTypeDefault = $('[id$="_metadata_field_select_1924464_default"]',parentScope);
          var $authTypeDefaultLabel = $('[for$="_metadata_field_select_1924464_default"]',parentScope);
    
          var $parentDefaultField = $('[id$="_metadata_field_related_asset_1920690_default"]',parentScope);
          var $parentDefaultFieldLabel = $('[for$="_metadata_field_related_asset_1920690_default"]',parentScope);
          
          
          var $childDefaultField = $('[id$="_metadata_field_related_asset_1921152_default"]',parentScope);
          var $childDefaultFieldLabel = $('[for$="_metadata_field_related_asset_1921152_default"]',parentScope);
          
          //these rows numbers can change if extra information (such as section descriptions are added or removed)
          var $parentRow = $('.row_4',parentScope);
          var $childRow = $('.row_5',parentScope);
          
          //hide redundant heading sections
          
          $('.schemaHeading_0').hide();
          $('.sectionHeading_0').hide();
          
          
          //uncheck and hide any redundant default checkboxes
          
          if ( $authTypeDefault.prop('checked') ){
              
              $authTypeDefault.click();
                           
          }
          
          $authTypeDefault.addClass('visuallyhidden');
          $authTypeDefaultLabel.addClass('visuallyhidden');

          if ( $templateSelectDefault.prop('checked') ){
              
              $templateSelectDefault.click();
                           
          }
          
          $templateSelectDefault.addClass('visuallyhidden');
          $templateSelectDefaultLabel.addClass('visuallyhidden'); 

          if ( $parentDefaultField.prop('checked') ){
             
              $parentDefaultField.click();
              
          }
          
          $parentDefaultField.addClass('visuallyhidden');
          $parentDefaultFieldLabel.addClass('visuallyhidden');

          if( $childDefaultField.prop('checked') ){
              
              $childDefaultField.click();
                            
          }
          
          $childDefaultField.addClass('visuallyhidden');
          $childDefaultFieldLabel.addClass('visuallyhidden'); 
          

          
          
          if ($authTypeSelect.val() === 'parent'){
              
              $parentRow.show();
              $childRow.hide();
              console.log('parent selected');
              
          } else if ( $authTypeSelect.val() === 'selected-children'){
              
              $parentRow.hide();
              $childRow.show();
              console.log('child selected');              
          }
          
          
          
          // toggle parent or child related asset fields when changing auth type
          $authTypeSelect.change(function(evt){

              if (evt.target.value === 'selected-children') {
    
                  $parentRow.hide();
                  $childRow.show();
                  console.log('child selected');
            
            
              } else if (evt.target.value === 'parent') {
                  
                  $parentRow.show();
                  $childRow.hide();
                  console.log('parent selected');
              }
        
        
          });
    
      };




      var populateTemplateThumbs = function(){
       $('.list-container-template-metadata').each(function(){
           var $thisPrime = $(this);
     
           toggleAuthType($thisPrime);
           
           //if template selector type is a dropdown
           var $selectElm = $('select[id$="_metadata_field_select_1892134"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_1892134_field"]', $thisPrime);
           
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
          
                  var $radioLabelElm = $('label[for$="_metadata_field_select_1892134_' + key + '"]',$thisPrime);
                  
            
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
