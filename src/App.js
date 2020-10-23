import React, {Component} from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom"

import Navbar from './components/Navbar'
import Home from './components/Home'
import Posts from './components/Posts/index'
import Register from './components/Register'
import Login from './components/Login'
import PostPage from './components/PostPage/index'
import UserPage from './components/UserPage/index'
import EditPage from './components/EditPage'

import axios from 'axios'
import Cookies from 'universal-cookie'
import NewPost from './components/UserPage/NewPost';
import ResetPassword from './components/ResetPassword';
const cookies = new Cookies()

class App extends Component{
  constructor(props){
    super(props)
    this.state = {
      isLoggedIn: null,
    }
  }


  componentDidMount(){
    axios.get('/api/user/info', {
        headers: {
            token: cookies.get('token'),
        }
    })
    .then(res => {
        this.setState({
            isLoggedIn: true,
           })

    })
    .catch(error => {
        this.setState({
            isLoggedIn: false})
    })
  }

  logIn = () => {
    this.setState({isLoggedIn: true})
  }

  logOut = () => {
    this.setState({isLoggedIn: false})
    cookies.remove('token', { path: '/' })
  }

  render(){

    return (
      <div id="app">
      <Router>
            <div className="container">
            <Navbar isLoggedIn = {this.state.isLoggedIn} />
            <br/>
            <Route path="/" exact component={Home} />
            <Route path="/posts" component={Posts} />
            <Route path="/post/:id" component={PostPage} />
            <Route path="/editpost/:id/" component={EditPage} />
            <Route path="/register" component={Register}/>
            <Route path="/newpost" component={NewPost}/>
    
            <Route path="/login"  render={() => <Login logIn={this.logIn}/>}/>
            <Route path="/user"  render={() => <UserPage logOut={this.logOut}/>}/>
            
            <Route path="/resetpassword" component={ResetPassword} />

            </div>
      </Router>
      </div>
      
    );
  }
}



export default App;
