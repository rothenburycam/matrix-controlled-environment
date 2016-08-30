var data = JSON.parse(_REST.responses[0].body), 
    tplTxt = '%globals_asset_contents_raw:2060418^json_encode%'; // ID of the template to be used with this script

// Converts timestamps to specific moment.js formats as specified: http://momentjs.com/docs/#/displaying/format/
Handlebars.registerHelper('dateTimeFormatter', function(dateTime, format) {
    return moment(dateTime).format(format);
});


// Converts timestamps to specific moment.js formats as specified: http://momentjs.com/docs/#/displaying/format/
Handlebars.registerHelper('dateTimeFormatter', function(dateTime, format) {
    return moment(dateTime).format(format);
});

Handlebars.registerHelper('compareDates', function(lvalue, rvalue, options) { 
    var startDate = moment(lvalue).format("YYYYMMDD");
    var endDate = moment(rvalue).format("YYYYMMDD");

    var operator = options.hash.operator;

    var operators = {
        '==':       function(startDate,endDate) { return startDate == endDate; },
        '<':        function(startDate,endDate) { return startDate < endDate; },
        '>':        function(startDate,endDate) { return startDate > endDate; }
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

// Render the template
function renderTemplate(tplTxt, context) {
    // Compile the Template
    var Template = Handlebars.compile(tplTxt);
    // Generate HTML Template
    var HTML = Template(context);
    print(HTML);
}

renderTemplate(tplTxt, data);