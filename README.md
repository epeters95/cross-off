# Cross-Off

Cross-Off is a front-end heavy project organizer app modeled off of Trello.

The main functionality includes creating and managing projects, which are each represented by a row of goals, which in turn consist of a list of tasks.  Here are some features...

* User authentication via session token
* Create/remove projects
* Create/remove goals and tasks within project view
* Drag, drop & swap everything within project view
* Cross & uncross tasks
* Single-page!

## Notable tech

* jQuery UI's Sortable for easy dragging and dropping within Backbone.js
* Use of a CompositeView structure; nested views match nested API resources
* Responsive crossing/uncrossing without the use of SASS or CSS variables (check out app/assets/templates/cards/show.jst.ejs)

