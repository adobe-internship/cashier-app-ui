import React, { useEffect } from "react";
import "../App.css";
import "../Styles/Suppliers.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../api/Api";

function Suppliers({ sup, setSup }) {
  useEffect(() => {
    /*fetch("http://192.168.88.92:8085/api/supplier")
      .then((response) => response.json())
      .then((sup) => {
        setSup(sup);
      })
      .catch((err) => console.log(err));*/
      Api.get('/api/supplier')
      .then((data) => {
        console.log(data)
        setSup(data.data);
      })
      .catch((err) => console.log(err));

  }, []);


  return (
    <div className="supplierList">
      <table className="generalTable">
        <tr>
          <th>Product</th>
          <th>Contacts</th>
          <th>Address</th>
          <th>Phone</th>
        </tr>
      {sup &&
        sup.map((item) => (
          <tr>
            <td>{item.name}</td><td> {item.contactName}</td><td> {item.address}</td><td> {item.phone}</td>
            
          </tr>
        ))}
        </table>
    </div>
  );
}

export default Suppliers;