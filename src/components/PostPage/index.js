import React , { Component }from 'react'
import { Redirect } from "react-router-dom";
import config from '../../config'
import Questions from './Questions'
import Map from '../Map'

import Cookies from 'universal-cookie'
const cookies = new Cookies()


export default class PostPage extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            questions: [],
            display: "",
            redirect: null,
        }
    this.editButton = this.editButton.bind(this)
    this.handleEditButton = this.handleEditButton.bind(this)
    this.loadPost = this.loadPost.bind(this)

    }
    componentDidMount() {
        this.loadPost()
    }

    loadPost(){
        const id = this.props.match.params.id
        fetch("/api/posts/" + id, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
             }
          })
        .then(res => res.json() )
        .then( res => {
            res.post.img_url = config.serverURL + res.post.img_url
            this.setState({
                data: res.post,
                questions: res.questions,
                ownerName: res.ownerName,
                ownerEmail: res.ownerEmail,
            })
        })

        // Check if user is owner

        fetch("/api/posts/owner/" + id, {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              token: cookies.get('token'),
             }
          })
        .then(res => res.json() )
        .then( res => {
            this.setState({
                isOwner: res.isOwner
            })
        })
        this.setState({display:  <div className="alert alert-danger" role="alert">No existe el usuario!</div>})

    }


    handleEditButton(){
        this.setState({redirect: '/editpost/'+this.props.match.params.id})
    }

    editButton(){
        if(this.state.isOwner){
            return(
                <button className="btn btn-success btn-lg" type="button" onClick={this.handleEditButton}>Editar Publicación</button>
            )
        }
    }

    render() {

    if (this.state.redirect) {
        return (
        <Redirect to={this.state.redirect}/>
        )}
      return (
            <div>

                <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src={this.state.data.img_url} className="d-block w-100"/>
                        </div>
                        <div className="carousel-item">
                            <img src={this.state.data.img_url} className="d-block w-100"/>
                        </div>
                    </div>
                </div>

    

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">

                        <h1>
                                <strong>{this.state.data.make}</strong>
                                { " " + this.state.data.model + " "} 
                                <span class="badge badge-primary">{this.state.data.year}</span>
                        </h1>
                        {this.editButton()}

                    </li>


                    <li  className="list-group-item">

                        <table class="table table-hover">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Marca</td>
                                    <td>{this.state.data.make}</td>
                                </tr>
                                <tr>
                                    <td>Modelo</td>
                                    <td>{this.state.data.model}</td>
                                </tr>
                                <tr>
                                    <td>Precio</td>
                                    <td>USD {this.state.data.price}</td>
                                </tr>
                                <tr>
                                    <td>Año</td>
                                    <td>{this.state.data.year}</td>
                                </tr>
                                <tr>
                                    <td>Kilometraje</td>
                                    <td>{this.state.data.km} km</td>
                                </tr>
                            </tbody>
                        </table>

                    </li>
                    <li  className="list-group-item">

                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Descripción</h5>
                            {this.state.data.body}
                        </div>
                    </div>

                    </li>


                    <li  className="list-group-item">
                        <div className="card bg-dark text-blue" style={{width: 300}}>
                            <img 
                            src="https://img.freepik.com/free-vector/stylish-hexagonal-line-pattern-background_1017-19742.jpg?size=626&ext=jpg"
                            class="card-img" alt="..." />
                            <div className="card-img-overlay">
                                <h4 className="card-title">Contacto</h4>
                                <h5>{this.state.ownerName}</h5>
                                <p>{this.state.ownerEmail}</p>
                            </div>
                        </div>


                    </li>
                    <Questions questions={this.state.questions} post_id={this.props.match.params.id} loadPost={this.loadPost}/>

                
                    <Map />

                </ul>
               
            </div>
      )
    }
  }