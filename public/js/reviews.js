// Get references to page elements
var $reviewText = $("#review-text");
var $title = $('#search')
var $reviewDescription = $("#review-description");
var $submitBtn = $("#submit");
var $reviewList = $("#review-list");
var $searchBtn = $("#search-btn");
// The API object contains methods for each kind of request we'll make
var API = {
  saveReview: function (review) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/reviews",
      data: JSON.stringify(review)
    });
  },
  getReviews: function () {
    return $.ajax({
      url: "api/reviews",
      type: "GET"
    });
  },
  deleteReview: function (id) {
    return $.ajax({
      url: "api/reviews/" + id,
      type: "DELETE"
    });
  },
  getReviewByTitle: function (title) {
    return $.ajax({
      url: "api/reviews/" + title,
      type: "GET"
    });
  }
};

// refreshReviews gets new reviews from the db and repopulates the list
var refreshReviews = async function () {
  let data = await API.getReviewByTitle($title.val());
  console.log($title);
  console.log(data)
  var $reviews = data.map(function (review) {
    var $a = $("<a>")
      .text(review.titleDescription)
      .attr("href", "/review/" + review.id);

    var $li = $("<li>")
      .attr({
        class: "list-group-item",
        "data-id": review.id
      })
      .append($a);

    var $button = $("<button>")
      .addClass("btn btn-danger float-right delete")
      .text("ｘ");

    $li.append($button);

    return $li;
  });

  $reviewList.empty();
  $reviewList.append($reviews);

};

// handleFormSubmit is called whenever we submit a new review
// Save the new review to the db and refresh the list
var handleFormSubmit = function (event) {
  event.preventDefault();

  var review = {
    title: $title.val().trim(),
    titleDescription: $reviewDescription.val().trim()
  };
  console.log(review)

  if (!(review.titleDescription)) {
    alert("You must enter an review text and description!");
    return;
  }

  API.saveReview(review).then(function () {
    refreshReviews();
  });

  // $reviewText.val("");
  $reviewDescription.val("");
};

// handleDeleteBtnClick is called when an review's delete button is clicked
// Remove the review from the db and refresh the list
var handleDeleteBtnClick = function () {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteReview(idToDelete).then(function () {
    refreshReviews();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$reviewList.on("click", ".delete", handleDeleteBtnClick);
$searchBtn.on("click", refreshReviews);