import React, {Component} from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class NewPost extends Component{
    constructor(){
        super()
        this.state = {
            title: 'tituloIMG', 
            body: 'bodyIMG',
            base_price: '111', 
            night_price: '222', 
            errorMsg: '',
            start_date: '',
            end_date: '',
            file: null, 
            isError: false,
            isSubmited: false,
            img: null,
            redirect: null,
        }
        this.alert = this.alert.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.createPost = this.createPost.bind(this);
    }

    handleSubmit(event) {
        this.createPost()
        event.preventDefault(); 
        }
    
    createPost(){
        const data = new FormData()
        data.append("title", this.state.title)
        data.append("body", this.state.body)
        data.append("base_price", this.state.base_price)
        data.append("night_price", this.state.night_price)
        data.append("start_date", this.state.start_date)
        data.append("end_date", this.state.end_date)
        data.append("file", this.state.file)

        axios.post('/api/posts', data, {
            headers: {
                token: cookies.get('token'),
            }
        })
        .then(res => {
            this.setState({
                errorMsg: "",
                isError: false,
                isSubmited: true})
            const newPostURL = res.data.post._id

            this.setState({
                redirect: '/editpost/' + newPostURL
            })


        })
        .catch(error => {
            if(error.response){
                this.setState({
                    errorMsg: error.response.data.message,
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

    handleChange = ({ target }) => {
        this.setState({ [target.name]: target.value })
    }
    render(){

            if (this.state.redirect) {
                return <Redirect to={this.state.redirect} />}

            return(<>
                
                <div className="card mx-auto" style={{maxWidth: 700}}>
                <div className="card-header">
                    Crear Publicacion
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
    
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text"
                                value={this.state.title}
                                name='title'
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Título"
                                aria-label="Título"
                                aria-describedby="basic-addon1"/>
                        </div>
    
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <textarea 
                                value={this.state.body}
                                name='body'
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Descripción de la Publicación"
                                aria-label="Descripción de la Publicación"
                                aria-describedby="basic-addon1"/>
                        </div>
    
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">$</span>
                            </div>
                            <input type="number"
                                    value={this.state.night_price}
                                    name='night_price'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Precio Por Noche"
                                    aria-label="Precio Por Noche"
                                    aria-describedby="basic-addon1"/>
                            <div class="input-group-prepend">
                            <span class="input-group-text">$</span>
                            </div>
                            <input type="number"
                                    value={this.state.base_price}
                                    name='base_price'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Tarifa fija"
                                    aria-label="Tarifa fija"
                                    aria-describedby="basic-addon1"/>
                        </div>
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">Desde</span>
                            </div>
                            <input type="date"
                                    value={this.state.start_date}
                                    name='start_date'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Precio Por Noche"
                                    aria-label="Precio Por Noche"
                                    aria-describedby="basic-addon1"/>
                            <div class="input-group-prepend">
                            <span class="input-group-text">Hasta</span>
                            </div>
                            <input type="date"
                                    value={this.state.end_date}
                                    name='end_date'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Tarifa fija"
                                    aria-label="Tarifa fija"
                                    aria-describedby="basic-addon1"/>
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="file"
                                onChange={event => {
                                    const file = event.target.files[0]
                                    this.setState({file: file})
                                }}
                                className="form-control"
 />
                        </div>
                        
                        
   



                            {this.alert()}
    
                        <input type="submit" value="Crear" className="btn btn-primary" />
                    </form>
    
                </div>
            </div>
                
            </>)
        


    }

}