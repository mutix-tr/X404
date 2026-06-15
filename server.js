const express = require('express');
const db = require('better-sqlite3')('services.db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Tabloyu oluştur
db.exec("CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY, code TEXT, name TEXT, url TEXT)");

// Listeleme
app.get('/', (req, res) => {
    const services = db.prepare("SELECT * FROM services").all();
    res.render('index', { services });
});

// Ekleme (Admin)
app.post('/add', (req, res) => {
    const { code, name, url } = req.body;
    db.prepare("INSERT INTO services (code, name, url) VALUES (?, ?, ?)").run(code, name, url);
    res.redirect('/');
});

app.listen(3000, () => console.log('Sunucu 3000 portunda aktif.'));
