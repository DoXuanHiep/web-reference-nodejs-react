import { useRef } from "react"
import classes from "./Signup.module.scss"
import { signup } from "../../lib/api"
import { useNavigate } from "react-router"

const Signup = () => {

    const navigate = useNavigate()
    
    const email = useRef('')
    const name = useRef('')
    const password = useRef('')

    const submitHandler = async (e) => {
        e.preventDefault()
        const enteredEmail = email.current.value
        const enteredName = name.current.value
        const enteredPasswrd = password.current.value

        const data = await signup({email: enteredEmail, name: enteredName, password: enteredPasswrd})

        console.log(data)

        navigate('/login')
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes['input-container']}>
                <label>YOUR E-MAIL</label>
                <br />
                <input type="text" name="username" required ref={email}/>
            </div>
            <div className={classes['input-container']}>
                <label>YOUR NAME</label>
                <br />
                <input type="text" name="name" required ref={name}/>
            </div>
            <div className={classes['input-container']}>
                <label>PASSWORD</label>
                <br />
                <input type="password" name="password" required ref={password}/>
            </div>
            <button>SIGNUP</button>
        </form>
    )
}

export default Signup