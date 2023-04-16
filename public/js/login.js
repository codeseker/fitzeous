let login = document.getElementById("login");
let email = document.getElementById("email");
let password = document.getElementById("password");
login.addEventListener("click", async () => {
    const data = {
        email: email.value,
        password: password.value
    }
    // console.log(data);
    const response = await fetch("http://172.24.160.1:8000/api/v1/auth/login", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const json = await response.json();
    console.log(json);
    if (json.success) {
        localStorage.setItem("auth-token", json.token);
        window.location = ('/')
    }
})