import { useEffect } from "react"
import { useParams } from "react-router"
import { getPost } from "../../lib/api"
import { useState, useCallback } from "react"
import PostDetail from "./PostComponents/PostDetail"
import { useSelector } from "react-redux";


const Post = () => {
    const token = useSelector((state) => state.auth?.token)

    const [post, setPost] = useState(null)

    const {postId} = useParams()
    
    const getPostAPI = useCallback(async() => {
        const data = await getPost(postId, token)
        setPost(data.post)
    }, [postId, token])

    useEffect(() => {
        getPostAPI()
    }, [getPostAPI])

    return (
        post !== null ? <PostDetail post={post}/> : <p></p>
    )
}

export default Post