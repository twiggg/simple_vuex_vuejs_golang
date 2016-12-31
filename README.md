# simple_vuex_vuejs_golang

This project uses webpack to bundle all js and css modules together, compile the
production ready .js files, .css files and vue.js components.


Parts:
1) golang web server (following appengine constraints, start it by "goapp serve" but it can easily be 
made standard be renaming the init() function to main() )
2) html templates
3) vue.js app (embedded in the /dist/app.js)

The store (global) is prepopulated by compiling an html template and injecting js script containing the store's initial state.

At initial commit, store is updated when pressing the button (check in console logs) but interface is not updated ... seems to be
a problem with reactivity model.
