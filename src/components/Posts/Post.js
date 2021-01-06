import React, {Component} from "react"
import { Link } from 'react-router-dom';
import config from '../../config'


export default class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            img_url: this.props.img_url,
        }
    }

    componentDidMount(){
        if(!this.props.img_url){
            this.setState({ 
                img_url: 'https://cdn.dribbble.com/users/1174720/screenshots/4804013/1.jpg?compress=1&resize=800x600'
            })
        }else{
            this.setState({ 
                img_url: config.serverURL + this.props.img_url
            })
        }
    }

    render(){
        return(
            <Link to={"/post/" + this.props.id}>
            <div className="card post" style={{margin: '20px', maxWidth:500}} >
                
                <img className="card-img-top" src={this.state.img_url} style={{height: 300 , objectFit: 'cover',}} alt="car"></img>
                <div className="card-body">
    
                    <div className="float-left">
                        <h5>
                            <strong>{this.props.make}</strong>
                            { " " + this.props.model + " "} 
                            <span class="badge badge-primary">{this.props.year}</span>
                        </h5>
                       
                    </div>
                    
                    <div className="float-right">
                        <p className="h5">
                            <strong>USD {this.props.price}</strong> 
                        </p>
                        <p>
                            {this.props.km} km
                        </p>
                    </div>
    
                </div>
            </div> 
        </Link>
        )
    }
}
