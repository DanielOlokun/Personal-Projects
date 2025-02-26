// JS file to handle users - LOGIN/REGISTER ETC
document.getElementById("show-register").addEventListener("click", function() {
    document.getElementById("login-box").style.display = "none";
    document.getElementById("register-box").style.display = "block";
});

document.getElementById("show-login").addEventListener("click", function() {
    document.getElementById("register-box").style.display = "none";
    document.getElementById("login-box").style.display = "block";
});

// Handle login form submission
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;
    console.log("Logging in with:", email, password);
    alert("Login submitted (Backend needed)");
});

// Handle register form submission
document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
    console.log("Registering with:", name, email, password);
    alert("Registration submitted (Backend needed)");
});
