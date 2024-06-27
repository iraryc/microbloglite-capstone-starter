/* Posts Page JavaScript */

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
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpvZXk3NCIsImlhdCI6MTcxOTUxMjY0OSwiZXhwIjoxNzE5NTk5MDQ5fQ.6kYFAjlphrTVZFIDhK6a7BZdOlgqVbySr1FSf_uavvE'
    }
})
.then(response => response.json())
.then(data => {
    data.forEach(post => displayPost(post));
})
.catch(error => console.error('Error fetching posts:', error));




const menuItems = document.querySelectorAll('.menu-items');

const changeActiveItem = () => {
    menuItems.forEach(item => {
        item.classList.remove('active');
    })
}
menuItems.forEach(item => {
    item.addEventListener('click', () =>{
        changeActiveItem();
        item.classList.add('active');
    })
})

const messages = document.querySelector('.messages');
const message = messages.querySelectorAll('.message');
const messageSearch = document.querySelector('#message-search');

const searchMessage = () => {
    const val = messageSearch.value.toLowerCase();
    message.forEach(user => {
        let name = user.querySelector('h5').textContent.toLowerCase();
        if(name.indexOf(val) != -1){
            user.style.display = 'flex';
        } else {
            user.style.display = 'none';
        }
    });
};

messageSearch.addEventListener('keyup', searchMessage);


// Function to handle form submission and create a new post
const createNewPost = (postText) => {
    fetch('http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts', {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InpvZXk3NCIsImlhdCI6MTcxOTUxMjY0OSwiZXhwIjoxNzE5NTk5MDQ5fQ.6kYFAjlphrTVZFIDhK6a7BZdOlgqVbySr1FSf_uavvE',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'text': postText 
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create post');
        }
        return response.json();
    })
    .then(data => {
        
        const newPost = {
            username: 'YourUsername', 
            text: data.text, 
            createdAt: new Date().toISOString() 
        };

        
        displayPost(newPost);

        
        document.querySelector('#create-post').value = '';
    })
    .catch(error => {
        console.error('Error creating post:', error);
      
    });
};


const createPostForm = document.querySelector('.create-post');

createPostForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    
    const postText = document.querySelector('#create-post').value;

  
    createNewPost(postText);
});