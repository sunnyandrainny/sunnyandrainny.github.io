import React from "react";
class AddToDo extends React.Component{
    state = {
        title: " "
    }
    handleCreateJob = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleAddJob = () => {
        if(!this.state.title){
            alert("missing title")
            return;
        }
        this.props.addToDo({
            id: Math.floor(Math.random()*10000),
            title: this.state.title
        })
        this.setState({
            title: ""
        })
    }
    render(){
        let {title} = this.state;
        return(
            <>
                    <input
                        value={title}
                        onChange={(e) => this.handleCreateJob(e)}
                    />
                    <button onClick={(e) => this.handleAddJob(e)}>Add</button>
                </>
        )
    }
}
export default AddToDo;