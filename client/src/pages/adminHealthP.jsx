
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Header = () => (
  <div style={{ width: '100%', border: '1px solid black', textAlign: 'center' }}>
    <h1>MY CLINIC</h1>
  </div>
);

const HealthPackage = () => {
  const [healthPackages, setHealthPackages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/admin/healthPackage')
      .then(response => {
        setHealthPackages(response.data);
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/admin/healthPackage/${id}`)
      .then(response => {
        // Handle the response
        // You might want to remove the deleted item from your state as well
        setHealthPackages(healthPackages.filter(package1 => package1.id !== id));
      })
      .catch(error => {
        console.error('There was an error!', error);
      });
  };
//<button onClick={() => { ; handleUpdate(package1._id)}}>UPDATE</button>
  return (
    <div style={{overflow: 'auto' ,height:440 }}>
      {healthPackages.map(package1 => (
        <div key={package1._id} style={{border: '1px solid black' , borderRadius:5 }}>
          <p><strong>ID:</strong> {package1._id}</p>
          <p><strong>Name:</strong> {package1.name}</p>
          <p><strong>Price:</strong> {package1.price}</p>
          <p><strong>doctor's session price discount:</strong> {package1.sessDiscount}</p>
          <p><strong>medicin discount:</strong> {package1.medDiscount}</p>
          <p><strong>family subscribtion discount:</strong> {package1.subDiscount}</p>
          
          <button onClick={() => handleDelete(package1._id)}>DELETE</button>
          
        </div>
        
      ))}    
    </div>
  );
};





const ADD = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [sessDiscount, setSessDiscount] = useState('');
  const [medDiscount, setMedDiscount] = useState('');
  const [subDiscount, setSubDiscount] = useState('');

  const [id1, setID1] = useState('');
  const [name1, setName1] = useState('');
  const [price1, setPrice1] = useState('');
  const [sessDiscount1, setSessDiscount1] = useState('');
  const [medDiscount1, setMedDiscount1] = useState('');
  const [subDiscount1, setSubDiscount1] = useState('');

  const fn = () => {
    axios.post('http://localhost:8000/admin/healthPackage', {name, price, sessDiscount, medDiscount, subDiscount})
      .then(res =>{console.log(res.data); setName("");setPrice("");setSessDiscount("");setSubDiscount("");setMedDiscount("");});
  };
  
  const updatePackage = () => {
    let updatedData = {};
  
    if (name1) updatedData.name = name1;
    if (price1) updatedData.price = price1;
    if (sessDiscount1) updatedData.sessDiscount = sessDiscount1;
    if (medDiscount1) updatedData.medDiscount = medDiscount1;
    if (subDiscount1) updatedData.subDiscount = subDiscount1;
  
    axios.put(`http://localhost:8000/admin/healthPackage/${id1}`, updatedData)
      .then(res => {
        console.log(res.data);
        setID1("");
        setName1("");
        setPrice1("");
        setSessDiscount1("");
        setSubDiscount1("");
        setMedDiscount1("");
      });
  }
  

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <div  style={{display: 'flex', flexDirection: 'column'}}>
        <label>Name:<input type="text" value={name} onChange={e => setName(e.target.value)} /></label>
        <label>Price:<input type="text" value={price} onChange={e => setPrice(e.target.value)} /></label>
        <label>Dr's session Discount:<input type="text" value={sessDiscount} onChange={e => setSessDiscount(e.target.value)} /></label>
        <label>Medicin Discount:<input type="text" value={medDiscount} onChange={e => setMedDiscount(e.target.value)} /></label>
        <label>Family Subscription Discount:<input type="text" value={subDiscount} onChange={e => setSubDiscount(e.target.value)} /></label>
        <button style={{"margin":10}} onClick={fn}>ADD NEW</button>
      </div>
      <div  style={{display: 'flex', flexDirection: 'column'}}>
        <label >please copy and paste the package ID you want to change</label>
        <label>Package ID:<input type="text" value={id1} onChange={e => setID1(e.target.value)} /></label>  
        <label>Name:<input type="text" value={name1} onChange={e => setName1(e.target.value)} /></label>
        <label>Price:<input type="text" value={price1} onChange={e => setPrice1(e.target.value)} /></label>
        <label>Dr's session Discount:<input type="text" value={sessDiscount1} onChange={e => setSessDiscount1(e.target.value)} /></label>
        <label>Medicin Discount:<input type="text" value={medDiscount1} onChange={e => setMedDiscount1(e.target.value)} /></label>
        <label>Family Subscription Discount:<input type="text" value={subDiscount1} onChange={e => setSubDiscount1(e.target.value)} /></label>
        <button style={{"margin-up":10}} onClick={updatePackage}>UPDATE</button>
      </div>
    </div>
  );
}



const Sidebar = ({ changeContent , setRightSideBar}) => (
  <div style={{ width: '20%', height: 'calc(100vh - 100px)', border: '1px solid black' }}>
    <div id="welcomeTitle" style={{border: '1px solid black', height:80, fontSize:25 , borderRadius:10 , textAlign:'center'}}>Welcome Admin</div>
    <button style={{width: '100%', height:40}} onClick={() => {changeContent(<HealthPackage />);setRightSideBar(<ADD/>)}}>Health Packages</button>
  </div>
);

const MainContent = ({ content }) => (
  <div style={{ width: '60%', height: 'calc(100vh - 100px)', border: '1px solid black' }}>
    {content}
  </div>
);

const Footer = () => (
  <div style={{ width: '100%', border: '1px solid black', textAlign: 'center' }}>
    <p>Contact us on (+100)123456788 or by email clinic@gmail.com</p>
  </div>
);


const RightSidebar = ({content}) => (
  <div style={{ width: '20%', height: 'calc(100vh - 100px)', border: '1px solid black' }}>
 {content}
  </div>
);



const App1 =()=>{
  const [content, setContent] = useState('Click a button to change content');
  const [RightSideBar, setRightSideBar] = useState('rightside bar');
  return (
    <>
      <Header />
      <div style={{ display: 'flex', justifyContent: 'space-between', height: 'calc(100vh - 100px)' }}>
        <Sidebar changeContent={setContent} setRightSideBar={setRightSideBar} />
        <MainContent content={content} />
        <RightSidebar content={RightSideBar}/>
        </div>
      <Footer />
    </>
  );
}

export default App1 ;
