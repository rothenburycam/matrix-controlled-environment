<div class="detail">
  <div class="upper">
    <aside>
      <div class="when">
        <time datetime="2014-09-01">
            {{formatDateDay start_time}}
            <strong class="date">{{formatDateDo start_time}}</strong>
            <strong class="month">{{formatDateMMM start_time}}</strong>
            {{formatDateYYYY start_time}}
        </time>
        <time datetime="{{formatDateTime start_time}}">{{formatDateTime start_time}} - {{formatDateTime end_time}}</time>
      </div>
    </aside>
    {{#if image_versions}}
    <img alt="Photo of my event" src="{{image_versions.w1000xh500}}" />
    {{/if}}
  </div>
  <div class="lower">
    <aside>
      {{#if location}}    
      <div>
        <p>
          {{location.room_or_theatre}}<br />
          {{location.building}}<br />
          {{location.address}}
        </p>
        <a target="_blank" class="button-small" href="https://www.google.com/maps/search/{{location.building}} {{location.address}}">
            Map
            <span class="small" data-icon="location"></span>
        </a>
      </div>
      {{/if}}
      <div>
        <ul class="social-links">
          <li>
            <a href="#"><span class="small icon--hide-label" data-icon="twitter">Share on Twitter</span></a>
          </li>
          <li>
            <a href="#"><span class="small icon--hide-label" data-icon="facebook">Share on Facebook</span></a>
          </li>
          <li>
            <a href="#"><span class="small icon--hide-label" data-icon="linkedin">Share on LinkedIn</span></a>
          </li>
        </ul>
      </div>
      <div>
        {{#if information.phone}}
        <p>
          T: {{information.phone}}
        </p>
        {{/if}}
        {{#if information.email}}
        <p>
          <a href="mailto:{{information.email}}">{{information.email}}</a>
        </p>
        {{/if}}
      </div>
    </aside>
    <h2>
      {{title}}
    </h2>
    {{{description_html}}}

    {{#each presenters}}
    <div class="presenters">
      <strong>Presenters</strong>
      <a href="">{{title}} {{first_name}} {{last_name}}</a>
    </div>
    {{/each}}
  </div>
</div>