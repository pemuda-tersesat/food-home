//Script ini untuk operasi barang belanja

c = 10;

//FUngsi untuk menambah jumlah item di keranjang lewat modal
function plus_click() {
    item = document.getElementById("item").innerHTML;
    c += 1;
    document.getElementById("kolom-jumlah").setAttribute("value", c);
};

//Fungsi untuk mengurangi jumlah item di keranjang lewat modal
function minus_click() {
    c -= 1;
    if (c <= 10) {
        c = 10;
        document.getElementById("kolom-jumlah").setAttribute("value", c);
    } else {
        document.getElementById("kolom-jumlah").setAttribute("value", c);
    }
};

//Fungsi untuk memasukkan barang ke dalam keranjang lewat modal
function masuk_keranjang() {
    nama_barang = document.getElementById("item").innerHTML; //Nasi kentang

    //Create value as object
    value = {
        jumlah: c.toString(),
        harga: document.getElementById("harga").getAttribute("value")
    };

    //Save value as JSON
    localStorage.setItem(nama_barang, JSON.stringify(value));

    //Get value as string
    //val_item = JSON.parse(localStorage.getItem("Nasi + Kentang"));
    alert('item berhasil dimasukan ke keranjang');
    c = 10;
};

item = "";

//Fungsi untuk menampilkan barang yang dimasukkan ke keranjang di modal keranjang
function modal_keranjang() {

    //isi l dengan jumlah item di localstorage
    l = window.localStorage.length - 1;

    //Check jumlah isi dari block div="isi-modal-keranjang"
    check = document.getElementById("isi-modal-keranjang").innerHTML.length;

    //Looping seluruh item yg di localstorage
    for (i = 0; i <= l; i++) {

        //isi variable key dgn key ke-i di localstorage
        key = localStorage.key(i);

        if (key != "user") {

            //Isi val_item dengan value dari key ke-i di localstorage
            val_item = JSON.parse(localStorage.getItem(key));

            //Isi jumlah dng value jumlah item setiap item belanjaan
            jumlah = val_item.jumlah;

            //Isi harga dengan value harga setiap harga dari belanjaan
            harga = val_item.harga;

            //Menghitung total harga dari setiap belanjaan
            total_harga = parseInt(jumlah) * parseInt(harga);

            //mendapatkan elemen dengan id="isi-modal-keranjang"
            parent_node = document.getElementById("isi-modal-keranjang")
            
            //Isi list_item dengan syntax html yang akan diisi ke dalam elemen dgn id="isi-modal-keranjang"
            list_item = `
            <div class="row">
                <div class="col-4" id="key_item">` +
                key +
                `</div>
                <div class="col">` +
                jumlah +
                `</div>
                <div class="col">` +
                String(total_harga) +
                `</div>
                <div class="col">
                    <button type="button" class="btn btn-outline-danger btn-sm" id="btn-minus" onclick="hapus_item()">
                        <i class="fa fa-times"></i>
                    </button>
                </div>
            </div>\n`;
            
            //Menambahkan variable item dengan syntax html yg didapat dari setiap looping yg dilakukan diatas
            item = item + list_item;
        } else {

            //Jika key yg didapat dri localstorage == "user" maka skip looping , lanjut ke looping berikutnya
            continue;
        }
    }

    //Cek apakah element dari div="isi-modal-keranjang" kosong atau tidak
    if (check == 0) {
        //Jika kosong

        //Mengosongkan isi dari element div="isi-modal-keranjang"
        document.getElementById("isi-modal-keranjang").innerHTML = "";

        //menyisipkan syntax html di variable item ke dalam elemen id="isi-modal-keranjang"
        document.getElementById("isi-modal-keranjang").insertAdjacentHTML('beforeend', item);
        
        //Mengosongkan variable item
        item = "";
    } else if (check != 0) {
        //Klo kga kosong
        
        //Mengosongkan isi dari element div="isi-modal-keranjang"
        document.getElementById("isi-modal-keranjang").innerHTML = "";
        
        //Mengisi element div="isi-modal-keranjang" dgn syntax html didalam variable item
        document.getElementById("isi-modal-keranjang").innerHTML = item;
        
        //Mengosongkan variable item
        item = "";
    }
}

//Fungsi untuk menghapus barang dari keranjang
function hapus_item() {
    
    //mendapatkan key yg ingin dihapus dari isi elemen div="key_item"
    key = document.getElementById("key_item").innerHTML;
    
    //Hapus item dgn referensi key nya
    localStorage.removeItem(key);
    
    //Jalankan fungsi modal_keranjang
    modal_keranjang();
}

string_html = "";
item_total = "";
total_seluruh_harga = 0;
total_seluruh_item = 0;

//FUngsi untuk mengalihkan user ke halaman pembayaran dari modal keranjang
function red() {

    //sebelum menuju halaman pembayaran, cek dulu apakah user sudah menambahkan item ke keranjang atau blm
    //isi l dengan jumlah item di localstorage
    var l = window.localStorage.length - 1;

    //isi ketemu dengan false
    var ketemu = false;
    
    //cek seluruh key yg ada di localstorage dgn looping
    for (i = 0; i <= l; i++){

        //dapetin key ke-i
        var key = window.localStorage.key(i);

        //jika key tidak sama dgn "user"
        if (key != "user"){
            ketemu = true;
            
            //keluar dari looping
            break;
        }else{
            //klo key sama dng "user" lanjut looping
            continue;
        }
    }

    if (ketemu){
        //Membuka halaman pembayaran
        window.location.replace("pembayaran.html");
    }else{
        alert("anda belum belanja apapun");
    }
}

