##Trying out the Meteor framework for the first time. 

###Started as a Coursera Course assignment which then became a sandbox for testing features.

Currently the project supports the following features:

1. User login and authentication - all be it in an insecure way.
2. Server side mongo database updating 
3. Use of the http library to auto-populate fields. 


ToDo:

1. Finish the search bar functionality - trying to share the _ids to a helper function is currently the limitation. 
  1. Kind of working at the moment - the search pattern is properly being read and the _ids of the mongo database queries are processed properly; however the reactivity of the elements is delaying the updates to the search window.  Not quite sure what the problem is here, but at least it's an improvement. 
1. Instead of using alerts use more modern Bootstrap capabilities.
1. Implement security and server side validation so it can acutally be deployed. 

To Run:

1. Git pull
2. meteor 
3. Starts with a pre-populated database if nothing is added - use meteor reset to restart. 



