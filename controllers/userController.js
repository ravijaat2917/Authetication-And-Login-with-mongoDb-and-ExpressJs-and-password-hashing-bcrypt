import userModel from "../models/user.js";
import {bcrypt} from '../app.js';

class userController {

  static home = (req, res) => {
    res.render("index" , {title:"Home Page" , homeButton:"Home" , loginButton:"Login" , regButton:"Register" , logoutButton:"", dashboardButton:""});
  };

  static login = (req, res) => {
    res.render("login" , {title:"Login Page", homeButton:"Home" , loginButton:"" , regButton:"" , logoutButton:"Logout", dashboardButton:"Dashboard"});
  };

  static registeration = (req, res) => {
    res.render("registration" , {title:"Registeration Page", homeButton:"Home" , loginButton:"Login" , regButton:"Register" , logoutButton:"", dashboardButton:""});
  };

  static createUserDoc = async (req, res) => {
    try {
        const hashPassword = await bcrypt.hash(req.body.password , 10);
      // creating new Document
      const doc = new userModel({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword,
      });
      // console.log(req.body);
      //saving Document
      const userMatch = await userModel.find();
      let found = false;
      userMatch.forEach((element) => {
        if (element.email === doc.email) {
          console.log("Email Already Registered");
          found = true;
          return res.redirect("/login");
        }
      });
      if (!found) {
        await doc.save().then(console.log("User Registered Successfully..."));
        return res.redirect("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static loginAuthentication = async( req , res ) =>{
    const inputData = req.body ;
    const mongoData = await userModel.find();

    const found = await userModel.findOne({email:inputData.email});
    // console.log(result);

    if(found != null){
        const passwordMatch = await bcrypt.compare(inputData.password , found.password) ;
        if(passwordMatch){
            console.log('LoginSuccessfully...');
            res.send(`<h1>Dashboard</h1> ${inputData.email}`);
        }else{
            console.log('Password Incorrect...');
            res.send(`<h1>Password Incorrect</h1> ${inputData.email}`);
        }
    }else{
        console.log(`Email not Registered`);
        res.send(`<h1>Email not registered...</h1>`);
    }
  }


}

export default userController;
