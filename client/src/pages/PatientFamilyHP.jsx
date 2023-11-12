import ReactDOM from "react-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Button1 from 'react-bootstrap/Button';
import Card1 from 'react-bootstrap/Card';
import famImg from '../images/famclinic.png';
import hpImg from '../images/clinicHP.png';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import "../App.css";

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingBasketSharpIcon from '@mui/icons-material/ShoppingBasketSharp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from "react-router-dom";
import { height } from '@mui/system';
import imgSrc from "../images/photo.png"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import HomeIcon from '@mui/icons-material/Home';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import { Alert } from "@mui/material";

import ResponsiveAppBar from './TopBar';
import Ads from './Ads';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import BottomBar from "./BottomBar";





const PatientHP_FM = () => {
  //assuming that patient id is in window.location named patientID
  const params = new URLSearchParams(window.location.search);
  let patientID = params.get('patientId');
  /////////////////////REMOVE THAT
  patientID = "652f955bdea721b31ef04335";
  const [mainshow, setmainshow] = useState(true);
  const [familyshow, setfamilyshow] = useState(false);
  const [addFamilyMemForm, setaddFamilyMemForm] = useState(false);
  const [linkFamilyMemForm, setlinkFamilyMemForm] = useState(false);
  const [healthPackageshow, sethealthPackageshow] = useState(false);
  const [nonlinkedfamily, setnonlinkedfamily] = useState([]);
  const [linkedfamily, setlinkedfamily] = useState([]);
  const [healthPackages, setHealthPackages] = useState([]);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [dropdownFam, setdropdownFam] = useState(false);
  const [MyPatient, setMyPatient] = useState({});

  const fn1 = () => {
    setmainshow(false);
    setfamilyshow(true);
    axios.get(`http://localhost:8000/patient/NotlinkedFamily/${patientID}`).then(
      (res) => {
        setnonlinkedfamily(res.data);
        console.log(res.data);
      }
    ).catch(error => {
      res.status(400).send(error);
      console.error("Error fetching data:", error);
    });

    axios.get(`http://localhost:8000/patient/LinkedFamily/${patientID}`).then(
      (res) => {
        setlinkedfamily(res.data);
        console.log(res.data);
      }
    ).catch(error => {
      res.status(400).send(error);
      console.error("Error fetching data:", error);
    });

  }


  //add a new family member
  const [name, setName] = useState("");
  const [nationalID, setNationalID] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [relation, setRelation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log({ name, nationalID, age, gender, relation });
    if (!name || !nationalID || !age || !gender || !relation) {
      alert('Please fill in all fields.');
      return;
    }
    const numberFormat = /^\d+$/;
    const nameFormat = /^[a-zA-Z\s]+$/;
    if (!numberFormat.test(age) || !numberFormat.test(nationalID)) { alert('invalid number format'); return; }

    if (!nameFormat.test(name)) { alert('invalid text format'); return; }

    setaddFamilyMemForm(false);
    try {
      const familyMember = { name, nationalID, age, gender, relation };
      axios.post('http://localhost:8000/patient/AddFamilyMember/' + patientID, familyMember)
        .then(res => console.log(res.data));
    } catch (error) {
      console.error(error);
    };
    setName("");
    setAge("");
    setGender("");
    setNationalID("");
    setRelation("");
  }



  const linkPatient = (event) => {
    event.preventDefault();
    if (!name || !relation) {
      alert('Please fill in all fields.');
      return;
    }
    //the name var here is the input (mail or number)
    const numberFormat = /^\d+$/;
    const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!numberFormat.test(name) && !mailFormat.test(name))
      alert('invalid input format');
    try {
      //console.log({"input":name,"relation":relation})
      const body = { "input": name, "relation": relation };
      axios.post('http://localhost:8000/patient/linkPatient/' + patientID, body)
        .then(res => console.log(res.data));
    } catch (error) {
      console.error(error);
    };

    setName("");
    setRelation("");
    setlinkFamilyMemForm(false);

  }

  const fn2 = () => {
    sethealthPackageshow(true);
    setmainshow(false);
    setfamilyshow(false);

    axios.get(`http://localhost:8000/patient/NotlinkedFamily/${patientID}`).then(
      (res) => {
        setnonlinkedfamily(res.data);
        console.log(res.data);
      }
    ).catch(error => {
      res.status(400).send(error);
      console.error("Error fetching data:", error);
    });

    axios.get('http://localhost:8000/patient/healthPackage')
      .then(response => {
        setHealthPackages(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
    axios.get('http://localhost:8000/patient/patientdetails/' + patientID)
      .then(response => {
        setMyPatient(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });

  }


  const subscribeforMe = (packageid, packageName) => {
    setSelectedPackageId(packageid);
    axios.post(`http://localhost:8000/patient/subscribeForMe/${patientID}`, { "HPname": packageName }).then(
      (res) => {
        alert(res.data);
        setSelectedPackageId("");
      }
    ).catch(error => {
      res.status(400).send(error);
    });
  }

  const handleFMSubsc = (packageid) => {
    setSelectedPackageId(packageid);
    setdropdownFam(true);
    axios.get(`http://localhost:8000/patient/NotlinkedFamily/${patientID}`).then(
      (res) => {
        setnonlinkedfamily(res.data);
        console.log(res.data);
      }
    ).catch(error => {
      res.status(400).send(error);
      console.error("Error fetching data:", error);
    });
  }

  const subscribeFormember = (memberID, packageName) => {
    axios.post(`http://localhost:8000/patient/subscribeForFam/${memberID}`, { "HPname": packageName }).then(
      (res) => {
        alert(res.data);
      }
    ).catch(error => {
      res.status(400).send(error);
    });
    setdropdownFam(false);
    setSelectedPackageId("");
  }


  const cancelsubscFam = (memberid) => {
    console.log(memberid);
    axios.post('http://localhost:8000/patient/cancelFMsubscription/' + memberid).then(
      (res) => {
        alert(res.data);
      }
    ).catch(error => {
      res.status(400).send(error);
    });
  }

  const cancelMYsubsc = () => {
    if (MyPatient.subscriptionStatus === "cancelled with end date") {
      alert("already cancelled");
      return;
    }
    axios.post('http://localhost:8000/patient/cancelMYsubscription/' + patientID).then(
      (res) => {
        alert(res.data);
      }
    ).catch(error => {
      res.status(400).send(error);
    });
  }
  const handleWalletPayment = async () => {
    try {
      // Make a request to your backend to update the wallet
      const response = await axios.put(`http://localhost:8000/patient/updateWallet`, {
        patientId: patientID,
        paymentAmount: -package1.price,
      });
      // Update the wallet state with the updated value from the response
      console.log('walletUpdated');
      setWallet(response.data.updatedWallet);
    } catch (error) {
      console.error('Error updating wallet:', error);
    }
  }
  const handleCreditCardPayment = () => {
    axios.post("http://localhost:8000/PackageCheckout").then((response) => {}).catch((error) => {
      console.error("Error fetching data:", error);});
  
  };


  return (
    <div style={{ marginRight: "-5%", marginLeft: "-5%", }} >
      <AppBar style={{ height: "100%", backgroundColor: "#F0F0F0", overflowY: "auto", }}>
        <ResponsiveAppBar />
        <div className="card m-3 col-12" style={{ width: "80%", left: '8%', borderRadius: '20px' }}>
          {mainshow ?
            (<div style={{ display: 'flex' }}>
              <Card1 style={{ width: '18rem' }}>
                <Card1.Img variant="top" src={hpImg} alt="health package.png" />
                <Card1.Body>
                  <Card1.Title>Health packages</Card1.Title>
                  <Card1.Text>
                    subscribe now on a health package and get exclusive offers
                  </Card1.Text>
                  <Button1 variant="primary" onClick={fn2}>view</Button1>
                </Card1.Body>
              </Card1>
              <Card1 style={{ width: '18rem' }}>
                <Card1.Img variant="top" src={famImg} alt="family.png" />
                <Card1.Body>
                  <Card1.Title>My family</Card1.Title>
                  <Card1.Text>
                    add your family and link to other patient's account
                  </Card1.Text>
                  <Button1 variant="primary" onClick={fn1}>view</Button1>
                </Card1.Body>
              </Card1>
            </div>) : null}
          {familyshow ? (
            <div style={{ "text-align": "left" }}>
              <div ><h2>Family members</h2></div>
              {nonlinkedfamily.map(member => (
                <div key={member.id} style={{ border: '1px solid black', "text-align": "center", "margin-bottom": "10px", width: 500, borderRadius: 5 }}>
                  <p><strong>Name:</strong> {member.name}</p>
                  <p><strong>National ID:</strong> {member.nationalID}</p>
                  <p><strong>Age:</strong> {member.age}</p>
                  <p><strong>Gender:</strong> {member.gender}</p>
                  <p><strong>Relation:</strong> {member.relation}</p>
                  <p><strong>health package subscription:</strong> {member.healthPackageSub}</p>
                  <p><strong>subscription due date:</strong> {member.DateOfSubscribtion}</p>
                  <p><strong>subscription status:</strong> {member.subscriptionStatus}</p>
                </div>
              ))}
              <Button1 style={{ "margin-bottom": "10px" }} onClick={() => { setaddFamilyMemForm(true); }}>Add a new Family member</Button1>
              {addFamilyMemForm ? (
                <div id="add_familyMemebr_form">
                  <Form >
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Floating className="mb-3" style={{ width: 500, borderRadius: 5 }}>
                        <Form.Control
                          id="floatingInputCustom"
                          type="text"
                          placeholder="Full name" value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <label htmlFor="floatingInputCustom">Full name</label>
                      </Form.Floating>
                    </Form.Group>
                    <Form.Floating className="mb-3" style={{ width: 500, borderRadius: 5 }}>
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="national ID" value={nationalID}
                        onChange={(e) => setNationalID(e.target.value)}
                      />
                      <label htmlFor="floatingInputCustom">national ID</label>
                    </Form.Floating>

                    <Form.Floating className="mb-3" style={{ width: 500, borderRadius: 5 }}>
                      <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="age" value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                      <label htmlFor="floatingInputCustom">age</label>
                    </Form.Floating>

                    <Form.Select aria-label="Default select example" style={{ width: 500, borderRadius: 5, "margin-bottom": "10px" }}
                      value={gender} onChange={(e) => setGender(e.target.value)} >
                      <option>Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female" >Female</option>
                    </Form.Select>

                    <Form.Select aria-label="Default select example" style={{ width: 500, borderRadius: 5, "margin-bottom": "10px" }}
                      value={relation} onChange={(e) => setRelation(e.target.value)}
                    >
                      <option>Relation</option>
                      <option value="child">child</option>
                      <option value="wife">wife</option>
                      <option value="husband" >husband</option>
                    </Form.Select>
                    <Button1 type="submit" onClick={handleSubmit}>
                      Submit
                    </Button1>
                  </Form>
                </div>
              ) : null}

              <div style={{ height: 30 }}></div>

              <div style={{ width: 500, borderRadius: 5 }}><h2>linked family accounts</h2></div>
              {linkedfamily.map(member => (
                <div key={member.id} style={{ border: '1px solid black', "text-align": "center", "margin-bottom": "10px", width: 500, borderRadius: 5 }}>
                  <p><strong>Name:</strong> {member.name}</p>
                  <p><strong>Age:</strong> {member.age}</p>
                  <p><strong>Gender:</strong> {member.gender}</p>
                  <p><strong>Relation:</strong> {member.relation}</p>
                  <p>check!!! sheel al part dah</p>
                  <p><strong>health package subscription:</strong> {member.healthPackageSub}</p>
                  <p><strong>subscription due date:</strong> {member.DateOfSubscribtion}</p>
                  <p><strong>subscription status:</strong> {member.subscriptionStatus}</p>
                </div>
              ))}
              <Button1 style={{ "margin-bottom": "10px" }} onClick={() => { setlinkFamilyMemForm(true); }}>link with patient's account</Button1>
              {linkFamilyMemForm ? (<div>
                <Form>

                  <Form.Floating className="mb-3" style={{ width: 500, borderRadius: 5 }}>
                    <Form.Control
                      id="floatingInputCustom"
                      type="text"
                      placeholder="email address or phone number" value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">email address or phone number</label>
                  </Form.Floating>

                  <Form.Select aria-label="Default select example" style={{ width: 500, borderRadius: 5, "margin-bottom": "10px" }}
                    value={relation} onChange={(e) => setRelation(e.target.value)} >
                    <option>Relation</option>
                    <option value="child">child</option>
                    <option value="wife">wife</option>
                    <option value="husband" >husband</option>
                  </Form.Select>
                  <Button1 type="submit" onClick={linkPatient}>
                    Submit
                  </Button1>
                </Form>
              </div>) : null}

            </div>
          ) : null}

          {healthPackageshow ? (

            <div >
              <div style={{ "text-align": "left" }} ><h2>Health Packages</h2></div>
              <div style={{ "text-align": "left", overflow: 'auto' }}>
                {healthPackages.map(package1 => (
                  <div key={package1._id} style={{ border: '1px solid black', "text-align": "center", "margin-bottom": "10px", width: 500, borderRadius: 5 }}>
                    <p><strong>Name:</strong> {package1.name}</p>
                    <p><strong>Price:</strong> {package1.price + " L.E."}</p>
                    <p><strong>doctor's session price discount:</strong> {package1.sessDiscount + "%"}</p>
                    <p><strong>medicin discount:</strong> {package1.medDiscount + "%"}</p>
                    <p><strong>family subscribtion discount:</strong> {package1.subDiscount + "%"}</p>
                    <Button1 href="#id" style={{ "margin-right": 15, "margin-bottom": 5 }} onClick={() => subscribeforMe(package1._id, package1.name)}>subscribe for myself</Button1>
                    <Button1 style={{ "margin-bottom": 5 }} onClick={() => handleFMSubsc(package1._id)}>subscribe for a family member</Button1>
                    {selectedPackageId === package1._id ? (<div> <Button1 variant="outline-primary" onClick={() => handleWalletPayment} >Pay by wallet</Button1> <Button1 variant="outline-primary" onClick={() => handleCreditCardPayment}>Pay by credit card</Button1>  </div>) : null}
                    {selectedPackageId === package1._id && dropdownFam ? (
                      <div>
                        <h3 style={{ "margin-up": 10 }}>Choose a member</h3>
                        <ListGroup defaultActiveKey="#link1">
                          {nonlinkedfamily.map(member => (
                            <ListGroup.Item variant="primary" action key={member.id} onClick={() => subscribeFormember(member._id, package1.name)}>

                              <p><strong>Name:</strong> {member.name}</p>
                              <p><strong>Relation:</strong> {member.relation}</p>

                            </ListGroup.Item>
                          ))}
                        </ListGroup>
                      </div>) : null}
                  </div>
                ))}
              </div>

              <h2 style={{ "text-align": "left" }}>subscriptions</h2>

              <Table striped bordered hover>
                <tbody>
                  <tr>
                    <td>My Health Package:</td>
                    <td>{MyPatient.healthPackageSub}</td>
                  </tr>
                  <tr>
                    <td>Due date:</td>
                    <td>{MyPatient.DateOfSubscribtion}</td>
                  </tr>
                  <tr>
                    <td>subscription status:</td>
                    <td>{MyPatient.subscriptionStatus}</td>
                  </tr>

                  <tr>
                    <td style={{ justifyContent: "right" }} colSpan={2}><Button1 variant="outline-danger" onClick={cancelMYsubsc}>cancel Subscription</Button1></td>
                  </tr>
                </tbody>
              </Table>


              <div style={{ justifyContent: "left" }}><a>Family Subscriptions  </a> </div>
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Member's name</th>
                    <th>relation</th>
                    <th>health package subscription</th>
                    <th>due date</th>
                    <th>subscription status</th>
                  </tr>
                </thead>
                <tbody>
                  {nonlinkedfamily.filter(member => member.healthPackageSub !== '').map(member => (
                    <tr>
                      <td>{member.name}</td>
                      <td>{member.relation}</td>
                      <td>{member.healthPackageSub}</td>
                      <td>{member.DateOfSubscribtion}</td>
                      <td>{member.subscriptionStatus}</td>
                      <td> <Button1 type="button" variant="outline-danger" onClick={() => cancelsubscFam(member._id)}>cancel</Button1>{' '}</td>
                    </tr>))}
                </tbody>
              </Table>

            </div>
          ) : null}

        </div>
        <BottomBar />
      </AppBar >
    </div >
  );
}

export default PatientHP_FM;