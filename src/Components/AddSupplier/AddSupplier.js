import React from "react";
import "./AddSupplier.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Api from "../../api/Api";
//import axios, { Axios } from 'axios'




function AddSupplier({setSup}) {
  const [name, setName] = React.useState("");
  const [contactName, setContactName] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [phone, setPhone] = React.useState("");
  
 



  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {name, contactName, address, phone};
    
    /*fetch("http://192.168.88.92:8085/api/supplier", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify(body)
    })*/
    Api.post("/api/supplier",body).then((res) => {
      setSup(prev=>[...prev, body])
    }).catch((err)=>console.log(err))
    setName("")
    setContactName("")
    setAddress("")
    setPhone("")
  };

  return (
    <div className="addSupplier">
      <TextField
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Name"
        variant="outlined"
      />
      <TextField
        id="contactName"
        value={contactName}
        onChange={(e) => setContactName(e.target.value)}
        label="Contact Name"
        variant="outlined"
      />
      <TextField
        id="address"
        value={address}
        onChange={(e) =>   setAddress(e.target.value)}
        label="Address"
        variant="outlined"
      />
      <TextField
        id="phone"
        value={phone}
        onChange={(e) =>   setPhone(e.target.value)}
        label="Phone Number"
        variant="outlined"
      />
      
      
      <Button variant="outlined" onClick={handleSubmit} on color="success">
        Save
      </Button>
    </div>
  );
}

export default AddSupplier;
