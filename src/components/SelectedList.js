import React,{Component} from 'react'
import '../style/css/SelectedList.css'

class SelectedList extends Component{


  render(){
    return(
      <div id="selectedList" className={this.props.selectedListShow ? "selectedListShow" : "selectedListHide"}>
        <button className="btn btn-lg closeVfDrawer" onClick={this.props.handleClick}><span>&times;</span></button>
        <p>Shopping List</p>
        <ol>
          {this.props.children}
        </ol>
      </div>
    )
  }
}

export default SelectedList;
