import React from "react";
import "./AddUser.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const rolesList = ["ADMIN", "CASHIER"];

function AddProduct({setData}) {
  const [userRole, setRole] = React.useState(rolesList[0]);
  const [firstName, setName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
 



  const handleSubmit = (e) => {
    e.preventDefault();
    const roles = [userRole]
    const body = {firstName, lastName, username, password, roles};
    fetch("http://localhost:8085/api/employee", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify(body)
    }).then((res) => {
      setData(prev=>[...prev, body])
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
    </div>
  );
}

export default AddProduct;