/////
// template helpers 
/////

// helper function that returns all available websites
Template.website_list.helpers({
    websites:function(){
        //Update the search results to reset here
        var curs = Websites.find({});
        curs.forEach(function (curs) {                                
          //Websites_Search.remove({_id:curs._id});
          console.log("removing here");
          Meteor.call( 'deleteWebsite', curs._id);
        });                                    
        return Websites.find({},{sort:{rating:-1}    });
    }
});

Template.website_search_list.helpers({
    websites_searched:function(){                     
        return Websites_Search.find({});           
    }
});
/////
// template events 
/////
Template.website_item.events({
    "click .js-upvote":function(event){
        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        var rating = Websites.findOne({_id:website_id}).rating;
        if (rating) {
            rating += 1;
            console.log("rating "+rating);
        }
        else {
            rating = 1;
            console.log("new rating "+rating);
        }

        console.log("Up voting website with id "+website_id);
        // put the code in here to add a vote to a website!
        Websites.update({_id:website_id},
                        {$set: {rating:rating}});
        return false;// prevent the button from reloading the page
    }, 
    "click .js-downvote":function(event){

        // example of how you can access the id for the website in the database
        // (this is the data context for the template)
        var website_id = this._id;
        var downRating = Websites.findOne({_id:website_id}).downRating;
        console.log("Down voting website with id "+website_id);
        if (downRating) {
            downRating += 1;
            console.log("rating "+downRating);
        }
        else {
            downRating = 1;
        }
        // put the code in here to remove a vote from a website!
        Websites.update({_id:website_id},
                        {$set: {downRating:downRating}});
        return false;// prevent the button from reloading the page
    }
});

var post_num = 0;
Template.post_form.events({
    "submit .js-save-post-form":function(event, template){        
        var website_id = this._id;
        var post_data = event.target.description.value;
        // Global that tracks all posts so they can be inserted into db  
        console.log("Entering a post with data: "+post_data+ " post_num" + post_num + "\nwebsite_id: " + this._id);

        if (Meteor.user()) {
            console.log("update");
            Websites.update({_id:website_id},
                        {$push: { comments: post_data,
                                  posted_on: new Date() }} );
        }

        post_num += 1;     
        console.log("post_num: " + post_num + " closing event helper");
        //Reset the form contents
        template.find("form").reset();
        return false;// stop the form submit from reloading the page
    }
});

Template.navbar.events({
    "submit .js-search-navbar":function(event, template) {

        var search_str = event.target.searchbox.value;

        var search = new RegExp(search_str, 'i');

        console.log("Search string = " + search);

        var search_results = Websites.find({ $or: [{title : search }, {description: search} ]});

        var count = 0;
        search_results.forEach(function (curs) {
            console.log("_id" + count + ": " +" " + curs.title + " "+ curs._id + " " + curs.description);
            Meteor.call( 'searchUpsert', curs._id, curs );
            //Websites_Search.upsert({_id:curs._id},
            //                       { $set : {
            //                           title: curs.title,
            //                           description: curs.description} 
            //                       });
            count += 1;
        });     

    }    
})

Template.website_form.events({
    "click .js-toggle-website-form":function(event){
        $("#website_form").toggle('slow');
    }, 
    "submit .js-save-website-form":function(event){

        // here is an example of how to get the url out of the form:
        var url = event.target.url.value;
        var title = event.target.title.value;
        var description = event.target.description.value;
        console.log("The url they entered is: "+url + " " +title + " " + description);

    Meteor.call("checkSite", url, function(error, results) {
       //console.log(results.content); //results.data should be a JSON object
        if (error) {
            return false;
            alert("Error processing url")
        }
        var site = {        
            url: url,        
            title: $(results.content).filter('title').text(),
            description: $(results.content).filter(          'meta[name=description]').attr("content")
        };  
        // Update the form contents with the 
        event.target.title.value = site.title;
        if (site.description != undefined)
            event.target.description.value = site.description;              
        console.log(site.title)
        console.log(site.description)
        return site;
    });

        if (!url || !description){
            alert("URL, title, and description must be filled in - attempting to populate Title and Description based on the provided url.")
            return false;
        }

        //  put your website saving code in here!	
        if (Meteor.user()) {
            Websites.insert({
                    title:title,
                    url:url, 
                    description:description, 
                    createdOn:new Date()
            });
        }            
        //$("#website_form").toggle('hide');            
        return false;// stop the form submit from reloading the page
    }
});



/// accounts config
Accounts.ui.config({
passwordSignupFields: "USERNAME_AND_EMAIL"
});


/// routing 

Router.configure({
  layoutTemplate: 'DetailLayout'
});

Router.route('/', function () {
  this.render('navbar', {
    to:"navbar"
  });
  this.render('website_list', {
    to:"list"
  });
  this.render('website_form', {
    to:"main"
  });
});  

Router.route('/details/:_id', function () {
    this.render('navbar', {
        to:"navbar"
    });
    this.render('website_single', {
        to:"main", 
        data:function(){
            return Websites.findOne({_id:this.params._id});
        }
    });
    this.render('post_form', {
        to:"list",
        data:function(){
            return Websites.findOne({_id:this.params._id});
         }
    });
});

// Routing for search box query
Router.route('/search', function () {
    this.render('navbar', {
        to:"navbar"
    });
    this.render('website_search_list', {
        to:"main", 
        data:function(){
            return Websites_Search.find( {});
        }
    });
});