document.addEventListener("DOMContentLoaded", () => {
  const createPostForm = document.querySelector(".create-post-form");

  createPostForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const postTitle = document.getElementById("post-title").value;
    const postContent = document.getElementById("post-content").value;

    try {
      const response = await fetch("/api/posts/create-newpost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: postTitle, content: postContent }),
      });

      if (response.status === 200) {
        const newPost = await response.json();
        // Handle the success response here (e.g., redirect to a new page)
        window.location.href = "/dashboard"; // Replace with your success page URL
      } else {
        // Handle the error response here (e.g., display an error message)
        console.error("Error creating the post");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  });
});
