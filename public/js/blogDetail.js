console.log("Hello");

let name = document.getElementById("name");
let email = document.getElementById("email");
let message = document.getElementById("message");
let addComment = document.getElementById("addComment");
let getComments = document.getElementById("getComments");
let commentsCount = document.getElementById("commentsCount");
let count = 0;
let comments = document.getElementById("comments");

const urlParams = new URLSearchParams(location.search);
let id;
for (const [key, value] of urlParams) {
    // console.log(`${key}:${value}`);
    id = `${value}`;
}

fetch(`/api/v1/health/getSingleBlog?id=${id}`, {
    method: "GET", // or 'PUT'
    headers: {
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => {
        let element = data[0];
        let str = `<a href="blog-details.html?id=${element._id}" class="blog_img"><img src="${element.image}" alt=""></a>
        <div class="breadcrumb_date">
            
            <ol class="breadcrumb">
                <li class="breadcrumb-item">By: <a href="#">Admin</a></li>
                <li class="breadcrumb-item"><a href="#">fitness, wellness</a></li>
                
            </ol>
        </div>
        <a href="blog-details.html?id=${element._id}" class="blog_tittle">${element.title}</a>
        <p>${element.content}
        </p>`;

        comments.innerHTML += str;
    })
    .catch((error) => {
        console.error("Error:", error);
    });



const getAllComments = async () => {

    getComments.innerHTML = "";

    fetch(`/api/v1/health/getComment?id=${id}`, {
        method: "GET", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            let comments = data[0].comment;
            count = comments.length;
            commentsCount.innerHTML = `<h2>Comments ${count}</h2>`;

            for (let element of comments) {
                let str = `<div class="media">
            <img src="images/blog/comment.jpg" alt="">
            <div class="media-body">
                <a href="#" class="author_name">${element.name}</a>
                <p>${element.message}</p>
                <a href="#">Reply</a></h5>
            </div>
        </div>`;

                getComments.innerHTML += str;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

getAllComments();

addComment.addEventListener("click", async (e) => {
    e.preventDefault();

    const comment = {
        name: name.value,
        email: email.value,
        message: message.value,
        id: "6421d15733c695685a1b9fa5"
    }

    fetch(`http://localhost:4000/api/v1/health/addComment?id=${id}`, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(comment),
    })
        .then((response) => response.json())
        .then((data) => {
            // console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });

    await getAllComments();
    name.value = "";
    email.value = "";
    message.value = "";

})

