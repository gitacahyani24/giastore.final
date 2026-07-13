let keranjang = [];

// Buka / Tutup Keranjang
function toggleCart(){
    document.getElementById("cart").classList.toggle("show");
}

// Tambah Produk
function tambah(nama, harga, gambar){

    keranjang.push({
        nama: nama,
        harga: harga,
        gambar: gambar
    });

    tampil();
}

// Tampilkan Keranjang
function tampil(){

    let isi = "";
    let total = 0;

    keranjang.forEach((item,index)=>{

        total += item.harga;

        isi += `
        <div class="item">

            <img src="${item.gambar}"
                 style="width:70px;height:70px;object-fit:cover;border-radius:10px;">

            <div style="flex:1;">
                <b>${item.nama}</b><br>
                <span style="color:#4ea4ff;">
                    Rp ${item.harga.toLocaleString()}
                </span><br><br>

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

    keranjang.splice(index,1);

    tampil();

}

function bayar(){
}

function checkout(){

localStorage.setItem(
"keranjang",
JSON.stringify(keranjang)
);

window.location.href="payment.html";

}

function filterProduk(){

    let keyword = document.getElementById("search").value.toLowerCase();

    let kategori = document.getElementById("kategori").value;

    let harga = document.getElementById("harga").value;

    let produk = document.querySelectorAll(".product-card");

    produk.forEach(function(item){

        let nama = item.querySelector("h3").innerText.toLowerCase();

        let jenis = item.dataset.kategori;

        let hargaProduk = parseInt(item.dataset.harga);

        let cocokNama = nama.includes(keyword);

        let cocokKategori =
            kategori == "semua" ||
            kategori == jenis;

        let cocokHarga = false;

        if(harga == "semua"){

            cocokHarga = true;

        }else if(harga == "1"){

            cocokHarga = hargaProduk < 100000;

        }else if(harga == "2"){

            cocokHarga = hargaProduk >= 100000 &&
                         hargaProduk <= 130000;

        }else if(harga == "3"){

            cocokHarga = hargaProduk > 130000;

        }

        if(cocokNama && cocokKategori && cocokHarga){

           item.style.display = "none";

        }else{

            item.style.display = "none";

        }

    });

}
function urutkanProduk(){

    const container = document.querySelector(".product-container");

    const cards = Array.from(document.querySelectorAll(".product-card"));

    const jenis = document.getElementById("sort").value;

    cards.sort(function(a,b){

        if(jenis=="murah"){

            return parseInt(a.dataset.harga) -
                   parseInt(b.dataset.harga);

        }

        if(jenis=="mahal"){

            return parseInt(b.dataset.harga) -
                   parseInt(a.dataset.harga);

        }

        if(jenis=="az"){

            return a.querySelector("h3").innerText.localeCompare(
                   b.querySelector("h3").innerText);

        }

        return 0;

    });

    cards.forEach(card=>container.appendChild(card));

}