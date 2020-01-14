$(document).ready(function() {
  function queryTitle() {
    $(".searchBtn").click(async function() {
      event.preventDefault();
      $("#demo").show(3000);
      var title = $("#search")
        .val()
        .toLowerCase()
        .trim();

      // Utelly API
      var utellySettings = {
        async: true,
        crossDomain: true,
        url:
          "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" +
          title +
          "&country=us",
        method: "GET",
        headers: {
          "x-rapidapi-host":
            "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
          "x-rapidapi-key": "4b80910d9dmsh8a9256a3899e86dp1a4833jsn5a812c1cd91d"
        }
      };

      // Box Office Buzz API
      var buzzSettings = {
        async: true,
        crossDomain: true,
        url: "https://box-office-buz1.p.rapidapi.com/search/all/" + title,
        method: "GET",
        headers: {
          "x-rapidapi-host": "box-office-buz1.p.rapidapi.com",
          "x-rapidapi-key": "58413d0da3msh294865d218365bbp1b32e7jsn4bd71427e228"
        }
      };

      if (title === "") {
        $("#results").hide();
        return false;
      }
      try {
        const response = await $.ajax(utellySettings);
        console.log(response);
        console.log(`----------------------`);
        console.log(response.results[0].name);

        var platform = response.results[0].locations;

        $("#results").empty();

        var searchResultsDiv = $("<div class='col-12 search-results-title'>");

        var showTitle = response.results[0].name;
        var pOne = $("<h5 class='search-card-title'>").text(showTitle);
        // pOne.addClass('card mx-auto', 'card-body');
        searchResultsDiv.append(pOne);

        const res = await $.ajax(buzzSettings);
        console.log(`========================`);
        console.log(res.results[0].synopsis);
        var description = res.results[0].synopsis;
        var pThree = $("<p class='search-card-text'>").text(description);
        pThree.addClass("card mx-auto", "card-body");
        searchResultsDiv.append(pThree);

        for (var i = 0; i < platform.length; i++) {
          console.log(platform[i].display_name);
          console.log(platform[i].url);

          var resultsDiv = $(
            "<div class='resultsDiv col-6 col-md-4 col-lg-3 mb-4'>"
          );

          //   var showTitle = response.results[0].name;
          //   var pOne = $("<h5 class='card-title'>").text(showTitle);
          //   // pOne.addClass('card mx-auto', 'card-body');
          //   resultsDiv.append(pOne);

          var platformName = platform[i].display_name;
          var pTwo = $("<h6 class='card-subtitle mb-2 text-muted'>").text(
            "Platform: " + platformName
          );
          pTwo.addClass("card mx-auto", "card-body");
          resultsDiv.append(pTwo);

          //   const res = await $.ajax(buzzSettings);
          //   console.log(`========================`);
          //   console.log(res.results[0].synopsis);
          //   var description = res.results[0].synopsis;
          //   var pThree = $("<p class='card-text'>").text(
          //     "Description: " + description
          //   );
          //   pThree.addClass("card mx-auto", "card-body");
          //   resultsDiv.append(pThree);

          var url = platform[i].url;
          var aOne = $(
            '<a href="#" target="_blank" class="card-link centered">Watch Now!</a>'
          ).attr("href", url);
          // var aOne = $("<p class='card-text'>").text("URL: " + url);
          aOne.addClass("card mx-auto", "card-body");
          resultsDiv.append(aOne);

          $("#results").prepend(resultsDiv);
        }
        $("#results").prepend(searchResultsDiv);
      } catch (err) {
        console.error(err);
      }
    });
  }

  //   function addReviews() {}
  queryTitle();
  //   addReviews();
});
