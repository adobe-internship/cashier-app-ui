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
import { useState } from "react";
import { useHistory } from "react-router-dom";

function AdminUI(){
    const [data, setData] = useState([]);
    const history = useHistory();
    const [showUsername, setShowUsername] = useState(localStorage.getItem("firstname") + " " + localStorage.getItem("lastname"));

    const handleLogOut = (event) => {
        
        localStorage.clear();
        history.push('/login');
  
      }

    return (
        <Router>
          <div className="container">
            <header>
                <div className="welcome">
                    Welcome {showUsername}
                </div>
                <div className="logOut">
                    <button onClick={handleLogOut}>Log Out</button>
                </div>
            </header>
            <div>
              <Sidebar />
              <div className="main-content">
                <div className="lists-search-container">
                  <SearchBar placeholder="Search..." data={productData} />
                  <div className="lists-container">
                    <Switch>
                      <Route path="/suppliers" component={Suppliers} />
                      <Route path="/products" component={Products} />
                      <Route path="/employees">
                        <Employees data={data} setData={setData} />
                      </Route>
                      <Route  path="/">
                        <Redirect to="/dashboard" />
                      </Route>
                    </Switch>
                  </div>
                </div>
                <div className="add-stuff-container">
                  <button className="add-stuff">Add</button>
                  <Switch>
                    <Route path="/suppliers" />
                    <Route path="/employees">
                      <AddUser setData={setData} />
                    </Route>
                    <Route path="/products" />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </Router>
      );
    }


export default AdminUI;