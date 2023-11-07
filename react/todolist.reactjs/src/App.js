import logo from './logo.svg';
import './App.css';
import MyComponent from './view/Example/MyComponent';
import ListToDo from './view/todos/todolist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Nav from './view/Navigation/nav';
import Home from './view/Example/home';
import DetailUser from './view/User/DetailUser';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import ListUser from './view/User/ListUser';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Nav/>
          <img src={logo} className="App-logo" alt="logo" />
          <>
            <Switch>
              <Route path="/" exact>
                <Home/>
              </Route>
              <Route path="/todos">
                <ListToDo/>
              </Route>
              <Route path="/about">
                <MyComponent/>
              </Route>
              <Route path="/user" exact>
                <ListUser/>
              </Route>
              <Route path="/user/:id">
                <DetailUser/>
              </Route>
        </Switch>
          </>
        </header>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        {/* Same as */}
        <ToastContainer />
      </div>
    </BrowserRouter>
  );
}

export default App;