//Fungsi untuk menampilkan item di keranjang ke halaman pembayaran
function bayar() {
    
    //isi l dengan jumlah item di localstorage
    l = window.localStorage.length - 1;

    //jumlah isi dari block div="dafta_item_bayar"
    check = document.getElementById("daftar_item_bayar").innerHTML.length;

    //jumlah isi dari block div="isi-modal-keranjang"
    check2 = document.getElementById("total_harga-total_item").innerHTML.length;

    //Lopping seluruh key di localstorage
    for (i = 0; i <= l; i++) {
        key = localStorage.key(i);

        //JIka key tdk sama dengan "user"
        if (key != "user") {

            //Parsing value dari setiap key yg didapat
            val_item = JSON.parse(localStorage.getItem(key));

            //Isi jumlah dng value jumlah item setiap item belanjaan
            jumlah = val_item.jumlah;

            //Isi harga dng value ahrga item setiap item belanjaan
            harga = val_item.harga;

            //Menghitung total harga suatu item belanjaan
            total_harga = parseInt(jumlah) * parseInt(harga);

            //Menghitung total seluruh harga belanjaan
            total_seluruh_harga = total_seluruh_harga + total_harga;

            //Menghitung total item seluruh belanjaan
            total_seluruh_item = total_seluruh_item + parseInt(jumlah);

            //Mendapakan block dengan div="daftar_item_bayar"
            parent_node = document.getElementById("daftar_item_bayar");

            //Syntax html yang akan diisi ke dalam parent_node
            item_per_key = `
            <div class="row">
                <div class="col-sm-auto">
                    <img src="images/` + key + `.jpg" class="img-fluid rounded shadow" height="159px" width="250px">
                    <a href="` + key + `.html" class="stretched-link"></a>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <p class="font-weight-bold" style="margin-left: 10px;">` + key + `</p>
                            </div>
                            <div class="row">
                                <p class="font-weight-bold" style="margin-left: 10px;">` + jumlah + ` Box</p>
                            </div>
                            <div class="row">
                                <p style="margin-left: 10px;">Total harga: <b>` + String(total_harga) + `</b></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>\n`;

            //Menambahkan string_html dengan syntax html pd setiap looping
            string_html = string_html + item_per_key;
        } else {
            continue;
        }
    }

    //Syntax html  untuk total harga dan total item belanjaan
    item_total = `
    <p><b>Total Harga Seluruhnya: </b>` + String(total_seluruh_harga) + `<br />
    <b>Total Item Seluruhnya: </b>` + String(total_seluruh_item) + ` box<br /></p>\n`;


    if (check == 0) {
        
        //kosongkan block element dri div="daftar_item_bayar"
        document.getElementById("daftar_item_bayar").innerHTML = "";

        //append syntax html yg ada di string_html kedalam block element div="daftar_item_bayar"
        document.getElementById("daftar_item_bayar").insertAdjacentHTML('beforeend', string_html);
        
        //kosongkan isi string_html
        string_html = "";
    } else if (check != 0) {
        
        //kosongkan block element dri div="daftar_item_bayar"
        document.getElementById("daftar_item_bayar").innerHTML = "";
        
        //ganti isi dari block element div="daftar_item_bayar" dengan string_html
        document.getElementById("daftar_item_bayar").innerHTML = string_html;
        
        //kosongkan string_html
        string_html = "";
    }

    if (check2 == 0) {
        
        //kosongkan block element dri div="total_harga-total_item"
        document.getElementById("total_harga-total_item").innerHTML = "";

        //append isi block element div="total_harga-total_item" dgn item_total
        document.getElementById("total_harga-total_item").insertAdjacentHTML('beforeend', item_total);
        
        //kosongkan item_total
        item_total = "";
    } else if (check2 != 0) {
        
        //kosongkan block element dri div="total_harga-total_item"
        document.getElementById("total_harga-total_item").innerHTML = "";
        
        //ganti isi block element div="total_harga-total_item" dgn item_total
        document.getElementById("total_harga-total_item").innerHTML = item_total;
        
        //kosongkan item_tota
        item_total = "";
    }

    //Mengisi form invoice

    //Cek apajah user sudah masuk atau belum
    if (document.getElementById("user_name").innerHTML.value != "masuk") {
        //Jika user sdh masuk
        
        var value_user = JSON.parse(localStorage.getItem("user"));
        
        //mendapatkan value name dari value_user
        var name = value_user.name;
        //mendapatkan value email dari value_user
        var email = value_user.mail;
        //mendapatkan value alamat dari value_user
        var alamat = value_user.address;

        //Isi setiap form dengan data yg didapat diatas
        document.getElementById("nama").setAttribute("value", name);
        document.getElementById("email").setAttribute("value", email);
        document.getElementById("alamat").value = alamat;
    }else{

        //Kalau user blm login

        //Kosongkan form
        document.getElementById("nama").setAttribute("value", "");
        document.getElementById("email").setAttribute("value", "");
        document.getElementById("alamat").setAttribute("value", "");
    }


}

function bayar_terakhir(){

    //mendapatkan nama dari form invoice utk pengecekan
    var test = document.getElementById("nama").getAttribute("value");
    
    if (test == ""){
        //jika user blm masuk
        alert("anda belum masuk, silahkan masuk terlebih dahulu");
        //Alihkan user ke halaman login
        window.location.replace("login-pengguna.html");
    }else{
        //Jika user sdh masuk
        alert("Silahkan cek kotak masuk/span email anda untuk info status pesanan");
    }
}