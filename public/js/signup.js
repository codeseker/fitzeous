let email = document.getElementById("email");
let username = document.getElementById("username");
let password = document.getElementById("password");
let cpassword = document.getElementById("cpassword");

let signup = document.getElementById("signup");
localStorage.clear();
signup.addEventListener("click", async (e) => {
    
    const data = {
        email: email.value,
        username: username.value,
        password: password.value,
    }
    const response = await fetch("http://172.24.160.1:8000/api/v1/auth/register", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const json = await response.json();
    if (json.success) {
        localStorage.setItem("auth-token", json.token);
        window.location = ('http://172.24.160.1:8000/login.html')
    }
})