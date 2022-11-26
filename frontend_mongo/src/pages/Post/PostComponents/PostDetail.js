import classes from "./PostDetail.module.scss"

const PostDetail = (props) => {
    const post = props.post

    const iamgeUrl = `http://localhost:8080/${post.imageUrl}`
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