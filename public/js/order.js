let tax = 0.08875;
let price = 0,
  wholesale = 0,
  taxAmount = 0,
  sum = 0,
  total = 0; //for calculations

let displayOrder = () => {
  console.log("displaying order");
  let url = "/api/orders/" + tableId;
  console.log("url", url);
  $.get(url).then(res => {
    res.forEach(element => {
      console.log("Display order response ", res);
      let p = $("<p>").attr("class", "item");
      let span = $("<span>").attr("class", "right-price");
      p.text(element.item);
      span.text("$" + element.price + ".00");
      p.append(span);
      $("#result").append(p);
      price += element.price;
    });
    taxAmount = price * tax; //total tax
    total = price + taxAmount; //Final amount
    $("#total").html(price);
    $("#tax").html(taxAmount.toFixed(2));
    $("#totalAmount").html(total.toFixed(2));
  });
};

$(".tables").on("click", event => {
  tableId = event.target.getAttribute("value");

  $("#allTables").attr("class", "hide");
  $("#menu").removeAttr("class", "hide");

  displayOrder();
});
