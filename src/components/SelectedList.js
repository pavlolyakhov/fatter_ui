import React,{Component} from 'react'
import '../style/css/SelectedList.css'

class SelectedList extends Component{
constructor(props){
  super(props);
  this.state = {
    pos1 : 0, pos2 : 0, pos3 : 0, pos4 : 0
  }

  // this.closeDragElement = this.closeDragElement.bind(this);
  // this.elementDrag = this.elementDrag.bind(this);
  // this.closeDragElement = this.closeDragElement.bind(this);
}

    // dragMouseDown(e) {
    //   //e = e || window.event;
    //   // get the mouse cursor position at startup:
    //   this.setState({
    //     pos3 : e.clientX, pos4 : e.clientY
    //   })
    //   console.log("pos3", this.state.pos3);
    //   console.log("pos4", this.state.pos4);
    //
    //   // document.onmouseup = this.closeDragElement;
    //   // call a function whenever the cursor moves:
    //   // document.onmousemove = this.elementDrag;
    //   e.target.onmousemove = this.elementDrag;
    // }
    //
    // elementDrag(e) {
    //   //e = e || window.event;
    //   // calculate the new cursor position:
    //   this.setState({
    //     pos1 : this.state.pos3 - e.clientX,
    //     pos2 : this.state.pos4 - e.clientY
    //   });
    //   this.setState({
    //     pos3 : e.clientX,
    //     pos4 : e.clientY
    //   })
    //   // pos1 = pos3 - e.clientX;
    //   // pos2 = pos4 - e.clientY;
    //   console.log("pos1", this.state.pos1);
    //   console.log("pos2", this.state.pos2);
    //   // pos3 = e.clientX;
    //   // pos4 = e.clientY;
    //   console.log("new pos3", this.state.pos3);
    //   console.log("new pos4", this.state.pos4);
    //   // set the element's new position:
    //   e.target.style.top = (e.target.offsetTop - pos2) + "px";
    //   // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    //   e.target.style.left = (e.target.offsetLeft - pos1) + "px";
    //   // elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    // }
    //
    // closeDragElement() {
    //   /* stop moving when mouse
    //   button is released:*/
    //   document.onmouseup = null;
    //   document.onmousemove = null;
    // }

  // componentDidMount(){
  //  function dragElement(elmnt) {
  //    debugger;
  //     var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  //     if (document.getElementById(elmnt.id + "Header")) {
  //       /* if present, the header is where you move the DIV from:*/
  //       document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  //     } else {
  //       /* otherwise, move the DIV from anywhere inside the DIV:*/
  //       elmnt.onmousedown = dragMouseDown;
  //     }
  //
  //     function dragMouseDown(e) {
  //       e = e || window.event;
  //       // get the mouse cursor position at startup:
  //       pos3 = e.clientX;
  //       pos4 = e.clientY;
  //       console.log("pos3", pos3);
  //       console.log("pos4", pos4);
  //       document.onmouseup = closeDragElement;
  //       // call a function whenever the cursor moves:
  //       document.onmousemove = elementDrag;
  //     }
  //
  //     function elementDrag(e) {
  //       e = e || window.event;
  //       // calculate the new cursor position:
  //       pos1 = pos3 - e.clientX;
  //       pos2 = pos4 - e.clientY;
  //       console.log("pos1", pos1);
  //       console.log("pos2", pos2);
  //       pos3 = e.clientX;
  //       pos4 = e.clientY;
  //       console.log("new pos3", pos3);
  //       console.log("new pos4", pos4);
  //       // set the element's new position:
  //       elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
  //       elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  //     }
  //
  //     function closeDragElement() {
  //       /* stop moving when mouse
  //
  //       button is released:*/
  //       document.onmouseup = null;
  //       document.onmousemove = null;
  //     }
  //   }
  //
  //   dragElement(document.getElementById(("selectedList")));
  // }

  render(){
    return(
      <div id="selectedList" className={this.props.selectedListShow ? "selectedListShow" : "selectedListHide"}>
        <div id="selectedListHeader"
          // onMouseDown={this.dragMouseDown.bind(this)}
          // onMouseUp = {this.closeDragElement.bind(this)}
          // onMouseMove = {this.elementDrag.bind(this)}
          >
          <button className="btn btn-sm closeVfDrawer" onClick={this.props.handleClick}><span>Hide</span></button>
          <p>Shopping List</p>
        </div>
        <ol>
          {this.props.children}
        </ol>
      </div>
    )
  }
}

export default SelectedList;
