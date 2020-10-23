import React , { Component }from 'react'
import axios from 'axios'
import md5 from 'md5'

export default class Register extends Component {

    constructor(props){
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "password",
            errorMsg: "",
            isError: false
        }
        this.handleName = this.handleName.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleName(event){
        this.setState({name: event.target.value})
    }

    handleEmail(event){
        this.setState({email: event.target.value})
    }

    handlePassword(event){
        this.setState({password: event.target.value})
    }

    handleSubmit(event) {
    this.register()
    event.preventDefault(); 
    }

    register = async () => {
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: md5(this.state.password)
        }

        axios.post('/api/auth/register', user)
        .then(res => {
            this.setState({
                errorMsg: "",
                isError: false})
                
            this.props.history.push('/login')

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
        }else{
            return 
        }
    }

    render(){
        return(
            <div className="card mx-auto" style={{maxWidth: 500}}>
            <div className="card-header">
                Registrarse
            </div>
            <div className="card-body">
            {this.alert()}
                <form onSubmit={this.handleSubmit}>

                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                        </div>

                        <input type="text"
                            value={this.state.name}
                            onChange={this.handleName}
                            className="form-control"
                            placeholder="Nombre Completo"
                            aria-label="Nombre Completo"
                            aria-describedby="basic-addon1"/>

                    </div>

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
                    <input type="submit" value="Registrarse" className="btn btn-primary" />
                </form>

            </div>
        </div>
        )
    }
}
