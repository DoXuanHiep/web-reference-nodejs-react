import classes from "./PostDetail.module.scss"
import config from "../../../config"

const PostDetail = (props) => {
    const post = props.post

    const iamgeUrl = `${config.api.url}/${post.imageUrl}`
    console.log(iamgeUrl)

    console.log(post)
    return (
        <div className={classes.wrap}>
            <div className={classes.title}>
                <p>{post.title}</p>
                <p>Created by {post.creator.name} on {post.updatedAt}</p>
            </div>
            <div className={classes.img}>
                <img src={iamgeUrl} alt=".." />
            </div>
        </div>
    )
}

export default PostDetail