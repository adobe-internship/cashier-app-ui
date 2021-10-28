import React from "react";
import "./AddProduct.css";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Api from "../../api/Api";
//import axios, { Axios } from 'axios'


function AddProduct({setPro}) {
  const [barcode, setBarcode] = React.useState("");
  const [productName, setProductName] = React.useState("");
  const [productDescription, setProductDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState("");
  const [unitOfMeasurement, setUnitOfMeasurement] = React.useState("");
  const [costPrice, setCostPrice] = React.useState("");
  const [sellPrice, setSellPrice] = React.useState("");
  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const body = {barcode, productName, productDescription, quantity, unitOfMeasurement, costPrice, sellPrice, name, brand};

    /*fetch("http://192.168.88.92:8085/api/product", {
      method: "POST",
      headers: {"content-Type": "application/json"},
      body: JSON.stringify(body)
    })*/
    
    Api.post("/api/product",body).then((res) => {
      console.log('body', body)
      console.log('res', res)

      setPro(prev=>[...prev, body])
    }).catch((err)=>console.log(err))
    setBarcode("")
    setProductName("")
    setProductDescription("")
    setQuantity("")
    setUnitOfMeasurement("")
    setCostPrice("")
    setSellPrice("")
    setName("")
    setBrand("")
  };

  return (
    <div className="addProduct">
      <TextField
        id="brand"
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        label="Brand"
        variant="outlined"
      />
      <TextField
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        label="Supplier name"
        variant="outlined"
      />
      <TextField
        id="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        label="Product Name"
        variant="outlined"
      />
       <TextField
        id="productDescription"
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        label="Product Description"
        variant="outlined"
      />
      <TextField
        id="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        label="Quantity"
        variant="outlined"
      />
      <TextField
        id="unitOfMeasurement"
        value={unitOfMeasurement}
        onChange={(e) => setUnitOfMeasurement(e.target.value)}
        label="Unit of Measurement"
        variant="outlined"
      />
        <TextField
        id="costPrice"
        value={costPrice}
        onChange={(e) => setCostPrice(e.target.value)}
        label="Cost Price"
        variant="outlined"
      />
        <TextField
        id="sellPrice"
        value={sellPrice}
        onChange={(e) => setSellPrice(e.target.value)}
        label="Sell Price"
        variant="outlined"
      />
      <Button variant="outlined" onClick={handleSubmit} on color="success">
        Save
      </Button>
    </div>
  );
}

export default AddProduct;
