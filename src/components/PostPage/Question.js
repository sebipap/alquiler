import React from 'react'

function Question(props){

    const answer = (             
        <div className="card-body">
            <div className="card-body">
                <strong>Respuesta: </strong> {props.answer}
            </div>
        </div>

    )


    return(
        <div>
            <div class="card mb-3">
            <div class="card-body">
                <strong>Pregunta: </strong>{props.question}
            </div>
            {props.answer ? answer : ""}
        </div>

        
        </div>
        
    )
}

export default Question