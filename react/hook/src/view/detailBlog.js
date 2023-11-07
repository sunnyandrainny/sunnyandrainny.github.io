import {useParams, useHistory } from "react-router-dom";
import useFetch from "../customize/fetch";
import './blog.scss';
const DetailBlog = () =>{
    let {id} = useParams()
    let history = useHistory();
    const {data: dataDetailBlog, isLoading, isError} = useFetch(`https://jsonplaceholder.typicode.com/posts/${id}`, false)

    const handleBackData = () => {
        history.push('/blog')
    }
    return(
        <div className="detail-container">
            <div><span onClick={() => handleBackData()}>Back</span></div>
            <div className="blog-detail">
                {dataDetailBlog && 
                    <>
                        <div className="title">
                            Blog ID: {id} --- {isLoading === true ? 'Loading data...' : dataDetailBlog.title}
                        </div>
                        <div className="content">
                            {dataDetailBlog.body}
                        </div>
                    </>
                }
            </div>
        </div>
    )
}
export default DetailBlog;