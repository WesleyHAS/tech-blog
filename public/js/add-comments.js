/* const postCommentButton = document.querySelector(".add-comment-form button");

if (postCommentButton) {
  const addCommentButton = document.getElementById("add-comment-button");
  const commentFormContainer = document.querySelector(
    ".add-comment-form-container"
  );

  addCommentButton.addEventListener("click", () => {
    commentFormContainer.style.display = "block";
  });

  postCommentButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // Get the comment content from the textarea
    const commentContent = document.getElementById("comment-content").value;

    // Get the post ID from the data attribute of the post element
    const postId = document.querySelector(".post").getAttribute("data-post-id");

    // Make an HTTP POST request to add the comment
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentContent,
          post_id: postId,
        }),
      });

      window.location.href = `/api/posts/${postId}`;
    } catch (error) {
      console.error("An error occurred while adding a comment:", error);
    }
  });
}

function appendCommentToPage(comment) {
  // Create a new list item for the comment and append it to the comments list
  const commentsList = document.querySelector(".comments-list");
  const listItem = document.createElement("li");
  listItem.textContent = comment.content;
  commentsList.appendChild(listItem);
}
 */

const postCommentButton = document.querySelector(".add-comment-form button");

if (postCommentButton) {
  const addCommentButton = document.getElementById("add-comment-button");
  const commentFormContainer = document.querySelector(
    ".add-comment-form-container"
  );

  addCommentButton.addEventListener("click", () => {
    commentFormContainer.style.display = "block";
  });

  postCommentButton.addEventListener("click", async (event) => {
    event.preventDefault();

    // Get the comment content from the textarea
    const commentContent = document.getElementById("comment-content").value;

    // Check if the comment content is empty
    if (commentContent.trim() === "") {
      alert("Please enter a comment before posting.");
      return; // Don't proceed if the comment is empty
    }

    // Get the post ID from the data attribute of the post element
    const postId = document.querySelector(".post").getAttribute("data-post-id");

    // Make an HTTP POST request to add the comment
    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentContent,
          post_id: postId,
        }),
      });

      window.location.href = `/api/posts/${postId}`;
    } catch (error) {
      console.error("An error occurred while adding a comment:", error);
    }
  });
}

function appendCommentToPage(comment) {
  // Create a new list item for the comment and append it to the comments list
  const commentsList = document.querySelector(".comments-list");
  const listItem = document.createElement("li");
  listItem.textContent = comment.content;
  commentsList.appendChild(listItem);
}
