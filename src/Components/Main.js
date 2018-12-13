import React, { Component } from 'react';

import '../App.css';

import {Link, Switch, Route} from 'react-router-dom';

import SignupForm  from './UserComp/SignupForm';

import SingleUser from './UserComp/SingleUser'

import ListOfAllUsers from './UserComp/ListOfAllUsers'

import LoginForm   from './UserComp/LoginForm'

import UserService from '../services/UserServices'

import CreateProperty from './PropertyComp/CreateProperty';

import ViewProperties from './PropertyComp/ViewProperties';




class Main extends Component{

    state = {
        loggedInUser : null
    }

    service = new UserService();


       logInTheUser = (userToLogIn) => {
     
        this.setState({loggedInUser: userToLogIn})
    }

    componentDidMount =() =>{
        this.fetchUser()
    }

    logout = () =>{
        this.service.logout().then(()=>{
          this.setState({loggedInUser: null});
        })
        this.props.history.push('/')
    
      }

    fetchUser =() =>{

        this.service.loggedin()
        .then((userFromDB) =>{
            this.setState({
                loggedInUser : userFromDB
            })

        })
        .catch((err) =>{
            console.log('Getting error', err)
            this.setState({
                loggedInUser : false
            })
        })

    }  

      showLinks = () => {

        if(this.state.loggedInUser){
            return(
                <div>
                    <Link to = '/see-all-users'>Find all users</Link>
                    <Link to = '/all-properties'>View ALL Properties</Link>
                    <Link to = '/create-property'>Create Property</Link><br></br>

                    <button onClick={this.logout}> Log out</button>
                </div>
            )
        }
        else{
            return(
                
            <div>
                <Link to = '/signup' > Sign up </Link>
                <Link to = '/login'>Login</Link>
            </div>
            )
        }   

      }


render(){
    console.log('=-=-=-=-=-=-=-=-=-=-',this.props)

    
    return(
        <div>

           {this.showLinks()}

            <Switch>
                <Route path='/create-property' component = {CreateProperty}/>
                <Route path='/all-properties' component = {ViewProperties}/>
                <Route path = '/signup' render = {(props) => <SignupForm {...props} logTheUserIntoAppComponent  = {this.logInTheUser}  />  }  />
                <Route path = '/see-all-users' component  = {ListOfAllUsers} />
                <Route path = '/user/:id' component = {SingleUser} />
                <Route path = '/login'   render = {(props) => <LoginForm {...props}  logTheUserIntoAppComponent = {this.logInTheUser} />    } />
            </Switch>

        </div>


    )

}

}


export default Main;