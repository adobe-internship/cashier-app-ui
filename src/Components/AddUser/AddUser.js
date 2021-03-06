import React from "react";
import "./AddUser.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Api from "../../api/Api";
//import axios, { Axios } from 'axios'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';




const rolesList = ["ADMIN", "CASHIER"];

function AddUser({setData}) {
  const [userRole, setRole] = React.useState(rolesList[0]);
  const [firstName, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
 



  const handleSubmit = (e) => {
    e.preventDefault();
    let roles = [userRole]
    roles[0] = "ROLE_".concat(roles[0]);
    const body = {firstName, lastName, username, password, roles};
    
    /*fetch("http://192.168.88.92:8085/api/employee", {
      method: "POST",
      headers: {"content-Type": "application/json", "authorization" : localStorage.getItem("token")},
      body: JSON.stringify(body)
    })*/
    Api.post("/api/employee",body).then((res) => {
      setData(prev=>[...prev, body])
      handleClickOpen()
    }).catch((err)=>console.log(err))
    setName("")
    setLastName("")
    setUsername("")
    setPassword("")
    setRole(rolesList[0])
  };

  return (
    <div className="addUser">
      <TextField
        id="name"
        value={firstName}
        onChange={(e) => setName(e.target.value)}
        label="First Name"
        variant="outlined"
      />
      <TextField
        id="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        label="Last Name"
        variant="outlined"
      />
      <TextField
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        label="Username"
        variant="outlined"
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
      />
      <TextField
        select
        value={userRole}
        label="Select"
        onChange={(e) => setRole(e.target.value)}
        variant="outlined"
      >
        {rolesList.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
      <Button variant="outlined" onClick={handleSubmit} on color="success">
        Save
      </Button>
      <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Success"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Employee added successfully
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                    </DialogActions>
                </Dialog>
    </div>
  );
}

export default AddUser;
