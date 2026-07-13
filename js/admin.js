let indexEdit = null;

let produk = JSON.parse(localStorage.getItem("produk")) || [

{
gambar:"image/atasan1.jpg",
nama:"Blouse Tali Pita",
harga:"Rp115.000"
},

{
gambar:"image/baju5.jpg",
nama:"Rok Panjang Wanita",
harga:"Rp110.000"
},

{
gambar:"image/baju2.jpg",
nama:"Hoodie Wanita",
harga:"Rp120.000"
}

];

localStorage.setItem("produk",JSON.stringify(produk));

function tampilProduk() {

    const tabel = document.getElementById("produkTable");

    tabel.innerHTML = "";

    produk.forEach((item, index) => {

        const row = `
        <tr>
            <td><img src="${item.gambar}" width="70"></td>
            <td>${item.nama}</td>
            <td>${item.harga}</td>
            <td>
                <button type="button" class="edit" onclick="editProduk(${index})">✏️ Edit</button>
                <button type="button" class="delete" onclick="hapusProduk(${index})">🗑 Hapus</button>
            </td>
        </tr>
        `;

        tabel.insertAdjacentHTML("beforeend", row);

    });

}

tampilProduk();

document.getElementById("jumlahProduk").innerHTML = produk.length;


function simpanProduk(){

    const nama = document.getElementById("namaProduk").value.trim();
    const harga = document.getElementById("hargaProduk").value.trim();
    const kategori = document.getElementById("kategoriProduk").value;
    const file = document.getElementById("gambarProduk").files[0];

    if(nama === "" || harga === ""){
        alert("Lengkapi data!");
        return;
    }

    // TAMBAH PRODUK
    if(indexEdit === null){

        if(!file){
            alert("Pilih gambar!");
            return;
        }

        const reader = new FileReader();

        reader.onload = function(e){

            produk.push({
                nama: nama,
                harga: "Rp" + Number(harga).toLocaleString("id-ID"),
                kategori: kategori,
                gambar: e.target.result
            });

            selesaiSimpan();

        };

        reader.readAsDataURL(file);

    }

    // EDIT PRODUK
    else{

        if(file){

            const reader = new FileReader();

            reader.onload = function(e){

                produk[indexEdit].nama = nama;
                produk[indexEdit].harga = "Rp" + Number(harga).toLocaleString("id-ID");
                produk[indexEdit].kategori = kategori;
                produk[indexEdit].gambar = e.target.result;

                selesaiSimpan();

            };

            reader.readAsDataURL(file);

        }else{

            produk[indexEdit].nama = nama;
            produk[indexEdit].harga = "Rp" + Number(harga).toLocaleString("id-ID");
            produk[indexEdit].kategori = kategori;

            selesaiSimpan();

        }

    }

}
   function selesaiSimpan(){

    localStorage.setItem("produk", JSON.stringify(produk));

    tampilProduk();

    document.getElementById("jumlahProduk").textContent = produk.length;

    document.getElementById("modalProduk").style.display = "none";

    document.getElementById("namaProduk").value = "";
    document.getElementById("hargaProduk").value = "";
    document.getElementById("gambarProduk").value = "";
    document.getElementById("kategoriProduk").selectedIndex = 0;

    document.querySelector(".modal-content h2").textContent = "Tambah Produk";

    indexEdit = null;

}

alert("Produk berhasil disimpan.");


function editProduk(index){

    indexEdit = index;

    const item = produk[index];

    document.getElementById("namaProduk").value = item.nama;
    document.getElementById("hargaProduk").value = item.harga.replace(/\D/g,'');
    document.getElementById("kategoriProduk").value = item.kategori || "Atasan";
    document.getElementById("gambarProduk").value = "";

    document.querySelector(".modal-content h2").textContent = "Edit Produk";

    document.getElementById("modalProduk").style.display = "flex";

}

function showPage(page) {

    document.querySelectorAll("main section").forEach(section => {
        section.style.display = "none";
    });

    document.getElementById(page + "Page").style.display = "block";

    document.querySelectorAll(".sidebar li").forEach(li => {
        li.classList.remove("active");
    });

    const menu = document.querySelector(`[onclick="showPage('${page}')"]`);
    if(menu) menu.classList.add("active");

}

function bukaModal() {
    showPage("produk");
    document.getElementById("modalProduk").style.display = "flex";
}

showPage("dashboard");

document.getElementById("jumlahProduk").textContent = produk.length;

const users = JSON.parse(localStorage.getItem("users")) || [];
document.getElementById("jumlahPembeli").textContent = users.length;

const orders = JSON.parse(localStorage.getItem("orders")) || [];
document.getElementById("jumlahPesanan").textContent = orders.length;

let total = 0;

orders.forEach(order => {
    total += Number(order.total || 0);
});

document.getElementById("pendapatan").textContent =
"Rp " + total.toLocaleString("id-ID");

const namaAdmin = localStorage.getItem("nama") || "Admin";

document.getElementById("judulDashboard").innerHTML =
`Selamat Datang, ${namaAdmin} 👋`;

document.getElementById("tanggalHari").textContent =
new Date().toLocaleDateString("id-ID",{
    weekday:"long",
    day:"numeric",
    month:"long",
    year:"numeric"
});

function hapusProduk(index){

    if(!confirm("Yakin ingin menghapus produk ini?")) return;

    produk.splice(index,1);

    localStorage.setItem("produk", JSON.stringify(produk));

    tampilProduk();

    document.getElementById("jumlahProduk").textContent = produk.length;

}

window.onclick = function(e){

    const modal = document.getElementById("modalProduk");

    if(e.target === modal){

        modal.style.display = "none";

        indexEdit = null;

    }

}

function logout(){

    localStorage.removeItem("login");
    localStorage.removeItem("role");
    localStorage.removeItem("nama");

    window.location.href = "index.html";

}

function tutupModal(){

    document.getElementById("modalProduk").style.display="none";

    document.getElementById("namaProduk").value="";
    document.getElementById("hargaProduk").value="";
    document.getElementById("gambarProduk").value="";
    document.getElementById("kategoriProduk").selectedIndex=0;

    indexEdit=null;

}

document.getElementById("gambarProduk").addEventListener("change",function(){

    const file=this.files[0];

    if(!file) return;

    const reader=new FileReader();

    reader.onload=function(e){

        const img=document.getElementById("previewGambar");

        img.src=e.target.result;
        img.style.display="block";

    }

    reader.readAsDataURL(file);

});