/* Posts Page JavaScript */

"use strict";

"use strict";
 
// Function to create and append a post element to the container
function displayPost(post) {
    const postElement = document.createElement('div');
    postElement.className = 'feeds mt-4';
    postElement.innerHTML = `
     <div class="feed">
                        <div class="head">
                            <div class="user">
                                <div class="profile-picture">
                                    <img src="/images/profilepic1.jpg">
                                </div>
                                <div class="ingo">
                                    <h3 class="card-title">${post.username}</h3>
                                    <small class="card-subtitle mb-2 text-muted">${new Date(post.createdAt).toLocaleString()}</small>
                                </div>
                             
                            </div>
                               <span class="edit">
                                    <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
                                </span>
                        </div>
                        <div class="photo">
                            <img src="/images/couple3.jpg">
                        </div>
                        <div class="action-button">
                            <div class="interaction-button">
                                <span><ion-icon name="heart-outline"></ion-icon></span>
                                <span><ion-icon name="chatbubble-ellipses-outline"></ion-icon></span>
                                <span><ion-icon name="share-social-outline"></ion-icon></span>
                            </div>
                            <div class="bookmark">
                                <span><ion-icon name="bookmark-outline"></ion-icon></span>
                            </div>
                        </div>
                        <div class="liked-by">
                            <span><img src="/images/profilepic1.jpg"></span>
                            <span><img src="/images/profilepic1.jpg"></span>
                            <span><img src="/images/profilepic1.jpg"></span>
                            <p>Liked by <b>Monce Lua</b> and <b>400 others</b></p>
                        </div>
                        <div class="caption">
                        <p><b>${post.username} </b> ${post.text} </p>
                    </div>
                    <div class="comments text-muted">View all 145 comments</div>
                 </div>

    `;
    document.getElementById('postsContainer').appendChild(postElement);
}
 
// Fetch posts from the API and display them
fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts?limit=100&offset=0', {
    headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpvZXk3NCIsImlhdCI6MTcxOTQyNDY0NiwiZXhwIjoxNzE5NTExMDQ2fQ.C-4iB4gAWGzVfdU6hn55LdXNyQq9sF9DxunHePn5AzA'
    }
})
.then(response => response.json())
.then(data => {
    data.forEach(post => displayPost(post));
})
.catch(error => console.error('Error fetching posts:', error));


// <div class="card-body">
// <h5 class="card-title">${post.username}</h5>
// <h6 class="card-subtitle mb-2 text-muted">${new Date(post.createdAt).toLocaleString()}</h6>
// <p class="card-text">${post.text}</p>
// </div>