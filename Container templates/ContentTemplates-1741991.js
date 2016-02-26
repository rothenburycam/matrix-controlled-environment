/**
 * UniMelb MCE Container Templates
 * Global Authoring Scripts
 *
 * @authors dcook@squiz.net
 * @requires Edit+ 5.3 or Matrix 5.3 Admin
 * @requires jQuery
 * @requires jQuery.ui
 */
console.log('contentTemplates.js');

/**
 * ContentTemplates (singleton)
 */
var nam = 'ContentTemplates'; //
if (!window[nam]) {
  window[nam] = {
    // Constants
    name: name,
    version: '0.1.1',
    className: 'content-template',
    classNameInit: 'content-template--initialised',
    rowSelector: '.row, .content-template .sq-backend-row',
    multiTextDelim: '; ',

    // Variables
    // loadWait: [], //array of callbacks to call when this object is initialised

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

          // EasyEditEventManager.bind('EasyEditSaveClick',function(){
          //     if (EasyEditScreens.currentScreen == 'contentPageStandard') {
          //         self.screenSave();
          //     }
          // });

        } else {

          // Initialise for Admin Interface
          $(document).ready($.proxy(self.screenLoad,self));
        }

        this.initialised = true;
        // console.log(self.name, self.version, 'initialised');
      }
    },

    screenLoad: function() {
      var self = this;

      // Generic initialisation for all ContentTemplates
      $('.'+self.className+':not(.'+self.classNameInit+')').each(function(){
        var $contentTemplate = $(this);

        // Ensure 'use default' is unchecked for all fields
        $contentTemplate.find('.sq-metadata-default-wrapper [id$=_default]:checked').each(function(){
          $(this).click();
        });

        // Add classname so we can style section description
        $contentTemplate
          .find(self.rowSelector)
          .find(':contains("Section Description")')
          .parents(self.rowSelector)
          .addClass('section-description');

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

      });

    }, //screenLoad()

    /**
     * Initialises one set of sortable rows for a contentTemplate, grouped by heading (text) and content (wysiwyg).
     * Supports Admin and Edit+
     */
    initSortable: function($contentTemplate, heading_ids, content_ids){
      var self = this;

      // Group elements with .sortableFieldContainers
      for (i=0; i < heading_ids.length; i++) {
        $($contentTemplate
          .find('[id$=_wysiwyg_'+content_ids[i]+'_contents_div], [id$=_wysiwyg_'+content_ids[i]+'_contents_div_viper], [id$=_text_'+heading_ids[i]+'_value]')
          .parents(self.rowSelector).get().reverse())
          .wrapAll('<div class="sortableFieldContainer"/>');
      }

      // Place all .sortableFieldContainers inside wrapper .sortable
      var $sortableFieldContainers = $contentTemplate.find('.sortableFieldContainer');
      $sortableFieldContainers.find('.row:first-child() .cellName')
        .prepend('<a class="sortHandle alignLeft dragIcon" title="Drag to re-arrange" href="#"></a>');
      $sortableFieldContainers.wrapAll('<tr><td colspan="2" class="sortable ees_directChildrenList"/></tr>'); // Table elements are required for admin interface.


      // init jquery.ui.sortable
      // see relatedAsset https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/screens/EasyEditScreenMetadataDefault.js#L961
      // or  multipleText https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/screens/EasyEditScreenMetadataDefault.js#L996
      var $sortable = $contentTemplate.find('.sortable');
      $sortable.sortable({
        axis:       'y',
        handle:     '.dragIcon',
        // cancel:     'li.markedForDeletion',
        stop:       function(event,ui){
          // Tell EES that something has been changed
          typeof EasyEditComponentsToolbar !== 'undefined' && EasyEditComponentsToolbar.enableSaveButton();

          // Re-set all assetids in field names in the new order
          var i=0;
          $sortable.find('.sortableFieldContainer').each(function(id){
            // Heading
            var $heading = $(this).find('input[type=text][id*=_value]');
            if ($heading.length){
              var heading_id = $heading.attr('id').replace(/metadata_field_text_\d+/, 'metadata_field_text_'+heading_ids[i]);
              $heading
                .attr('id',heading_id)
                .attr('name',heading_id);
            }

            // Content WYSIWYG
            var $content = $(this).find('div[id*=metadata_field_wysiwyg_][id*=_contents_div]');
            if ($content){
              var content_id = $content.attr('id').replace(/metadata_field_wysiwyg_\d+_contents_div/, 'metadata_field_wysiwyg_'+content_ids[i]+'_contents_div');
              $content
                .attr('id',content_id)
                .attr('name',content_id);
            }

            i++;
          }); //each .sortableFieldContainer
        }, //stop()
      });
    }, //initSortable()

    /**
     * Initialises a group of Multiple Text fields
     */
    initMultiTextGroup: function(selector){
      debugger;
      var self = this;
      var $values = $(selector).find('.values input');
      var $sortable = $(selector).find('.sortable');
      var $template = $sortable.find('.sortableFieldContainer.template');
      var values = {};

      $values.each(function(){
        values[this.name] = this.value.split(self.multiTextDelim);
      });
      var num_values = values[Object.keys(values)[0]].length;

      // Generate elements with .sortableFieldContainers
      for (var i=0; i < num_values; i++) {
        var $sortableFieldContainer = $template.clone();
        var inputs = $sortableFieldContainer.find('input');

        for (j in values) {
          $sortableFieldContainer.find('input[name='+j+']').val(values[j][i]);
        }
        $sortableFieldContainer.removeClass('hidden template');
        $sortable.append($sortableFieldContainer);
      }


      // init jquery.ui.sortable
      // eg multipleText https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/screens/EasyEditScreenMetadataDefault.js#L996
      $sortable.sortable({
        axis:       'y',
        handle:     '.dragIcon',
        // cancel:     'li.markedForDeletion',
        stop:       function(event,ui){
          // Tell EES that something has been changed
          typeof EasyEditComponentsToolbar !== 'undefined' && EasyEditComponentsToolbar.enableSaveButton();
        },
      });
    }, //initMultiTextGroup()

  };
}

/*@@ Note this only needs to be called once per page, but because it is included for each content template,
 *   it might get called multiple times. So we'll check if already initialised.
 @@*/
if (!window[nam].initialised)
{
  window[nam].init();
}
