const express = require('express');
const app = express();

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const configMiddleware = require("./middleware");
configMiddleware(app);

const configRoute = require("./routes");
configRoute(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});