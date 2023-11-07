import useFetch from "../customize/fetch";
import './blog.scss'
import { Link} from "react-router-dom";
import  Modal  from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import AddNewBlog from "./addNewBlog";
const Blog = () => {
    const [show, setShow] = useState(false);
    const [newData, setNewData] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const {data: dataBlog, isLoading, isError} 
    = useFetch('https://jsonplaceholder.typicode.com/posts', false)
    useEffect(() => {
        if(dataBlog && dataBlog.length >0){
            let data = dataBlog.slice(0, 9);
            setNewData(data);
        }
    }, [dataBlog])
    
    
    const handleClickAdd = (blog) => {
        let data = newData;
        data.unshift(blog);
        setShow(false);
        setNewData(data);
        console.log('>>>check new blogs', newData);
    }
    const handleDeleteBlog = (id) => {
        let data = newData;
        data = data.filter(item => item.id !== id)
        setNewData(data)
    }
    return(
        <>
            <Button variant="primary" className="my-3" onClick={handleShow}>
            + Add new blog
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add new blog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddNewBlog handleClickAdd = {handleClickAdd}/>
                </Modal.Body>
            </Modal>
            <div className="blog-container">  
                {newData && newData.length > 0 && newData.map(item => {
                    return(
                        <div className="single-blog" key={item.id}>
                            <div className="title">
                                <span>{item.title}</span>
                                <span onClick = {() => handleDeleteBlog(item.id)} className="delete-btn"> x </span>
                                </div>
                            <div className="body">{item.body}</div>
                            <button> <Link to = {`blog/${item.id}`}>View detail</Link></button>
                        </div>
                    )
                })}
                {isLoading === true &&
                    <div style={{textAlign: 'center', width: '100%'}}>Loading data...</div>    
                }
            </div>
        </>
        
      
    )
}
export default Blog;
