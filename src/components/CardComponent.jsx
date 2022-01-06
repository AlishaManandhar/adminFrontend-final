
import React from 'react'
import {Link} from "react-router-dom"
import moment from "moment"
function CardComponent(props){
    
    return (
        <div className="card mb-3" style={{maxWidth: "540px"}}>
        <div className="row g-0">
          <div className="col-4">
            <img src={props.image} className="img-fluid rounded-start" alt="..." style={{height:"100%", objectFit:"cover"}}/>
          </div>
          <div className="col-8">
            <div className="card-body ms-3 ps-3 py-3">
              <Link to={`/blogs/${props.id}`} className='link-dark card-title' >{props.title}</Link>
              <p className="card-text"><small className="text-muted">Last updated {moment(props.time).startOf().fromNow()}</small></p>
            </div>
          </div>
        </div>
      </div>
    )
}

export default CardComponent