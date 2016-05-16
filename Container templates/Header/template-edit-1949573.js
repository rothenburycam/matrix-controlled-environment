/**
 * MCE Container Templates
 * Header - Authoring Scripts
 *
 * @authors dkevey@unimelb.edu.au 
 * @requires ContentTemplates (not sure that it actually does)
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
        'header-image-mid-align': {'id': 1949731},
        'header-image-mid-align-enhanced': {'id': 1949729},
        'header-image-bottom-align': {'id': 1949728},
        'header-image-bottom-align-flat': {'id': 1949727},
        'header-image-box': {'id': 1949720},
        'header-image-filters': {'id': 1949723},
        'header-banner-simple': {'id': 1949732},
        'header-banner-course': {'id': 1949722},
        'header-image-course': {'id': 1949725},
        'article-bottom-align': {'id': 1949724},
        'article-mid-align': {'id': 1949726}
      }



      var toggleAuthType = function(parentScope){
          
          var $templateSelectDefault = $('[id$="_metadata_field_select_1948741_default"]',parentScope);
          var $templateSelectDefaultLabel = $('[for$="_metadata_field_select_1948741_default"]',parentScope);
          
    
          var $authTypeSelect = $('[id$="_metadata_field_select_1924464"]',parentScope);
          var $authTypeDefault = $('[id$="_metadata_field_select_1924464_default"]',parentScope);
          var $authTypeDefaultLabel = $('[for$="_metadata_field_select_1924464_default"]',parentScope);
    
          var $parentDefaultField = $('[id$="_metadata_field_related_asset_1920690_default"]',parentScope);
          var $parentDefaultFieldLabel = $('[for$="_metadata_field_related_asset_1920690_default"]',parentScope);
          
          
          var $childDefaultField = $('[id$="_metadata_field_related_asset_1921152_default"]',parentScope);
          var $childDefaultFieldLabel = $('[for$="_metadata_field_related_asset_1921152_default"]',parentScope);
          
          
          var $parentRow = $('.row_3',parentScope);
          var $childRow = $('.row_4',parentScope);
          
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
           var $selectElm = $('select[id$="_metadata_field_select_1948741"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_1948741_field"]', $thisPrime);
           
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
          
                  var $radioLabelElm = $('label[for$="_metadata_field_select_1948741_' + key + '"]',$thisPrime);
                  
            
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