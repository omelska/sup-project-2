let tableId;

$(".tables").on("click", event => {
  tableId = event.target.getAttribute("value");

  $("#allTables").attr("class", "hide");
  $("#menu").removeAttr("class", "hide");
});

let displayButtons = () => {
  displayOrder();
  $.get("/api/menu").then(res => {
    res.forEach(element => {
      if (!element.restaurantId) {
        alert("Your session time run out");
      }
      let button = $("<button>");
      button.attr("class", "btn btn-info menu-item flex-wrap top-margin");
      button.attr("title", element.name);
      button.attr("value", element.id);
      button.text(element.name);
      $("#resultDiv").append(button);
    });
    addToOrder();
  });
};

let addToOrder = () => {
  $(".menu-item").on("click", event => {
    let selected = event.target.getAttribute("value");

    $.get("api/menu").then(res => {
      res.forEach(element => {
        if (element.id === parseInt(selected)) {
          console.log("yay");
          let addToOrder = {
            item: element.name,
            itemQty: 1,
            price: element.retailPrice,
            TableId: tableId
          };
          price += element.retailPrice;
          console.log("Adding to order price status ", price);
          wholesale += element.wholesalePrice;
          let item = $("<p>").text(element.name);
          item.attr("class", "item");

          let retailPrice = $("<span>").text(`$${element.retailPrice}.00`);
          retailPrice.attr("class", "right-price");

          item.append(retailPrice);
          $("#result").append(item);

          console.log("add to order ", addToOrder);
          $.post("/api/orders", addToOrder).then(response => {
            console.log("successfully", response);
          });
        }
      });
      taxAmount = price * tax; //total tax
      total = price + taxAmount; //Final amount

      $("#total").html(price);
      $("#tax").html(taxAmount.toFixed(2));
      $("#totalAmount").html(total.toFixed(2));
    });
  });
};

let addToReport = () => {
  $("#pay").on("click", () => {
    let newSale = {
      expenses: wholesale,
      sales: total
    };
    $.post("/api/sales", newSale).then(res => {
      console.log("seccess ", res);
    });
    $.ajax({
      url: "/api/orders/" + tableId,
      type: "DELETE",
      success: result => {
        console.log("deleted order");
      }
    });
  });
};
displayButtons();
addToReport();
