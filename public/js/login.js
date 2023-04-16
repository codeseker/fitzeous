let login = document.getElementById("login");
let email = document.getElementById("email");
let password = document.getElementById("password");
let msg = document.getElementById("msg");
login.addEventListener("click", async () => {
    const data = {
        email: email.value,
        password: password.value
    }
    // console.log(data);
    const response = await fetch("/api/v1/auth/login", {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
    const json = await response.json();

    if (json.success) {
        let str = `<div class="alert alert-success" role="alert">
        Login Succesfull
      </div>`
        setTimeout(() => {
            msg.style.display = "block";
            msg.innerHTML = str;
        }, 2000);
        localStorage.setItem("auth-token", json.token);
        window.location = ('/')

    }
    else {
        let str = `<div class="alert alert-danger" role="alert">
        Invalid credentials
      </div>`
        setTimeout(() => {
            msg.style.display = "block";
            msg.innerHTML = str;
        }, 2000);
    }
})