const express = require('express');
const db = require('better-sqlite3')('data/database.sqlite');
const basicAuth = require('express-basic-auth');
const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

db.exec("CREATE TABLE IF NOT EXISTS services (id INTEGER PRIMARY KEY, code TEXT, name TEXT, url TEXT)");

const auth = basicAuth({
    users: { 'admin': 'sifre123' }, // Burayı değiştir
    challenge: true
});

app.get('/', (req, res) => {
    const services = db.prepare("SELECT * FROM services").all();
    res.render('index', { services });
});

app.get('/admin', auth, (req, res) => {
    const services = db.prepare("SELECT * FROM services").all();
    res.render('admin', { services });
});

app.post('/add', auth, (req, res) => {
    db.prepare("INSERT INTO services (code, name, url) VALUES (?, ?, ?)").run(req.body.code, req.body.name, req.body.url);
    res.redirect('/admin');
});

app.post('/delete', auth, (req, res) => {
    db.prepare("DELETE FROM services WHERE id = ?").run(req.body.id);
    res.redirect('/admin');
});

app.listen(3000, () => console.log('Sunucu 3000 portunda çalışıyor.'));
