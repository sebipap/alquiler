import React , { Component }from 'react'
import Question from './Question'
import Cookies from 'universal-cookie'
import axios from 'axios'
const cookies = new Cookies()


export default class Questions extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            isError: false,
            errorMsg: ''
        }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        this.setState({
            question: event.target.value
        })
    }

    handleSubmit(event){
        const url = '/api/posts/'+ this.props.post_id +'/question'
        const question = {body: this.state.question}

        axios.post(url, question, {
            headers: {
            'Content-Type':'application/json',
            token: cookies.get('token'),
            }
        })
        .then( () => {
            this.props.loadPost()
            this.setState({
                question: '',
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


    render() {

        const questionInput = (
            <form onSubmit={this.handleSubmit} >
            <div class="input-group mb-3">
                <input type="text" 
                    class="form-control" 
                    placeholder="Hacé una pregunta" 
                    value={this.state.question}
                    onChange={this.handleChange}
                    />
                <div class="input-group-append">
                    <input type="submit" class="btn btn-primary"  value="Enviar" />
                </div>

            </div>
                {this.alert()}
        </form>
        )


      return (
        <>
            <li className="list-group-item" id="questions">
                <div className="card-body">
                    <h3>Preguntas</h3>
                    {this.props.questions.map(question => <Question question={question.body} answer={question.answer} isOwner={this.props.isOwner} question_id={question._id} loadPost={this.props.loadPost} post_id={this.props.post_id}/>)}

                    {this.props.isOwner ? "" : questionInput}


                </div>
            </li>
        </>
      )
    }
  }