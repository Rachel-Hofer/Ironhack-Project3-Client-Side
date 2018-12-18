import React, { Component } from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import PropertyService from '../../services/PropertyServices';
import ReviewService from '../../services/ReviewServices';
import UserService from '../../services/UserServices';


class viewProperties extends Component{
    state={
        allTheProperties: [],
        currentUser: this.props.showUser(),
        showForm : true
    }

    serviceProperty = new PropertyService();
    serviceReview = new ReviewService();
    serviceUser  = new UserService()

    componentWillMount(){
        this.fetchProperties()
       
    }

    componentWillReceiveProps(){
        this.setState({
            currentUser : this.props.showUser()
        })

    }
 
    fetchProperties = () =>{
         Axios.get('http://localhost:3000/api/all-properties')
         .then((listOfProperties)=>{
             this.setState({allTheProperties: listOfProperties.data}, ()=>{
                //  console.log("this.state.allTheProperties on VIEW PROPERTIES PAGE", this.state.allTheProperties)
             }) 
         })
         .catch((err)=>{
            //  console.log(err)
         })
    }

    deleteProperty = (propertyID) => {
        this.serviceProperty.deleteProperty(propertyID)
        .then((deletedProperty)=>{
            let copyOfAllTheProperties = this.state.allTheProperties

            copyOfAllTheProperties.splice(copyOfAllTheProperties.indexOf(deletedProperty) , 1)

            this.setState({allTheProperties: copyOfAllTheProperties}, ()=>{
                // console.log("ALL THE PROPERTIES", this.state.allTheProperties)
            }) 
        })
        .catch((err)=>{
            // console.log(err)
        })
    }

    
    showPropertyInUserZipCode = () => {

        if(this.state.currentUser){

             const myProperties = this.state.allTheProperties.filter((eachProperty) => {
                if(eachProperty.zipCode == this.state.currentUser.zipCode){
                    
                    return eachProperty 
                }
            })

            this.setState({
                allTheProperties : myProperties
            })

        
        }
    }
    
    addPropertyToUser(id,e){

        e.preventDefault()
        this.serviceProperty.addPropertyToUser(id)
        .then((response) =>{
            console.log('12345',response)
        })


    }



    showAllProperties = () => {
        if(this.state){

            const myProperties = this.state.allTheProperties.filter((eachProperty)=>{
                return eachProperty
            })

            return myProperties.map((eachProperty)=>{
                return(
                    
                   
                    <div className="card addedStyleCard" key={eachProperty._id}>
                        <img className="card-img-top addedImagePadding" src={eachProperty.image} alt="Card  cap"/>
                        <div className="card-body">
                            <h5 className="card-title">{eachProperty.address}</h5>
                            <p className="card-text">Features: {eachProperty.features}</p>
                            <Link className="btn extraStylesButtonHover extraStylesButton" to={'/property/'+ eachProperty._id}>See Details</Link>
                            {  this.state.showForm ? 
                            
                            <div>
                                <form onSubmit = {(e) => this.addPropertyToUser(eachProperty._id, e)}>
                                    <label>Have you seen this property?</label>
                                    <button className="yesButton">Yes</button>
                                </form>    
                            </div>
                                :
                        
                               null 
                        
                            }
                           
                        </div>
                    </div>
            )
        })
        }
    }

    render(){

   
        
        return(

            <div className="allPropertiesBackground"> 

            <div className="searchButtonDiv addedStylingCard"> 
         
                <button className="btn extraStylesButton" onClick={this.showPropertyInUserZipCode}>View Properties Near Me</button>
            </div> 

                <div className="flexTheCards">
                {this.showAllProperties()}
                </div>
        
            </div>
        )
    }
}

  
export default viewProperties;




                   
                    
                    

             