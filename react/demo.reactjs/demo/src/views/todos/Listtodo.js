import React from "react";
import AddToDo from "./Addtodo";
class Listtodo extends React.Component{
    state = {
        listToDos: [
            {id: 1, title: "rua bat"},
            {id: 2, title: "quet nha"},
            {id: 3, title: "nau com"}
        ],
        editTodo: {}
    }
    addToDo = (job) => {
        this.setState({
            listToDos: [...this.state.listToDos, job]
        })
    }
    handleDelete = (job) => {
        let currentTodos = this.state.listToDos
        currentTodos = currentTodos.filter(item => item.id !== job.id)
        this.setState({
            listToDos: currentTodos
        })
    }
    handleClickEdit = (job) => {
        let {editTodo, listToDos} = this.state
        let isEmptyObj = Object.keys(editTodo).length === 0;
        if(isEmptyObj === false && editTodo.id === job.id){
            let listToDoCopy = [...listToDos]
            let objIndex = listToDoCopy.findIndex((item => item.id === job.id));
            listToDoCopy[objIndex].title = editTodo.title
            this.setState({
                listToDos: listToDoCopy,
                editTodo: {}
            })
            return;
        }
        this.setState({
            editTodo: job
        })
    }
    handleChangeEdit = (e) => {
        let editTodoCopy = {...this.state.editTodo}
        editTodoCopy.title = e.target.value;
        this.setState({
            editTodo: editTodoCopy
        })
    }
    render(){
        let {listToDos, editTodo} = this.state;
        let isEmptyObj = Object.keys(editTodo).length === 0;
        return(
            <>
                <AddToDo
                    addToDo = {this.addToDo} 
                />
                <>
                    {listToDos && listToDos.length > 0
                    &&
                    listToDos.map((item, index) => {
                        return(
                            <div key={item.id}>
                            {isEmptyObj === true ?
                            <span>{index+1} - {item.title}</span>
                            :<>
                                {editTodo.id === item.id ? 
                                    <span>
                                        {index + 1} - <input 
                                        value={editTodo.title}
                                        onChange={(e) => this.handleChangeEdit(e)}
                                        />
                                    </span>
                                :<span>{index+1} - {item.title}</span>
                                }
                            </>
                            }
                            <button
                                onClick={() => this.handleClickEdit(item)}
                            >
                                {isEmptyObj === false && editTodo.id === item.id ?
                                'Save' :'Edit'}
                            </button>
                            <button 
                                onClick={() => this.handleDelete(item)}
                            >Delete</button>
                        </div>
                        )
                    })
                    }
                </>
            </>
        )
    }
}
export default Listtodo;