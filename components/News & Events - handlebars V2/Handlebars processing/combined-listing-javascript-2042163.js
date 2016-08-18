var tplTxtDefault = '%globals_asset_contents_raw:2041741^json_encode%', // Listing template for local news and events
    tplTxtTag = '%globals_asset_contents_raw:1673277^json_encode%', // Listing template by tag
    positionCounter = 1,
    liveResutsCount = 1, 
    maxRow = 15, // Number of items to show by default (3 rows)
    eventsJSON = JSON.parse(_REST.responses[0].body),
    newsJSON = '%globals_get_newsFeedID^as_asset:asset_contents_raw^json_encode%',
    eventType = '%globals_get_type%%globals_get_event_type%',
    eventTag = '%globals_get_tag%',
    eventDetails = '%globals_get_event_details^as_asset:asset_url%',
    eventFilter = '%globals_get_public%',
    hero = '%globals_get_hero%',
    maxRowCustom = '%globals_get_paginate%';

// Does it need to be filtered first by public true or false
filteredJSON = [];
var flagFilter = (eventFilter === 'true');

function filterByFlag(obj) {
    if ('public' in obj && obj.public === flagFilter) {
        filteredJSON.push(obj);
    }
}

if (eventFilter) {
    eventsJSON.filter(filterByFlag);
    eventsJSON = filteredJSON;
}

// The completed JSON feeds
var tplTxt = eventTag.length ? tplTxtTag : tplTxtDefault;
var allJSON = newsJSON.length ? eventsJSON.concat(JSON.parse(newsJSON)) : eventsJSON;

// Button for show more
function returnButton(length) {
    return '<div class="block-listing__more center"><a href="%globals_asset_url%?results=' + length + '" class="button">Show more</a></div>';
}

// Converts date to seconds
function convertToSeconds(data, type) {
    var current = moment().valueOf();
    var myDate = new Date(data);
    var result = myDate.getTime();
    var compare = moment(result);
    var diff = compare.diff(current, 'seconds');

    if (type === 'news') {
        return diff < 0 ? Math.abs(diff) : -diff;
    } else {
        return diff;
    }
}

// Formatters - See datetime formatting here: http://momentjs.com/docs/#/displaying/format/
Handlebars.registerHelper('formatDateDMY', function(date) {
    return moment(date).format('Do MMM YYYY'); // 26th Sep 2016
});
Handlebars.registerHelper('formatDateYMD', function(date) {
    return moment(date).format('YYYYMMDD'); // 20160926
});
Handlebars.registerHelper('formatDateY', function(date) {
    return moment(date).format('YYYY'); // 2016
});
Handlebars.registerHelper('formatDateDay', function(date) {
    return moment(date).format('dddd'); // Full day text: Monday, Tuesday, Wednesday
});
Handlebars.registerHelper('formatDateTime', function(date) {
    return moment(date).format('h:mma'); // 9:05am
});
Handlebars.registerHelper('charLimit', function(str, limit) {
  if (str.length > limit)
    return str.substring(0, limit) + '...';
  return str;
});

