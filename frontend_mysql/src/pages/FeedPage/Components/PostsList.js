import classes from "./PostsList.module.scss"
import { useNavigate } from "react-router"

const PostsList = (props) => {

    const post = props.post

    const navigate = useNavigate()

    const viewDetailHandler = () => {
        navigate(`/feed/${post.id}`)
    }
    
    const onEditHandler = () => {
        props.onEdit(post)
    }

    const onDeleteHandler = () => {
        props.onDelete(post.id)
    }

    return (
        <div className={classes.wrap}>
            <p>Posted by {post.user.name} on {post.updatedAt.slice(0,10)}</p>
            <p>{post.title}</p>
            <div>
                <button onClick={viewDetailHandler}>View</button>
                <button onClick={onEditHandler}>Edit</button>
                <button onClick={onDeleteHandler}>Delete</button>
            </div>
        </div>
    )

}

export default PostsList