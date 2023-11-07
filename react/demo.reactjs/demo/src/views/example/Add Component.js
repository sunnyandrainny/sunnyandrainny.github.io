import React from 'react';
class AddComponent extends React.Component{
    state = {
        title: "",
        salary: "",
    }
    handleChangeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    handleChangeSalary = (e) => {
        this.setState({
            salary: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.addNewJob({
            id: Math.floor(Math.random()*1000),
            title: this.state.title,
            salary: this.state.salary
        })
        this.setState({
            title: '',
            salary: ''
        })
    }
    render(){
        return( 
            <>
                <form>
                    <label htmlFor = "fname">Title:</label><br/>
                    <input type='text' 
                        value={this.state.title}
                        onChange={(e) => this.handleChangeTitle(e)}
                    /><br/>
                    <label htmlFor = "lname">Salary:</label><br/>
                    <input type='text' 
                        value={this.state.salary}
                        onChange={(e) => this.handleChangeSalary(e)}
                    /><br/>
                    <input type='submit' value="Submit"
                        onClick={(e) => this.handleSubmit(e)}
                    />
                </form>
            </>
        )
    }
}
export default AddComponent;




// import React from "react";
// class AddComponent extends React.Component{
//     state = {
//         title: '',
//         salary: ''
//     }
//     handleChangTitle = (e) => {
//         this.setState({
//             title: e.target.value
//         })
//     }
//     handleChangSalary = (e) => {
//         this.setState({
//             salary: e.target.value
//         })
//     }
//     handleSubmit = (e) => {
//         this.props.addNewJob({
//             id: Math.floor(Math.random()*1000),
//             title: this.state.title,
//             salary: this.state.salary
//         })
//         this.setState({
//             title: '',
//             salary: ''
//         })
//     }
//     render(){
//         return(
//             <>
//                <label>Title</label>
//                <input 
//                     value={this.state.title}
//                     onChange={(e) => this.handleChangTitle(e)}
//                 /> 
//                 <label>Salary</label>
//                <input 
//                     value={this.state.salary}
//                     onChange={(e) => this.handleChangSalary(e)}
//                 /> 
//                 <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
//             </>
//         )
//     }
// }
// export default AddComponent;