//Server side code
console.log("http running")

Meteor.methods({
    checkSite: function (siteUrl) {
    //Code taken from stackoverlow http://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-an-url    
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if(!regex.test(siteUrl)) {
        return false;
    } 
    this.unblock();
    try {
        console.log(siteUrl)
        var result = HTTP.call("GET", siteUrl);
        console.log("http complete!!!")
        //console.log(result.content  )
        return result;

     } 
     catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }
    },
    deleteWebsite: function (objId) {
      Websites_Search.remove(objId);
    } 
 }
);    


// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
// code to run on server at startup
    if (!Websites.findOne()){
        console.log("No websites yet. Creating starter data.");
        Websites.insert({
            title:"Goldsmiths Computing Department", 
            url:"http://www.gold.ac.uk/computing/", 
            description:"This is where this course was developed.", 
            createdOn:new Date()
        });
        Websites.insert({
            title:"University of London", 
            url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route", 
            description:"University of London International Programme.", 
            createdOn:new Date()
        });
        Websites.insert({
            title:"Coursera", 
            url:"http://www.coursera.org", 
            description:"Universal access to the world’s best education.", 
            createdOn:new Date()
        });
        Websites.insert({
            title:"Google", 
            url:"http://www.google.com", 
            description:"Popular search engine.", 
            createdOn:new Date()
        });
    }
});