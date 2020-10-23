import React , { Component }from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios'
import md5 from 'md5'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class ResetPassword extends Component {

    constructor(props){
        super(props)
        this.state = {
            oldPassword: "",
            newPassword: "",
            errorMsg: "",
            isError: false,
            redirect: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.resetPassword = this.resetPassword.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }

    handleSubmit(event) {
        this.resetPassword()
    }

    resetPassword(){
        const body = {
            oldPassword: md5(this.state.oldPassword),
            newPassword: md5(this.state.newPassword),
        }

        axios.post('/api/auth/reset', body,{
            headers: {
                'Content-Type':'application/json',
                token: cookies.get('token'),
                }
        })
        .then(res => {
            this.setState({
                errorMsg: res.body,
                isError: false,
                redirect: '/user'})
                
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
                <div class="alert alert-danger" role="alert">
                    {this.state.errorMsg}
                </div>
            )
        }
    }

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />}

        return(
            <div className="card mx-auto" style={{maxWidth: 500}}>
            <div className="card-header">
                Cambiar Contraseña
            </div>
            <div className="card-body">
            {this.alert()}

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">*</span>
                        </div>
                        <input type="password"
                            value={this.state.oldPassword} 
                            onChange={this.handleChange}
                            className="form-control" 
                            placeholder="Contraseña Anterior" 
                            aria-label="Contraseña Anterior" 
                            aria-describedby="basic-addon1"
                            name="oldPassword"/>
                    </div>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">*</span>
                        </div>
                        <input type="password"
                            value={this.state.newPassword} 
                            onChange={this.handleChange}
                            className="form-control" 
                            placeholder="Contraseña Nueva" 
                            aria-label="Contraseña Nueva" 
                            aria-describedby="basic-addon1"
                            name="newPassword"/>
                    </div>

                    <button className="btn btn-primary" onClick={this.handleSubmit}>Cambiar Contraseña</button>

     

            </div>
        </div>
        )
    }
}
