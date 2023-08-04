document.addEventListener("DOMContentLoaded", () => {
    const postIdInput = document.querySelector("#postIdInput");
    const searchButton = document.querySelector("#searchButton");
    const postBlock = document.querySelector("#postBox");

    searchButton.addEventListener("click", () => {
        const postId = parseInt(postIdInput.value);
        if (postId >= 1 && postId <= 100) {
            fetchPost(postId)
                .then(post => {
                    displayPost(post);
                    return fetchComments(postId);
                })
                .then(comments => {
                    displayComments(comments);
                })
                .catch(error => {
                    console.error("Помилка:", error);
                });
        } else {
            alert("Введіть ідентифікатор від 1 до 100.");
        }
    });

    function fetchPost(postId) {
        return new Promise((resolve, reject) => {
            fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
                .then(response => response.json())
                .then(post => resolve(post))
                .catch(error => reject(error));
        });
    }

    function fetchComments(postId) {
        return new Promise((resolve, reject) => {
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
                .then(response => response.json())
                .then(comments => resolve(comments))
                .catch(error => reject(error));
        });
    }

    function displayPost(post) {
        postBlock.innerHTML = `
            <h1>${post.title}</h1>
            <p>${post.body}</p>
        `;
        const commentButton = document.createElement("button");
        commentButton.textContent = "Коментарі до посту";
        commentButton.id = "commentButton";
        postBlock.appendChild(commentButton);
    }

    function displayComments(comments) {
        const commentButton = document.querySelector("#commentButton");
        const commentsList = document.createElement("ul");

        comments.forEach(comment => {
            const listItem = document.createElement("li");
            listItem.textContent = comment.body;
            commentsList.append(listItem);
        });

        commentButton.addEventListener("click", () => {
            postBlock.append(commentsList);
            commentButton.disabled = true;
        });
    }
});