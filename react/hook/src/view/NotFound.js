import { useHistory } from "react-router-dom";

const NotFound = () => {
    let history = useHistory()
    const handleClickBtn = () => {
        history.push("/")
    }
    return(
        <div className="not-found-container">
            <h4>Bạn hiện không xem được nội dung này</h4>
            <h5>Lỗi này thường do chủ sở hữu chỉ chia sẻ nội dung với một nhóm nhỏ, thay đổi người được xem hoặc đã xóa nội dung.</h5>
            <button className="btn btn-primary" onClick={handleClickBtn}>Đi tới Bảng tin</button>
        </div>
    )
}
export default NotFound;