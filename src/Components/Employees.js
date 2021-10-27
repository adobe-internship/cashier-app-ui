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
    fetch(url, { method: "DELETE" , headers : {"authorization":localStorage.getItem("token")}})
      .then((res) => {
        setData(data.filter((row) => row.username !== username));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="employeeList">
      {data &&
        data.map((item) => (
          <li>
            {item.firstName} {item.lastName} {item.roles}
            <Button
              size="large"
              className="deleteButton"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => handelOnDelete(item.username)}
            />
          </li>
        ))}
    </div>
  );
}

export default Employees;
