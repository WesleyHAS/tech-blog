const addCommentButton = document.getElementById("add-comment-button");
const commentFormContainer = document.querySelector(
  ".add-comment-form-container"
);

addCommentButton.addEventListener("click", () => {
  commentFormContainer.style.display = "block";
});
