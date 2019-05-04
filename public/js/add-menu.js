console.log("adding");

let addToMenu = () => {
  const newItem = {
    name: $("#name").val(),
    wholesalePrice: $("#wholesalePrice").val(),
    retailPrice: $("#retailPrice").val(),
    stockQty: $("#stockQty").val()
  };
  console.log("new food, ", newItem);
  $.post("/api/menu", newItem).then(res => {
    console.log("successfully");
  });
};

$("#add").on("click", addToMenu);
$("#submit").on("click", addToMenu);
