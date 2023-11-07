import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './view/nav';
import Todo from './view/todo';
import Table from './view/table';
import Blog from './view/blog';
import {CountDown, NewCountDown} from './view/countdown';
import DetailBlog from './view/detailBlog';
import AddNewBlog from './view/addNewBlog';
import NotFound from './view/NotFound';
import YoutubeSearch from './view/YoutubeSearch';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
const App = () => {
  let[name, setName] = useState('Pham Phuong')
  const [address, setAddress] = useState('');
  const [todos, setTodos] = useState([
    {id: 'todo1', title: 'nau com', type: 'pp'},
    {id: 'todo2', title: 'rua bat', type: 'hp'},
    {id: 'todo3', title: 'quet nha', type: 'pp'},
    {id: 'todo4', title: 'giat qa', type: 'hp'}
  ])
  const handleEventClick = (e) => {
    let newTodo = {id: Math.floor(Math.random()*1000), title: address}
    setTodos([...todos, newTodo])
    setAddress('')
  }
  const handleOnchangeInput = (e) => {
    setAddress(e.target.value)
  }
  const handleDeleteTodo = (id) => {
    let currentTodos = todos
    currentTodos = currentTodos.filter(item => item.id !== id)
    setTodos(currentTodos)
  }
  return(
    <Router>
      <div className='App'>
        <Nav/>
        <header className='App-header'>
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Switch>
          <Route path="/" exact >
            <Table/>
          </Route>
          <Route path="/timer">
            <CountDown/>
            <div>-------------------------------</div>
            <NewCountDown/>
          </Route>
          <Route path="/todo">
            <Todo
              let todos = {todos}
              handleDeleteTodo = {handleDeleteTodo}
              /> 
              <input type='text' value = {address} onChange={(e) => handleOnchangeInput(e)}/>
              <button type='button' onClick={(e) => handleEventClick(e)}>Click me</button>
          </Route>
          <Route path = "/blog" exact>
            <Blog/>
          </Route>
          <Route path = "/blog/:id">
            <DetailBlog/>
          </Route>
          <Route path = "/add-new-blog">
            <AddNewBlog/>
          </Route>
          <Route path = "/about">
            <YoutubeSearch/>
          </Route>
          <Route path = "*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App;
