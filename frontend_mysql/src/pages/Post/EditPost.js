import { Fragment, useState } from "react"
import Modal from "../../components/Modal/Modal"
import Backdrop from "../../components/Backdrop/Backdrop"
import classes from "./CreatePost.module.scss"
import { eidtPost } from "../../lib/api"
import { useSelector } from "react-redux"

const EditPost = (props) => {

    const token = useSelector((state) => state.auth?.token)

    //define state
    const [title, setTitle] = useState(props.title)
    const [content, setContent] = useState(props.content)
    const [image, setImage] = useState(props.image)

    //change input fuction
    const changeTitleHandler = e => {
        setTitle(e.target.value)
    }

    const changeContentHandler = e => {
        setContent(e.target.value)
    }

    const changeImageHandler = e => {
        setImage(e.target.files[0])
    }


    //submit handler
    const acceptPostChangeHandler = async() => {
        const postData = {
            id: props.id,
            title: title,
            image: image,
            content: content
        }

        //fetch API (method: PUT)
        const data = await eidtPost(postData, token)

        console.log(data)

        window.location.reload(false);

    }

    return (
        <Fragment>
            <Backdrop onClose={props.onCancel}/>
            <Modal title="New Post"
                onCancelModal={props.onCancel}
                onAcceptModal={acceptPostChangeHandler}
            >
                <form className={classes.form}>
                    <div className={classes.title}>
                        <label>TITLE</label>
                        <br />
                        <input type="text" name ="title" onChange={changeTitleHandler} value={title} required/>
                    </div>
                    <div className={classes.img}>
                        <label>IMAGE</label>
                        <br />
                        <input type = "file" name="file" onChange={changeImageHandler} required/>
                    </div>
                    <div className={classes.title}>
                        <label>CONTENT</label>
                        <br />
                        <textarea type="text" name ="content" onChange={changeContentHandler} value={content} required/>
                    </div>
                </form>
            </Modal>
        </Fragment>
    )
}

export default EditPost