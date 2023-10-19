const showNewPostButton = document.getElementById("show-new-post");
const newPostFormContainer = document.querySelector(".new-post-form-container");
const blogsContainer = document.getElementById("blogs-container");

showNewPostButton.addEventListener("click", () => {
  newPostFormContainer.style.display = "block";
  blogsContainer.style.display = "none";
});
