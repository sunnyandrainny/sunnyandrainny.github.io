import logo from './logo.svg';
import './App.css';
import MyComponent from './views/example/My Component';
import Listtodo from './views/todos/Listtodo';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {/* <MyComponent/> */}
        <Listtodo/>
      </header>
    </div>
  );
}

export default App;
