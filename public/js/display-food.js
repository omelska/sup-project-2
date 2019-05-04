let priceArr = []; //to store all the prices;
let expencesArr = []; //to store all the wholesale prices;
let tax = 0.08875;
let price = 0,
  wholesale = 0,
  taxAmount = 0,
  sum = 0,
  total = 0; //for calculations
let dishParagraph = $("<p>");
let priceParagraph = $("<span>");
const tableId = 1;

let clickConter = 0;
$("#total").html(sum);
$("#tax").html(taxAmount.toFixed(2));
$("#totalAmount").html(total.toFixed(2));

$.get("api/orders").then(res => {
  console.log("getting API");
  res.forEach(element => {
    // if (element.TableId === tableId) {
    if (selected === element.item) {
      dishParagraph.text(element.item).attr("class", "item");
      priceParagraph.text(`$${element.price}.00`).attr("class", "right-price");
      dishParagraph.append(priceParagraph);
      $("#result").append(dishParagraph);
      price += element.price;
    }
    // }
  });
  taxAmount = price * tax; //total tax
  total = price + taxAmount; //Final amount

  $("#total").html(price);
  $("#tax").html(taxAmount.toFixed(2));
  $("#totalAmount").html(total.toFixed(2));
});

$(".food-item").on("click", event => {
  let selected = event.target.value;
  console.log("selected, ", selected);
  clickConter++;
  console.log("Clicked", clickConter);

  $.get("/api/food").then(res => {
    res.forEach(element => {
      if (selected === element.name) {
        dishParagraph.text(element.name).attr("class", "item");
        priceParagraph
          .text(`$${element.retailPrice}.00`)
          .attr("class", "right-price");
        dishParagraph.append(priceParagraph);
        $("#result").append(dishParagraph);
        price += element.retailPrice;
        newOrder = {
          item: element.name,
          itemQty: 1,
          price: element.retailPrice
        };
        console.log("NEW ORDER", newOrder);
        $.post("/api/orders", newOrder).then(respone => {
          console.log("response successfully ", res);
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
