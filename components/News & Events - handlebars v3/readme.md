##Updating to news and events combined Version 3

1./ (if used) Update "events.unimelb" remote feed asset to use the truncated feed 
	- remove the &full=true from the end

2./ create new "Combined feed references" page in site config
	- clone: Combined listing page (Id: #2062228)
	- update with relevant references
	- check it has override front-end design (on settings screen) of: JSON (Id: #2058607)
	- check it has an override paint layout of: Correct when events.unimelb missing (Id: #2062731)
	- preview to make sure it looks ok.

3./ (if used) Update in-site "single events.unimelb event detail page"
	- from: Single events.unimelb event processor (Id: #2042493)
	- to: Single events.unimelb event processor (Id: #2060412)

4./ Update in-site "Combined listing page" 
	- from: Combined listing processor (Id: #2041710)
	- to: Combined listing processor (Id: #2060422) 
		AND
	- from: Show more button (Id: #2055735)
	- to: Apply filtering button options (Id: #2067520)
		AND
	- Update "combinedFeedID" variable to new "Combined feed references" page created above
	- Configure variables 
		- if button used, include "useButton" = true
		- see https://cms.unimelb.edu.au/controlled-environment/guide/new-how-to-manage-your-news-and-events-block-listing/

5./ Preview and test
	- Check list displays as expected (you may need to recache a couple of times)
	- Check events.unimelb event detail page is displaying ok
	- Check button is working as expected
