import React , { Component }from 'react'
import { Redirect } from "react-router-dom";
import config from '../../config'

import Questions from './Questions'
import Review from './Review'
import Map from '../Map'

import Cookies from 'universal-cookie'
const cookies = new Cookies()


export default class PostPage extends Component {

    constructor() {
        super()
        this.state = {
            data: [],
            reviews: [],
            questions: [],
            display: "",
            redirect: null
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
              token: cookies.get('token'),
             }
          })
        .then(res => res.json() )
        .then( res => {
            res.post.img_url = config.serverURL + res.post.img_url

            this.setState({
                data: res.post,
                reviews: res.reviews,
                questions: res.questions,
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
                <button className="btn btn-primary btn-lg btn-block" type="button" onClick={this.handleEditButton}>Editar Publicación</button>
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
                {this.editButton()}

    

                <ul className="list-group list-group-flush">
                    <li className="list-group-item">

                        <h1>{this.state.data.title}</h1>
                        <h3>{this.state.data.body}</h3>
                        <p>$ {this.state.data.night_price} precio por noche</p>
                        <p>$ {this.state.data.base_price} precio base</p>
                    </li>

                    <Questions questions={this.state.questions} post_id={this.props.match.params.id} loadPost={this.loadPost}/>

                    <li className="list-group-item" id="reviews">
                        <div className="card-body">
                            <h3>Opiniones</h3>
                            {this.state.reviews.map(review => <Review body={review.body} rating={review.rating} />)}
                        </div>
                    </li>
                
                    <Map />

                </ul>
               
            </div>
      )
    }
  }