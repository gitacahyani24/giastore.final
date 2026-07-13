const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

const container = document.getElementById("wishlistContainer");

if(wishlist.length===0){

    container.innerHTML=`
    <div class="empty">

        <h3>Wishlist masih kosong</h3>

        <p>Tambahkan produk favoritmu.</p>

    </div>
    `;

}else{

    wishlist.forEach(item=>{

        container.innerHTML += `

        <div class="card-produk">

            <img src="${item.gambar}">

            <h4>${item.nama}</h4>

            <p>${item.harga}</p>

            <button onclick="window.location.href='produk.html'">

                Lihat Produk

            </button>

        </div>

        `;

    });

}