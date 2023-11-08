
import UserModel from '../models/user.js';
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



const maxAge = 3 * 24 * 60 * 60;
const createToken = (name) => {
    return jwt.sign({ name },process.env.SECRET , {
        expiresIn: maxAge
    });
};


const loginDoctor = async (req, res) => {
    try{
    const { name,  password } = req.body;
    const user=await UserModel.findOne({username:name});
    const passwordMatch=await bcrypt.compare(password,user.password);
    console.log(passwordMatch);
    if(!passwordMatch||!(user.type.toLowerCase()==='doctor')){
        res.status(400).json("wrong password or email");
    }
    else{
        console.log(user)
        const token = createToken(user.username);
        console.log("hnaa")
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({token:token})

    }
    }
    catch(err){
        res.status(400).json("wrong password or email");
    }   
}

const loginPatient = async (req, res) => {
    try{
    const { name,  password } = req.body;
    const user=await UserModel.findOne({username:name});
    const passwordMatch=await bcrypt.compare(password,user.password);
    if(!passwordMatch||!user.type.toLowerCase()==='patient'){
        res.status(400).json("wrong password or email");
    }
    else{
        console.log(user)
        const token = createToken(user.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({token:token})

        } 
    }
    catch(err){
        res.status(400).json("wrong password or email");
    }
}

const loginAdmin = async (req, res) => {
    try{
    const { name,  password } = req.body;
    const user=await UserModel.findOne({username:name});
    console.log(user);
    if(!user){
        res.status(400).json("wrong password or email");
    }
    //must hash it 
   //  const passwordMatch=await bcrypt.compare(password,user.password);
    const passwordMatch=password===user.password;
    if(!passwordMatch||!user.type.toLowerCase()==='admin'){
        console.log("shshsh");
        res.status(400).json("wrong password or email");
    }
    else{
        const token = createToken(user.username);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(201).json({token:token})

        }   
    }
    catch(err){
        res.status(400).json("wrong password or email ")
    }
}
//not needed

const logout = async (req, res) => {
    const token = req.cookies.jwt;
    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.status(200).json({message:'Succefully logedout'})
}

export default {
    loginDoctor,
    loginAdmin,
    loginPatient,
    logout
  }