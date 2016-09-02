##Updating to news and events combined Version 3

1./ (if used) Update "events.unimelb" remote feed asset to use the truncated feed 
- remove the &full=true from the end

2./ create new "Combined feed references" page in site config
- clone: "v3 - Combined feed references (Id: #2062681)
- update with relevant references
- preview to make sure it looks ok
- make it live

3./ (if used) Update in-site "single events.unimelb event detail page"
- from: "v2 - Single events.unimelb event processor" (Id: #2042493)
- to: "v3 - Single events.unimelb event processor" (Id: #2060412)

4./ Update in-site "Combined listing page" 
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

5./ Preview and test
- Check list displays as expected (you may need to recache a couple of times)
- Check events.unimelb event detail page is displaying ok
- Check button is working as expected
