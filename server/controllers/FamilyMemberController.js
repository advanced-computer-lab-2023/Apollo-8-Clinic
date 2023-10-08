import FamilyMemberModel from '../models/familyMember.js';
import FamilyMember from '../models/familyMember.js';


// Controller function to retrieve all Family Members (displayAll)
const getAllFamMembers = async (req, res) => {
    try {
      const Fam = await FamilyMember.find();
      res.status(200).json(Fam);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

 // Controller function to add a New fam member  (addNew)
const addNewFamilyMember = async (req, res) => {
    try {
      const {name,nationalID,age,gender,relation}= req.body;
      const newFamMember = new FamilyMemberModel({name,nationalID,age,gender,relation});
      await newFamMember.save();
      res.status(200).json(newFamMember);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }; 

  export default{
    getAllFamMembers,
    addNewFamilyMember
  }