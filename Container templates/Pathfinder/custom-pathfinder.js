/**
 * UniMelb MCE Container Templates
 * Authoring Scripts - Pathfinder
 * @authors dcook@squiz.net, dkevey@unimelb.edu.au
 * @requires ContentTemplates
 */
var nam = 'ContentTemplatePathfinder';
if (!window[nam]) {
  window[nam] = {
    name: nam,
    version: '0.2.0',
    className: 'content-template-pathfinder',
    classNameInit: 'content-template-pathfinder--initialised',

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
      // Initialise all Content Template
      // this has to be window[nam] not self in order for the toggle number fields to work
      var self = window[nam];
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');
      
        $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Find the 'Content' section
        var $section = $contentTemplate.find('.section_1') || $contentTemplate.find('.sq-backend-section-table')[2];

        // Initialise groups of four fields as sortable
        ContentTemplates.initSortableGroups($section, 4);

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

      });

      // On change of template
      var $type = $contentTemplates.find('[id$=_select_2342549]');
      function onTypeChanged() {
        var $contentTemplate = $(this).parents('.'+self.className);
        var type = $(this).val();

        var $contentFields = $contentTemplate.find('[id$=1823469_default], [id$=1823475_default], [id$=1823484_default], [id$=1823489_default]');
        var $buttonFields = $contentTemplate.find('[id$=1823467_default], [id$=1823476_default], [id$=1823485_default], [id$=1823490_default]');

        // pathfinder show/hide
        $.each([
          $contentFields,
          $buttonFields,
        ], function(){
          $(this).parents(ContentTemplates.rowSelector).toggle(type !== 'buttons');
        });
      }
      $type.on('change', onTypeChanged);
      $type.each(onTypeChanged);

      // On change of num_fields
      var $num_fields = $contentTemplates.find('[id$=_select_1823457]');
      function onNumFieldsChanged() {
        var $contentTemplate = $(this).parents('.'+self.className);
        var num_fields = $(this).val();

        // Show each field if it is required (field inputs, and featured_item options)
        $contentTemplate.find('.sortableFieldContainer, [id$=_select_1823463] option').each(function(){
          var index = $(this).val() || $(this).index() + 1;
          $(this).toggle( index <= num_fields );
        });

        // Ensure featured_item is not higher than num_fields
        var $featured_item = $contentTemplate.find('[id$=_select_1823463]');
        if ($featured_item.val() > num_fields){
          $featured_item.val(num_fields);
        }
      }
      $num_fields.on('change', onNumFieldsChanged);
      $num_fields.each(onNumFieldsChanged);
		
	  // populate the thumbnails
        var populateTemplateThumbs = function(){
            $('.content-template-pathfinder').each(function(){
            var $thisPrime = $(this);

            //if template selector type is a dropdown
            var $selectElm = $('select[id$="_metadata_field_select_2342549"]', $thisPrime);
            var $selectElmParent = $('[id$="_metadata_field_select_2342549_field"]', $thisPrime);

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
      // end custom content template	

    }, //onScreenLoad()
  };
}


if (!window[nam].initialised)
{
  window[nam].init();
}