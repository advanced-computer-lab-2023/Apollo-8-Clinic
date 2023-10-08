import DoctorModel from '../models/doctor.js';
import UserModel from '../models/user.js';
import bcrypt from "bcrypt";
const saltRounds = 10;

const createDoctor = async (req, res) => {
  const {
    username,
    name,
    email,
    type,
    password,
    birthDate,
    hourlyRate,
    hospital,
    eduBackground,
    status,
    //sss
    speciality,
    availableSlots,
    //sss
  } = req.body;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await UserModel.findOne({ username });
  if (!existingUser) {
    try {
      const user = new UserModel({ username, password, type });
      user.password = hashedPassword;
      console.log(user.password);
      await user.save();
      console.log(user);
      const doctor = new DoctorModel({
        user: user._id,
        name,
        email,
        birthDate,
        hourlyRate,
        hospital,
        eduBackground,
        status,
        //sss
        speciality,
        availableSlots,
        //sss
      });
      await doctor.save();
      console.log(doctor);
      res.status(200).json(doctor);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(400).json("Username already exist");
  }
};
const getDoctors = async (req, res) => {
  try {
    const user = await DoctorModel.find();
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};

const getDoctorById = async (req, res) => {
  const { user } = req.body;
  try {
    const doctor = await DoctorModel.findOne({ user });
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
//sss
const getAllDoctors = async (req, res) => {   //lesa makhlesh
  console.log(req.body);
  try{
     const doctor = await DoctorModel.aggregate([
      {
        $project: {
          ['id']: 0,
          ['name']: 1,
          ['speciality']: 1,
          ['hourlyRate']: 1,
        },
      },
    ]);
     console.log(doctor);
     res.status(200).json(doctor)
  }catch(error){
     res.status(400).json({error:error.message})
  }
 }
// const getDocByNameOrEdu= async (req,res) =>{
//   const body = req.body;
//   //console.log(req.body);
//     try{
//       if(body.name){
//         const doctors = await DoctorModel.aggregate([
//           {
//             $project: {
//               ['name']: 1,
//               ['_id']: 0,
//               ['email']: 1,
//               ['hospital']: 1,
//               ['speciality']: 1,
//             },
//           }
//         ]);
//          const filteredArray = doctors.filter(object => object.name === body.name);
//          //console.log("if part");
//          //console.log(filteredArray);
//          res.status(200).json(filteredArray)
//       }else if(body.speciality){
//         const{speciality}=req.body;
//         const doctors = await DoctorModel.aggregate([
//           {
//             $project: {
//               ['name']: 1,
//               ['_id']: 0,
//               ['email']: 1,
//               ['hospital']: 1,
//               ['speciality']: 1,
//             },
//           }
//         ]);
//          const filteredArray = doctors.filter(object => object.speciality === speciality);
//          //console.log("else if part");
//          //console.log(filteredArray);
//          res.status(200).json(filteredArray)
//       }else{
//         const{name}=req.body;
//         const{speciality}=req.body;
//         const doctors = await DoctorModel.aggregate([
//           {
//             $project: {
//               ['name']: 1,
//               ['_id']: 0,
//               ['email']: 1,
//               ['hospital']: 1,
//               ['speciality']: 1,
//             },
//           }
//         ]);
//          const filteredArray1 = doctors.filter(object => object.name === name);
//          const filteredArray = filteredArray1.filter(object => object.speciality === speciality)
//          //console.log(filteredArray);
//          //console.log("else part");
//          res.status(200).json(filteredArray)
//       }
      
//     }catch(error){
//        res.status(400).json({error:error.message})
//     }
//   }
const getDoctorByNameASpec= async (req,res) =>{
  const{name} = req.body
  const{speciality} = req.body;
    try{
      const doctor = await DoctorModel.aggregate([
        {
          $project: {
            ['name']: 1,
            ['email']: 1,
            ['hospital']: 1,
            ['speciality']: 1,
            

          },
        },
      ]);
      const filteredArray1 = doctor.filter(object => object.name === name )//&& object.speciality === speciality
      const filteredArray = filteredArray1.filter(object => object.speciality === speciality)
      console.log(filteredArray);
      res.status(200).json(filteredArray)
   }catch(error){
      res.status(400).json({error:error.message})
   }
  }
const getDoctorByNameOrSpec= async (req,res) =>{
    const{name} = req.body
    const{speciality} = req.body;
      try{
        const doctor = await DoctorModel.aggregate([
          {
            $project: {
              ['name']: 1,
              ['email']: 1,
              ['hospital']: 1,
              ['speciality']: 1,
              
  
            },
          },
        ]);
        const filteredArray = doctor.filter(object => object.name === name || object.speciality === speciality)
        //const filteredArray = filteredArray1.filter(object => object.speciality === speciality)
        console.log(filteredArray);
        res.status(200).json(filteredArray)
     }catch(error){
        res.status(400).json({error:error.message})
     }
    }
const getDoctorAvailableAndS= async (req,res) =>{
    const{speciality,
    availableSlots} = req.body;
      try{
        const doctors = await DoctorModel.aggregate([
          {$project: {
            name: 1,
            email: 1,
            hospital: 1,
            speciality: 1,
            availableSlots: 1,
          },
        },
        ]);
      const filteredArray1 = doctors.filter(object => object.speciality === speciality )//&& object.speciality === speciality
      const filteredArray = filteredArray1.filter(object => (object.availableSlots).getTime() === availableSlots.getTime())
      console.log(filteredArray);
      res.status(200).json(filteredArray)
     }catch(error){
        res.status(400).json({error:error.message})
     }
    }
const getDocInfo= async (req,res) =>{
  const{name} = req.body;
  try{
    const doctor = await DoctorModel.aggregate([
      {
        $project: {
          ['name']: 1,
          ['speciality']: 1,
          ['hospital']: 1,
          ['eduBackground']: 1,
          ['_id']: 0
        },
      },
    ]);
    const filteredArray = doctor.filter(object => object.name === name)
    //console.log(filteredArray);
    res.status(200).json(filteredArray)
 }catch(error){
    res.status(400).json({error:error.message})
 }
}
//sss

export default {
  createDoctor, getDoctorById, getDoctors,
    //sss
    getAllDoctors,
    //getDocByNameOrEdu,
    getDoctorByNameASpec,
    getDoctorByNameOrSpec,
    getDoctorAvailableAndS,
    getDocInfo
    //sss
}