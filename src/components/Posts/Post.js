import React, {Component} from "react"
import { Link } from 'react-router-dom';
import config from '../../config'


export default class Post extends Component{
    constructor(props){
        super(props)
        this.state={
            img_url: this.props.img_url
        }
    }

    componentDidMount(){
        if(!this.props.img_url){
            this.setState({ 
                img_url: 'https://houseofsteel.com.my/wp-content/uploads/2016/03/placeholder.jpg'
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
            <div className="card post" style={{maxWidth: '500px', margin: '20px', maxWidth:500}} >
                
                <img className="card-img-top" src={this.state.img_url} style={{height: 300 , objectFit: 'cover'}}></img>
                <div className="card-body">
    
                    <div className="float-left">
                        <h6>{this.props.title}</h6>
                    </div>
                    
                    <div className="float-right">
                        <p className="h5">
                            <strong>$ {this.props.night_price}</strong> por noche
                        </p>
                        <p>
                            $ {this.props.base_price} tarifa base
                        </p>
                    </div>
    
                </div>
            </div> 
        </Link>
        )
    }
}
