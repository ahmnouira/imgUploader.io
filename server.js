var express = require('express')
var config = require('./server/configure') // configure.js file not folder

app = express();

// sets the envirment varibales port and views
app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);

// map the route
/*app.get('/', function(req, res) {
    res.send('Hello World');
});*/

app.listen(app.get('port'), function() {
console.log('Server up : http://localhost:' + app.get('port'));
});
