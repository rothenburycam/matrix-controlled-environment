/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Events listing
 * dkevey@unimelb.edu.au based on Squiz templates
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateEvents';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.1.1',
    className: 'content-template-eventslisting',
    classNameInit: 'content-template-eventslisting--initialised',

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
      var self = this;
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      // start custom content template
      var toggleTemplateType = function(parentScope){
          
          var $templateSelect = $('[id$="_metadata_field_select_2362640"]',parentScope);
          //var $pastYearsRow = $('[id$="_metadata_field_select_2364135"]',parentScope);
          //var $showMoreRow = $('[id$="_metadata_field_related_asset_2362645"]',parentScope);
		  // define the rows you want to show and hide
		  var $pastYearsRow = $('.row_2',parentScope);
		  var $showMoreRow = $('.row_7',parentScope);

        // show/hide additional fields in template
        // note: this fires on page load
            if ($templateSelect.val() === 'upcoming')

                {
                    $pastYearsRow.hide();
                    $showMoreRow.show();

                } else if ($templateSelect.val() === 'past')

                {
                    $pastYearsRow.show();
                    $showMoreRow.hide();
                }

            // toggle additional fields when changing template and update thumbnails
            // note: after page load this is how you change templates - basically the same as above
          $templateSelect.change(function(evt){

            if  (evt.target.value === 'past')

                {
                    $pastYearsRow.show();
                    $showMoreRow.hide();

                } else if (evt.target.value === 'upcoming')

                {
                    $pastYearsRow.hide();
                    $showMoreRow.show();
                }
          });
      };
      
       var populateTemplateThumbs = function(){
       $('.content-template-eventslisting').each(function(){
           var $thisPrime = $(this);
     
           toggleTemplateType($thisPrime);
           
           //if template selector type is a dropdown
           var $selectElm = $('select[id$="_metadata_field_select_2362640"]', $thisPrime);
           var $selectElmParent = $('[id$="_metadata_field_select_2362640_field"]', $thisPrime);
           
           // test to see if selector is a dropdown not radio buttons
           if ($selectElm.length > 0) {
               $('<div>', {class: 'select-thumb'}).appendTo($selectElmParent);
               $('.select-thumb', $thisPrime).addClass('selected-' + $selectElm.val() );
               $selectElm.change(function(evt){
                   $('.select-thumb', $thisPrime).prop('class','select-thumb');
                   $('.select-thumb', $thisPrime).addClass('selected-' + evt.target.value );
               });  
           }
       });

      }; populateTemplateThumbs();

    // All those 'change's has caused EES to think we have unsaved changes when we don't.
    typeof EasyEditComponentsToolbar !== 'undefined' && EasyEditComponentsToolbar.disableSaveButton();

    }, //onScreenLoad()

  };
}

if (!window[nam].initialised)
{
  window[nam].init();
}