const tombolSubmit = document.getElementById("submitSoal");

tombolSubmit.addEventListener("click", function () {

    

    const apiKey = document.getElementById("apiKey").value;
    const tujuanPembelajaran =
        document.getElementById("tujuanPembelajaran").value;
    const kognitif =
        document.getElementById("kognitif").value;
    const jumlahSoal =
        document.getElementById("jumlahSoal").value;
    const bentukSoal =
        document.getElementById("bentukSoal").value;
    const bentukOpsi =
        document.getElementById("bentukOpsi").value;
    const kelas =
        document.getElementById("kelas").value;


    

    const prompt = `

ANDA ADALAH SEORANG PENYUSUN SOAL PROFESIONAL UNTUK JENJANG SEKOLAH DASAR.

TUGAS:

Buat ${jumlahSoal} soal berdasarkan data yang diberikan pengguna.


DATA SOAL:

- Tujuan Pembelajaran: ${tujuanPembelajaran}
- Level Kognitif: ${kognitif}
- Bentuk Soal: ${bentukSoal}
- Bentuk Opsi Pilihan Ganda: ${bentukOpsi}
- Kelas: ${kelas}


ATURAN PEMBUATAN SOAL:

1. Setiap soal HARUS mampu mengukur ketercapaian Tujuan Pembelajaran yang diberikan.


2. Tingkat kesulitan soal HARUS sesuai dengan level kognitif dan kelas yang diberikan.


3. Jika bentuk soal adalah PILIHAN GANDA:

   - Soal HARUS berupa kalimat yang perlu dilengkapi atau disambungkan.
   - Soal TIDAK BOLEH berbentuk pertanyaan.
   - Soal TIDAK BOLEH berbentuk perintah.
   - Opsi jawaban harus melengkapi kalimat pada soal secara logis.


4. Jika bentuk soal adalah ISIAN:

   - Soal HARUS berupa kalimat yang perlu dilengkapi.
   - Soal TIDAK BOLEH berbentuk pertanyaan.
   - Soal TIDAK BOLEH berbentuk perintah.


5. Jika bentuk soal adalah ESSAY:

   - Soal HARUS berbentuk pertanyaan atau perintah.
   - Soal TIDAK BOLEH berbentuk kalimat sambung.


6. Dari seluruh jumlah soal, sekitar 30% sampai 40% HARUS menggunakan cerita atau ilustrasi kontekstual.

   - Cerita harus berkaitan langsung dengan Tujuan Pembelajaran.
   - Cerita harus menggambarkan masalah, situasi, atau kegiatan sehari-hari.
   - Cerita tidak boleh dibuat hanya untuk memperpanjang soal.
   - Informasi dalam cerita harus diperlukan untuk menjawab soal.
   - Jumlah soal dengan cerita harus berada dalam rentang 30% sampai 40% dari total soal jika memungkinkan.


7. WAJIB memberikan kunci jawaban untuk SEMUA soal.

   - Kunci jawaban ditempatkan di bagian paling bawah setelah seluruh soal selesai.
   - Jangan menempatkan kunci jawaban setelah masing-masing soal.


8. Gunakan Bahasa Indonesia yang baik, benar, jelas, efektif, dan sesuai dengan jenjang sekolah dasar.


9. Nomor soal HARUS dibuat berurutan mulai dari nomor 1 sampai nomor ${jumlahSoal}.

   Ingat, nomor soal harus dalam bentuk angka.


10. Untuk soal pilihan ganda:

   - Posisi jawaban benar HARUS dibuat beragam.
   - Jangan membuat semua jawaban benar berada pada pilihan yang sama.
   - Sebarkan jawaban benar secara wajar pada pilihan yang tersedia.


11. Pengecoh pada pilihan ganda HARUS berfungsi dengan baik.

   - Pengecoh harus masuk akal.
   - Pengecoh harus berhubungan dengan materi yang diukur.
   - Jika jawaban yang benar pendek, pengecoh juga harus memiliki panjang dan bentuk yang relatif sebanding.
   - Jangan membuat pengecoh yang jelas-jelas salah atau tidak masuk akal.
   - Jangan menggunakan pilihan yang terlalu mudah ditebak hanya karena berbeda panjang, bentuk, atau gaya bahasa.


12. Untuk soal pilihan ganda:

   - JANGAN menggunakan opsi "semua benar".
   - JANGAN menggunakan opsi "semua salah".
   - Setiap opsi harus berfungsi sebagai pengecoh atau jawaban yang masuk akal.
   - Jangan membuat opsi yang saling tumpang tindih sehingga terdapat lebih dari satu jawaban yang benar.
   - Pastikan hanya ada SATU jawaban yang paling tepat.
   - Soal pilihan ganda harus diakhiri dengan ....
   - Jika bagian yang perlu diisi berada di tengah kalimat, berikan ... pada bagian tersebut.


PEMERIKSAAN SEBELUM MEMBERIKAN HASIL:

Sebelum menampilkan soal, periksa kembali setiap soal untuk memastikan:

- sesuai dengan Tujuan Pembelajaran;
- sesuai dengan level kognitif;
- sesuai dengan bentuk soal yang dipilih;
- menggunakan bahasa Indonesia yang baik;
- nomor soal berurutan;
- jumlah soal sesuai permintaan;
- proporsi soal cerita sekitar 30%-40%;
- soal pilihan ganda memiliki satu jawaban yang benar;
- pengecoh berfungsi dengan baik;
- tidak ada opsi "semua benar" atau "semua salah";
- kunci jawaban tersedia untuk seluruh soal.


FORMAT OUTPUT:

Tampilkan seluruh soal terlebih dahulu.

Setelah soal terakhir, tampilkan:

KUNCI JAWABAN

1. ...
2. ...
3. ...

dan seterusnya sampai soal nomor ${jumlahSoal}.

Jangan memberikan penjelasan, komentar, atau teks tambahan di luar hasil soal dan kunci jawaban.

`;


    

    fetch("https://api.groq.com/openai/v1/chat/completions", {

        method: "POST",

        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },

        body: JSON.stringify({

            model: "openai/gpt-oss-20b",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ],

            include_reasoning: false

        })

    })


    

    .then(response => response.json())

    .then(data => {

        const hasilSoal =
            data.choices[0].message.content;


        console.log("HASIL SOAL:");
        console.log(hasilSoal);


        const hasil =
            document.querySelector(".hasil");


        console.log("ELEMEN HASIL:");
        console.log(hasil);


        hasil.innerText = hasilSoal;


        document.getElementById("salinSoal").style.display =
            "block";

    })


    

    .catch(error => {

        console.error("TERJADI ERROR:");
        console.error(error);

    });

});




const tombolSalin =
    document.getElementById("salinSoal");


tombolSalin.addEventListener("click", function () {

    const hasilSoal =
        document.querySelector(".hasil").innerText;


    navigator.clipboard.writeText(hasilSoal);


    tombolSalin.innerText =
        "Berhasil Disalin!";


    setTimeout(function () {

        tombolSalin.innerText =
            "Salin Soal";

    }, 2000);

});

tombolKembali.addEventListener("click", function () {
    window.location.href = "index.html";
});
