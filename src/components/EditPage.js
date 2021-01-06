import React, {Component} from 'react'
import { Redirect } from "react-router-dom";
import axios from 'axios'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

export default class NewPost extends Component{
    constructor(){
        super()
        this.state = {
            body: '',
            price: '', 
            year: '', 
            km: '',
            make: '',
            model: '',

            errorMsg: '',
            file: null, 
            isError: false,
            isSubmited: false,
            img: null,
            redirect: null,
        }
        this.alert = this.alert.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.editPost = this.editPost.bind(this);
        this.removePost = this.removePost.bind(this)
    }

      
  componentDidMount() {
    const id = this.props.match.params.id
        
    fetch("/api/posts/" + id, {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          token: cookies.get('token'),
        }
      })
    .then(res => {
      return res.json()
    } )
    .then( res => {
        return this.setState({
          body: res.post.body,
          price: res.post.price,
          year: res.post.year,
          km: res.post.km,
          make: res.post.make,
          model: res.post.model,
        })
    })
  }

    handleSubmit(event) {
        this.editPost()
        event.preventDefault(); 
        }


        removePost(){
          axios.delete('/api/posts/' + this.props.match.params.id, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              token: cookies.get('token'),
          }})
          .then(res => {
            this.setState({
              errorMsg: '',
              isError: false,
              redirect: true
            })
      
          })
          .catch(error => {
            if(error.response){
                this.setState({
                    errorMsg: error.response.data,
                    isError: true})
         
            }
        })
        }
      
    
    editPost(){
        const data = new FormData()
        data.append("body", this.state.body)
        data.append("price", this.state.price)
        data.append("year", this.state.year)
        data.append("km", this.state.km)
        data.append("make", this.state.make)
        data.append("model", this.state.model)
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

            this.setState({
                redirect: '/user/'
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
                    Editar Publicacion
                    <h5>

                        <strong>{this.state.make}</strong>
                        { " " + this.state.model + " "} 
                        <span class="badge badge-primary">{this.state.year}</span>
                    </h5>
                </div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
    
                        <div className="input-group mb-3">
      
                            <input type="text"
                                value={this.state.make}
                                name='make'
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Marca"
                                aria-label="Marca"
                                aria-describedby="basic-addon1"/>

                            <input type="text"
                                value={this.state.model}
                                name='model'
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Modelo"
                                aria-label="Modelo"
                                aria-describedby="basic-addon1"/>

                        </div>


                        <div class="input-group mb-3">

                            <input type="number"
                                    value={this.state.km}
                                    name='km'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Kilometraje"
                                    aria-label="Kilometraje"
                                    aria-describedby="basic-addon1"/>

                            <input type="number"
                                value={this.state.year}
                                name='year'
                                onChange={this.handleChange}
                                className="form-control"
                                placeholder="Año"
                                aria-label="Año"
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
                                placeholder="Descripción (estado, forma de pago, etc)"
                                aria-label="Descripción (estado, forma de pago, etc)"
                                aria-describedby="basic-addon1"/>
                        </div>
    
                        <div class="input-group mb-3">
                            <div class="input-group-prepend">
                                <span class="input-group-text">USD</span>
                            </div>
                            <input type="number"
                                    value={this.state.price}
                                    name='price'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Precio en un pago en dólares"
                                    aria-label="Precio en un pago en dólares"
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
    
                        <input type="submit" value="Enviar" className="btn btn-primary" />

                        <button type="button"className="btn btn-outline-danger float-right" onClick={this.removePost}>Eliminar</button>
                    </form>
    
                </div>
            </div>
                
            </>)
        


    }

}