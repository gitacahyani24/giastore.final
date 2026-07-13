const pesanan = JSON.parse(localStorage.getItem("orders")) || [];

const container = document.getElementById("listPesanan");

if(pesanan.length===0){

    container.innerHTML=`
    <div class="empty">
        <h3>Belum ada pesanan</h3>
        <p>Yuk mulai belanja di GIA STORE.</p>
    </div>
    `;

}else{

    pesanan.forEach(item=>{

        container.innerHTML += `
        <div class="card-order">

            <h3>${item.kode || "GIA-"+Date.now()}</h3>

            <p><b>Status :</b> ${item.status || "Diproses"}</p>

            <p><b>Total :</b> Rp ${Number(item.total).toLocaleString("id-ID")}</p>

        </div>
        `;

    });

}