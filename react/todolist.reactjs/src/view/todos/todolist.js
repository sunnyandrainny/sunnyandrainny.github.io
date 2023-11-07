
import React from "react";
import './todolist.css'
import './addtodo.js'
import AddToDo from "./addtodo.js";
import { ToastContainer, toast } from 'react-toastify';
import Color from "../HOC/Color";
class ListToDo extends  React.Component{
    state = {
        listtodos : [
        {id: 1, title: 'quet nha'},
        {id: 2, title: 'rua bat'}, 
        {id: 3, title: 'giat quan ao'}
    ],
    editTodo: {}
}
    addTodo = (newtodo) => {
        this.setState({
            listtodos: [...this.state.listtodos, newtodo]
        })
        toast.success("Wow so easy!")
    }
    handleDelete = (todo) => {
        let curTodos = this.state.listtodos
        curTodos = curTodos.filter(item => item.id !== todo.id)
        this.setState({
            listtodos: curTodos
        })
        toast.success('Delete success ^^')
    }
    handleEditTodo = (todo) => {
        let {editTodo, listtodos} = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        if(isEmptyObj === false && editTodo.id === todo.id){
            let listToDoCopy = [...listtodos]
            let objIndex = listToDoCopy.findIndex(item => item.id === todo.id)
            listToDoCopy[objIndex].title = editTodo.title;
            this.setState({
                listtodos: listToDoCopy,
                editTodo: {}
            })
            toast.success('Update todo success ^^')
            return;
        }
        this.setState({
            editTodo: todo
        })
        
    }
    handleOnChangeEdit = (e) => {
        let EditTodoCopy = {...this.state.editTodo}
        EditTodoCopy.title = e.target.value
        this.setState({
            editTodo: EditTodoCopy
        })
    }
    render(){
        let {listtodos, editTodo} = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        return(
            <>
                <p>
                    TO DO APP WITH ME ^^
                </p>
                <div className="container">
                        <AddToDo
                        addTodo = {this.addTodo}/>
                        <div className="list-content">
                            {listtodos && listtodos.length > 0 && 
                            listtodos.map((item, index) => {
                                return (
                                    <div className="todo-item" key={item.id}>
                                        {isEmptyObj === true ?
                                        <span> {index+1} - {item.title}</span>
                                        : <>
                                            {editTodo.id === item.id ?
                                                <span>
                                                    {index+1} - <input value={editTodo.title}
                                                    onChange={(e) => this.handleOnChangeEdit(e)}
                                                    />
                                                </span>
                                                :<span> {index+1} - {item.title}</span>
                                            }
                                        </>
                                        }
                                        <button 
                                            className="edit btn"
                                            onClick={() => this.handleEditTodo(item)}
                                        >
                                            {isEmptyObj === false && editTodo.id === item.id 
                                            ? 'Save' : 'Edit'}
                                        </button>
                                        <button 
                                            className="delete btn"
                                            onClick={() => this.handleDelete(item)}
                                        >
                                        Delete
                                        </button>
                                    </div>
                                )
                            })
                            }
                            
                        </div>
                </div>
            </>
        )
    }



    // state = {
    //         listToDo: [
    //             {id: 1, title: 'rua bat'},
    //             {id: 2, title: 'nau com'},
    //             {id: 3, title: 'quet nha'}
    //         ]
    // }
    // addNewTodo = (newtodo) => {
    //     this.setState({
    //         listToDo : [...this.state.listToDo, newtodo]
    //     })
    //     toast.success('oh, so easy!')
    // }
    // render(){
    //     let {listToDo} = this.state;
    //     return(
           
    //         <div className="container">
    //             <AddToDo
    //             addNewTodo = {this.addNewTodo}
    //             />
    //             <div className="list-content">
    //                 {listToDo && listToDo.length >0 &&
    //                 listToDo.map((item, index) => {
    //                     return(
    //                         <div className="todo-item" key={item.id}>
    //                             <span >{index+1} - {item.title}</span>
    //                             <button className="edit btn">Edit</button>
    //                             <button className="delete btn">Delete</button>
    //                         </div>
    //                     )
    //                 })}

    //             </div>
    //         </div>
    //     )
    // }

}
export default Color(ListToDo);