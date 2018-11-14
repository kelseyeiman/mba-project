var mysql = require('mysql');
 
var con = mysql.createConnection({
  host: "localhost",
  port: "3306",
  user: "mba_user",
  password: "Password1",
  database: "lab_project"
});
 
con.connect(function(err)
{
  if (err) throw err;
  
  console.log("Connected!");
  con.query("SELECT * FROM samples", function (err, result, fields) 
  {
    if (err) throw err;
    console.log(result);
  });
});