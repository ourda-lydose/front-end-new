## Context Diagram
![alt text](image.png)
<br>

## Container Diagram
![alt text](image-2.png)
<br>

## Deployment diagram
![alt text](image-3.png)

<br>
https://drive.google.com/file/d/1xd5uG2SD0TZvW2bkgvlB6ThqQ5vf1G3f/view?usp=sharing

Pada proyek TK ini, kami mengimplementasikan arsitektur berbasis MICROSERVICE (yang dikelola mengunakan API gateway), kami memilih arsitektur tersebut karena:
- Skalabilitas yang berjalan secara independen
- Dapat mengontrol sumber daya (fokus pada service yang sering digunakan tanpa menambah jumlah service yang relatif jarang digunakan)
- CI/ID tidak mengganggu progress anggota lain (mengurangi risiko kegagalan total)
- Pemisahan tanggung jawab (SRP)
- Pengelolaan data yang terpisah

Untuk ke depannya, kami berencana mengimplementasikan event-driven-architecture yang memungkan sistem jauh lebih flesibel dan meningkatkan daya skalabilitas, hal ini dilakukan karena semakin kompleks suatu microservice dalam pengembangan ke depannya, rawan terjadi kerusakan pada suatu bagian microservice sehingga hal ini dapat memengaruhi performa microservice lainnya yang saling berinteraksi. Terlebih lagi, repository kami telah dirancang hampir 1 repo untuk 1 orang (ada pengecualian sedikit) sehingga setiap orang mengerjakan bagiannya tanpa dipantau secara langsung oleh rekan lainnya, seperti cara kodingannya dan alur pengerjaannya sehingga rawan terjadi miss pada hal ini.
