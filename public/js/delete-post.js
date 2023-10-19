// In your client-side JavaScript file
/* document
  .getElementById("delete-post-button")
  .addEventListener("click", async () => {
    const postId = document.querySelector(".post").getAttribute("data-post-id");

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to the dashboard after the deletion is successful
        window.location.href = "/dashboard";
      } else {
        // Handle errors if needed
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }); */

// In your client-side JavaScript file
const deleteButton = document.getElementById("delete-post-button");

if (deleteButton) {
  deleteButton.addEventListener("click", async () => {
    const postId = document.querySelector(".post").getAttribute("data-post-id");

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Redirect to the dashboard after the deletion is successful
        window.location.href = "/dashboard";
      } else {
        // Handle errors if needed
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });
}
