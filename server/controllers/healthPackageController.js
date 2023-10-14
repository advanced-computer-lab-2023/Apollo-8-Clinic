import HealthPackageModel from '../models/healthPackage.js' ;
import HealthPackage from '../models/healthPackage.js';
import mongoose from 'mongoose';


// Controller function to retrieve all Health Packages (displayAll)
const getAllHealthPackages = async (req, res) => {
  try {
    const HealthPackages = await HealthPackage.find();   
    res.status(200).json(HealthPackages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};





// Controller function to create a new Health Package (addNew)
const createHealthPackage = async (req, res) => {
  try {
    const {name,price,sessDiscount,medDiscount,subDiscount}= req.body;
    const newHealthPackage = new HealthPackageModel({name,price,sessDiscount,medDiscount,subDiscount});
    await newHealthPackage.save();
    res.status(200).json(newHealthPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to update an existing Health Package (findById + update)
const updateHealthPackage = async (req, res) => {
  try {
    const { id } = req.params;
    //const  {name,price,sessDiscount,medDiscount,subDiscount} = req.body ;
    const updatedHealthPackage = await HealthPackage.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedHealthPackage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to delete a Health Package
const deleteHealthPackage = async (req, res) => {
  try {
    const { id } = req.params;
    await HealthPackage.findByIdAndDelete(id);
    res.sendStatus(204);  //done successfully
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default {
  getAllHealthPackages,
  createHealthPackage,
  updateHealthPackage,
  deleteHealthPackage
};