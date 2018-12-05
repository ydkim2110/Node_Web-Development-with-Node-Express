var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout: 'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT||3000);

app.use(express.static(__dirname + '/public'))

var fortuneCookies = [
	"Conquer your fears or they will conquer you.",
	"Rivers need springs.",
	"Do not fear what you don't know.",
	"You will have a pleasant surprise.",
	"Whenever possible, keep it simple.",
];

app.get('/', (req, res)=>{
    res.render('home');
});

app.get('/about', (req, res)=>{
    var randomFortune = 
		fortuneCookies[Math.floor(Math.random() * fortuneCookies.length)];
	res.render('about', { fortune: randomFortune });
});

app.use((req, res, next)=>{
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next)=>{
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log("Express started on http://localhost:"+app.get('port'));
})