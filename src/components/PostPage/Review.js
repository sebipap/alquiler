import React from 'react'

function Review(props){

    return(
        <div>
            <div class="card mb-3">
                <div class="card-body">
                    <h5>
                    <span class="badge badge-primary">{props.rating} / 10 </span> 
                    </h5>
                    <div>{props.body} </div>
                </div>
            </div>
        </div>
        
    )
}

export default Review