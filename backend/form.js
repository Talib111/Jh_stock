var exp = require('express');
var cors = require('cors');
const passport = require('passport');
const {Admin_role} = require('./src/Role/Admin_role')
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
const save_Data = require('./src/routes/save_data')
app.use('/admin', adminRoute);
app.use('/products',save_Data);
// app.use('/helper', helperRoute);

app.post('/test',Admin_role, (req,res)=>{
	res.send("serving from cloud server and hurrah node is working from cloud");
})

app.listen(port, () => {
	console.log(`nodes js is listening at ${port}`);
});
