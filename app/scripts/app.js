'use strict';  // throws more errors

// before we did var app = angular...
// and then declared app.controller(...
angular.module('confusionApp', [])
  .controller("MenuController", ['$scope', function($scope) {

    $scope.dishes = [
    {
     name: 'Uthapizza',
     image: 'images/uthapizza.png',
     category: 'Mains',
     label: 'Hot',
     price: '4.99',
     description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
     comment: ''
    },
    {
     name:'Zucchipakoda',
     image: 'images/zucchipakoda.png',
     category: 'Appetizers',
     label:'',
     price:'1.99',
     description:'Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce',
     comment: ''
    },
    {
     name:'Vadonut',
     image: 'images/vadonut.png',
     category: 'Appetizers',
     label:'New',
     price:'1.99',
     description:'A quintessential ConFusion experience, is it a vada or is it a donut?',
     comment: ''
    },
    {
     name:'ElaiCheese Cake',
     image: 'images/elaicheesecake.png',
     category: 'Desserts',
     label:'',
     price:'2.99',
     description:'A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms',
     comment: ''
    }
    ];

    $scope.tab = "All";  // default tab

    $scope.categories = [
      'All',
      'Mains',
      'Appetizers',
      'Desserts',
    ];

    $scope.filtText = "";  // default filtering
    $scope.orderBy = "";

    $scope.select = function(setTab) {
      $scope.tab = setTab;

      // set the filtering text
      if (setTab === "All") {
        $scope.filtText = "";  // no filter if all is selected
      } else {
        $scope.filtText = setTab;
      }
    };

    $scope.isSelected = function(tab) {
      return (tab === $scope.tab);
    };

    $scope.setOrderBy = function(order) {
      if (order === "None") {
        $scope.orderBy = "";
      } else {
        $scope.orderBy = order;
      }
    };

    $scope.showDetails = true;
    $scope.toggleDetails = function() {
      $scope.showDetails = !$scope.showDetails;
    };
  }])  // end MenuController

  .controller("ContactController", ["$scope", function($scope) {
    $scope.feedback = {myChannel: "", firstName: "", lastName: "",
                       agree: false, email: ""};
    $scope.channels = [{value: "tel", label: "Tel."},
                       {value: "Email", label: "Email"}];
    $scope.invalidChannelSelection = false;
  }])  // end ContactController

  .controller('FeedbackController', ['$scope', function($scope) {

    $scope.sendFeedback = function() {
      console.log($scope.feedback);

      if ($scope.feedback.agree && ($scope.feedback.mychannel == "")) {
        $scope.invalidChannelSelection = true;
        console.log('incorrect');
      } else {
        // reset form
        $scope.invalidChannelSelection = false;
        $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
        $scope.feedback.mychannel="";
        $scope.feedbackForm.$setPristine();
        console.log($scope.feedback);
      }
    };
  }])

  .controller('DishDetailController', ["$scope", function($scope) {
    $scope.order = "";
    $scope.dish = {
        name: 'Uthapizza',
        image: 'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: '4.99',
        description:'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
         comments: [
           {
             rating:5,
             comment:"Imagine all the eatables, living in conFusion!",
             author:"John Lemon",
             date:"2012-10-16T17:57:28.556094Z"
           },
           {
             rating:4,
             comment:"Sends anyone to heaven, I wish I could get my mother-in-law to eat it!",
             author:"Paul McVites",
             date:"2014-09-05T17:57:28.556094Z"
           },
           {
             rating:3,
             comment:"Eat it, just eat it!",
             author:"Michael Jaikishan",
             date:"2015-02-13T17:57:28.556094Z"
           },
           {
             rating:4,
             comment:"Ultimate, Reaching for the stars!",
             author:"Ringo Starry",
             date:"2013-12-02T17:57:28.556094Z"
           },
           {
             rating:2,
             comment:"It's your birthday, we're gonna party!",
             author:"25 Cent",
             date:"2011-12-02T17:57:28.556094Z"
           }

         ]
    };

    $scope.starsIter = function(rating, empty) {
      var r = (empty === true) ? 5 - rating : rating;
      var a = [];
      for (var i = 0; i < r; i++) {
        a.push(i);
      }
      return a;
    };

  }])

  .controller("DishCommentController", ["$scope", function($scope) {

    function resetForm() {
      $scope.comment = "";
      $scope.rating = 5;
      $scope.author = "";
    }
    resetForm();  // initialise

    $scope.submitComment = function() {
      // Push into the dish's comment array
      $scope.dish.comments.push(
        {rating: parseInt($scope.rating), comment: $scope.comment,
         author: $scope.author, date: new Date().toISOString()}
       );

      // reset form and make pristine
      resetForm();
      $scope.commentForm.$setPristine();
    };
  }])
;  // end angular module declaration (and controllers)
