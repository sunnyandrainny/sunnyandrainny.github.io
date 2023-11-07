import React from "react";

class ChildComponent extends React.Component {
    state = {
        showJobs: false
    }
    handleShowHide = () => {
        this.setState({
            showJobs: !this.state.showJobs
        })
    }
    handleDelete = (job) => {
        this.props.deleteJob(job)
    }
    render(props) {
        let { arrJobs } = this.props;
        let {showJobs} = this.state;
        return (
            <div style={{ padding: 20 }}>
                {showJobs === false && 
                <button onClick={() => this.handleShowHide()}>Show</button>}
                {showJobs && 
                <>
                    <div >
                        {arrJobs.map((item) => {
                            return (
                                <div key={item.id}>
                                    {item.title} - {item.salary}$ <></> 
                                    <span onClick={() => this.handleDelete(item)}>x</span>
                                </div>
                            )
                        })}
                    </div>
                    <button onClick={() => this.handleShowHide()}>Hide</button>
                </>
                }
            </div>
        )
    }
}
export default ChildComponent

