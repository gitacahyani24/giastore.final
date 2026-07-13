// Menampilkan produk dari keranjang
const data = JSON.parse(localStorage.getItem("keranjang")) || [];

let isi = "";
let total = 0;

data.forEach(item => {

    total += item.harga;

    isi += `
    <div class="product">
        <span>${item.nama}</span>
        <span>Rp ${item.harga.toLocaleString("id-ID")}</span>
    </div>
    `;

});

document.querySelector(".card:last-child").innerHTML = `
<h2>Ringkasan Pesanan</h2>

${isi}

<div class="product">
    <span>Ongkir</span>
    <span>Rp15.000</span>
</div>

<div class="total">
    <span>Total</span>
    <span>Rp ${(total+15000).toLocaleString("id-ID")}</span>
</div>
`;

// ===========================
// FORM PEMBAYARAN
// ===========================

document.getElementById("paymentForm").addEventListener("submit", function(e){

    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const hp = document.getElementById("hp").value.trim();
    const email = document.getElementById("email").value.trim();
    const alamat = document.getElementById("alamat").value.trim();
    const metode = document.getElementById("metode").value;

    if(nama=="" || hp=="" || email=="" || alamat=="" || metode==""){
        alert("Lengkapi data pembayaran!");
        return;
    }

    document.getElementById("loading").style.display = "flex";

    let daftarProduk = "";

    data.forEach((item,index)=>{

        daftarProduk += `${index+1}. ${item.nama}
Rp ${item.harga.toLocaleString("id-ID")}

`;

    });

    const totalBayar = total + 15000;

    const pesan = `Halo Admin GIA STORE

Saya ingin melakukan pemesanan.

Nama : ${nama}
No HP : ${hp}
Email : ${email}

Alamat :
${alamat}

Metode Pembayaran :
${metode}

====================

${daftarProduk}

====================

Total :
Rp ${totalBayar.toLocaleString("id-ID")}`;

    setTimeout(()=>{

        document.getElementById("loading").style.display = "none";

        localStorage.setItem("pesanWA", pesan);

        localStorage.removeItem("keranjang");

        window.location.href = "success.html";

    },2500);

});