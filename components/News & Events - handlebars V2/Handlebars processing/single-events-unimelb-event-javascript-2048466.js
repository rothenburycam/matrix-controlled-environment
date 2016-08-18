var data = JSON.parse(_REST.responses[0].body),
    tplTxt = '%globals_asset_contents_raw:2042499^json_encode%';

// Formatters - See datetime formatting here: http://momentjs.com/docs/#/displaying/format/
Handlebars.registerHelper('formatDateDMY', function(date) {
    return moment(date).format('Do MMM YYYY'); // 26th Sep 2016
});
Handlebars.registerHelper('formatDateDM', function(date) {
    return moment(date).format('D MMM'); // 26 Sep
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
Handlebars.registerHelper('formatDateTime24hrs', function(date) {
    return moment(date).format('HH:mm'); // 9:05am
});
Handlebars.registerHelper('formatDateD', function(date) {
    return moment(date).format('D'); // day with no prefix zeros: 1, 4, 17 etc
});
Handlebars.registerHelper('formatDateDo', function(date) {
    return moment(date).format('Do'); // 1st, 2nd etc
});
Handlebars.registerHelper('formatDateMMM', function(date) {
    return moment(date).format('MMM'); // Jan, Feb etc
});
Handlebars.registerHelper('formatDateY-M-D', function(date) {
    return moment(date).format('YYYY-M-D'); // 2016-05-26
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