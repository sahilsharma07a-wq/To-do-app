function loadUserDetails() {
    const userData = localStorage.getItem("user");

    if (!userData) {
        window.location.href = "login.html";
        return;
    }

    const user = JSON.parse(userData);

    document.getElementById("userName").textContent = user.name;
    document.getElementById("userUsername").textContent = user.username;
    document.getElementById("userEmail").textContent = user.email;
}

// Page load pe call karo
window.onload = function () {
    loadUserDetails();
};

function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); 

    window.location.href = "login.html";
}