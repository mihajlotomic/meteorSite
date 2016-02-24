Websites = new Mongo.Collection("websites");
// Records ids from search results - make it global for access across 
// various templates and functions.
Websites_Search = new Mongo.Collection("null");  //stored only on client with null