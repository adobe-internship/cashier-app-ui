import React, { useEffect } from "react";
import "../App.css";
import "../Styles/Employees.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Api from "../api/Api";

function Employees({ data, setData }) {
  useEffect(() => {
    // axios.get('/api/employee', {headers: {"authorization" : localStorage.getItem("token")}})
    // fetch("http://192.168.88.92:8085/api/employee",
    // {
    //   method : "GET",
    //   headers : {"authorization" : localStorage.getItem("token")}
    // })
    //   .then((response) => response.json())
    Api.get('/api/employee')
      .then((data) => {
        console.log(data)
        setData(data.data);
      })
      .catch((err) => console.log(err));
  }, []);


  const handelOnDelete = (username) => {
    const url = "http://192.168.88.92:8085/api/employee/delete/".concat(username);
    /*fetch(url, { method: "DELETE" , headers : {"authorization":localStorage.getItem("token")}})*/
        
      Api.delete(url) 
      .then((res) => {
        setData(data.filter((row) => row.username !== username));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="employeeList">
      <table className="generalTable">
        <tr>
          <th>Firstname</th>
          <th>Lastname</th>
          <th>Role</th>
        </tr>
      {data &&
        data.map((item) => (
          <tr>
            <td>{item.firstName}</td> <td>{item.lastName}</td><td> {item.roles}</td>
            <td>
            <Button
              size="large"
              className="deleteButton"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => handelOnDelete(item.username)}
            />
            </td>
          </tr>
        ))}
        </table>
    </div>
  );
}

export default Employees;
