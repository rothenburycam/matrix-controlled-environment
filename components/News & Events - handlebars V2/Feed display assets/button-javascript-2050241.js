(function($) {
    'use strict';

    var $blockListingMore = $('.block-listing__more'),
        $blockListing     = $('.block-listing');

    function addRemoveClass(el) {
        el.hide();
        el.removeClass('hidden-item').addClass('visible-item')
        el.fadeIn();
    }

    if ($blockListingMore.length) {
        $blockListingMore.find('a').on('click', function(e){
            e.preventDefault();

            var $this = $(this);
            var $hiddenItem = $blockListing.find('.hidden-item');
            var $hiddenFirst = $hiddenItem.eq(0);
            var $hiddenCount = $hiddenItem.length;
            var $showCount = $hiddenCount - 1;

            if ($hiddenCount > 15) {
                $hiddenItem.each(function(index) {
                    var $hidden = $(this);
                    console.log(index);
                    if (index < 15) {
                        setTimeout(function() {
                            addRemoveClass($hidden);
                        }, 100 * index);
                    } else {
                        return false;
                    }
                });
            } else {
                $hiddenItem.each(function(index) {
                    var $hidden = $(this);
                    setTimeout(function() {
                        addRemoveClass($hidden);
                    }, 100 * index);
                });
                $blockListingMore.remove();
            }
        });
    }

}(jQuery));