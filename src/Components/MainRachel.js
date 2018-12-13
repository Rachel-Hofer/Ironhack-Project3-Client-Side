import React, { Component } from 'react';
import '../App.css';
import CreateProperty from './PropertyComp/CreateProperty';
import ViewProperties from './PropertyComp/ViewProperties';

import {Switch, Route, Link} from 'react-router-dom';


class Main_rachel extends Component{

    render(){

        return(
            <div>
                <div className="createPropLink">
                    <Link to = '/create-property'>Create Property</Link><br></br>
                    <Link to = '/all-properties'>View ALL Properties</Link>
                </div>

                <Switch>
                    <Route exact path='/create-property' component = {CreateProperty}/>
                    <Route exact path='/all-properties' component = {ViewProperties}/>
                </Switch>

            </div>
        )
    }
}


export default Main_rachel;