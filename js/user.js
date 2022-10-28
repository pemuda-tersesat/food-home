function register() {

    //Menyimpan nilai dari form pendaftaran ke variabel
    var email = document.getElementById("email").value; 
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var nama = document.getElementById("nama").value;
    var alamat = document.getElementById("alamat").value;

    //Mengecek apakah telah diisi semua
    if (email != "" && username != "" && password != "" && nama != "" && alamat != "") {

        //Membuat object value yg berisi inputan di form pendaftaran
        var value = {
            mail: email,
            uname: username,
            pw: password,
            name: nama,
            address: alamat
        };

        //Mengubah object "value" menjadi JSON agar bisa disimpan, lalu menyimpannya ke dalam localstorage browser user
        localStorage.setItem("user", JSON.stringify(value));
        alert("Berhasil mendaftar, silahkan login dengan akun anda");

        //Mengalihkan user ke halaman login
        window.location.replace("login-pengguna.html");
    } else {
        //Jika form ada yg kosong maka mengulang mengisi form
        alert("Isi semua form");
    }
}


function login() {
    uname = document.getElementById("username").value;
    password = document.getElementById("password").value;

    if (uname == "" || password == "") {
        alert("Isi semua form");
    } else {
        if ("user" in localStorage) {
            var val_item = JSON.parse(localStorage.getItem("user"));
            var u = val_item.uname;
            var p = val_item.pw;

            //Cek apakah password username sama dengan yg didaftarkan
            if (uname == u && password == p) {
                window.location.replace("index.html");
            } else {
                alert("username atau password salah");
            }
        }else{
            alert("username tidak terdaftar");
        }
    }

}

function logout() {
    localStorage.removeItem("user");
    alert("Berhasil keluar");
    location.reload();

}

function lihat_profile(){
    var val_item = JSON.parse(localStorage.getItem("user"));
    var email = val_item.mail;
    var username = val_item.uname;
    var password = val_item.pw;
    var name = val_item.name;
    var address = val_item.address;

    document.getElementById("email").setAttribute("value",email);
    document.getElementById("password").setAttribute("value",password);
    document.getElementById("username").setAttribute("value",username);
    document.getElementById("name").setAttribute("value",name);
    document.getElementById("alamat").value = address;

}

function modal_edit_profile(){
    var val_item = JSON.parse(localStorage.getItem("user"));
    var email = val_item.mail;
    var username = val_item.uname;
    var password = val_item.pw;
    var name = val_item.name;
    var address = val_item.address;

    document.getElementById("memail").setAttribute("value",email);
    document.getElementById("mpassword").setAttribute("value",password);
    document.getElementById("musername").setAttribute("value",username);
    document.getElementById("mname").setAttribute("value",name);
    document.getElementById("malamat").value = address;
}

function edit_profile(){
    var email  = document.getElementById("memail").value; //nauf
    var password = document.getElementById("mpassword").value;
    var username = document.getElementById("musername").value;
    var name = document.getElementById("mname").value;
    var address = document.getElementById("malamat").value;

    var value = {
        mail: email,
        uname: username,
        pw: password,
        name: name,
        address: address
    };

    //Mengubah object "value" menjadi JSON agar bisa disimpan, lalu menyimpannya ke dalam localstorage browser user
    localStorage.setItem("user", JSON.stringify(value));
    alert("data berhasil disimpan");
    window.location.replace("profile.html");


}

if (localStorage.getItem("user") == null) {
    string_html = `
    <a class="nav-link" href="login-pengguna.html" style="color: #6c757d;">
        <i class="fa fa-user"></i><span id="user_name">Masuk</span></a>`;
    document.getElementById("user").insertAdjacentHTML('beforeend', string_html);

} else {
    var val_item = JSON.parse(localStorage.getItem("user"));
    var u = val_item.uname;
    string_html = `
    <div class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" style="color: #6c757d;;" id="dropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        <i class="fa fa-user"></i><span id="user_name">` + u + `</span></a>
        <div class="dropdown-menu" aria-labelledby="dropdown">
            <a class="dropdown-item" href="profile.html">Profil</a>
            <a class="dropdown-item" href="#" onclick="logout()">Keluar</a>
        </div>
    </div>`;
    document.getElementById("user").insertAdjacentHTML('beforeend', string_html);
}