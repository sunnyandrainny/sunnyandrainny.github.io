import React from "react";
class AddToDo extends  React.Component{
    state = {
        title: ''
    }
    handleOnChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleAddToDo = () => {
        if(!this.state.title){

            return;
        }
        let todo = {
            id: Math.floor(Math.random() * 1000),
            title: this.state.title
        }

        this.props.addTodo(todo)
        this.setState({
            title: ''
        })
    }
    render(){
        let {title} = this.state
        return (
            <div className="add-todo">
                    <input
                    value={title}
                    onChange={(e) => this.handleOnChangeTitle(e)}
                    ></input>
                    <button className="add btn"
                    onClick={() => this.handleAddToDo()}
                    >
                        Add
                    </button>
            </div>
        )
    }



    // state = {
    //     title: ''
    // }
    // handleOnChange = (e) => {
    //     this.setState({
    //         title: e.target.value
    //     })
    // }
    // handleOnClickAdd = () => {
    //     let todo = {
    //         id: Math.floor(Math.random() * 1000),
    //         title: this.state.title
    //     }
    //     this.props.addNewTodo(todo)
    //     this.setState({
    //         title: ''
    //     })
    // }
    // render(){
    //     let {title} = this.state
    //     return(
    //         <div className="add-todo">
    //                 <input 
    //                     value={title}
    //                     onChange={(e) => this.handleOnChange(e)}
    //                 >
    //                 </input>
    //                 <button 
    //                 className="add btn"
    //                 onClick={() => this.handleOnClickAdd() }
    //                 >Add
    //                 </button>
    //             </div>
    //     )
    // }
}
export default AddToDo