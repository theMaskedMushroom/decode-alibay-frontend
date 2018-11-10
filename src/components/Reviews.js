import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Reviews extends Component{
  /*constructor(props){
    super(props);
    this.state = {
      reviews: [],
    };
  }*/

  render(){
    var item_id = this.props.productid;
    var filterReviews = this.props.myreviews.filter(obj => {
      return obj.item_id === item_id;
    })
    
    var renderRating = obj => {
      let stars = [];
      for (let i = 0; i < obj; i++) {
        stars = stars.concat("★");
      }
      return stars;
    }

    return(
      <div>
        {filterReviews.map((obj, ind) => {
          return(
            <div key={'rev0'+ind} className="card center">
              <div align="left" key={'rev1'+ind}>{obj.username}</div>
              <div align="left" key={'rev2'+ind}>rating: {renderRating(obj.rating)}</div>
              <div align="left" key={'rev3'+ind}>{obj.review}</div>
            </div>
          );
        })}
      </div>
    );
  }
}

function mapStateToProps(state)
{
  return {
    products: state.products,
    myusers: state.users,
    myreviews: state.reviews
  }
}

export default connect(mapStateToProps)(Reviews);