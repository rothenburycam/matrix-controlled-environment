var eventsJSON = JSON.parse(_REST.responses[0].body),
    newsJSON = '%globals_get_news^as_asset:asset_contents_raw^json_encode%',
    tplTxtDefault = '%globals_asset_contents_raw:1662159^json_encode%',
    tplTxtTag = '%globals_asset_contents_raw:1673277^json_encode%',
    eventType = '%globals_get_type%',
    eventTag = '%globals_get_tag%',
    eventDetails = '%globals_get_event_details^as_asset:asset_url%',
    eventFilter = '%globals_get_public%';
    hero = '%globals_get_hero%',
    positionCounter = 1,
    liveResutsCount = 1,
    maxRowCustom = '%globals_get_paginate%',
    maxRow = 15;

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

// Formatters
Handlebars.registerHelper('formatDateDMY', function(date) {
    return moment(date).format('D MMM YYYY');
});
Handlebars.registerHelper('formatDateDay', function(date) {
    return moment(date).format('dddd');
});
Handlebars.registerHelper('formatDateTime', function(date) {
    return moment(date).format('h:mma');
});
Handlebars.registerHelper('charLimit', function(str, limit) {
  if (str.length > limit)
    return str.substring(0, limit) + '...';
  return str;
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

// Check if the item is 24 hours older then current date
// Use CSS to display none
Handlebars.registerHelper('isItOlderThenDay', function(val, type, options) {
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

// If Equals value helper
Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) // Or === depending on your needs
        return opts.fn(this);
    else
        return opts.inverse(this);
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

// Show 'load more' button if there's more then 15 items (maxRow)
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
