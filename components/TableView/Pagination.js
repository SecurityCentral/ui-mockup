import React, { PropTypes } from 'react';
import pagination from './pagination.css'
import DropdownMenu from './DropdownMenu'

export default class Pagination extends React.Component{
  constructor(props){
      super(props);
      this.state={
          currPage: 0,
          numberPerPage:6
      }
      
  }
  componentDidMount(){
      $('.pagination-pf-back').children().addClass('disabled');
  }

  goTo=(page)=>{
      return ()=>{
          const totalPage = Math.ceil(this.props.totalRecordNum/this.state.numberPerPage);
          if(page<totalPage && page >=0){
              this.setState({
                  currPage: page
              })
              this.props.setPageNumber(page);
          }
          if(page===0){
              $('.pagination-pf-back').children().addClass('disabled');
              $('.pagination-pf-forward').children().removeClass('disabled');
          }else if(page===totalPage-1){
              $('.pagination-pf-back').children().removeClass('disabled');
              $('.pagination-pf-forward').children().addClass('disabled');
          }else{
              $('.pagination-pf-back').children().removeClass('disabled');
              $('.pagination-pf-forward').children().removeClass('disabled');
          }
      }
  }

  setNumberPerPage =(num)=>{
    this.setState({
        numberPerPage:num,
        currPage:0
    })
    this.props.setNumberPerPage(num);
    this.props.setPageNumber(0);
}

  render(){
    const totalPage = Math.ceil(this.props.totalRecordNum/this.state.numberPerPage);
    return (<div className={pagination.inline+" "+pagination.parent_position}>
      <div className={pagination.display}>
  <div className={pagination.inline}>
    
    <DropdownMenu onSelect={this.setNumberPerPage} items={[6,10,15,25,30]}/>

    <span> per page, </span>
  </div>
  <div className={pagination.inline}>
    <span><span>{this.state.currPage*this.state.numberPerPage} - {this.state.numberPerPage*(this.state.currPage+1)-1}</span> of <span>{this.props.totalRecordNum} </span></span>
    <div style={{display:"inline-block"}}>
    <ul className={"pagination pagination-pf-back "+pagination.vertical_center}>
      <li><a onClick={this.goTo(0)} title="First Page"><span className="i fa fa-angle-double-left"></span></a></li>
      <li><a onClick={this.goTo(this.state.currPage-1)} title="Previous Page"><span className="i fa fa-angle-left"></span></a></li>
    </ul>
    </div>
    <label className="sr-only">Current Page</label>
    <input type="text" value={this.state.currPage}/>
    
    <span>of <span>{totalPage-1}</span></span>
    <div style={{display:"inline-block"}}>
    <ul className={"pagination pagination-pf-forward "+pagination.vertical_center}>
      <li ><a onClick={this.goTo(this.state.currPage+1)} title="Next Page"><span className="i fa fa-angle-right"></span></a></li>
      <li><a onClick={this.goTo(totalPage-1)} title="Last Page"><span  className="i fa fa-angle-double-right"></span></a></li>
    </ul>
    </div>
  </div>
  </div>
  </div>);
  }
}