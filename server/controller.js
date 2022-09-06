require('dotenv').config()
const {CONNECTION_STRING} = process.env

const Sequelize = require('sequelize')
const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect: 'postgres', 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
const bcrypt = require('bcryptjs');

let user_id = "";




module.exports = {
  login: (req, res) => {
    console.log('Logging In User')
   
    console.log(req.body)
    const { username, password } = req.body;
    let users = [];
    sequelize.query(`select * from users`)
          .then((dbRes) => {
              // console.log(dbRes[0]);
              users = dbRes[0]
              for (let i = 0; i < users.length; i++) {
      
                if (users[i].username == username && bcrypt.compareSync(password, users[i].user_password)) {
                  console.log(users[i]);
                  user_id = username;
                  console.log("user name after log in is", user_id)
                  return res.status(200).send(users[i])
                }
              }
              res.status(400).send("User not found.")
              
          });
      console.log("this is user array",users)
    
    
  },
  register: (req, res) => {
      console.log('Registering User')
      console.log(req.body) 
      const {password,username,email,firstName,lastName} = req.body;       
      const salt = bcrypt.genSaltSync(10);        
      //The hash represents the actual encryption of our password.
      const passHash = bcrypt.hashSync(password,salt);
      console.log(password);
      sequelize.query(`INSERT INTO users (username, user_password, email, firstname, lastname)
      VALUES ('${username}', '${passHash}','${email}', '${firstName}', '${lastName}')`)
      .then(dbRes =>{

        res.status(200).send({firstName,lastName})
      })
            },

  addFitFavourite:(req,res) =>{
    console.log(req.body)  
    res.status(200).send("updated on server side")
  }
}