import React, { useEffect, useState } from 'react';
import "../Styles/Login.css";
import { useHistory } from "react-router-dom";
import axios from 'axios';
import jwt from 'jwt-decode';
import Api from '../api/Api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Login = () => {

    const history = useHistory();

    if(localStorage.getItem("token"))
    {
        let decodedToken = jwt(localStorage.getItem("token"));
        localStorage.setItem("username",decodedToken.username);
        localStorage.setItem("firstname",decodedToken.firstName);
        localStorage.setItem("lastname",decodedToken.lastName);
        let role = decodedToken.authorities;
    
        if(role == "ROLE_ADMIN")
        {
            history.push("/adminui");
        }
        else if(role =="ROLE_CASHIER")
        {
            history.push("/userui");
        }
    }

    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
      }
      
    const handlePasswordChange = (event) => { 
        setPassword(event.target.value);
      }

    const handleSubmit = async (event) =>
    {
        event.preventDefault();

        let body = {"username" : username,
        "password" :password};

        Api.post("/api/auth/login", body)
        .then(data =>{
                localStorage.setItem("token",data.data.token);
                let decodedToken = jwt(localStorage.getItem("token"));
                localStorage.setItem("username",decodedToken.username);
                localStorage.setItem("firstname",decodedToken.firstName);
                localStorage.setItem("lastname",decodedToken.lastName);
                let role = decodedToken.authorities;
            
                if(role == "ROLE_ADMIN")
                {
                    history.push("/adminui");
                }
                else if(role =="ROLE_CASHIER")
                {
                    history.push("/userui");
                }
            }
            )
        .catch(err => 
            handleClickOpen()
        )

    }

    return(

        <div id="loginMain">
                <form id="loginForm" onSubmit={handleSubmit} >
                    <label for = "username">Username</label>
                    <input type="text" placeholder="Enter Username" name="username" value={username} onChange={handleUsernameChange} required></input>
                    
                    <label for = "password">Password</label>
                    <input type="password" placeholder="Enter Password" name="password" value={password} onChange={handlePasswordChange} required></input>

                    <button type="submit">Submit</button>
                </form>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                    {"Bad credentials"}
                    </DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Wrong username or password
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


/*class Login extends React.Component{
    constructor(props)
    {
        super(props);
        
        this.state = {
            username: "",
            password: "",
            data : []
        };

        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);    
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleUsernameChange(event){
        this.setState({username : event.target.value});
      }
      
    handlePasswordChange(event){ 
        this.setState({password : event.target.value});
      }

    handleSubmit(event)
    {
       //Fetching a call to ensure that credentials are correct
        let username = this.state.username;
        let password = this.state.password;
        let body = {username, password};
        fetch("http://192.168.88.92:8085/api/auth/login", {
        method: "POST",
        headers: {"content-Type": "application/json"},
        body: JSON.stringify(body)
        }).then(results => results.json()).then(data => this.setState({ data: data }));

        alert(this.state.data);

       this.props.history.push('/userui');
       
    }


    render()
    {
        return(
            <div id="loginMain">
                    <form id="loginForm" onSubmit={this.handleSubmit} >
                        <label for = "username">Username</label>
                        <input type="text" placeholder="Enter Username" name="username" value={this.state.username} onChange={this.handleUsernameChange} required></input>
                        
                        <label for = "password">Password</label>
                        <input type="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.handlePasswordChange} required></input>
    
                        <button type="submit">Submit</button>
                    </form>
            </div>
        );
    }
}*/

export default Login;