import UserModel from '../models/user.js';
import jwt from "jsonwebtoken";



const requireAuthPatient = async (req, res, next) => {
    const authHeader=req.headers['authorization'];
    const token =authHeader && (authHeader.split(' ')[1])
      
    // check json web token exists & is verified
    if (token) {
        
       jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {
            
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"You have no authorization"})
          // res.redirect('/login');
        } else {
            const name=decodedToken.name;
            const user=await UserModel.findOne({username:name,type:{$regex :/patient/i}})
            if(user){
                next();
            }
            else{
                res.status(401).json({message:"You have no authorization"})
            }
             
        }
      });
    } else {
      res.status(401).json({message:"You have no authorization"})
    }
  };


  const requireAuthAdmin = async (req, res, next) => {
    const authHeader=req.headers['authorization'];
    const token =authHeader && (authHeader.split(' ')[1])
      
    // check json web token exists & is verified
    if (token) {
        
       jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {
            
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"You have no authorization"})
          // res.redirect('/login');
        } else {
            const name=decodedToken.name;
            const user=await UserModel.findOne({username:name,type:{$regex :/admin/i}})
            if(user){
                next();
            }
            else{
                res.status(401).json({message:"You have no authorization"})
            }
             
        }
      });
    } else {
      res.status(401).json({message:"You have no authorization"})
    }
  };

  const requireAuthDoctor = async (req, res, next) => {
    const authHeader=req.headers['authorization'];
    const token =authHeader && (authHeader.split(' ')[1])
      
    // check json web token exists & is verified
    if (token) {
        
       jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
        if (err) {
            
          // console.log('You are not logged in.');
          // res send status 401 you are not logged in
          res.status(401).json({message:"You have no authorization"})
          // res.redirect('/login');
        } else {
            const name=decodedToken.name;
            const user=await UserModel.findOne({username:name,type:{$regex :/doctor/i}})
            if(user){
                next();
            }
            else{
                res.status(401).json({message:"You have no authorization"})
            }
             
        }
      });
    } else {
      res.status(401).json({message:"You have no authorization"})
    }
  };
  
  export default {
    requireAuthPatient,
    requireAuthAdmin,
    requireAuthDoctor
  }