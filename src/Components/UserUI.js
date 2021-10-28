import React, {
    useEffect,
    useState
} from 'react';
import "../Styles/UserUI.css";
import { useHistory } from "react-router-dom";

const INITIAL_MOCK_DATA = [{
        id: 1,
        name: "product1",
        count: 10,
        price: 100,
    },
    {
        id: 2,
        name: "product2",
        count: 4,
        price: 1250
    },
    {
        id: 3,
        name: "product3",
        count: 50,
        price: 1520
    },
    {
        id: 4,
        name: "product4",
        count: 25,
        price: 3950
    },
    {
        id: 5,
        name: "product5",
        count: 18,
        price: 5000
    },
    {
        id: 6,
        name: "product6",
        count: 1,
        price: 12000
    },
    {
        id: 7,
        name: "product7",
        count: 0,
        price: 200
    }
    
]

const UserUIF = () => {

    const [cashier, setCashier] = useState(localStorage.getItem("firstname").concat(" ").concat(localStorage.getItem("lastname")));
    const [technicalSupportNumber, setTechnicalSupportNumber] = useState("0XX-XX-XX-XX");
    const [managerNumber, setManagerNumber] = useState ("0XX-XX-XX-XX");
    const [searchValue, setSearchValue] = useState('');
    const [productCount, setProductCount] = useState('');
    const [productsList, setProductsList] = useState([]);
    const [orderList, setOrderList] = useState([]);
    const [tempItem, setTempItem] = useState(null);
    const [totalOrderSum, setTotalOrderSum] = useState(0);
    const [payedCash, setPayedCash] = useState('');
    const [change, setChange] = useState('');
    
    const history = useHistory();
    const scanInputRef = React.createRef();

    useEffect(async () => {
        // do request
        const data = await new Promise((res) => {
            setTimeout(() => res(INITIAL_MOCK_DATA), 2000)
        })
        setProductsList(data);
    }, [])

    useEffect(() => {
        scanInputRef.current.focus();

    },[])


    const handleSearchInput = (event) => {
        let value = event.target.value;

        if (value === "" || /^[a-zA-Z0-9]+$/.test(value)) {
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

    const handleProductSelect = (event) => {
        setTempItem({
            name: event.target.parentNode.children[0].innerText,
            price: event.target.parentNode.children[2].innerText,
            totalCount: event.target.parentNode.children[1].innerText
        })
        setProductCount(1);
        productCountRef.current.focus();
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
                    count: event.target.value,
                    price: tempItem.price * event.target.value
                }]);
                setTotalOrderSum(totalOrderSum+(event.target.value*tempItem.price));
                setTempItem(null);
                setProductCount("");
                scanInputRef.current.focus();
            }


        }


    }

    const handleOrderListProductDelete = (event) =>{

        
        let name = event.target.parentNode.children[0].innerText;
        let price =  event.target.parentNode.children[2].innerText;
        let count = event.target.parentNode.children[1].innerText;

        let tempOrderSum = totalOrderSum-(price);

        let index = [...orderList].reverse().findIndex(item => item.name == name && item.count== count);

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
                alert("Data is added to database! The change is " + change);
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

    return ( <div id="userMain">
  <div className="header">
    <div className="information">Welcome{cashier} </div>
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
        <input type="search" placeholder="Scan the bar code" name="searchBox" value={searchValue}onChange={handleSearchInput}required ref={scanInputRef}></input>
        <div className="productList">
          <table className="productTable">
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Price</th>
            </tr>{productsList.map(product=> <tr className="productRow" onClick={handleProductSelect}>
              <td>{product.name}</td>
              <td>{product.count}</td>
              <td>{product.price}</td>
            </tr>)}
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
            <th>Count</th>
            <th>Price</th>
          </tr>{orderList.map(product=> <tr className="orderRow">
            <td>{product.name}</td>
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
</div>
    );

}



export default UserUIF;