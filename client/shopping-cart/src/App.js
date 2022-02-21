import './App.css';
import Card from './components/shared/Card';
import Navbar from './components/shared/NavBar';
import Input from './components/shared/Input';
import Label from './components/shared/FormLabel';
import Formlabel from './components/shared/FormLabel';
import Button from './components/shared/Button';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Home from './components/home/Home';
import Cart from './components/cart/Cart';
import AddProduct from './components/products-admin/AddProduct';
import Productlist from './components/products-admin/ProductList';
import AdminUsers from './components/admin/AdminUsers';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <Router>
    <div className="App">
      <Navbar />
      <AppRouter />
      {/* <Login /> */}
      {/* <SignUp /> */}

      {/* <Home /> */}
      {/* <Cart /> */}
      {/* <AddProduct /> */}
      {/* <Productlist /> */}
      {/* <AllUsers /> */}

      {/* <Card>
        This is something
      </Card> */}
      
      {/* <Formlabel htmlFor="username" label="Username:"/>
      <Input placeholder="Please enter this" name="username" handleChange={(e) => {console.log(e.target.value)}} /> */}
      
      {/* <Input type="radio" placeholder="Please enter this" name="username" handleChange={(e) => {console.log(e.target.value)}} /> */}
      
      {/* <Button handleClick={() => window.alert("Something")}>
        Submit
      </Button> */}
      
      {/* <Button handleClick={() => window.alert("Something")} color="success">
        Submit
      </Button> */}
    </div>
    </Router>
    </Provider>
  );
}

export default App;
