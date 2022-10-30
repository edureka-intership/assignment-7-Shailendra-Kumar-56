import React from "react";
import '../Styles/Details.css';
import '../Styles/Filter.css';
import queryString from 'query-string';
import axios from 'axios';
import Modal from 'react-modal';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class Details extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurant: {},
            resId: undefined,
            galleryModalIsOpen: false,
            menuItemsModalIsOpen: false,
            menuItems: []
        }
    }

    componentDidMount() {
        const qs = queryString.parse(window.location.search);
        const { restaurant } = qs;

        axios({
            url: `http://localhost:5600/restaurant/${restaurant}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurant: res.data.restaurants, resId: restaurant })
            })
            .catch(err => console.log(err))

    }

    handleModal = (state, value) => {
        const { resId } = this.state;
        if (state == "menuItemsModalIsOpen" && value == true){
            axios({
                url: `http://localhost:5600/menuitems/${resId}`,
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            })
                .then(res => {
                    this.setState({ menuItems: res.data.restaurants })
                })
                .catch(err => console.log(err))
        }
        this.setState({ [state]: value });
    }

    

    render() {
        const { restaurant, galleryModalIsOpen, menuItemsModalIsOpen, menuItems } = this.state;
        return (
            <div className="container-fluid">
                <nav class="navbar navbar-expand-sm navbar-dark">
                <div class="container">
                    <a class="navbar-brand" href="#">
                        <h2 class="rounded-circle"> e!</h2>
                        
                    </a>
                    
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar" aria-controls="mynavbar" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                      </button>
                    <div class="collapse navbar-collapse flex-grow-1 text-right" id="mynavbar">
                        <ul class="navbar-nav ms-auto flex-nowrap">
                            <li class="nav-item">
                                <a class="nav-link login" href="#">Login</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link create" href="#">Create an account</a>
                            </li>
                           
                            
                            
                        </ul>
                        
                    </div>
                </div>
            </nav>
           
                <div className="bodyDetail container mt-5">
                    <div className="restaurant-img">
                        <img src={`./images/${restaurant.image}`} alt="No Image, Sorry for the Inconvinience" width="100%" height="350" />
                        <button className="button " onClick={() => this.handleModal('galleryModalIsOpen', true)}>Click to see Image Gallery</button>
                    </div> 
                    
                    <div class="row">
                    <div class="col-lg-9 col-sm-6">
                       <h1 class="resturantname">{restaurant.name}</h1> 
                    </div>

                    <div class="col-lg-3 col-sm-6">
                    <button className="btn-order btn btn-danger" onClick={() => this.handleModal('menuItemsModalIsOpen', true)}>Place Online Order</button>
                    </div>
    
                </div>

                   
                    <div className="tabs">
                        <div className="tab">
                            <input type="radio" id="tab-1" name="tab-group-1" checked />
                            <label for="tab-1">Overview</label>

                            <div className="content">
                                <div className="aboutres">About this place</div>
                                <div className="detailsHead">Cuisine</div>
                                <div className="value">{restaurant && restaurant.cuisine && restaurant.cuisine.map(cuisine => `${cuisine.name}, `)}</div>
                                <div className="detailsHead">Average Cost</div>
                                <div className="value">&#8377; {restaurant.min_price} for two people(approx)</div>
                            </div>
                        </div>

                        <div className="tab">
                            <input type="radio" id="tab-2" name="tab-group-1" />
                            <label for="tab-2">Contact</label>
                            <div className="content">
                                <div className="detailsHead">Phone Number</div>
                                <div className="value">{restaurant.contact_number}</div>
                                <div className="detailsHead">{restaurant.name}</div>
                                <div className="value">{`${restaurant.locality}, ${restaurant.city}`}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={galleryModalIsOpen}
                    style={customStyles} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20 " fill="currentColor" class="bi bi-x" viewBox="0 0 16 16" style={{ float: 'right', margin: '0px 0px 10px 0px' }} onClick={() => this.handleModal('galleryModalIsOpen', false)}>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                    <Carousel showThumbs={false} showStatus={false}>
                        {restaurant?.thumb?.map((item) => {
                            return (
                                <div>
                                    <img src={`./images/${item}`} height="400" />
                                </div>
                            )
                        })}

                    </Carousel>

                </Modal>

            </div>
        )
    }
}

export default Details;