<!-- Displaying results by tag -->
<ul class="block-listing">
{{#displayByDate this}}
  <!--@@ News Output HERE @@-->
  {{#if type}}
    {{#isItAHeroTest id}}
      <!--@@ News Hero @@-->
      <li class="event double {{whatIndex @index}}" style="background-image: url({{img_url}});" data-tag="{{type}}">
        <a href="{{../link}}" class="block-container">
          <div class="top-unit">
            <strong>{{charLimit title 40}}</strong>
            <span href="" class="button-hero-inverse"> Read more</span>
          </div>
        </a>
      </li>
    {{else}}
      <!--@@ News Default @@-->
      <li class="news {{whatIndex @index}}" data-tag="{{type}}">
        <!-- Id: {{id}} -->
        <!-- Days Away: {{daysAwayToday start_time type}} --> 
        <div class="block-container">
          <div class="top-unit">
            <a href="{{link}}">
              {{#if img_url}}
                <div class="crop-height">
                    <img src="{{img_url}}" alt="{{title}}" />
                </div>
              {{else}}
                <div style="height: 15px;"></div>
              {{/if}}
              <strong>{{charLimit title 100}}</strong>
              <p>{{description_text}}</p>
            </a>
          </div>
          <div class="meta">
            <time class="meta-left" datetime="{{start_time_readable}}">
              {{start_time_readable}}
            </time>
            <em class="meta-right">News</em>
          </div>
        </div>
      </li>
    {{/isItAHeroTest}}

  {{else}}
  %begin_globals_get_tag%

      {{#each tags}}
        {{#ifIn name "%globals_get_tag%"}}
          {{#isItOlderThenDay ../start_time ../event_type}}
            <!--@@ Events by tag @@-->
            {{#isItAHeroTest id}}
              <!--@@ Events Hero @@-->
              <li class="event double {{whatIndex @index}}" style="background-image: url({{../img_url}});" data-type="{{../event_type}}" data-public="{{../public}}">
                <a href="{{doesItHaveDetails ../id ../link}}" target="{{doesItNeedNewWindow ../id ../link}}" class="block-container">
                  <div class="top-unit">
                    <strong>{{charLimit ../title 40}}</strong>
                    <span href="" class="button-hero-inverse"> Read more</span>
                  </div>
                </a>
              </li>
            {{else}}
              <!--@@ Events Default @@-->
              <li class="event {{whatIndex @index}}" data-tag="{{../event_type}}" data-public="{{../public}}">
                <!-- Id: {{../id}} -->
                <!-- Days Away: {{daysAwayToday ../start_time ../type}} --> 
                <!-- Tag: {{name}} -->
                <a href="{{doesItHaveDetails ../id ../link}}" target="{{doesItNeedNewWindow ../id ../link}}" class="block-container">
                  <div class="{{#if ../img_url}} top-unit {{else}} top-unit no-image {{/if}}">
                    <div class="when">
                      {{formatDateDay ../start_time}}
                      <time datetime="{{formatDateDMY ../start_time}}">
                          {{formatDateDMY ../start_time}}
                      </time>
                      {{formatDateTime ../start_time}} - {{formatDateTime ../end_time}}
                    </div>
					<div class="mid-unit">
                    	<strong>{{charLimit ../title 100}}</strong>
					</div>
					<!-- add image note best image ratio = 3:2 -->
					{{#if ../img_url}}
					<div class="crop-height">
					    <img alt="{{../title}}" src="{{../image_versions.w1000xh500}}" />
                	</div>
              		{{/if}}	
					
                  </div>
                  <div class="meta">
                  <!--  <span class="meta-left">

                      {{#if ../location.address}}
                      {{../location.address}}<br>
                      {{/if}}
                      {{#if ../location.building}}
                      {{../location.building}}<br>
                      {{/if}}
                      {{#if ../location.room_or_theatre}}
                      {{../location.room_or_theatre}}
                      {{/if}}
                    </span> -->
                    <em class="meta-right">
                        {{#if_eq ../event_type "Other"}}
                           Event
                        {{else}}
                            {{../event_type}}
                        {{/if_eq}}
                    </em>
                  </div>
                </a>
              </li>
            {{/isItAHeroTest}}

          {{/isItOlderThenDay}}
        {{/ifIn}}
      {{/each}}
      
  %else_globals_get_tag%
  	  {{#isItOlderThenDay ../start_time ../event_type}}
        {{#isItAHeroTest id}}
          <!--@@ Events All Hero @@-->
          <li class="event double {{whatIndex @index}}" style="background-image: url({{img_url}});" data-type="{{event_type}}" data-public="{{public}}">
            <a href="{{doesItHaveDetails id link}}" target="{{doesItNeedNewWindow id link}}" class="block-container">
              <div class="top-unit">
                <strong>{{charLimit title 40}}</strong>
                <span href="" class="button-hero-inverse"> Read more</span>
              </div>
            </a>
          </li>
        {{else}}
          <!--@@ Events All Default @@-->
          <li class="event {{whatIndex @index}}" data-tag="{{event_type}}" data-public="{{public}}">
            <!-- Id: {{id}} -->
            <!-- Days Away: {{daysAwayToday start_time type}} --> 
            <div class="{{#if ../img_url}} top-unit {{else}} top-unit no-image {{/if}}">
                    <div class="when">
                      {{formatDateDay ../start_time}}
                      <time datetime="{{formatDateDMY ../start_time}}">
                          {{formatDateDMY ../start_time}}
                      </time>
                      {{formatDateTime ../start_time}} - {{formatDateTime ../end_time}}
                    </div>
					<div class="mid-unit">
                    	<strong>{{charLimit ../title 100}}</strong>
					</div>
					<!-- add image note best image ratio = 3:2 -->
					{{#if ../img_url}}
					<div class="crop-height">
					    <img alt="{{../title}}" src="{{../image_versions.w1000xh500}}" />
                	</div>
              		{{/if}}	
					
                  </div>
                  <div class="meta">
                  <!--  <span class="meta-left">

                      {{#if ../location.address}}
                      {{../location.address}}<br>
                      {{/if}}
                      {{#if ../location.building}}
                      {{../location.building}}<br>
                      {{/if}}
                      {{#if ../location.room_or_theatre}}
                      {{../location.room_or_theatre}}
                      {{/if}}
                    </span> -->
                    <em class="meta-right">
                        {{#if_eq ../event_type "Other"}}
                           Event
                        {{else}}
                            {{../event_type}}
                        {{/if_eq}}
                    </em>
                  </div>
          </li>
        {{/isItAHeroTest}}
      
      {{/isItOlderThenDay}}
  %end_globals_get_tag%
  {{/if}}
{{/displayByDate}}
</ul>
{{#each this}}
    %begin_globals_get_tag%
        {{#ifEqualsWithTag public true event_type}}
            <!--@@ See 1661555 JS file for button @@-->
        {{/ifEqualsWithTag}}
    %else_globals_get_tag%
        {{#ifEqualsWithoutTag public true}}
            <!--@@ See 1661555 JS file for button @@-->
        {{/ifEqualsWithoutTag}}
    %end_globals_get_tag%
{{/each}}