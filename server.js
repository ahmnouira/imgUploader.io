var express = require('express');
var mongoose = require('mongoose');             // mongodb database ODM used
var config = require('./server/configure');     // configure.js file not folder
app = express();

// sets the envirment varibales port and views
app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
app = config(app);



// option {useMongoClient:true}, if you have mogoose v4 installed
// {useNewUrlParser: true} option to remove 'deprecated warning'
mongoose.connect('mongodb://localhost/imgUploaderDB', { useNewUrlParser: true });
mongoose.connection.on('open', function(){
   console.log(' *** mongoose connected to imgUploaderDB ***')
});

app.listen(app.get('port'), function() {
console.log('Server up : http://localhost:' + app.get('port'));
});
