// "use strict";

class Post {
  constructor(title, author, body) {
    this.title = title;
    this.author = author;
    this.body = body;
  }
}

class UI {
  addPostToList(post) {
    // Get List Post
    const list = document.getElementById("post-list");

    // Create tr element
    const row = document.createElement("tr");

    // Insert cols
    row.innerHTML = `
          <th>${post.title}</th>
          <td>${post.author}</td>
          <td>${post.body}</td>
          <td> <i class="fas fa-times text-danger delete"></i> </td>
        `;

    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");

    // Add classes
    div.className = `alert alert-${className}`;

    // Add text
    div.appendChild(document.createTextNode(message));

    // Get parent
    const col = document.querySelector(".col-sm-8");

    // Get form
    const form = document.querySelector("#post-form");

    // Insert alert
    col.insertBefore(div, form);

    // Timeout after 3 sec
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("body").value = "";
  }

  deletePost(target) {
    target.parentElement.parentElement.remove();
  }
}

// Local Storage Class
class Store {
  static getPosts() {
    let posts;
    if (localStorage.getItem("posts") === null) {
      posts = [];
    } else {
      posts = JSON.parse(localStorage.getItem("posts"));
    }

    return posts;
  }

  static displayPosts() {
    const posts = Store.getPosts();

    posts.forEach(function (post) {
      const ui = new UI();

      // Add book to UI
      ui.addPostToList(post);
    });
  }

  static addPost(post) {
    const posts = Store.getPosts();

    posts.push(post);

    localStorage.setItem("posts", JSON.stringify(posts));
  }

  static removePost(title) {
    const posts = Store.getPosts();

    posts.forEach(function (post, index) {
      if (post.title === title) {
        posts.splice(index, 1);
      }
    });

    localStorage.setItem("posts", JSON.stringify(posts));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayPosts);

// Event Listener For Add Post
document.getElementById("post-form").addEventListener("submit", function (e) {
  // Get Form Value
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const body = document.getElementById("body").value;

  // Instantiate Post
  const post = new Post(title, author, body);

  // Instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || body === "") {
    // Error alert
    ui.showAlert(" You have field all of input", "danger");
  } else {
    // Add book to list
    ui.addPostToList(post);

    // Add to LS
    Store.addPost(post);

    // Show success
    ui.showAlert("Added this post  !", "success");

    // Clear fields
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for delete
document.getElementById("post-list").addEventListener("click", function (e) {
  // Instantiate UI
  const ui = new UI();

  if (e.target.classList.contains("delete")) {
    // Delete book
    ui.deletePost(e.target);

    // Remove from LS
    const tr = e.target.parentElement.parentElement;
    const title = tr.firstElementChild.textContent;

    Store.removePost(title);

    // Show message
    ui.showAlert("  Deleted this one", "success");
  }

  e.preventDefault();
});









