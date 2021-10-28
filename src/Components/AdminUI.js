import "../Styles/AdminUI.css";
import Sidebar from "./Sidebar";
import Suppliers from "./Suppliers";
import Products from "./Products";
import Employees from "./Employees";
import { makeStyles } from '@mui/styles';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SearchBar from "./SearchBar";
import productData from "../Data.json";
import AddUser from "./AddUser/AddUser";
import AddSupplier from "./AddSupplier/AddSupplier";
import AddProduct from "./AddProduct/AddProduct";
import BarChart from "./Dashboard/BarChart";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "./Dashboard";

function AdminUI(){
  const [data, setData] = useState([]);
  const [sup, setSup] = useState([]);
  const [pro, setPro] = useState([]);
  const [pathname, setPathname] = useState('');
  const history = useHistory();
  const [sale, setSale] = useState([]);
  console.log('pathname',pathname);


  const handleLogOut = (event) => {
    localStorage.clear();
    history.push("/login");
  }
  
  return (
    <Router>
      <div className="container">
        <header>
          <div className="welcomeInfo">
            Welcome {localStorage.getItem("firstname").concat(" ").concat(localStorage.getItem("lastname"))}
          </div>
          <div className="logOut">
            <button onClick={handleLogOut}>Log Out</button>
          </div>
        </header>
        <div>
          <Sidebar setPathname={setPathname} />
          <div className="main-content">
            <div className="lists-search-container">
            <SearchBar placeholder="Search..." data={productData} />
              <div className="lists-container">
                <Switch>
                  <Route path="/suppliers" >
                  <Suppliers sup={sup} setSup={setSup} />
                    </Route>
                    <Route path="/products" >
                  <Products pro={pro} setPro={setPro} />
                    </Route>
                  <Route path="/employees">
                    <Employees data={data} setData={setData} />
                  </Route>
                  <Route path="/dashboard" setSale = {setData}>
                    <BarChart />
                    <Dashboard sale = {sale} setSale = {setSale} />
                  </Route>
                                     
                  <Route  path="/">
                    <Redirect to="/dashboard" />
                  </Route>
                  <Route  path="/adminui">
                    <Redirect to="/dashboard" />
                  </Route>
                  </Switch>
              </div>
            </div>
            <div className="add-stuff-container ">
              {pathname=='/dashboard' }
              <Switch>
                <Route path="/suppliers" >
                <AddSupplier setSup={setSup} />
                  </Route>
                <Route path="/employees">
                  <AddUser setData={setData} />
                </Route>
                <Route path="/products">
                  <AddProduct setPro={setPro} />
                </Route>
               
               
                
              </Switch>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}


export default AdminUI;