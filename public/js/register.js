var $firstName = $("#firstName");
var $lastName = $("#lastName");
var $email = $("#email");
var $password = $("#password");
var $submitBtn = $("#submit");

var API = {
  saveUser: function(register) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/register",
      data: JSON.stringify(register)
    });
  }
};

// handleFormSubmit is called whenever we submit a new review
// Save the new review to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var register = {
    firstName: $firstName.val().trim(),
    lastName: $lastName.val().trim(),
    email: $email.val().trim(),
    password: $password.val().trim()
  };

  if (!register.firstName) {
    alert("You must enter a first name");
    return;
  }

  if (!register.lastName) {
    alert("Please enter a last name");
    return;
  }

  if (!register.email) {
    alert("Please enter an email address");
    return;
  }

  if (IsEmail(email) === false) {
    $("#invalid_email").show();
    return false;
  }
  function IsEmail(email) {
    var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!regex.test(email)) {
      return false;
    } else {
      return true;
    }
  }

  if (!register.password) {
    alert("Please enter a password");
    return;
  }
  API.saveUser(register).then(function() {
    console.log("User successfully registered!");
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
