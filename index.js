var express = require('express');
var exphbs  = require('express-handlebars');
const fs = require('fs');


var app = express();

app.use(express.static(__dirname + '/public'));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded());

var day = 1;

function images(dayNumber){
    const images = './public/img/' + dayNumber;
    var myfiles = []
    fs.readdir(images, (err, files) => {
        files.forEach( file=> { 
            myfiles.push(dayNumber+"/"+file)
        });
    });
    return myfiles;
}

function questions(dayNumber){
    const questions = './public/questions/' + dayNumber + '.txt';
    myQuestions = []
    fs.readFile(questions, 'utf8', function (err,data) {
        data.split("\n").forEach( line => {
            myQuestions.push(line)
        });
    });
    return myQuestions;
}

function answers(dayNumber){
    const answers = './public/answers/' + dayNumber + '.txt';
    myAnswers = []
    fs.readFile(questions, 'utf8', function (err,data) {
        data.split("\n").forEach( line => {
            myAnswers.push(line)
        });
    });
    return myAnswers;
}

app.get('/', function (_, res) {
    res.render('home', {images: images(day), questions: questions(day)});
});

/*
app.post('/transform', function (req, res) {
    res.render('solution', {solution: sortOut(param)});
});
*/

app.listen(3000, (_req, _res) => {
    console.log('listening on port 3000');
});
  