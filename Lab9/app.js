const express = require('express');
const app = express();

const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const handlebars = require('handlebars');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    helpers: {
        asJSON: (obj, spacing) => {
            if (typeof spacing == 'number') {
                return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
            }
            return new Handlebars.SafeString(JSON.stringify(obj));
        }
    }
});

app.engine('handlebars', handlebarsInstance.engine);
app.set('view engine', 'handlebars');

const configRoutes = require('./routes');
configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});