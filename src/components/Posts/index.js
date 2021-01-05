import React , { Component }from 'react'
import Post from './Post'

export default class Posts extends Component {

    constructor() {
        super()
        this.state = {
            postsArray: [],
        }
        this.getInfo = this.getInfo.bind(this);
    }

    componentDidMount() {
      this.getInfo()
    }

    getInfo() {
      fetch('/api/posts', {
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'}
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
            />
          )
        })
        this.setState({postsArray: postsArray})
      })
    }

    render() {
      return (
        <div className="d-flex align-content-around flex-wrap">
            {this.state.postsArray}
        </div>
      );
    }
  }