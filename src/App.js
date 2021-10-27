import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Components/Login";
import UserUI from "./Components/UserUI";
import AdminUI from "./Components/AdminUI";

function App() {
  //const [data, setData] = useState([]);
  
  return (
    <Router>
      <Route path="/login" component={Login} />
      <Route path="/userui" component={UserUI} />
      <Route path="/adminui" component={AdminUI} />
      <Route  path="/">
        <Redirect to="/login" />
      </Route>
    </Router>
  );
}

export default App;
