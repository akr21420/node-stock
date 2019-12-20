const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const exphbs  = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
function call_api(finishedAPI, ticker){
request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_9a4cf913dc1848c288c360085212b8ed', {json:true}, (err, res, body) => {
	if(err) {return console.log(err);}
	if (res.statusCode === 200){
		//console.log(body);
	 finishedAPI(body);
	};
});
};
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
    call_api(function(doneAPI){
    	res.render('home', {
    	stuff: doneAPI
    	
    });

    }, "fb");
});

app.post('/', function (req, res) {
    call_api(function(doneAPI){
    	//var posted_stuff = req.body.stock_ticker
    	res.render('home', {
    	stuff: doneAPI
    	
    });

    },  req.body.stock_ticker);
});
app.get('/about.html', function (req, res) {
    res.render('about');
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));