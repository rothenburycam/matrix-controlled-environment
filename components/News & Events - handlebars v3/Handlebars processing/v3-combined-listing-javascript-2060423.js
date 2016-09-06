var tplTxt = '%globals_asset_contents_raw:2060413^json_encode%', // Layout template
    tplTxtNoResults = '%globals_asset_contents_raw:2062784^json_encode%', // Error template - used if there are no items in the combined JSON feed
    allJSON = JSON.parse(_REST.responses[0].body), // Fetches the JSON data from the combined listing page
    eventDetails = '%globals_get_event_details^as_asset:asset_url%',
    hero = '%globals_get_hero%',
    eventTags = '%globals_get_eventTags%',
    eventType = '%globals_get_eventType%',
    useButton = '%globals_get_useButton%',
    paginate = '%globals_get_paginate%',
    itemDisplay = '%globals_get_itemDisplay%',
    error = [{"title": "Whoops", "body": "It borked!"}]; // This variable just has to be present as a JSON object for the error template to work - it doesn't actually output anywhere

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

// Converts timestamps to specific moment.js formats as specified: http://momentjs.com/docs/#/displaying/format/
Handlebars.registerHelper('dateTimeFormatter', function(dateTime, format) {
    return moment(dateTime).format(format);
});

// Can be applied to fields to display elipsis once a specified character limit is reached
Handlebars.registerHelper('charLimit', function(str, limit) {
  if (str.length > limit)
    return str.substring(0, limit) + '...';
  return str;
});

// Allows comparison between dates
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

// Tests to see if this item should be a hero or not
Handlebars.registerHelper('isItAHeroTest', function(id, options) {
    var idsArray = hero.split(',');

    for (var i = 0; i < idsArray.length; i++) {
        if (idsArray[i].trim() == id) {
            return options.fn(this);
        }
    }
    return options.inverse(this);
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

// Does it have a specific event details page
Handlebars.registerHelper('doesItHaveDetails', function(id, url) {
    var page = eventDetails.length ? eventDetails + '?event=' + id : url;
    return page;
});

// If filtering options have been specified, output them to the DOM for the onpage javascript to consume
Handlebars.registerHelper('filteringOptions', function() {
  var valuesExist = eventTags + eventType + useButton + paginate;
	if (valuesExist.length){
    return "data-eventTags='" + eventTags + "' data-paginate='" + paginate + "' data-useButton='" + useButton + "' data-eventType='" + eventType + "' data-itemDisplay='" + itemDisplay +"'";
	} 
});


// Render the template
function renderTemplate(tplTxt, context) {
    // Compile the Template
    var Template = Handlebars.compile(tplTxt);
    // Generate HTML Template
    var HTML = Template(context);
    print(HTML);
}

if (allJSON.length > 0) { // If there is data in the combined JSON page
	renderTemplate(tplTxt, allJSON);
} else { // If there is no data, display an error page
	renderTemplate(tplTxtNoResults, error);
}