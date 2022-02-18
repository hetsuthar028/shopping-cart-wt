import './App.css';
import Card from './components/shared/Card';
import Navbar from './components/shared/NavBar';
import Input from './components/shared/Input';
import Label from './components/shared/FormLabel';
import Formlabel from './components/shared/FormLabel';
import Button from './components/shared/Button';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';

function App() {
  return (
    <div className="App">
      <Navbar />

      {/* <Login /> */}
      <SignUp />


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
  );
}

export default App;
