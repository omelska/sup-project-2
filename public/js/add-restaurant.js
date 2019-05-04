console.log("here");
const restaurantID = "";

let createNewRestaurant = () => {
  console.log("creating");
  let newRestaurant = {
    name: $("#title").val(),
    address: $("#address").val(),
    email: $("#email").val(),
    password: $("#passwordSignIn").val()
  };
  $.post("/api/restaurants", newRestaurant).then(res => {
    console.log("sucess ", res);
  });
};

let logIntoAccount = () => {
  console.log("logging");
  let restaurantUser = {
    email: $("#userEmail").val(),
    password: $("#userPassword").val()
  };
  $.post("/api/auth/login", restaurantUser).then(res => {
    console.log("sucess ", res);
    $("#linkToRestaurant").attr("href", "/tables");
  });
};

$("#create").on("click", createNewRestaurant);
$("#submit").on("click", logIntoAccount);
