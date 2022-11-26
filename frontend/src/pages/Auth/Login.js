import classes from "./Login.module.scss"
import { login } from "../../lib/api";
import {  useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = () => {

    const email = useRef('')
    const password = useRef('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const loginHanlder = async(e) => {
        e.preventDefault()
        const enteredEmail = email.current.value
        const enteredPasswrd = password.current.value
        await login({email: enteredEmail, password: enteredPasswrd}, dispatch)
        navigate('/feed')
    }

    return (
        <form className={classes.form} onSubmit={loginHanlder}>
            <div className={classes['input-container']}>
                <label>YOUR E-MAIL</label>
                <br />
                <input type="text"  required ref={email}/>
            </div>
            <div className={classes['input-container']}>
                <label>PASSWORD</label>
                <br />
                <input type="password" required ref={password}/>
            </div>
            <button>Login</button>
        </form>
    )
}

export default Login