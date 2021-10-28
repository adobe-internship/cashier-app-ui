import React, { useEffect } from "react";
import "../App.css";
import "../Styles/Suppliers.css";
import Api from "../api/Api";

function Dashboard({ sale, setSale }) {
  useEffect(() => {
    /*fetch("http://192.168.88.92:8085/api/supplier")
      .then((response) => response.json())
      .then((sup) => {
        setSup(sup);
      })
      .catch((err) => console.log(err));*/
      Api.get('/api/sale')
      .then((sale) => {
        console.log(sale)
        setSale(sale.data);
      })
      .catch((err) => console.log(err));

  }, []);


  return (
    <div className="dashboard">
      <table className="generalTable">
        <tr>
          <th>Employee</th>
          <th>Amount</th>
          <th>Date</th>
        </tr>
      {sale &&
        sale.map((item) => (
          <tr>
            <td>{item.username}</td><td> {item.amount}</td><td> {item.dateTime}</td>
            
          </tr>
        ))}
        </table>
    </div>
  );
}

export default Dashboard;