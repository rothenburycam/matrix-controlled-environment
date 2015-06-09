$(document).ready(function () {

    // If this is the event detail page, do this
    // If event is multi-day, show date range otherwise show time of day
    if($('.detail').length !== 0) {    
        var startTime = $('.when.range').find('time').first().attr('datetime');
        var endTime = $('.when.range').find('time').next().attr('datetime');
        var endTimeElement = $('.when.range').find('time:nth-child(2)');
        var timeOfDay = $('.when.range').find('time').last();
        if (startTime == endTime) {
            $(endTimeElement).remove();
        } else {
            $(timeOfDay).remove();
        }
    } else { // If this is the event listing page, do this
 
        // get today's date in two formats
        var d = new Date(),
            month = d.getMonth() + 1,
            day = d.getDate(),
            today = d.getFullYear() + (('' + month).length < 2 ? '0' : '') + month + (('' + day).length < 2 ? '0' : '') + day;
    
        // Check the start date of each event and if earlier than today, update it to match today's date (ie - for multi-day events)
        
        var todayGroup = $('ul.event-listing').find('ul:first');
        var eventGroups = $('ul.event-listing').children().slice( 1 );
        
        $(eventGroups).each(function (index) {
            var dateTitle = $(this).find('h2');
            var start = $(this).find('span.date').data('timestamp');
            // Compare event start date with today - if earlier, print today's date
            if (start <= today) {
                var events = $(this).find('ul li').detach();
                $('ul.event-listing').find('ul:first').append(events);
                $(this).remove();
            }
        });
        var todayGroupTally = $('ul.event-listing').find('ul:first li').length;
        var todayGrouping = $('ul.event-listing').find('li:first');
        // If there are no events scheduled for today, remove the today group
        if (todayGroupTally === 0) {
            $(todayGrouping).remove();
        }
        tinysort('ul.event-listing>li',{selector:'span.date',data:'timestamp'});
    }

    // Identify the elements that contain the Presenters json data    
    var presenterSection = $('.presenters-json');
    // For each of these, check to see if it contains json objects (ie - presenters), then construct and print the names as an unordered list to the presenters list element
    $(presenterSection).each(function (index) {
        var presenters = $(this).html();
        var objects = jQuery.parseJSON(presenters);
        var list = $(this).prev();

        if (objects.length === 0) {
            $(list).remove();
        } else {
            $(objects).each(function (index) {
                var title = $(this).attr('title') + ' ';
                var firstName = $(this).attr('first_name') + ' ';
                var lastName = $(this).attr('last_name') + ' ';
                var postNom = $(this).attr('post_nominal');
                var link = $(this).attr('link');

                var name = (title + firstName + lastName + postNom);
                if (link) {
                    name = '<a href="' + link + '">' + name + '</a>';
                }
                $(list).append(name);
            });
            
            // If there are presenters, add a "Presenters" heading 
            $(list).prepend('<strong>Presenters</strong>');
        }
    });
    // Remove the presenters-json divs from the DOM
    $(presenterSection).remove();

    // On details page, remove elements with no content
    $('.bookingLink[href=""], .details span:empty, .details span a[href=""], .details span a[href="mailto:"]').remove();
    
});