import React , { Component }from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'
const cookies = new Cookies()



export default class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: '',
            isError: false,
            errorMsg: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({
            answer: event.target.value
        })
    }

    handleSubmit(event){
        const url = '/api/posts/'+ this.props.post_id +'/answer/' + this.props.question_id
        const answer = {body: this.state.answer}

        console.log(url)

        axios.post(url, answer, {
            headers: {
            'Content-Type':'application/json',
            token: cookies.get('token'),
            }
        })
        .then( () => {
            this.props.loadPost()
            this.setState({
                answer: '',
                errorMsg:'',
                isError: false
            })
        })
        .catch(error => {
            if(error.response){
                this.setState({
                    errorMsg: error.response.data.message,
                    isError: true})
            }
        })

        event.preventDefault();

    }

    alert(){
        if(this.state.isError){
            return (
                <div class="alert alert-danger" role="alert">
                    {this.state.errorMsg}
                </div>
            )
        }else{
            return 
        }
    }
    
    render(){
        const answer = (        
            <>     
                    <strong>Respuesta: </strong> {this.props.answer}
            </>
        )
    
        const responseInput = (
            <form onSubmit={this.handleSubmit}>
                <div class="input-group mb-3">
                    <input type="text" 
                        class="form-control" 
                        placeholder="Responder" 
                        value={this.state.answer}
                        onChange={this.handleChange}
                        />
                    <div class="input-group-append">
                        <input type="submit" class="btn btn-primary"  value="Enviar" />
                    </div>
                </div>
                {this.alert()}

            </form>
        )

    
        return(
            <>
                <div class="card mb-3">
                    <div className="card-body">
                    {this.props.question}
                        
                    <hr/>

                        {this.props.answer ? answer : this.props.isOwner ? responseInput : ""}
                    </div>
                </div>
            </>    
        )
    }
}

