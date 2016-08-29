$(document).ready(function() {
  // Check to see if these have been defined and create new variables using the values. This is required to eliminate errors being thrown when the variables haven't been defined.
  if (typeof $eventTags === 'undefined') {
    var eventTags = '';
  } else {
    var eventTags = $eventTags;
  }
  if (typeof $useButton === 'undefined') {
    var useButton = '';
  } else {
    var useButton = $useButton;
  }
  if (typeof $paginate === 'undefined') {
    var paginate = '';
  } else {
    var paginate = $paginate;
  }
  if (typeof $eventType === 'undefined') {
    var eventType = '';
  } else {
    var eventType = $eventType;
  }

  /* *** PERFORM TAG FILTERING *** */
  if (eventTags) { // If tags have been set using the global $tags variable, remove any event that doesn't use this tag
    var tagsRequested = eventTags.toLowerCase(); // Fetch the tags set by the edit/admin user and convert to lowercase
    var tagArrayRaw = tagsRequested.split(','); // Turn them into an array
    var tagArray = jQuery.trim(tagArrayRaw); // Tidy up any extra spaces
    var events = $('li.event[data-location="remote"]:not([data-type="news"])'); // Get all remote events, exclude pursuit hero items (that are listed in the dom as <li class="event double">...)
    console.log(events);
		
    $(events).each(function(index) { // For each remote event
      var rawTags = $(this).find('.meta span.hidden').text().toLowerCase().split(';'); // Fetch tags and turn them into an array
      rawTags.pop(); // Remove last (empty) tag 
			console.log(rawTags);
      var tagPresent = new Array(); // Create a new empty array to store results of comparsions against tags provided
      rawTags.forEach(function(elem) { // For each of these tags, check them against the provided tagArray
        if (tagArray.indexOf(elem) > -1) {
          tagPresent.push("Yes"); // If a tag for this event matches any of the tags provided, add "Yes" to the empty array
        }
      });
      if (jQuery.inArray("Yes", tagPresent) == -1) { // If the array of responses does *not* include "Yes"...
        $(this).remove(); // ...then delete this event from the DOM
      }
    });
  }

  /* *** PERFORM TYPE FILTERING *** */
  if (eventType) { // If tags have been set using the global $tags variable, remove any event that doesn't use this tag
    var eventTypeRequested = eventType.toLowerCase(); // Fetch the tags set by the edit/admin user and convert to lowercase
    var eventTypeArray = eventTypeRequested.split(', '); // Turn them into an array
    var events = $('li.event[data-location="remote"]:not([data-type="news"])'); // Get all remote events, exclude pursuit hero items (that are listed in the dom as <li class="event double">...)
    $(events).each(function(index) { // For each remote event
      var rawTypes = $(this).find('.meta em.meta-right').text().toLowerCase(); // Fetch the type for each event
      if (eventTypeArray.indexOf(rawTypes) === -1) { // If this type is NOT one of the requested types, remove it
        $(this).remove();
      }
    });
  }

  /* *** CALCULATE SHOW MORE BUTTON *** */
  var remainingItems = $('ul.block-listing li');
  var remainingItemsCount = $(remainingItems).length;
  var showMoreDefault = 15; // Default number of items to show if paginate not set

  function pagination(compareAgainst) { // Create a function for re-use further down the script
    if (remainingItemsCount > compareAgainst) { // If there are more items than the 'compareAgainst' value
      $('.main ul.block-listing').after('<div class="showMore center"><p><a href="#" class="button">Show more</a></p></div>'); // Show the button 
      $(remainingItems).each(function(index) {
        if (index < compareAgainst) { // If this item is in a lower position than the paginate value, show it
          $(this).removeClass('hidden-item').addClass('visible-item');
        }
      });
    } else { // Otherwise show all of them and don't show the button
      $(remainingItems).each(function(index) {
        $(this).removeClass('hidden-item').addClass('visible-item');
      });
    }
  }

  if (useButton) { // If the 'show more' button is to be used
    if (paginate) { // If paginate value has been used
      pagination(paginate); // Set pagination based on the "paginate" variable provided
    } else { // If paginate isn't used
      pagination(showMoreDefault); // Set pagination based on the default
    }

    // Button behaviour function (Written by Squiz)
    (function($) {
      'use strict';

      var $blockListingMore = $('.showMore'),
        $blockListing = $('.block-listing');

      function addRemoveClass(el) { // On-click display behaviour for use further down
        el.hide();
        el.removeClass('hidden-item').addClass('visible-item')
        el.fadeIn();
      }

      if ($blockListingMore.length) {
        $blockListingMore.find('a').on('click', function(e) { // When the button is clicked
          e.preventDefault(); // Prevent it from behaving like a normal web link

          var $this = $(this);
          var $hiddenItem = $blockListing.find('.hidden-item'); // Get all hidden items
          var $hiddenFirst = $hiddenItem.eq(0); // Get the first hidden item
          var $hiddenCount = $hiddenItem.length;  // How many hidden items are there?
          var $showCount = $hiddenCount - 1; 

          if ($hiddenCount > showMoreDefault) { // if there are more hidden items than the showMoreDefault value
            $hiddenItem.each(function(index) { // Show the next number of hidden items up to the showMoreDafult value, then stop
              var $hidden = $(this);
              if (index < showMoreDefault) {
                setTimeout(function() {
                  addRemoveClass($hidden);
                }, 100 * index);
              } else {
                return false;
              }
            });
          } else { // If there are fewer hiddent items than the showMoreDefault value
            $hiddenItem.each(function(index) { // Show alll remaining hidden items
              var $hidden = $(this);
              setTimeout(function() {
                addRemoveClass($hidden);
              }, 100 * index);
            });
            $blockListingMore.remove(); // Then remove the button
          }
        });
      }
    }(jQuery));
    
  } else { // If set to not use button
    if (paginate) { // If paginate value has been used
      pagination(paginate); // Set number of items to view based on the "paginate" variable provided
      $('div.showMore').remove(); // remove button (that gets inserted via function above)
    } else { // If paginate isn't used, show everything
      $(remainingItems).each(function(index) {
        $(this).removeClass('hidden-item').addClass('visible-item');
      });
    }
  }
});