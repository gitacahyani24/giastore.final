let role = "pembeli";

function pilihRole(selectedRole, btn) {
    role = selectedRole;

    document.querySelectorAll(".role-btn").forEach(button => {
        button.classList.remove("active");
    });

    btn.classList.add("active");
}

function login() {

    console.log("Role:", role);

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "" || password === "") {
        alert("Lengkapi username dan password.");
        return;
    }

    // ADMIN
    if (
        role === "admin" &&
        username === "admin" &&
        password === "admin123"
    ) {

        localStorage.setItem("login", "true");
        localStorage.setItem("role", "admin");
        localStorage.setItem("username", username);
        localStorage.setItem("nama", "Admin");

        window.location.href = "index.html";
        return;
    }

    // LOGIN PEMBELI

if (role === "pembeli") {

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.username === username && u.password === password
    );

    if (!user) {
        alert("Username atau password salah.");
        return;
    }

    localStorage.setItem("login", "true");
    localStorage.setItem("role", "pembeli");
    localStorage.setItem("username", user.username);
    localStorage.setItem("nama", user.nama);

    window.location.href = "index.html";
    return;
} }