document
  .getElementById("submit-edit-button")
  .addEventListener("click", async () => {
    const postId = document.getElementById("submit-edit-button").dataset.postid;
    const newContent = document.getElementById("post-content").value;

    // Inside your event listener for the "Save Changes" button
    try {
      const response = await fetch(`/api/posts/edit/${postId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newContent }),
      });

      window.location.href = `/api/posts/${postId}`;
    } catch (error) {
      console.error("Error:", error);
    }
  });
