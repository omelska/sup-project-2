// let addNewCategory = () => {
//   console.log("adding");
//   let newCategory = {
//     name: $("#category").val()
//   };
//   console.log("newCategory", newCategory);
//   $.post("/api/categories", newCategory).then(res => {
//     console.log("seccess ", res);
//   });
// };

// $("#add").on("click", addNewCategory);
// $("#submit").on("click", addNewCategory);

$(document).ready(function() {
  console.log("public/js/add-category.js loaded");
// Reference to input field for new category
var $newItemInput = $("input.new-item");
// New categories go inside categories-container
var $categoryContainer = $("#category-container");
// Event listeners for adding, editing, and deleting categories

$('#category-form').on("submit", insertCategory);
$('.category-item').on("click", editCategory);
$('.category-item').on("keyup", finishEdit);
$('.category-item').on("blur", cancelEdit);
$('button.delete').on("click", deleteCategory);

// Initial category array
var categories = [];

// Get all existing categories from the database
getCategories();

// Refreshes categories displayed
function initializeRows() {
  $categoryContainer.empty();
  console.log("in get cat");
  console.log(categories);
  var $rowsToAdd = $("#category-container").append('<ul></ul>').find('ul');
  for (var i = 0; i < categories.length; i++) {
    console.log('rows to add:' + $rowsToAdd);
    console.log('categories[i]: ' + categories[i]);
    $rowsToAdd.append(createNewRow(categories[i]));
  }
  console.log('current categorycontainer' + $categoryContainer);
  $categoryContainer.prepend($rowsToAdd);
}

// grabs categories from the database and updates the view
function getCategories() {
  $.ajax({
    method: "GET",
    url: "/api/categories"
  }).then(function(res) {
    categories = [];
    for (var i = 0; i < res.length; i++) {
      console.log('this is getCategories res[' + res[i].id + ']' + res[i].name);
      categories.push(res[i].name);  
    }
    console.log(categories);
    initializeRows();
  });
}

// Inserts a category into the database and updates the view
function insertCategory(event) {
  event.preventDefault();
  var category = {
    name: $newItemInput.val().trim()
  };
  alert(category.name);
  $.ajax({
    method: "POST",
    url: "/api/categories",
    data: category
  }).then(function(response) {
   getCategories();
  }).catch((err) => {
    console.log("in error");
  });
  $newItemInput.val("");
}

// updateCategory, editCategory, finishEdit, and cancelEdit deal with changing the category
function updateCategory(category) {
  $.ajax({
    method: "PUT",
    url: "/api/categories",
    data: category
  }).then(getCategories);
}

function editCategory() {
    console.log('inside editCategory');
  var currentCategory = $(this).data("category");
  $(this)
    .children()
    .hide();
  $(this)
    .children("input.edit")
    .val(currentCategory.name);
  $(this)
    .children("input.edit")
    .show();
  $(this)
    .children("input.edit")
    .focus();
}

function finishEdit(event) {
  var updatedCategory = $(this).data("category");
  if (event.which === 13) {
    updatedCategory.name = $(this)
      .children("input")
      .val()
      .trim();
    $(this).blur();
    updateCategory(updatedCategory);
  }
}

function cancelEdit() {
  var currentCategory = $(this).data("category");
  if (currentCategory) {
    $(this)
      .children()
      .hide();
    $(this)
      .children("input.edit")
      .val(currentCategory.name);
    $(this)
      .children("span")
      .show();
    $(this)
      .children("button")
      .show();
  }
}

//deleteCategory removes the category from the db and the DOM
function deleteCategory(event) {
  event.stopPropagation();
  var id = $(this).data('id');
  $.ajax({
    method: "DELETE",
    url: '/api/categories',
    data: id
  }).then(getCategories);
}

// This function makes a category row
function createNewRow(category) {
  console.log(category);
  var $newInputRow = $(
    [
      "<li class='list-group-item category-item'>",
      "<span class='text-dark'>",
      category,
      "</span>",
      //"<input type='text' class='edit' style='display: none;'>",
      //"<button class='delete btn btn-danger'>x</button>",
      //"<button class='complete btn btn-primary'>✓</button>",
      "</li>"
    ].join("")
  );

  //$newInputRow.find("button.delete").data("id", category.id);
  //$newInputRow.find("input.edit").css("display", "none");
  $newInputRow.data("category", category);
  console.log('returing newinputrow' + $newInputRow);
  return $newInputRow;
}
});
