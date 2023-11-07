import React from 'react';
import ChildComponent from './Child Component';
import AddComponent from './Add Component';
class MyComponent extends React.Component{
    state = {
        arrayJobs: [
            {id: '1', title: 'dev', salary: 1000},
            {id: '2', title: 'tester', salary: 700},
            {id: '3', title: 'manager', salary: 2000}
        ]
    }
    addNewJob = (job) => {
        this.setState({
            arrayJobs: [...this.state.arrayJobs, job]
        })
    }
    deleteJob = (job) => {
        let currentJobs = this.state.arrayJobs
        currentJobs = currentJobs.filter(item => item.id !== job.id)
        this.setState({
            arrayJobs: currentJobs
        })
    }
    render(){
        return( 
            <>
                <AddComponent
                addNewJob = {this.addNewJob}
                
                />
                <ChildComponent 
                    arrayJobs = {this.state.arrayJobs}
                    deleteJob = {this.deleteJob}
                />
            </>
        )
    }
}
export default MyComponent;


// import React from "react";
// import AddComponent from "./Add Component";
// import ChildComponent from "./Child Component";
// class MyComponent extends React.Component{
//     state = {
//         arrayJobs: [
//             {id: '1', title: 'dev', salary: 1000},
//             {id: '2', title: 'tester', salary: 700},
//             {id: '3', title: 'manager', salary: 2000}
//         ]
//             }
//     addNewJob = (job) => {
//         this.setState({
//             arrayJobs: [...this.state.arrayJobs, job]
//         })
//     }
//     deleteJob = (job) => {
//         let currentJobs = this.state.arrayJobs
//         currentJobs = currentJobs.filter(item => item.id !== job.id)
//         this.setState({
//             arrayJobs: currentJobs
//         })
//     }
//     render(){
//         return(
//             <>
//             <AddComponent
//                 addNewJob = {this.addNewJob}    
//             />
//             <ChildComponent
//                 arrayJobs = {this.state.arrayJobs}
//                 deleteJob = {this.deleteJob}
//             />
//             </>
//         )
//     }
// }
// export default MyComponent;