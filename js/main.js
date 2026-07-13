let keranjang = [];

function toggleMenu(){
    document.querySelector(".nav-links").classList.toggle("active");
}

// Buka / Tutup Keranjang
function toggleCart(){
    document.getElementById("cart").classList.toggle("show");
}

// Tambah Produk
function tambah(nama, harga, gambar){

    let produk = keranjang.find(item => item.nama === nama);

    if(produk){

        produk.jumlah++;

    }else{

        keranjang.push({
            nama: nama,
            harga: harga,
            gambar: gambar,
            jumlah: 1
        });

    }

    tampil();
}

// Tampilkan Keranjang
function tampil(){

    let isi = "";
    let total = 0;

    keranjang.forEach((item,index)=>{

        total += item.harga * item.jumlah;

        isi += `
        <div class="item">

            <img src="${item.gambar}" style="width:70px;height:70px;object-fit:cover;border-radius:10px;">

<div style="flex:1;">

<b>${item.nama}</b><br>

<span style="color:#4ea4ff;">
Rp ${(item.harga * item.jumlah).toLocaleString()}
</span>

<div style="margin:10px 0; display:flex; align-items:center; gap:10px;">

    <button onclick="kurang(${index})">-</button>

    <span>${item.jumlah}</span>

    <button onclick="tambahJumlah(${index})">+</button>

</div>

<br><br>


                <button onclick="hapus(${index})">
                    Hapus
                </button>
            </div>

        </div>
        `;

    });

    document.getElementById("list").innerHTML = isi;
    document.getElementById("total").innerHTML = total.toLocaleString();
    document.getElementById("jumlah").innerHTML = keranjang.length;

}

// Hapus Produk
function hapus(index){

    let konfirmasi = confirm("Apakah Anda yakin ingin menghapus produk ini dari keranjang?");

    if(konfirmasi){

        keranjang.splice(index,1);

        tampil();

    }

} 

function bayar(){
}

function checkout(){

    if(keranjang.length==0){
        alert("Keranjang masih kosong.");
        return;
    }

    localStorage.setItem(
        "keranjang",
        JSON.stringify(keranjang)
    );

    window.location.href="payment.html";

}

function tambahJumlah(index){

    keranjang[index].jumlah++;

    tampil();

}

function kurang(index){

    if(keranjang[index].jumlah > 1){

        keranjang[index].jumlah--;

    }else{

        keranjang.splice(index,1);

    }

    tampil();

}

function filterProduk(){

    let keyword = document
        .getElementById("search")
        .value
        .toLowerCase();

    let kategori = document
        .getElementById("kategori")
        .value;

    let produk = document.querySelectorAll(".product-card");

    produk.forEach(function(item){

        let nama = item.querySelector("h3")
                      .innerText
                      .toLowerCase();

        let jenis = item.dataset.kategori;

        let cocokNama = nama.includes(keyword);

        let cocokKategori =
            kategori=="semua" ||
            kategori==jenis;

        if(cocokNama && cocokKategori){

            item.style.display="block";

        }else{

            item.style.display="none";

        }

    });

    let username = localStorage.getItem("username");
    let role = localStorage.getItem("role");

    if(username){

        let login=document.getElementById("loginLink");

        login.innerHTML="👤 "+username+" ▼";

        login.href="#";

        login.onclick=function(e){

            e.preventDefault();

            let menu=document.getElementById("dropdownMenu");

            if(menu.style.display=="block"){

                menu.style.display="none";

            }else{

                menu.style.display="block";

            }

        }

        if(role=="admin"){

            document.getElementById("dashboardLink").style.display="block";

        }

    }

    }


function logout(){

    localStorage.removeItem("login");

    localStorage.removeItem("role");

    localStorage.removeItem("username");

    localStorage.removeItem("nama");

    window.location.href="login.html";

}

const role = localStorage.getItem("role");
const adminMenu = document.getElementById("adminMenu");

if (adminMenu && role === "admin") {
    adminMenu.style.display = "block";
}


function updateNavbar() {

    const loginMenu = document.getElementById("loginMenu");
    const adminMenu = document.getElementById("adminMenu");

    if (!loginMenu) return;

    const login = localStorage.getItem("login");
    const role = localStorage.getItem("role");
    const nama = localStorage.getItem("nama");

    if (login === "true") {

        loginMenu.textContent = role === "admin"
            ? "👨‍💼 Admin ▼"
            : `👋 Halo ${nama} ▼`;

        loginMenu.removeAttribute("href");

        if (adminMenu && role === "admin") {
            adminMenu.style.display = "block";
        }
    }
}

document.addEventListener("DOMContentLoaded", updateNavbar);

window.addEventListener("load",function(){

    setTimeout(function(){

        document.getElementById("loader").classList.add("hide");

    },1200);

});

const userBtn = document.getElementById("userBtn");
const userDropdown = document.getElementById("userDropdown");

if (userBtn && userDropdown) {

    userBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        userDropdown.classList.toggle("show");
    });

    document.addEventListener("click", function (e) {

        if (
            !userDropdown.contains(e.target) &&
            !userBtn.contains(e.target)
        ) {
            userDropdown.classList.remove("show");
        }

    });

}
