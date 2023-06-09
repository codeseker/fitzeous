let result = document.getElementById("result");
let login = document.getElementById("login");
let signup = document.getElementById('signup');

let authToken = localStorage.getItem("auth-token");
if (!authToken) {
    window.location = ("/login.html")
}
else {
    if (login.innerText == "Logout") {
        localStorage.clear();
        window.location = ("/login.html");
    }
    else {
        login.innerText = "Logout"
        let cnt = 0;
        // fetch the blog according to categories
        const getBlogs = async (tag) => {
            result.innerHTML = "";
            const data = { tag: tag };
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
                    console.log(data);
                    for (let element of data) {
                        if (cnt == 2) {
                            break;
                        }
                        let str = `<div class="col-lg-6 col-md-6">
                <div class="latest_news">
                    <div class="news_img">
                        <a href="blog-details.html"><img src="${element.image}" alt=""></a> 
                        
                    </div> 
                    <a href="blog-details.html" class="news_heding">${element.title}</a>
                    <p>${element.content.length > 200 ? element.content.slice(0, 200) : element.content}...</p>
                    <a href="blog-details.html?id=${element._id}" class="find_btn">Read more</a>
                </div>
            </div>`
                        result.innerHTML += str;
                        cnt++;
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });

        }
        getBlogs("inspiration");
    }
}





