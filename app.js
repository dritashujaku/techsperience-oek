const express = require('express'),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose');

// ==== Getting Company Model(Schema) ====
const Company = require('./models/Company.js');

// ==== Init app ====
const app = express();

// ==== Body Parser Middleware ====
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// setup ejs template engine
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// serving static files
app.use(express.static(__dirname + '/public'));

// ==== Connection to MongoDB with Mongoose ====
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/oek', {useMongoClient: true})
  .then(function() {
     console.log('Successfully connected to MongoDB!')
  }).catch(function(err) {
     console.error(err)
  });

// routes
app.get('/', (req, res) => {
    res.render('index');
});

/* GET ALL COMPANIES */
app.get('/companies', function(req, res) {
   // Code for handling companies(data) to be returned as JSON
    Company.find(function(err, companies) {
        if (err)
            console.log(err);
        //res.json(company);
        res.render('table', {companies: companies});
    });
});

/* CREATE COMPANY */
app.post('/companies/add', function(req, res) {
   // Code for handling create company into DB and return as JSON
    var company = new Company();
    company.name = req.body.name;
    company.address = req.body.address;
    company.municipality = req.body.municipality;
    company.email = req.body.email;
    company.password = req.body.password;
    company.website = req.body.website;
    company.number = req.body.number;
    company.description = req.body.description;
    Company.create(company, function(err, company) {
        if (err)
            console.log(err);
        //res.json(company);
        res.redirect('/companies');
    });
});

/* GET COMPANY */
app.get('/companies/:id', function(req, res) {
   // Code for getting one specific company and return as JSON
    Company.findById(req.params.id, function(err, company) {
        if (err) 
            console.log(err);
        //res.json(company);
        res.render('edit', {company: company});
    });
});

/* UPDATE COMPANY */
app.post('/companies/update/:id', function(req, res) {
   // Code for updating one specific company and return as JSON
    var updatedCompany = {
        name: req.params.name,
        address: req.params.address,
        municipality: req.params.municipality,
        email: req.params.email,
        password: req.params.password,
        website: req.params.website,
        number: req.params.number,
        description: req.params.description
    };
    Company.findOneAndUpdate({_id: req.params.id}, updatedcompany, {new:true}, function(err, company) {
        if (err) 
            console.log(err);
        //res.json(company);
        res.redirect('/companies');
    });
});

/* DELETE COMPANY */
app.get('/companies/delete/:id', function(req, res) {
   // Code to delete one specific company and return message as JSON
    Company.remove({_id: req.params.id}, function(err, company) {
       if (err)
           console.log(err)
        //res.json(company);
        res.redirect('/companies');
    });
});


app.listen(3000, () => {
    console.log("App running at http://localhost:3000");
});