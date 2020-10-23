import axios from 'axios'
import React , { Component }from 'react'
import Cookies from 'universal-cookie'
import { Redirect } from "react-router-dom";

const cookies = new Cookies()


export default class EditPage extends Component {
  constructor(props) {
      super(props)
      this.state = {
        title: "",
        body: "",
        night_price: 0,
        base_price: 0,
        errorMsg: '',
        isError: false,
        redirect: false
      }
      this.removePost = this.removePost.bind(this)
      this.alert = this.alert.bind(this)
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
          title: res.post.title,
          body: res.post.body,
          night_price: res.post.night_price,
          base_price: res.post.base_price
        })
    })
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

  alert(){
    if(this.state.isError){
        return (
            <div className="alert alert-danger" role="alert">
                {this.state.errorMsg}
            </div>
        )
    }
}

  render() {
    if (this.state.redirect) {
      return <Redirect to='/user' />}
    return (
        <>
                
                <div className="card mx-auto" style={{maxWidth: 700}}>
                <div className="card-header">
                    Editar Publicación
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
    
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">$</span>
                            </div>
                            <input type="number"
                                    value={this.state.night_price}
                                    name='night_price'
                                    onChange={this.handleChange}
                                    className="form-control"
                                    placeholder="Precio Por Noche"
                                    aria-label="Precio Por Noche"
                                    aria-describedby="basic-addon1"/>
                            <div className="input-group-prepend">
                            <span className="input-group-text">$</span>
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
                            {this.alert()}
                          <input type="submit"  className="btn btn-primary" value="Guardar"/>
                          <button type="button"className="btn btn-outline-danger float-right" onClick={this.removePost}>Eliminar</button>
                    </form>
    
                </div>
            </div>
                
        </>
    )
  }
}