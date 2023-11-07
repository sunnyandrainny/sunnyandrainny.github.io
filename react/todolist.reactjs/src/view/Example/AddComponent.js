
import React from "react";
class AddComponent extends React.Component {
    state = {
       title: '',
       salary: ''
    }
    handleChangejobtitle = (e) => {
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
            id: Math.random(),
            title: this.state.title,
            salary: this.state.salary
        })
        this.setState ({
            title: '',
            salary: ''
        })
    }
    render() {
        return (
            <form style={{ padding: 20 }}>
                <label htmlFor='job title'>Job title</label> <br />
                <input
                    id="job title"
                    name="job title"
                    value={this.state.title}
                    onChange={(e) => { this.handleChangejobtitle(e) }}
                />
                <br />
                <label htmlFor='lastname'>Salary</label> <br />
                <input
                    id="lastname"
                    name="lastname"
                    value={this.state.salary}
                    onChange={(e) => { this.handleChangeSalary(e) }}
                />
                <br />
                <input
                    type="submit"
                    onClick={(e) => { this.handleSubmit(e) }}
                />
            </form>

        )
    }
}
export default AddComponent;