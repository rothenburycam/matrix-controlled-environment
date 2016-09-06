##Updating to news and events combined Version 3 - single instance on a page

1./ create new "Combined feed references" page in site config
- clone: "v3 - Combined feed references (Id: #2062681)
- update with relevant references
- preview to make sure it looks ok
- make it live

2./ (if used) Update in-site "single events.unimelb event detail page"
- from: "v2 - Single events.unimelb event processor" (Id: #2042493)
- to: "v3 - Single events.unimelb event processor" (Id: #2060412)

3./ Update in-site "Combined listing page" 
- from: "v2 - Combined listing processor" (Id: #2041710)
- to: "v3 - Combined listing processor" (Id: #2060422) 

AND

- from: "v2 - Show more button" (Id: #2055735)
- to: "v3 - Apply filtering button options" (Id: #2067520)

AND

- Update "combinedFeedID" variable to new "v3 - Combined feed references" page created above (in Step 2)
- Configure variables 
- if button used, include "useButton" = true
- see https://cms.unimelb.edu.au/controlled-environment/guide/new-how-to-manage-your-news-and-events-block-listing/

4./ Preview and test
- Check list displays as expected (you may need to recache a couple of times)
- Check events.unimelb event detail page is displaying ok
- Check button is working as expected

##Updating to news and events combined Version 3 - multiple instances on a page (including tabs)
**This process is required where more than one combined listing is used on a page (ie - one listing on two different tabs, or two listings on a single page)**
1./ create new "Combined feed references" page in site config
- if different feed combinations are required for multiple listings, repeat this step for each one
- clone: "v3 - Combined feed references (Id: #2062681)
- update with relevant references
- preview to make sure it looks ok
- make it live

2./ For each listing on the page, create a clone of "v3 - Single events.unimelb event processor" (Id: #2060412) in the site config folder
- name it something identifiable (ie - "Law listing on home page - V3 - processor")
- on the details screen, update the "Http request" url from ```%globals_get_combinedFeedID^as_asset:asset_url%``` to the full URL of the relevant "Combined feed references" page created in Step 1 above (note: it must be the full URL, it can't be an asset reference).

3./ (if used) Update in-site "single events.unimelb event detail page"
- from: "v2 - Single events.unimelb event processor" (Id: #2042493)
- to: "v3 - Single events.unimelb event processor" (Id: #2060412)

3./ Update in-site "Combined listing page(s)" 
- from: "v2 - Combined listing processor" (Id: #2041710)
- to: the relevant event processor created in Step 2 above.

4./ Update the "Arbitrary paint layout" of the last instance to: "v3 - Apply filtering button options" (Id: #2067520)
- As this paint layout injects the filter/button control javascript, you only need to apply it to the page once.

5./ Remove the "Abitrary paint layout" from all earlier instances

6./ Configure variables
- Remove the "combinedFeedID" variable as this is now handled directly by the processor you've embedded (see step 2 above).
- if button used, include "useButton" = true
- see https://cms.unimelb.edu.au/controlled-environment/guide/new-how-to-manage-your-news-and-events-block-listing/

7./ Preview and test
- Check list displays as expected (you may need to recache a couple of times)
- Check events.unimelb event detail page is displaying ok
- Check button is working as expected
