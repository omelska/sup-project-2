let addNewFoodItem = () => {
  let allergiesArr = []; //to store all the possible allergies on each food item
  let allowModification = []; //too store true/false if modification is possible

  const allergies = document.getElementsByClassName("allergy");
  for (let i = 0; i < allergies.length; i++) {
    if (allergies[i].checked) {
      let value = allergies[i].getAttribute("value");
      allergiesArr.push(value);
    }
  }

  const modifications = document.getElementsByClassName("modifications");
  for (let i = 0; i < modifications.length; i++) {
    console.log(modifications[i]);
    const value = modifications[i].value;
    if (value !== "") {
      //if it's marked as yes, or no
      allowModification.push(value); // add values to the array
    }
  }

  let newFood = {
    name: $("#name").val(),
    wholesalePrice: $("#wholesalePrice").val(),
    retailPrice: $("#retailPrice").val(),
    stockQty: $("#stockQty").val(),
    allergies: allergiesArr.toString(), //the only way to push an array into mySQL DB if convert it into string
    modifications: allowModification.toString() //same here
  };
  console.log("NEW FOOD ", newFood);
  $.post("/api/food", newFood).then(response => {
    console.log("successfully");
  });
};

$("#submit").on("click", addNewFoodItem);
$("#add").on("click", addNewFoodItem);
