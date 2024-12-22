const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
app.use(express.static('public'));
 // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views'));

mongoose.connect('mongodb://localhost:27017/Ganesh', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('User', {
    firstname:String,
    lastname:String,
    
    username:String,
    email: String,
    pass: String,
    phone: Number
});



app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/list.html');
});





app.get('/login.htm', (req, res) => {
    res.sendFile(__dirname + '/login.htm');
});

app.get('/agri.html', (req, res) => {
    res.sendFile(__dirname + '/agri.html');
});
app.get('/com.html', (req, res) => {
    res.sendFile(__dirname + '/com.html');
});

app.get('/list.html', (req, res) => {
    res.sendFile(__dirname + '/list.html');
});

app.get('/hou.html', (req, res) => {
    res.sendFile(__dirname + '/hou.html');
});



app.get('/signup.htm', (req, res) => {
    res.sendFile(__dirname + '/signup.htm');
});


app.get('/Update.html', (req, res) => {
    res.sendFile(__dirname + '/Update.html');
});

app.get('/Delete.html', (req, res) => {
    res.sendFile(__dirname + '/Delete.html');
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});





app.post('/login', (req, res) => {
    const { email, pass } = req.body;
    // Check the username and password in the database
    User.findOne({ email, pass }, (err, user) => {
        if (user) {
            res.redirect('list.html');
        } else {
            res.send('Login failed');
        }
    });
});



app.post('/register', (req, res) => {
    const { firstname,lastname,username,email, pass } = req.body;
    const newUser = new User({ firstname,lastname,username,email, pass});
    newUser.save(err => {
        if (err) {
            res.send('Registration failed');
        } else {
            res.send('Registration successful');
        }
    });
});


app.post('/update', (req, res) => {
    const { email, phone } = req.body;
    const newUser = new User({ email, phone });
    newUser.save(err => {
        if (err) {
            res.send('Update failed');
        } else {
            res.send('Update successful');
        }
    });
});

app.post('/delete', (req, res) => {
    const {email1} = req.body;

   User.remove({ email: email1}).then(function(){

res.send("Data deleted") // Success

}).catch(function(error){

res.send(error) // Failure

});
});

app.get('/get-users', (req, res) => {
    // Fetch users from the database and send them as JSON
    User.find({}, (err, users) => {
        if (err) {
            res.status(500).json({ error: 'Error fetching users' });
        } else {
            res.json(users);
       
    };
});
});



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
