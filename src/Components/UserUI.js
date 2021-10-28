import React, {
    useEffect,
    useState
} from 'react';
import "../Styles/UserUI.css";
import { useHistory } from "react-router-dom";
import Api from '../api/Api';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const UserUIF = () => {

    const [cashier, setCashier] = useState(localStorage.getItem("firstname").concat(" ").concat(localStorage.getItem("lastname")));
    const [technicalSupportNumber, setTechnicalSupportNumber] = useState("0XX-XX-XX-XX");
    const [managerNumber, setManagerNumber] = useState ("0XX-XX-XX-XX");
    const [searchValue, setSearchValue] = useState('');
    const [productCount, setProductCount] = useState('');
    const [product, setProduct] = useState({name: "",count:"",price:"",barcode:""});
    const [orderList, setOrderList] = useState([]);
    const [tempItem, setTempItem] = useState(null);
    const [totalOrderSum, setTotalOrderSum] = useState(0);
    const [payedCash, setPayedCash] = useState('');
    const [change, setChange] = useState('');
    const [open, setOpen] = React.useState(false);
    
    const history = useHistory();
    const scanInputRef = React.createRef();

    useEffect(() => {
        scanInputRef.current.focus();

    },[])


    const handleSearchInput = (event) => {
        let value = event.target.value;

        if (value === "" || /^[0-9]+$/.test(value)) {
            setSearchValue(value)
        }
    }
    const handleCountInput = (event) => {
        let value = event.target.value;

        if (value === "" || /^[0-9]+$/.test(value)) {
            setProductCount(value)
        }

    }
    const productCountRef = React.createRef();

    const handleSearchSubmit = (event) => {
      if (event.key == 'Enter') {
        Api.get("api/product/".concat(searchValue))
              .then((data) => {
                console.log(data)
                setProduct({name: data.data.brand + " " + data.data.productName, count : data.data.quantity, price: data.data.salePrice, barcode: data.data.barcode});
                setTempItem({name: data.data.brand + " " + data.data.productName, count : data.data.quantity, price: data.data.salePrice, barcode: data.data.barcode});
              })
              .catch((err) => console.log(err));
              productCountRef.current.focus();
      }
    }

    const handleProductSubmit = (event) => {
        if (event.key === 'Enter') {
            if (tempItem === null) {
                alert("No product selected");
            } else if (event.target.value > tempItem.totalCount) {
                alert("Entered count is greater than product count in the shop" + event.target.value + " : " + tempItem.totalCount);
            } else {
                setOrderList([...orderList, {
                    name: tempItem.name,
                    barcode: tempItem.barcode,
                    count: event.target.value,
                    price: tempItem.price * event.target.value,
  
                }]);
                setTotalOrderSum(totalOrderSum+(event.target.value*tempItem.price));
                setTempItem(null);
                setProductCount("");
                setSearchValue("");
                setProduct({name: "",count:"",price:"",barcode:""});
                scanInputRef.current.focus();
            }


        }


    }

    const handleOrderListProductDelete = (event) =>{

        
        let name = event.target.parentNode.children[0].innerText;
        let barcode = event.target.parentNode.children[1].innerText;
        let price =  event.target.parentNode.children[3].innerText;
        let count = event.target.parentNode.children[2].innerText;

        let tempOrderSum = totalOrderSum-(price);

        let index = [...orderList].reverse().findIndex(item => item.count== count && item.barcode == barcode);

        orderList.splice(orderList.length - 1 - index ,1)
        setOrderList(orderList);

        setTotalOrderSum(tempOrderSum);

        if(payedCash !== '')
        {
            setChange(payedCash-tempOrderSum);
        }
                       
        
    }


    const handlePayedSum = (event) => {
        let value = event.target.value;

        if (value === "" || /^[0-9]+$/.test(value)) {
            setPayedCash(value);
            setChange(value-totalOrderSum);
        }

        if(value==="")
        {
            setChange('');
        }


    }


    const handleOrderSubmit = (event) =>{
        if (event.key === 'Enter') {
            if(orderList.length > 0 && change >= 0)
            {
                // Do post request call to endpoint
                let username = localStorage.getItem("username");
                Api.post("/api/sale",{username,totalOrderSum,orderList})
                .then(res => handleClickOpen())
                .catch(err => console.log(err))
                setOrderList([]);
                setPayedCash('');
                setTotalOrderSum(0);
                setChange('');
                scanInputRef.current.focus();
            }
        }
    }

    const handleLogOut = (event) => {

      localStorage.clear();
      history.push('/login');

    }

    const handleClickOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
      setOpen(false);
  };

    return ( <div id="userMain">
  <div className="header">
    <div className="information">Welcome {cashier} </div>
    <div className="menu">
      <div className="contacts">
        <div>Technicalsupport:{technicalSupportNumber}</div>
        <div>Manager:{managerNumber}</div>
      </div>
      <div className="userControl">
        <button className="controlButton" onClick={handleLogOut}>LogOut </button>
      </div>
    </div>
  </div>
  <div className="userContainer">
    <div className="box leftBox">
      <div className="dropList">
        <input type="search" placeholder="Scan the bar code" name="searchBox" value={searchValue}onChange={handleSearchInput} onKeyDown={handleSearchSubmit} required ref={scanInputRef}></input>
        <div className="productList">
          <table className="productTable">
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Price</th>
            </tr>
            <tr>
              <td>{product.name}</td>
              <td>{product.count}</td>
              <td>{product.price}</td>
            </tr>
          </table>
        </div>
      </div>
      <div className="count">
        <div>Count</div>
        <input id="prodCount" type="text" placeholder="" name="productCount" value={productCount}onChange={handleCountInput}onKeyDown={handleProductSubmit}required ref={productCountRef}></input>
      </div>
    </div>
    <div className="box rightBox">
      <div className="orderHeader">OrderList </div>
      <div className="orderList">
        <table className="orderTable">
          <tr>
            <th>Name</th>
            <th>Barcode</th>
            <th>Count</th>
            <th>Price</th>
          </tr>{orderList.map(product=> <tr className="orderRow">
            <td>{product.name}</td>
            <td>{product.barcode}</td>
            <td>{product.count}</td>
            <td>{product.price}</td>
            <td onClick={handleOrderListProductDelete}>X </td>
          </tr>)}
        </table>
      </div>
      <div className="orderCheckout">
        <div className="payedSum">
            <input id="cashInput" type="text" placeholder="" name="cashInput" value={payedCash}onChange={handlePayedSum}onKeyDown={handleOrderSubmit}required></input>
            <div className="change">
                {change}
            </div>
        </div>
        <div className="orderTotalSum">
            {totalOrderSum}
        </div>
      </div>
    </div>
  </div>
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
                        Data is added to database
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



export default UserUIF;