/**
 * UniMelb MCE Container Templates
 * Ordered List Steps - Authoring Scripts
 *
 * @authors dcook@squiz.net
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateOrderedList';
if (!window[nam]) {
  window[nam] = {
    name: name,
    version: '0.1.0',
    className: 'content-template-ordered-list',
    classNameInit: 'content-template-ordered-list--initialised',

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
      // Initialise all Content Template Ordered List Steps
      var self = window[nam];
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Initialise sortable elements for Ordered List Steps
        ContentTemplates.initMultiTextGroup($contentTemplate.find('.content-template-ordered-list__multitext'));

        // Note that Viper is initialised by EES based on the ids of the elemenets.

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

      });


    }, //onScreenLoad()

  };
}



if (!window[nam].initialised)
{
  window[nam].init();
}