Handlebars.registerHelper('compareDates', function(lvalue, rvalue, options) { 
    var startDate = moment(lvalue).format("YYYYMMDD");
    var endDate = moment(rvalue).format("YYYYMMDD");

    var operator = options.hash.operator || "==";

    var operators = {
        '==':       function(startDate,endDate) { return startDate == endDate; },
        '===':      function(startDate,endDate) { return startDate === endDate; },
        '!=':       function(startDate,endDate) { return startDate != endDate; },
        '<':        function(startDate,endDate) { return startDate < endDate; },
        '>':        function(startDate,endDate) { return startDate > endDate; },
        '<=':       function(startDate,endDate) { return startDate <= endDate; },
        '>=':       function(startDate,endDate) { return startDate >= endDate; }
    }
    var result = operators[operator](startDate,endDate);
    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

Handlebars.registerHelper('compare', function(lvalue, rvalue, options) { // Register helper to allow for comparisons in the template

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    var operator = options.hash.operator || "==";

    var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
    }

    if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

    var result = operators[operator](lvalue,rvalue);

    if( result ) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});

// Replaces the default {{each}}
// Sort by converted date so news and events can be treated equally
Handlebars.registerHelper('displayByDate', function(context, options) {
    var output = '';
    var contextSorted = context.concat()
        .sort(function(a, b) {
            var aConverted = convertToSeconds(a.start_time, a.type);
            bConverted = convertToSeconds(b.start_time, b.type);
            return aConverted - bConverted;
        });
    for (var i = 0, j = contextSorted.length; i < j; i++) {
        output += options.fn(contextSorted[i]);
    }
    return output;
});

// Display a class if hero id has been set in get variable
Handlebars.registerHelper('isItAHero', function(id) {
    var idsArray = hero.split(',');

    for (var i = 0; i < idsArray.length; i++) {
        if (idsArray[i].trim() == id) {
            return 'double';
        }
    }
});

// Optionally display hero html
Handlebars.registerHelper('isItAHeroTest', function(id, options) {
    var idsArray = hero.split(',');

    for (var i = 0; i < idsArray.length; i++) {
        if (idsArray[i].trim() == id) {
            return options.fn(this);
        }
    }
    return options.inverse(this);
});

// If it's in a nested object
Handlebars.registerHelper('ifIn', function(elem, list, options) {
    if (list.indexOf(elem) > -1) {
        return options.fn(this);
    }
    return options.inverse(this);
});


// Displays days away from today
Handlebars.registerHelper('daysAwayToday', function(date, type) {
    var current = moment().valueOf();
    var myDate = new Date(date);
    var result = myDate.getTime();
    var compare = moment(result);
    var diff = compare.diff(current, 'days');

    if (type === 'news') {
        return diff < 0 ? Math.abs(diff) : -diff;
    } else {
        return diff;
    }
});

// Check if the item is 24 hours older than current date
// Use CSS to display none
Handlebars.registerHelper('currentItem', function(val, type, options) {
    var current = moment().valueOf();
    var myDate = new Date(val);
    var result = myDate.getTime();
    var compare = moment(result);
    var diff = compare.diff(current, 'seconds');

    if (type === 'news') {
        var check = diff < 0 ? Math.abs(diff) : -diff;
        //return check < -86400 ? 'archived-item' : 'current-item';
        return check < -86400 ? options.inverse(this) : options.fn(this);
    } else {
        //return diff < -86400 ? 'archived-item' : 'current-item';
        return diff < -86400 ? options.inverse(this) : options.fn(this);
    }
});

// If Else Helper for event tags
Handlebars.registerHelper('ifValue', function(val, options) {
    var eventTypeArr = eventType.split(',');
    
    for (var i = 0; i < eventTypeArr.length; i++) {
    if (eventTypeArr[i] == val) {
        return options.fn(this);
        }
    }
    return options.inverse(this);
});

// Checks index and display's none
Handlebars.registerHelper('whatIndex', function(val, options) {
	var newRow = positionCounter ++;
	var limit = maxRowCustom.length ? maxRowCustom : maxRow;
	
	if (newRow > limit) {
		return 'hidden-item';
	} else {
		return 'visible-item';
	}
});

Handlebars.registerHelper('showMore', function() {
    var publicResults = liveResutsCount ++;
    // If it's reached the limit
    if (publicResults === 16) {
        return returnButton(publicResults);
    }
});

// Show 'load more' button if there's more than 15 items (maxRow)
// ** Not currently used
Handlebars.registerHelper('moreThan', function(index, options){
    if (index+1 > maxRow) {
        return options.fn(this);
    }
    return options.inverse(this);
});

// If equals without globals get tag
Handlebars.registerHelper('ifEqualsWithoutTag', function(a, b, options) {
    var publicResults = liveResutsCount ++;
    // If it's reached the limit
    if (publicResults === 16) {
        return returnButton(publicResults);
    }
});






// If equals with globals get tag
Handlebars.registerHelper('ifEqualsWithTag', function(a, b, type, options) {
    // If it's tagged
    var eventTypeArr = eventType.split(',');
    // Loop through the array and check if its in the get var
    for (var i = 0; i < eventTypeArr.length; i++) {
    if (eventTypeArr[i] == type || type == 'all') {
    var publicResults = liveResutsCount ++;
    // If it's reached the limit
    if (publicResults === 16) {
        return returnButton(publicResults);
        }
        break;
        }
    }
});



// Does it have a specific event details page
Handlebars.registerHelper('doesItHaveDetails', function(id, url) {
    var page = eventDetails.length ? eventDetails + '?event=' + id : url;
    return page;
});

// Does it have a specific event details page
Handlebars.registerHelper('doesItNeedNewWindow', function(id, url) {
    var target = eventDetails.length ? '_self' : '_blank';
    return target;
});

// Render the template
function renderTemplate(tplTxt, context) {
    // Compile the Template
    var Template = Handlebars.compile(tplTxt);
    // Generate HTML Template
    var HTML = Template(context);
    print(HTML);
}

renderTemplate(tplTxt, allJSON);