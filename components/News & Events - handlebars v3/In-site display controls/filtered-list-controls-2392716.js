var cssId = 'filteredListingCSS';
if (!document.getElementById(cssId))
{
    var head  = document.getElementsByTagName('head')[0];
    var link  = document.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = './?a=1673063';
    link.media = 'all';
    head.appendChild(link);
}

var jQueryId = 'filteredListingJS';
if (!document.getElementById(jQueryId))
{
    var body  = document.getElementsByTagName('body')[0];
    var link  = document.createElement('script');
    link.id   = jQueryId;
    link.type = 'text/javascript';
    link.src = '//cms.unimelb.edu.au/__data/assets/js_file_folder/0009/2392839/filtered-list.min.js';
    body.appendChild(link);
}