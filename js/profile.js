const user = JSON.parse(localStorage.getItem("userLogin")) || {};

document.getElementById("namaUser").textContent = user.nama || "Pembeli";
document.getElementById("emailUser").textContent = user.email || "-";

document.getElementById("nama").value = user.nama || "";
document.getElementById("email").value = user.email || "";
document.getElementById("hp").value = user.hp || "";
document.getElementById("alamat").value = user.alamat || "";

function simpanProfil(){

    user.nama = document.getElementById("nama").value;
    user.email = document.getElementById("email").value;
    user.hp = document.getElementById("hp").value;
    user.alamat = document.getElementById("alamat").value;

    localStorage.setItem("userLogin", JSON.stringify(user));

    alert("Profil berhasil diperbarui.");
}

function logout(){

    localStorage.removeItem("login");
    localStorage.removeItem("userLogin");

    window.location.href="index.html";

}