 function Admin_role(req, res, next) {
    if (req.body.role=="admin101") {
       // custom header exists, then call next() to pass to the next function
       next();
  
    } else {
  
      res.send("wrong user");      
  
    }
  }

  module.exports= {Admin_role}