import React, {Component} from "react"
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
    
    constructor(props){
        super(props)
        this.state={
            isLoggedIn: this.props.isLoggedIn
        }
    }

    render(){
        return(
            <nav className="navbar navbar-expand-lg">
                <Link to="/" className="navbar-item">Home</Link>
                <Link to="/posts" className="navbar-item">Casas en Alquiler</Link>

                {this.props.isLoggedIn ? 
                <>
                    <Link to="/user" className="navbar-item">Cuenta</Link>
                </>
                : 
                <>
                    <Link to="/register" className="navbar-item">Registrarse</Link>
                    <Link to="/login" className="navbar-item">Iniciar Sesion</Link>
                </>
                }
            </nav>
        )



    }
}


