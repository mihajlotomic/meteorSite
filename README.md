##Trying out the Meteor framework for the first time. 

###Started as a Coursera Course assignment which then became a sandbox for testing features.

This was a project done for Coursera in a certification series named "Responsive Web Design".

The website allows for users to enter websites and up and down vote them.  Selecting the description, 
takes the user to a page where they can comment on the site.  Search functionality is fully available as well. 



Currently the project supports the following features:

1. User login and authentication - all be it in an insecure way.
2. Server side mongo database updating 
3. Use of the http library to auto-populate fields. 
4. Custom search capability. 


ToDo:

1. ~~Finish the search bar functionality - trying to share the _ids to a helper function is currently the limitation.~~
1. Instead of using alerts use more modern Bootstrap capabilities.
1. ~~Implement security and server side validation so it can actually be deployed.~~
1. ~~Clean-up directory structure for separated client, server, and common code.~~

To Run:

1. Git pull
2. meteor - the meteor framework must be installed first - however it will handle all dependencies once it's already installed. 
3. Starts with a pre-populated database if nothing is added - use meteor reset to restart. 



