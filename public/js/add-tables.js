let addNewTable = () => {
  let newTable = {
    tableNumber: $("#tableNumber").val(),
    guestQty: $("#guestQty").val()
  };
  $.post("/api/tables", newTable).then(response => {
    console.log("Successfully", response);
  });
};

$("#save").on("click", addNewTable);
$("#finish").on("click", addNewTable);
