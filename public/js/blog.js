console.log("hello");
let result = document.getElementById("result");

// fetch the blog according to categories
const getBlogs = async (tag) => {
    result.innerHTML = "";
    const data = { tag: tag };
    let authToken = localStorage.getItem('auth-token');
    fetch("/api/v1/health/searchByTag", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
            "auth-token": authToken
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            for (let element of data) {
                let str = `<div class="blog_items">
            <a href="blog-details.html?id=${element._id}" class="blog_img"><img src="${element.image}" alt=""></a>
            <div class="breadcrumb_date">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item">By : <a href="#">Admin</a></li>
                    <li class="breadcrumb-item"><a href="#">fitness, wellness</a></li>
                    
                </ol>
            </div>
            <a href="blog-details.html?id=${element._id}" class="blog_tittle">${element.title}</a>
            <p>${element.content.length > 350 ? element.content.slice(0, 350) : element.content}...</p>
            <a href="blog-details.html?id=${element._id}"  class="find_btn">Read more</a>
        </div>`
                result.innerHTML += str;
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });

}

const urlParams = new URLSearchParams(location.search);
let tag;
for (const [key, value] of urlParams) {
    // console.log(`${key}:${value}`);
    tag = `${value}`;
}


if(!tag){
    // if no category provide provide health blog
    getBlogs("health");
}
else{
    getBlogs(tag);
}


