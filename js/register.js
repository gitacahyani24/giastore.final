function register(){

    const nama = document.getElementById("nama").value.trim();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const konfirmasi = document.getElementById("konfirmasi").value;

    if(!nama || !username || !password || !konfirmasi){
        alert("Lengkapi semua data!");
        return;
    }

    if(password !== konfirmasi){
        alert("Konfirmasi password tidak sama.");
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const sudahAda = users.find(user => user.username === username);

    if(sudahAda){
        alert("Username sudah digunakan.");
        return;
    }

    users.push({
        nama,
        username,
        password,
        role:"pembeli"
    });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Registrasi berhasil!");

    window.location.href="login.html";

}