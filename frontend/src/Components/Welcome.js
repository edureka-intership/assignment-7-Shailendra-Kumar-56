import React from "react";
import '../Styles/style.css';

class Welcome extends React.Component{

    handleLocationChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);
    }

    render(){
        const { locationData } = this.props
        return(
            <div>
               <header class="head">
    <nav className="nav">
   
                     <ul className="menu-right">
    <li className="menu-right-item">
                                <a className="nav-link login" href="#">Login</a>
                            </li>
                            <li className="menu-right-item">
                                <a className="nav-link create" href="#">Create an account</a>
                            </li></ul>
                    
             
            </nav>
    </header>
    
    <div className="top-background">
    <img src="./images/bg.png" width="100%&quot;" className="top-bg-image" /> </div>
    
    <div className="contents-wrapper">
    <h1 className="rounded-circle"> e!</h1>
    <h1 className="heading"> Find the best restaurants, cafes, bars</h1>
    <div className="searchcontainer">
    <div className="search ">
   
    <form>
    <div className="row">
     <div className="searchlocation col-lg-5 col-sm-12 col-md-6">
     <select className="form-select form-select-md mb-3 location" aria-label=".form-select-lg example" onChange={this.handleLocationChange}>
                            <option value="0">Please Select Location</option>
                            { locationData.map((item) => {
                                return(
                                    <option value={item.locationId} >
                                        {`${item.location}`}
                                    </option>
                                )
                            })}
                        </select>
    </div>
 
                        
                         <div className="searchresturant  col-lg-7 col-sm-12 col-md-6">
      <i className="fa fa-search"></i>
                          <input type="text" className="form-control mb-3" placeholder="Please Enter Restaurant Name" />
  </div>
 
 
    </div></form>
    
    </div>
    
    </div>
        </div>
            </div>
        )
    }
}
export default Welcome;