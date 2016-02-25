Websites = new Mongo.Collection("websites");
// Records ids from search results - make it global for access across 
// various templates and functions.
Websites_Search = new Mongo.Collection("websitesSearched");  


Websites.allow({
    insert:function (userId, doc) {
        console.log("allowed insert")
        return userId;        
    },
    update:function (userId, doc) {
        console.log("allowed update")        
        return userId;
    },
    remove:function (userId, doc) {
        return true;
    }    
});

Websites_Search.allow({
    insert:function (userId, doc) {
        console.log("allowed search insert")
        return true;        
    },
    update:function (userId, doc) {
        console.log("allowed search update")                
        return true;
    },
    remove:function (userId, doc) {
        console.log("allowed search remove")        
        return true;
    }     
});

//shared code
Meteor.methods({
  searchUpsert: function( id, curs ){
    Websites_Search.upsert({_id:id},
                           { $set : {
                                 title: curs.title,
                                 description: curs.description} 
                           });
  },
  deleteWebsite: function (objId) {
    Websites_Search.remove(objId);
  }, 
  deleteAllWebsite: function () {
    Websites_Search.remove({});
  } 
});