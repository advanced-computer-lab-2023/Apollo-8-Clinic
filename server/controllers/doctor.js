import DoctorModel from '../models/doctor.js';
import UserModel from '../models/user.js';
import AppointmentModel from '../models/appointment.js';
import PatientModel from '../models/patient.js';
import bcrypt from "bcrypt";
import mongoose from 'mongoose';
import e from 'express';
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

  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    // if (!passwordRegex.test(password)) {
    //   console.log(password)
    //   return res.status(400).json({ message: 'Password is invalid' });
    // }

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
        console.log(error)
        res.status(400).json({ error: error.message });
      }
    } else {
      res.status(400).json("Username already exist");
    }
  } catch (error) {
    console.log("error")
    res.status(400).json({ error: error.message });
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


const getAcceptedDoctors = async (req, res) => {
  try {
    const user = await DoctorModel.find({status:"Accepted"});
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
};


const getDoctorById = async (req, res) => {

  try {
    const doctor = await DoctorModel.findById(
      new mongoose.Types.ObjectId(req.params.id)
    );
    if (!doctor) return res.status(404).send("Doctor not found");
    res.status(200).send(doctor);
  } catch (error) {
    res.status(400).send(error.message);
  }
}

const acceptDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(
      req.params.id,
      { status: 'Accepted' },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
const rejectDoctor = async (req, res) => {
  try {
    const doctor = await DoctorModel.findByIdAndUpdate(
      req.params.id,
      { status: 'Rejected' },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ error: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).send(error.message);
  }

}

//sss
const getAllDoctors = async (req, res) => {
  //console.log(req.body);
  try {
    const doctor = await DoctorModel.find();
    console.log(doctor);
    res.status(200).json(doctor)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const searchByNameOrSpec = async (req, res) => {
  const body = req.body;
  //console.log(req.body);
  try {
    if (body.name) {
      const doctors = await DoctorModel.aggregate([
        {
          $project: {
            ['name']: 1,
            // ['_id']: 0,
            // ['email']: 1,
            // ['hospital']: 1,
            ['speciality']: 1,
          },
        }
      ]);
      const filteredArray = doctors.filter(object => object.name === body.name);
      //console.log("if part");
      //console.log(filteredArray);
      res.status(200).json(filteredArray)
    } else if (body.speciality) {
      const { speciality } = req.body;
      const doctors = await DoctorModel.aggregate([
        {
          $project: {
            ['name']: 1,
            // ['_id']: 0,
            // ['email']: 1,
            // ['hospital']: 1,
            ['speciality']: 1,
          },
        }
      ]);
      const filteredArray = doctors.filter(object => object.speciality === speciality);
      //console.log("else if part");
      //console.log(filteredArray);
      res.status(200).json(filteredArray)
    } else {
      const { name } = req.body;
      const { speciality } = req.body;
      const doctors = await DoctorModel.aggregate([
        {
          $project: {
            ['name']: 1,
            ['_id']: 0,
            // ['email']: 1,
            // ['hospital']: 1,
            ['speciality']: 1,
          },
        }
      ]);
      const filteredArray1 = doctors.filter(object => object.name === name);
      const filteredArray = filteredArray1.filter(object => object.speciality === speciality)
      //console.log(filteredArray);
      //console.log("else part");
      res.status(200).json(filteredArray)
    }

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const filterBySpecOrAv = async (req, res) => {

  try {
    // Filter by speciality
    console.log(req.body)
    const {searchTime, searchSpec } = req.body;
    
      if (searchTime && searchSpec){
         const filtered = await DoctorModel.find({speciality:searchSpec,availableSlots:searchTime});
         res.status(200).json(filtered);
      }
      else if (searchSpec){
        const filtered=await DoctorModel.find({speciality:searchSpec})
        res.status(200).json(filtered);
         
      }
      else if (searchTime){
        console.log("soso----"+searchTime)
         const filtered = await DoctorModel.find({availableSlots:searchTime});
         res.status(200).json(filtered);
      }
      else{
         const filtered = await DoctorModel.find();
         res.status(200).json(filtered);
      }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
// const getDoctorByNameASpec= async (req,res) =>{
//   const{name} = req.body
//   const{speciality} = req.body;
//     try{
//       const doctor = await DoctorModel.aggregate([
//         {
//           $project: {
//             ['name']: 1,
//             ['email']: 1,
//             ['hospital']: 1,
//             ['speciality']: 1,


//           },
//         },
//       ]);
//       const filteredArray1 = doctor.filter(object => object.name === name )//&& object.speciality === speciality
//       const filteredArray = filteredArray1.filter(object => object.speciality === speciality)
//       console.log(filteredArray);
//       res.status(200).json(filteredArray)
//    }catch(error){
//       res.status(400).json({error:error.message})
//    }
//   }
// const getDoctorByNameOrSpec= async (req,res) =>{
//     const{name} = req.body
//     const{speciality} = req.body;
//       try{
//         const doctor = await DoctorModel.aggregate([
//           {
//             $project: {
//               ['name']: 1,
//               ['email']: 1,
//               ['hospital']: 1,
//               ['speciality']: 1,


//             },
//           },
//         ]);
//         const filteredArray = doctor.filter(object => object.name === name || object.speciality === speciality)
//         //const filteredArray = filteredArray1.filter(object => object.speciality === speciality)
//         console.log(filteredArray);
//         res.status(200).json(filteredArray)
//      }catch(error){
//         res.status(400).json({error:error.message})
//      }
//     }
// const getDoctorAvailableAndS= async (req,res) =>{
//     const{speciality,
//     availableSlots} = req.body;
//       try{
//         const doctors = await DoctorModel.aggregate([
//           {$project: {
//             name: 1,
//             email: 1,
//             hospital: 1,
//             speciality: 1,
//             availableSlots: 1,
//           },
//         },
//         ]);
//       const filteredArray1 = doctors.filter(object => object.speciality === speciality )//&& object.speciality === speciality
//       const filteredArray = filteredArray1.filter(object => (object.availableSlots).getTime() === availableSlots.getTime())
//       console.log(filteredArray);
//       res.status(200).json(filteredArray)
//      }catch(error){
//         res.status(400).json({error:error.message})
//      }
//     }
// const getDocInfo= async (req,res) =>{
//   const{name} = req.body;
//   try{
//     const doctor = await DoctorModel.aggregate([
//       {
//         $project: {
//           ['name']: 1,
//           ['speciality']: 1,
//           ['hospital']: 1,
//           ['eduBackground']: 1,
//           ['_id']: 1
//         },
//       },
//     ]);
//     const filteredArray = doctor.filter(object => object.name === name)
//     //console.log(filteredArray);
//     res.status(200).json(filteredArray)
//  }catch(error){
//     res.status(400).json({error:error.message})
//  }
// }
//sss


//=======
//handled in front end if somthing is not filledreturn previous thing
const updateDoctor = async (req, res) => {
  try {
    const email = req.body.email.trim();
    const rate = req.body.hourlyRate;
    const hospital = req.body.hospital.trim();
    //temp until get it from session
    const doctorID = req.body.doctorID;
    const doctor = await DoctorModel.findById(doctorID)
    if (email && email !== "" && email.includes("@")) {
      doctor.email = email;
    }
    if (hospital && hospital !== "") {
      doctor.hospital = hospital;
    }
    if (rate && rate > 0) {
      doctor.hourlyRate = rate;
    }
    await doctor.save();
    res.status(200).json(doctor);
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

const getHealthRecord = async (req, res) => {
  try {
    const doctorID = req.body.doctorID;
    const patientID = req.body.patientID;
    const appointment = AppointmentModel.findOne({ doctorId: doctorID, patientId: patientID })
    if (appointment) {
      const patient = PatientModel.findById(patientID)
      res.status(200).json(patient)
    }
    else {
      res.status(400).json({ error: "cannot look at that patient" })
    }
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export default {
  createDoctor,
  getDoctorById,

  getDoctors,
  acceptDoctor,
  rejectDoctor,
  //sss
  getAllDoctors,
  searchByNameOrSpec,
  filterBySpecOrAv,
  // getDoctorByNameASpec,
  // getDoctorByNameOrSpec,
  // getDoctorAvailableAndS,
  // getDocInfo,
  //sss 
  createDoctor,
  updateDoctor,
  getHealthRecord,
  getAcceptedDoctors,

}