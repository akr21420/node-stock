const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000;
const exphbs  = require('express-handlebars');
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.get('/', function (req, res) {
    res.render('home', {
    	stuff: "This is stuff.."
    });
});
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => console.log('Server Listening on Port ' + PORT));