/**
 * Accordion - Authoring Scripts
 * Version: 1.0
 * @authors dcook@squiz.net
 */
 
if (!window.ct) {

        (function($){
            window.ct = {};

            /** Generic Content Template Rules **/
            $('.content-template').each(function(){
                var $contentTemplate = $(this);

                // $contentTemplate.find('[data-showif]').each(function(){
                    //d'oh, can't rely on html attributes because we're using default matrix html
                // });
            });

            // Initialise container editor
            if (typeof EasyEditEventManager != 'undefined'){
                // Initialise for Edit+ each time Content tab is clicked
                EasyEditEventManager.bind('EasyEditScreenLoad',function(){
                    if (EasyEditScreens.currentScreen == 'contentPageStandard') {
                        screenLoad();

                        initTooltip();
                    }
                });

                // EasyEditEventManager.bind('EasyEditSaveClick',function(){
                //     if (EasyEditScreens.currentScreen == 'contentPageStandard') {
                //         screenSave();
                //     }
                // });
            } else {
                // Initialise for Admin Interface
                $(document).ready(screenLoad);
            }

            function screenLoad(){
                if ($('.content-template--accordion').length){

                    // on load
                    $('.content-template--accordion').each(function(){
                        var $accordion = $(this);


          // Ensure 'use default' is unchecked for all fields
          $accordion.find('.sq-metadata-default-wrapper [id$=_default]').each(function(){
            if($(this).prop('checked')) {
              $(this).click();
            }
          });
                        // set up wysiwig fields structure for sorting
                        
          $($(this)
            .find('[id$=_wysiwyg_822_contents_div], [id$=_wysiwyg_822_contents_div_viper], [id$=_text_821_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_820_contents_div], [id$=_wysiwyg_820_contents_div_viper], [id$=_text_819_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_818_contents_div], [id$=_wysiwyg_818_contents_div_viper], [id$=_text_817_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_816_contents_div], [id$=_wysiwyg_816_contents_div_viper], [id$=_text_815_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_814_contents_div], [id$=_wysiwyg_814_contents_div_viper], [id$=_text_813_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_812_contents_div], [id$=_wysiwyg_812_contents_div_viper], [id$=_text_811_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_810_contents_div], [id$=_wysiwyg_810_contents_div_viper], [id$=_text_809_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_808_contents_div], [id$=_wysiwyg_808_contents_div_viper], [id$=_text_807_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_806_contents_div], [id$=_wysiwyg_806_contents_div_viper], [id$=_text_805_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');
          $($(this)
            .find('[id$=_wysiwyg_804_contents_div], [id$=_wysiwyg_804_contents_div_viper], [id$=_text_803_value]')
            .parents('.row, .content-template .sq-backend-row').get().reverse())
            .wrapAll('<div class="sortableFieldContainer"/>');

                        $(this)
                            .find('.sortableFieldContainer ')
                            .append('<a class="sortHandle alignLeft dragIcon" title="Drag to re-arrange" href="#"></a>')
                            .wrapAll('<tr><td colspan="2" class="sortable ees_directChildrenList"/></tr>'); // Table elements required for admin interface.

                        // $(this)
                        //     .find('a.sortHandle').addClass('dragIcon');


                        // init jquery.ui.sortable
                        // see relatedAsset https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/screens/EasyEditScreenMetadataDefault.js#L961
                        // or  multipleText https://gitlab.squiz.net/Labs/EditPlus/blob/master/Libs/components/screens/EasyEditScreenMetadataDefault.js#L996
                        var $sortable = $(this).find('.sortable');
                        $sortable.sortable({
                            axis:       'y',
                            handle:     '.dragIcon',
                            // cancel:     'li.markedForDeletion',
                            stop:       function(event,ui){
                                EasyEditComponentsToolbar || EasyEditComponentsToolbar.enableSaveButton();

                                // Iterate through the list and re-sort the names/ids of the fields
                                // $editableList.find('input').each(function(i,v){
                                //     var id = oldId.replace('_interface','') + '_thes_term[' + i + '][assetid]';
                                //     jQuery(this).attr('id',id).attr('name',id);
                                // });
//todo: move these constant delcarations elesherew (scoped to accordion)
              var heading_ids=[803, 805, 807, 809, 811, 813, 815, 817, 819, 821];
              var content_ids=[804, 806, 808, 810, 812, 814, 816, 818, 820, 822];
                                var i=0;

                                $sortable.find('.sortableFieldContainer').each(function(id){
                                    // heading
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
                                });

                            }
                        });

                    });


                    // could perhaps deleaget, and execute on document.ready instead of screenLoad

                    // on change of authoring_type
                    $('[id$=_select_1720138]').on('change', function(){
                        // wysiwyg show/hide
                        $(this)
                            .parents('.content-template')
                            .find('[id$=_text_803_value], [id$=_wysiwyg_804_contents_div], [id$=_wysiwyg_804_contents_div_viper]')
                            // .parents('.row, .content-template .sq-backend-row')
                            .parents('.sortableFieldContainer')
                            .toggle($(this).val() == 'wysiwyg');
                        $(this)
                            .parents('.content-template')
                            .find('[id$=_select_801]')
                            .parents('.row, .content-template .sq-backend-row')
                            .toggle($(this).val() == 'wysiwyg');

                        // folder show/hide
                        $(this)
                            .parents('.content-template')
                            .find('[id$=_select_802], [id$=_related_asset_800_ra_container]')
                            .parents('.row, .content-template .sq-backend-row')
                            .toggle($(this).val() == 'folder');

                        // set num_fields
                        var $num_fields = $(this)
                            .parents('.content-template')
                            .find('[id$=_select_801]');

                        if ($(this).val() == 'folder') {
                            $num_fields.val(1) //set to 1 to hide all wysiwyg fields
                        }
                        $num_fields.trigger('change');
                    }).trigger('change');

                    // on change of num_fields
                    $('[id$=_select_801]').on('change', function(){
                        
          $(this)
            .parents('.content-template')
            .find('[id$=_text_805_value], [id$=_wysiwyg_806_contents_div], [id$=_wysiwyg_806_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 2);
          $(this)
            .parents('.content-template')
            .find('[id$=_text_807_value], [id$=_wysiwyg_808_contents_div], [id$=_wysiwyg_808_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 3);
          $(this)
            .parents('.content-template')
            .find('[id$=_text_809_value], [id$=_wysiwyg_810_contents_div], [id$=_wysiwyg_810_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 4);
          $(this)
            .parents('.content-template')
            .find('[id$=_text_811_value], [id$=_wysiwyg_812_contents_div], [id$=_wysiwyg_812_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 5);
          $(this)
            .parents('.content-template')
            .find('[id$=_text_813_value], [id$=_wysiwyg_814_contents_div], [id$=_wysiwyg_814_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 6);
          $(this)
            .parents('.content-template')
            .find('[id$=_text_815_value], [id$=_wysiwyg_816_contents_div], [id$=_wysiwyg_816_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 7);
          $(this)
            .parents('.content-template')
            .find('[id$=_text_817_value], [id$=_wysiwyg_818_contents_div], [id$=_wysiwyg_818_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 8);
          $(this)
            .parents('.content-template')
            .find('[id$=_text_819_value], [id$=_wysiwyg_820_contents_div], [id$=_wysiwyg_820_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 9);
          $(this)
            .parents('.content-template')
            .find('[id$=_text_821_value], [id$=_wysiwyg_822_contents_div], [id$=_wysiwyg_822_contents_div_viper]')
            // .parents('.row, .content-template .sq-backend-row')
            .parents('.sortableFieldContainer')
            .toggle($(this).val() >= 10);
            
                    }).trigger('change');
                }
            }


            // function screenSave(){
            //     if ($('.content-template--accordion').length){

            //         // on save
            //         $('.content-template--accordion').each(function(){
            //             var $accordion = $(this);

            //             // re-order the fields.
            //             //orr just do this everytime you re-order them..

            //         }
            //     }
            // }

            function initTooltip(){
                // var $sectionDescription = $('.row_0 .inputLabel:contains("Section Description")').parents('.row');
                // $sectionDescription.hide();

                //todo: move this message to a tooltip. May use EES tooltips for ease (eg https://gitlab.squiz.net/au-client-implementation/odar/blob/master/EasyEditActivity/EasyEditActivity.js#L740) and fallback to none for _admin
            }

        })(jQuery);
    } //if (!window.ct)