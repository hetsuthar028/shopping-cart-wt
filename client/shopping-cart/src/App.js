import "./App.css";
import Navbar from "./components/shared/NavBar";
import { BrowserRouter as Router } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="App">
                    <Navbar />
                    <AppRouter />
                </div>
            </Router>
        </Provider>
    );
}

export default App;
