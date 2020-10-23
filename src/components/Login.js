import axios from 'axios';
import React , { Component }from 'react'
import md5 from 'md5'
import { Redirect } from "react-router-dom";

// despues agregar lo de md5
import Cookies from 'universal-cookie'

const cookies = new Cookies()

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: "",
            password: "password",
            errorMsg: "",
            isError: false,
            redirect: null
        }
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleEmail(event){
        this.setState({email: event.target.value})
    }

    handlePassword(event){
        this.setState({password: event.target.value})
    }

    handleSubmit(event) {
        this.logIn()

        event.preventDefault(); 
        }
    
    logIn = async () => {
        const user = {
            email: this.state.email,
            password: md5(this.state.password)
        }

        axios.post('/api/auth/login', user)
        .then(res => {
            
            this.setState({
                errorMsg: "",
                isError: false})
            
            let expiration = new Date();
            expiration.setMonth(expiration.getMonth()+1);

            cookies.set('token', res.data, {
                path: "/",
                expires: expiration
            })

            this.props.logIn()

            this.setState({redirect: '/user'})
        })

        .catch(error => {
            if(error.response){
                this.setState({
                    errorMsg: error.response.data,
                    isError: true})
         
            }
        })

    }

    alert(){
        if(this.state.isError){
            return (
                <div className="alert alert-danger" role="alert">
                    {this.state.errorMsg}
                </div>
            )
        }else{
            return 
        }
    }

    

    render(){

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />}

        
        return(
            <div className="card mx-auto" style={{maxWidth: 500}}>
            <div className="card-header">
                Iniciar Sesion
            </div>
            <div className="card-body">
                {this.alert()}
                <form onSubmit={this.handleSubmit}>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>

                        <input type="text"
                            value={this.state.email}
                            onChange={this.handleEmail}
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            aria-describedby="basic-addon1"/>

                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">*</span>
                        </div>

                        <input type="password"
                            value={this.state.password} 
                            onChange={this.handlePassword}
                            className="form-control" 
                            placeholder="Contraseña" 
                            aria-label="Contraseña" 
                            aria-describedby="basic-addon1"/>

                    </div>
                    <input type="submit" value="Iniciar Sesion" className="btn btn-primary" />

 
                </form>

            </div>
        </div>
        )
    }
}
