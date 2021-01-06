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
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#"><strong>Auto</strong>Trader</a>

                <div class="navbar" id="navbarSupportedContent">


                    <ul class="navbar-nav mr-auto">
                        
                        <li class="nav-item active">
                            <a class="nav-link" href="#">
                                <Link to="/posts" className="navbar-item">Publicaciones</Link>
                            </a>
                        </li>

                        {this.props.isLoggedIn ? 
                            <a class="nav-link" href="#">
                                <Link to="/user" className="navbar-item">Cuenta</Link>
                            </a>
                        : 
                            <>
                                <a class="nav-link" href="#">
                                    <Link to="/register" className="navbar-item">Registrarse</Link>
                                </a>
                                <a class="nav-link" href="#">
                                    <Link to="/login" className="navbar-item">Iniciar Sesion</Link>
                                </a>
                            </>
                        }

                    </ul>

                    <form className="form-inline my-2 my-lg-0">
                        <div class="input-group mb-3">
                            <input type="text" 
                                class="form-control" 
                                placeholder="Buscar" 
                                />
                            <div class="input-group-append">
                                <input type="submit" class="btn btn-primary"  value="Buscar" />
                            </div>
                        </div>
                    </form>

                </div>
            </nav>



        )



    }
}


