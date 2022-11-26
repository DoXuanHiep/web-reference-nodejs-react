import { Fragment, useCallback, useEffect, useState } from "react"
import { getPosts, deletePost } from "../../lib/api";
import io from "socket.io-client"

import CreatePost from "../Post/CreatePost";
import EditPost from "../Post/EditPost";
import PostsList from "./Components/PostsList";
import classes from "./FeedPage.module.scss"

import { useSelector } from "react-redux";


const FeedPage = () => {

    const token = useSelector((state) => state.auth?.token)

    const [isOpenCreatePostPage, setIsOpenCreatePostPage] = useState(false)
    const [isOpenEditPostPage, setIsOpenEditPostPage] = useState(false)

    const [isPending, setIsPending] = useState(false)
    const [posts, setPosts] = useState([])
    const [page, setPage] = useState(1)

    //post is used when edit post
    const [post, setPost] = useState()

    const getPostsAPI = useCallback(async () => {
        setIsPending(true)
        const data = await getPosts(page, token)
        setPosts(data.posts)
        setIsPending(false)
    }, [page, token])

    const nextPageHander = () => {
        setPage(pre => {
            return pre + 1
        })
    }

    const prePageHander = () => {
        setPage(pre => {
            return pre - 1
        })
    }

    useEffect(() => {
        getPostsAPI()
        const socket = io('http://localhost:8080', { transports : ['websocket'] })
        socket.on('posts', data => {
            if (data.action === 'create') {
                console.log(data.post)
            }
        })
    }, [getPostsAPI])

    //function of create post
    const openCreatePostPageHandler = () => {
        setIsOpenCreatePostPage(true)
    }

    const closeCreatePostHandler = () => {
        setIsOpenCreatePostPage(false)
    }

    //function of edit post
    const openEditPostPageHandler = (post) => {
        setIsOpenEditPostPage(true)
        setPost(post)
    }

    const closeEditPostHandler = () => {
        setIsOpenEditPostPage(false)
    }

    //function of delete post
    const deletePostHandler = async (postId) => {
        const data = await deletePost(postId, token)
        console.log(data)
    }


    return (
        <Fragment>
            {isOpenCreatePostPage && <CreatePost onCancel={closeCreatePostHandler}/> }
            {isOpenEditPostPage && <EditPost onCancel={closeEditPostHandler} 
                id={post._id} title={post.title} image={post.imageUrl} content ={post.content} /> }
            {isPending ? <p>Pending</p> : <></>}
            <div className={classes.btn}>
                <button onClick={openCreatePostPageHandler}>New Post</button>
            </div>
            {posts.map(post => (
                <PostsList key={post._id} post= {post} onEdit ={openEditPostPageHandler} onDelete = {deletePostHandler}/>
            ))}
            <div className={classes.btn}>
                <button onClick={prePageHander}>Pre</button>
                <button onClick={nextPageHander}>Next</button>
            </div>
        </Fragment>
    )
}

export default FeedPage