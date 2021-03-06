const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

const database = {
    users:[
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
}


app.get('/', (req, resp) =>{
    resp.send(database.users);
})

app.post('/signin', (req, resp) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        resp.json(database.users[0]);
    }else{
        //console.log("Error");
        resp.status(400).json('error logging in');
    }
})

app.post('/register', (req, resp) => {
    const{name, email, password } = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    resp.json(database.users[database.users.length - 1]);
})

app.get('/profile/:id', (req, resp) => {
    const {id} = req.params;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            return resp.json(user);
        } 
    })
    if(!found){
        resp.status(400).json("Not found");
    }
})

app.put('/image', (req, resp) => {
    const {id} = req.body;
    let found = false;
    database.users.forEach(user =>{
        if(user.id === id){
            found = true;
            user.entries++;
            return resp.json(user.entries);
        } 
    })
    if(!found){
        resp.status(400).json("Not found");
    }
})

/*bcrypt.hash("bacon", null, null, function(err, hash) {
    // Store hash in your password DB.
});

// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/


app.listen(3000, () => {
    console.log("App is running on port 3000");
})

