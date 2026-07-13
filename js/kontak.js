document.getElementById("contactForm").addEventListener("submit", function(e){

    e.preventDefault();

    alert("✅ Terima kasih atas kritik dan saran Anda!\n\nPesan Anda berhasil dikirim.");

    this.reset();

});