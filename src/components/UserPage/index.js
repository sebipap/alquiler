import React, {Component} from 'react'
import axios from 'axios'
import { Redirect } from "react-router-dom";
import Cookies from 'universal-cookie'

import Post from '../Posts/Post'
const cookies = new Cookies()

export default class UserPage extends Component {
    constructor(props){
        super(props)
        this.state={
            isLoggedIn: null,
            user: {},
            redirect: null,
            postsArray: []
        }
        this.logOut = this.logOut.bind(this)
        this.getInfo = this.getInfo.bind(this)
        this.getPosts = this.getPosts.bind(this)
    }

    getInfo(){
        axios.get('/api/user/info', {
            headers: {token: cookies.get('token')}
        })
        .then(res => {
            this.setState({
                user: res.data,
                isLoggedIn: true,
               })
        })
        .catch(error => {this.setState({isLoggedIn: false})})
    }

    getPosts(){
        fetch('/api/user/posts', {
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'token': cookies.get('token')
             }
          })
        .then(res => res.json())
        .then( res => {
        const postsArray = res.map(post => {
          return(
          <Post 
          key={post._id}
          id={post._id}
          body={post.body}
          price = {post.price}
          year = {post.year}
          km = {post.km}
          make = {post.make}
          model = {post.model}
          img_url = {post.img_url}
          />)
        })
            this.setState({postsArray: postsArray})
        })
    }

    componentDidMount(){
        this.getInfo()
        this.getPosts()
    }

    logOut(){
        this.props.logOut()
        this.setState({redirect: '/login'})

    } 

    render(){
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />}

        if(this.state.isLoggedIn === false){
            return (
                <div className="alert alert-warning" role="alert">
                Necesitas registrarte e iniciar sesión para ver esta página!
                </div>
            )
        }else{
            return (
                <div>
                    <div className="card">
                        <div className="card-header">
                        Hola, {this.state.user.name}
                        </div>
                        <div className="card-body">
                            <div className="list-group" style={{maxWidth: 700}}>
                                <button className="list-group-item list-group-item-action"  onClick={this.logOut}> Cerrar Sesión</button>
                                <a href="/newpost" className="list-group-item list-group-item-action">Hacer publicacion</a>
                                <a href="/resetpassword" className="list-group-item list-group-item-action">Cambiar Contraseña</a>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">
                            Tus Publicaciones
                            </div>
                            <div className="card-body">
                                <div className="d-flex align-content-around flex-wrap">
                                    {this.state.postsArray}
                                </div>
                            </div>
                        </div>
                    </div>



                </div>
            )
        }
    }
}

