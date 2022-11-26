import { NavLink } from "react-router-dom"
import classes from "./MainNavigation.module.scss"
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import { authSliceAction } from "../../store/auth-slice";

const MainNavigation = () => {

    const dispatch = useDispatch()

    const auth = useSelector((state) => state.auth.isLoggedIn)

    const logoutHandler = () => {
        dispatch(authSliceAction.logout())
    }

    return (
        <nav className={`navbar navbar-expand-lg navbar-light bg-light ${classes.navbar}`}>
            <div className={`container-fluid ${classes.container}`} >
                <div className={classes.mess}>
                    <NavLink className="navbar-brand" href="#" style={{color: "white"}} to = "/">MessageNode</NavLink>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {!auth ? (<div className={`collapse navbar-collapse ${classes.nav}`} id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" href="#" style={{color: "white"}} to='/login'>Login</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" href="#" style={{color: "white"}} to='/signup'>Signup</NavLink>
                        </li>
                    </ul>
                </div>) : (
                    <div className={`collapse navbar-collapse ${classes.nav}`} id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" href="#" style={{color: "white"}} to='/feed'>Feed</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" href="#" style={{color: "white"}} onClick={logoutHandler}>Logout</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    )
}

export default MainNavigation