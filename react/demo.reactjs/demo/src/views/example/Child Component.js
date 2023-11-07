import React from 'react';
class ChildComponent extends React.Component{
    state = {
        showJob: false
    }
    handleShowHide = () => {
        this.setState({
            showJob: !this.state.showJob
        })
    }
    handleDelete = (job) => {
        this.props.deleteJob(job)
    }
    render(){
        let {arrayJobs} = this.props;
        let {showJob} = this.state;
        return(
            <>
                {showJob === false ? <button onClick={(e) => this.handleShowHide(e)}>Show</button>
                :
                <>
                    <div>
                        {arrayJobs.map((item, index) => 
                            <div key={item.id}>
                                {item.title} - {item.salary} <></> <span onClick={() => this.handleDelete(item)}>x</span>
                            </div>
                        )}
                    </div>
                    <button onClick={(e) => this.handleShowHide(e)}>Hide</button>
                </>
                }
            </>
        )
    }
}
export default ChildComponent;




// import React from "react";
// class ChildComponent extends React.Component{
//     state = {
//         showJob: false
//     }
//     handleShowHide = (e) =>{
//         this.setState({
//             showJob: !this.state.showJob
//         })
//     }
//     handleDelete = (job) => {
//         this.props.deleteJob(job)
//     }
//     render(){
//         let {showJob} = this.state
//         let {arrayJobs} = this.props
//         return(
//             <>
//                 {showJob === false ? <button onClick={(e) => this.handleShowHide(e)}>Show</button> 
//                     :<div>
//                         {arrayJobs.map((item, index) =>
//                             <div key={item.id}>
//                                 {item.title} - {item.salary} <></> <span onClick={() => this.handleDelete(item)}>x</span>
//                             </div>
//                             )
//                         }
//                         <button onClick={(e) => this.handleShowHide(e)}>Hide</button>
//                     </div>

//                 }
//             </>
//         )
//     }
// }
// export default ChildComponent;