/************************************
 * METADATA TABS PLUGIN
 * Bart Banda & Chris Grist, Squiz Briz
 * Version 0.3.0 - April 2012
 * This plugin splits the metadata sections of a schema up into tabs so it becomes easier for content editors to edit the metadata.
 * You can choose between metadata sectional tabs, or awesome inception metadata tabs.
 *
 * Timothy Tran, Squiz Briz
 * Version 0.3.2 - Jan 2014
 * Removed Extra Filter Functionality and Event Tabs
 *
 *************************************/
/****************** CONFIGURATION **********************/
/* Inception configuration (applies to inception tabs only)
 ** Set the description and order of each tab, and also create the JS API object for the batching */
var inceptionTabs = [
{
  "name": "Content",
  "desc": "Manage page content here."
},

{
  "name": "Design",
  "desc": "Select page layout and configure design settings."
},
 {
  "name": "Authoring",
  "desc": "Who owns and maintains this content?"
},   
 {
  "name": "SEO",
  "desc": "Increase your organic search results."
},

];
var plugin_js_api = new Squiz_Matrix_API({
  key: '49341721'
});
/****************** END CONFIGURATION ********************/

EasyEdit.plugins.metadataTabs = {
  init: function() {
    var self = this;
    // Add a function to the screen load event
    EasyEditEventManager.bind('EasyEditScreenLoad', function() {
      //check if we are on the metadata screen, if so, call the metadata tab function
      if (EasyEditScreens.getCurrentScreenName() == 'Metadata') {
        // console.log($('.row.rowWithWYSIWYG.row_4').attr('style'));
        iniInceptionMetadataTabs();
        // console.log('Metadata Tabs plugin loaded');
        // console.log($('.row.rowWithWYSIWYG.row_4').attr('style'));
      }
    });
  }
};

/************** Inception metadata tabs function (epic) ***************/

// the main function that builds the inception metadata tabs.       p.s. this will be awesome when it works
function iniInceptionMetadataTabs() {

  var inceptionString = '';

  // Check if workflow is enabled and safe edit is required to access fields
  if($('.sq-metadata-default-wrapper input[type=checkbox]').length > 0) {
    // hide all stuff
    $('#ees_editMetadata>h3, #ees_editMetadata>h4, #ees_editMetadata div.row').hide();

    // add some html
    $('#ees_editMetadata').before('<div id="mt-tabs"><ul></ul><h2></h2><p><em>Loading...</em></p></div>');

    // add some syling to hide empty sections
    $('#ees_editMetadata .editSection').css('border-top', 'none').css('margin-bottom', '0px');

    //find the ids of all possible metadata fields and add them to the string
    $('#ees_editMetadata .cellData .defaultCheckbox').each(function() {
      var thisMetadataId = this.id;
      thisMetadataId = thisMetadataId.replace(/\D/g, ''); //remove all characters but numbers
      inceptionString = inceptionString + thisMetadataId + ',';
      //add this metadata id to the parent div row, but check if its a wysiwyg or not, will determine the parent level
      if (!$(this).parent().parent().hasClass('cellData')) {
        $(this).parent().parent().attr('id', 'metadata-row-' + thisMetadataId).hide();
      } else {
        $(this).parent().parent().parent().attr('id', 'metadata-row-' + thisMetadataId).hide(); // wysiwyg field
      }
    });
  } else {
    // console.log('No ids available - do not generate tabs');
    return;
  }

  //remove last comma from string of ids
  inceptionString = inceptionString.slice(0, -1);

  //convert to array
  var metadataIDArray = inceptionString.split(',');

  //initiate the batch object
  getMetadataBatch = {
    "functions": {}
  };

  //Populate the batch object from the array
  $(metadataIDArray).each(function(key, val) {
    // getMetadata refers to the JS API getMetadata call
    getMetadataBatch.functions[key] = {
      "function": "getMetadata",
      "args": {
        "asset_id": val
      }
    };
  });

  //Add a callback function - dataCallback refers to the JS API batchRequest dataCallback
  getMetadataBatch.dataCallback = function(data) {

    var allCats = '';

    //check size first
    if ($(metadataIDArray).length > 1) {

      //loop through each metadata field in array and see what tabs to create
      $(metadataIDArray).each(function(i) {
        var thisCat = data[i].inception_cat;

        var $thisRow = $('#metadata-row-' + metadataIDArray[i]);
        var $thisRowWYSIWYG = $('#metadata_field_wysiwyg_' + metadataIDArray[i] + '_wysiwyg_container')

        // apply the inception metadata to the rows in page markup
        $thisRow.attr('rel', thisCat);
        $thisRowWYSIWYG.attr('rel', thisCat);

        thisCat = '|' + thisCat + '|';
        if (allCats.indexOf(thisCat) > -1) {
          //category already exists
        } else {
          allCats = allCats + thisCat + ',';
        }
      });

      //console.log($('#metadata-row-82743').attr('rel'));
      //create the tabs
      $(inceptionTabs).each(function(i) {
        //check if category exists first on the current page, then create it
        var thisTab = '|' + inceptionTabs[i].name + '|';
        if (allCats.indexOf(thisTab) > -1) {
          $('#mt-tabs ul').append('<li><a href="#" title="' + inceptionTabs[i].desc + '" rel="' + inceptionTabs[i].name + '">' + inceptionTabs[i].name + '</a></li>');

        }
      });

      //if no tabs, then show all fields
      if ($('#mt-tabs a').length < 1) {
        $('#mt-tabs').hide();
        $('#ees_editMetadata>h3, #ees_editMetadata>h4, #ees_editMetadata div.row').show();
      }
      //add click function to our new tab links to show the relative section based on the clicked tab
      $('#mt-tabs a').click(function() {

        // manage the selected class
        $('#mt-tabs a.selected').removeClass('selected');
        $(this).addClass('selected');

        // hide all rows
        $('#ees_editMetadata .row').hide();

        // assign $(this) to variable to passed down
        var $currentTab = $(this);

        // $('#ees_editMetadata .row[rel="' + $(this).attr('rel') + '"]').show(); - discontinued

        // process each .row div
        $('#ees_editMetadata .row').each(function() {
          // if row has a child field which matches active tab, show the row
          if ($(this).find('span[rel="' + $currentTab.attr('rel') + '"]').length > 0) {
            $(this).show();
          }
          if ($(this).find('div[rel="' + $currentTab.attr('rel') + '"]').length > 0) {
            $(this).show();
          }
        });

        // show each corresponding metadata settings container
        $('.sq-metadata-settings-wrapper[rel="' + $currentTab.attr('rel') + '"]').show();

        $('#mt-tabs h2').text($(this).attr('rel'));
        $('#mt-tabs p em').text($(this).attr('title'));
        $('#ees_screenMenumetadataDefault').attr('rel', $(this).attr('rel'));

        return false;
      });

      //check if we have a cached tab already, if so click it, if not, show the first section by default
      var cacheRel = '' + $('#ees_screenMenumetadataDefault').attr('rel');
      if (cacheRel != 'undefined' && cacheRel != '') {
        $('#mt-tabs li a[rel="' + cacheRel + '"]').trigger('click').addClass('selected');
      } else {
        $('#mt-tabs li:first a').trigger('click').addClass('selected');
      }
      //else if no schema is applied
    } else {
      $('#mt-tabs').hide();
      $('#ees_editMetadata>h3, #ees_editMetadata>h4, #ees_editMetadata div.row').show();
    }
  };

  //Run the batch request
  plugin_js_api.batchRequest(getMetadataBatch);
}
