var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

content = {
    'article-one': {
        'title': 'Article One',
        'heading': 'Article One',
        'date': 'Aug-20-2001',
        'content': `
          <p>
            Finally article one is live, you get to learn so much from article one.
            I am going to let you know what is article one all about, so let's get
            started bros and guys! :)
          </p>
          <i>Hey this is italic <u>alright?</u></i>
          <h2>This is the best you could do with this shit and this is the best you could do with this shit and I don't know what the hell I am talking about.</h2>
        `,

    }
}

function contentTemplate(data){
  var title = data.title;
  var heading = data.heading;
  var date = data.date;
  var content = data.content;
  var htmlTemplate = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
    </head>
    <body>
    <h1>${heading}</h1>
    <p>${date}</p>
      ${content}
    </body>
  </html>

  `
  return htmlTemplate;
}

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/:articleName', function(req, res) {
    res.send(contentTemplate(content[req.params.articleName]))
});

app.get('/ui/style.css', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function(req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function() {
    console.log(`IMAD course app listening on port ${port}!`);
});
