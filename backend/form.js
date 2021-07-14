var exp = require('express');
var cors = require('cors');
const passport = require('passport');
// const body_p = require('body-parser')
//it will run conn file automatically
require('./db/conn');
// 
const app = exp();

//for live hosting port, will automatically get the port
var port = process.env.PORT || 3000;

app.use(cors());
// app.use(body_p.json());
app.use(exp.json());

require('./src/utils/adminRole');
require('./src/utils/userRole');

const adminRoute = require('./src/routes/admin');
const helperRoute = require('./src/routes/helper');

app.use('/admin', adminRoute);
// app.use('/helper', helperRoute);



app.listen(port, () => {
	console.log(`nodes js is listening at ${port}`);
});
