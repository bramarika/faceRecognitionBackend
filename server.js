const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

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
        resp.json('success');
    }else{
        resp.status(400).json("error logging in");
    }
    resp.json("Signin");
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

app.listen(3000, () => {
    console.log("App is running on port 3000");
})

/*
/ --> res = this is working
/signin --> POST  = success/fail
/register --> POST = user obj
/profile/:userid --> GET = user
/image --> PUT = user

*/
