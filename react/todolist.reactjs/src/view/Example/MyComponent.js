
import React from "react";
import ChildComponent from "./ChildComponent";
import AddComponent from "./AddComponent";
import Color from "../HOC/Color";
class MyComponent extends React.Component{
  state= {
    firstname: '',
    lastname: '',
    arrJobs : [
      {id: '1', title: 'dev', salary: '500'},
      {id: '2', title: 'tester', salary: '400'},
      {id: '3', title: 'project manager', salary: '1000'}
    ]
  }

  addNewJob = (job) => {
    this.setState({
      arrJobs: [...this.state.arrJobs, job]
    })
  }

  deleteJob = (job) => {
    let curJobs = this.state.arrJobs.filter(item => item.id !==job.id )
    this.setState({
      arrJobs: curJobs
    })
  }
  render(){
    return(
      <>
      <AddComponent addNewJob = {this.addNewJob}/>
        <ChildComponent 
            arrJobs = {this.state.arrJobs}
            deleteJob= {this.deleteJob}
        />
      </>
    )
  }
}
export default Color(MyComponent);











































































































































































































































