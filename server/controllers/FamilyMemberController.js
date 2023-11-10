import FamilyMemberModel from '../models/familyMember.js';
import FamilyMember from '../models/familyMember.js';

//req.params-->memID
const memberDetails = async(req,res)=>{
  try{const id = req.params.memID;
  const FamilyMem = await FamilyMemberModel.findById(id);
    res.status(200).json(FamilyMem);
  }catch(error){
    res.status(500).json({ error: error.message });
  }
};



// Controller function to retrieve all Family Members (NOT LINKED) (displayAll)
const getNotLinkedFamMembers = async (req, res) => {
    try {
      const patientID = req.params.patientID ;
      const Fam = await FamilyMember.find({"patientID":patientID , "linkageID":null});
      //const Fam = await FamilyMember.find();
      res.status(200).json(Fam);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
// Controller function to retrieve all Family Members (NOT LINKED) (displayAll)
const getLinkedFamMembers = async (req, res) => {
  try {
    const patientID = req.params.patientID ;
    const Fam = await FamilyMember.find({"patientID":patientID , "linkageID":{ $ne: null }});
    //const Fam = await FamilyMember.find();
    res.status(200).json(Fam);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

 // add a New fam member  (addNew)
const addNewFamilyMember = async (req, res) => {
    try {
      
      const patientID = req.params.patientID ;
      const {name,nationalID,age,gender,relation} = req.body;
      
      const newFamMember = new FamilyMember({"patientID":patientID,"name":name,"nationalID":nationalID,"age":Number(age),"gender":gender,"relation":relation,"healthPackageSub":"","DateOfSubscribtion":null,"subscriptionStatus":"unsubscribed","linkageID":null});
      //const newFamMember = new FamilyMemberModel({name,nationalID,age,gender,relation});
      await newFamMember.save();
      
      res.status(200).json(newFamMember);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }; 


//req.params --> id
const cancelSubscription =async(req,res)=>{
  try{
    
    const memberID = req.params.id ;
    const FamilyMem = await FamilyMemberModel.findById(memberID);
   
    //al mafrod mat7salsh
    if(FamilyMem.linkageID!==null){
      res.status(200).send("caonnot cancel subs for a linked patient");
  }
  if(FamilyMem.subscriptionStatus==="cancelled with end date")
      {res.status(200).send("already cancelled");return;}

    FamilyMem.subscriptionStatus = "cancelled with end date";
    FamilyMem.save();
    res.status(200).send("Done");
  }catch(error){
    res.status(400).json({ error: error.message });
  }
}

  export default{
    getNotLinkedFamMembers,
    getLinkedFamMembers,
    addNewFamilyMember,
    memberDetails,
    cancelSubscription
  }