/* Posts Page JavaScript */

"use strict";

"use strict";
 
// Function to create and append a post element to the container
function displayPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'card mb-3';
    postElement.innerHTML = `
<div class="card-body">
<h5 class="card-title">${post.username}</h5>
<h6 class="card-subtitle mb-2 text-muted">${new Date(post.createdAt).toLocaleString()}</h6>
<p class="card-text">${post.text}</p>
</div>
    `;
    document.getElementById('postsContainer').appendChild(postElement);
}
 
// Fetch posts from the API and display them
fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0', {
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkxlQnJvbklzS2luZyIsImlhdCI6MTcxOTI0ODg0MSwiZXhwIjoxNzE5MzM1MjQxfQ.cOXYbqyYKxaGLPHkvJ4R97WXNGbe3EqGzVEPEqHgarw'
    }
})
.then(response => response.json())
.then(data => {
    data.forEach(post => displayPost(post));
})
.catch(error => console.error('Error fetching posts:', error));