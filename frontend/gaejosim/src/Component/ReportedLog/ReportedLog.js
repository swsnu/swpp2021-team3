import React, { Component } from "react";

import "./ReportedLog.css";

class ReportedLog extends Component {
  
  render(){
    console.log(this.props)
    return (
      <div className="ReportedLog">
         <div className="ReportedLog_Box">
           <div className="ReportedLog_Text">
             Recent Reported Log :
             {this.props.userID}
             <br />
             {this.props.tags},
             {this.props.userEvaluation}
           </div>
           <img className = 'ReportedLog_Pencil' alt = 'pencil_img' 
             src = {process.env.PUBLIC_URL + `/images/icons/icon-pencil.png`}
             onClick={() => this.props.clicked} />
         </div>
       </div>
   )
  }
}

export default ReportedLog;
