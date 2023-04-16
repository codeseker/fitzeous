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
    const response = await fetch("/api/v1/auth/register", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const json = await response.json();
    if (json.success) {
        localStorage.setItem("auth-token", json.token);
        window.location = ('/login.html')
    }
})