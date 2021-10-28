import React, { useEffect } from "react";
import "../App.css";
import "../Styles/Products.css";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Api from "../api/Api";

function Products({ pro, setPro }) {
  useEffect(() => {
    /*fetch("http://192.168.88.92:8085/api/product")
      .then((response) => response.json())
      .then((pro) => {
        setPro(pro);
      })
      .catch((err) => console.log(err));*/
      Api.get('/api/product')
      .then((data) => {
        console.log(data)
        setPro(data.data);
      })
      .catch((err) => console.log(err));

  }, []);

  const handleOnDelete = (barcode) => {
    const url = "http://192.168.88.92:8085/api/supplier/delete/".concat(barcode);
    fetch(url, { method: "DELETE" })
      .then((res) => {
        console.log(barcode);
        setPro(pro.filter((row) => row.barcode !== barcode));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="productList">
      <table className="generalTable">
        <tr>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Unit</th>
          <th>Supplier</th>
          <th>Barcode</th>
        </tr>
      {pro &&
        pro.map((item) => (
          <tr>
           <td>{item.productName}</td><td>  {item.quantity}</td><td>  {item.sellPrice}</td><td> {item.unitOfMeasurement}</td><td> {item.name} </td><td>{item.barcode}</td>
           <td>
            {/* <Button
              size="large"
              className="deleteButton"
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => handleOnDelete(item.barcode)}
            /> */}
            </td>
          </tr>
        ))}
        </table>
    </div>
  );
}

export default Products;
