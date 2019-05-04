let addNewEmployee = () => {
  console.log("adding");
  let newEmployee = {
    name: $("#name").val(),
    password: $("#password").val()
  };
  console.log("new waiter", newEmployee);
  $.post("/api/employees", newEmployee).then(res => {
    console.log("success ", res);
  });
};

console.log("here");
$("#add").on("click", addNewEmployee);
$("#submit").on("click", addNewEmployee);
