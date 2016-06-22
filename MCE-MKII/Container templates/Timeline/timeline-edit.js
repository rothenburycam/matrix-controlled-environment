/**
 * UniMelb MCE Container Templates
 * Timeline - Authoring Scripts
 *
 * @authors dcook@squiz.net
 * @requires ContentTemplates
 */

var nam = 'ContentTemplateTimeline';
if (!window[nam]) {
  window[nam] = {
    name: name,
    version: '0.1.0',
    className: 'content-template-timeline',
    classNameInit: 'content-template-timeline--initialised',

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
      // Initialise all Content Template Timelines
      var self = window[nam];
      var $contentTemplates = $('.'+self.className+':not(.'+self.classNameInit+')');

      /** Initialise each ContentTemplate **/
      $contentTemplates.each(function(){
        var $contentTemplate = $(this);

        // Initialise sortable elements for timeline
        ContentTemplates.initMultiTextGroup($contentTemplate.find('.content-template-timeline__multitext'));

        // Note that Viper is initialised by EES based on the classnames of the elemenets.

        // Set initialised class on dom element
        $contentTemplate.addClass(self.classNameInit);

        console.log(self.name, self.version, 'initialised:', $contentTemplate.parents('.bodycopy_manager_div, .sq-bodycopy-container-cell').find('.bodycopy_tools .bodycopy_type, .sq-content-type-name').text());

      });


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
