import React from "react";
import { withRouter } from "react-router";
import Color from "../HOC/Color";
import { connect } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";
class Home extends React.Component{
    componentDidMount(){
        // setTimeout(() => {
        //     this.props.history.push('/todos')
        // }, 3000)
    }
    handleDeleteUser = (user) => {
        console.log('check user delete', user);
        this.props.deleteUserRedux(user);
    }
    handleCreateuser = () => {
        this.props.addUserRedux();
    }
    render(){
        console.log('check props', this.props);
        let listUsers = this.props.dataRedux;
        return(
            <>
                <div>hello home</div>
                <div>
                    {listUsers && listUsers.length > 0 
                        && listUsers.map((item, index) => {
                            return (
                                <div key={item.id}>
                                    {index + 1} - {item.name} <span onClick={() => this.handleDeleteUser(item)}>x</span>
                                </div>
                            )
                        }) 
                    }
                    <button onClick={() => this.handleCreateuser()}>Add</button>
                </div>
            </>
        )
    }
}
const mapStateIoProps = (state) => {
    return { 
        dataRedux: state.users
    } 
}
const mapDispatchToProps = (dispatch) => {
    return{
        deleteUserRedux: (userDelete) => dispatch( {type: 'DELETE_USER', payload: userDelete}),
        addUserRedux: () => dispatch({type: 'CREATE_USER'})
    }
}
export default connect(mapStateIoProps, mapDispatchToProps)(Color(Home));