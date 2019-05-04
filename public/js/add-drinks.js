console.log("inside add Driink");
let addNewDrink = ()=>{
    console.log("CLICKED")

    let newDrink = {
    name: $("#name").val(),
    wholesalePrice: $("#wholesalePrice").val(),
    retailPrice: $("#retailPrice").val()
    };
    console.log("NEW DRINK ", newDrink);
    $.post("/api/drinks", newDrink).then(response => {
        console.log("successfully");
    });
}

$("#add").on("click", addNewDrink);
$("#submit").on("cliick", addNewDrink);


