const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

const hist = require('./getHist')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.set('title','CPU usage');

app.get('/',(req,res) => res.send('Counterfeit CPU USAGE Server UP!!'));

app.get('/history/',(req,res) => {
    hist.run().then((result)=>{
    res.json(result);
    }).catch((e) => { 
        const result ={
            error: e
        }
        res.status(500).send(result);
    })
});

app.listen(port,() => { console.log('CPU Server UP !!!')})