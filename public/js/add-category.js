let addNewCategory = () => {
  console.log("adding");
  let newCategory = {
    name: $("#category").val()
  };
  console.log("newCategory", newCategory);
  $.post("/api/categories", newCategory).then(res => {
    console.log("seccess ", res);
  });
};

$("#add").on("click", addNewCategory);
$("#submit").on("click", addNewCategory);
