/**
 * UniMelb MCE Container Templates
 * Navigation - Authoring Scripts
 *
 * @authors dcook@squiz.net
 * @requires ContentTemplates
 */
console.log('template-edit.js');

var nam = 'ContentTemplateNavigation';
if (!window[nam]) {
  window[nam] = {
    name: name,
    version: '0.1.0',
    className: 'content-template-navigation',
    classNameInit: 'content-template-navigation--initialised',

    init: function() {
      var self = this;

      if (!this.initialised) {

        // Initialise container editor when authoring interface is ready
        if (typeof EasyEditEventManager != 'undefined'){

          // Initialise for Edit+ each time Content tab is loaded
          EasyEditEventManager.bind('EasyEditScreenLoad',function(){
            if (EasyEditScreens.currentScreen == 'contentPageStandard') {
              self.screenLoad();
            }
          });

        } else {

          // Initialise for Admin Interface
          $(document).ready($.proxy(self.screenLoad,self));
        }

        this.initialised = true;
        // console.log(self.name, self.version, 'initialised');
      }

    },

    screenLoad: function() {
      // Initialise all Content Template Navigation
      var self = this;
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      //temp: hide select_assets
      // $contentTemplates.find('[id*=_related_asset_851]').parents(ContentTemplates.rowSelector).hide();
      $contentTemplates.find('[id*=_related_asset_851]').parents('.row, .content-template .sq-backend-row').hide(); // for some reason ContentTemplates might not be loaded yet.

      /** Initialise each ContentTemplate **/
      $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Initialise sortable elements for Navigation
        var heading_ids=[853,855,857,859,861,863];
        var content_ids=[854,856,858,860,862,864];
        ContentTemplates.initSortable($contentTemplate, heading_ids, content_ids);

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

      });

      /** Event handlers for all ContentTemplateNavigation (not delegated because it's unnecessary) **/

      // on change of authoring_type
      $contentTemplates.find('[id$=_select_847]').on('change', function(){
        var $contentTemplate = $(this).parents('.'+self.className);
        var authoring_type = $(this).val();

        // wysiwyg show/hide
        $.each([
          $contentTemplate.find('.sectionHeading_1'), // section title
          $contentTemplate.find('.sortable'), // wysiwyg content
          $contentTemplate.find('[id$=_select_849]').parents(ContentTemplates.rowSelector), // num_fields
          $contentTemplate.find('[id$=_select_850]').parents(ContentTemplates.rowSelector), // default_selected
        ], function(){
          $(this).toggle(authoring_type == 'wysiwyg');
        });

        // folder show/hide
        $contentTemplate.find('[id$=_related_asset_848_ra_container]') //root_nodes
          .parents(ContentTemplates.rowSelector)
          .toggle(authoring_type == 'folder');
      }).trigger('change');

      // on change of num_fields
      $contentTemplates.find('[id$=_select_849]').on('change', function(){
        var $contentTemplate = $(this).parents('.'+self.className);
        var num_fields = $(this).val();

        // Show each field if it is required (wysiwyg inputs, and default_selected options)
        $contentTemplate.find('.sortableFieldContainer, [id$=_select_850] option').each(function(){
          $(this).toggle( $(this).index()+1 <= num_fields );
        });

        var $default_selected = $contentTemplate.find('[id$=_select_850]');
        if ($default_selected.val() > num_fields){
          $default_selected.val(num_fields);
        }
      }).trigger('change');

      // All those 'change's has caused EES to think we have unsaved changes when we don't.
      // Actually todo: refactor thses event handlers to be named functions, and call the functions rather than trigger ui events
      typeof EasyEditComponentsToolbar !== 'undefined' && EasyEditComponentsToolbar.disableSaveButton();

    }, //screenLoad()

  };
}



if (!window[nam].initialised)
{
  window[nam].init();
}
