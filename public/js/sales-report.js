console.log("here");
let total = 0;
let date = "";

$.get("/api/sales").then(res => {
  console.log(res);
  res.forEach(element => {
    total += element.sales;
    date = element.createdAt;
  });

  $("#date").text(date.substr(0, date.indexOf("T")));
  $("#total").text(total.toFixed(2));
});
