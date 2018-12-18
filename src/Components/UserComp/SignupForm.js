import React, { Component } from 'react';

import UserService from '../../services/UserServices';


class SignupForm extends Component{
    
    state = {
        fullnameInput : '',
        emailInput : '',
        passwordInput: '',
        addressInput: '',
        fileInput: ''
    }

    service = new UserService();

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleFormSubmit = (e) => {

        e.preventDefault();
        this.service.signup(this.state.fullnameInput, this.state.emailInput, this.state.passwordInput, this.state.zipcodeInput, this.state.fileInput)
        .then((userFromDB) =>{
            this.props.logTheUserIntoAppComponent(userFromDB);

            this.setState({

                fullnameInput : '',
                emailInput : '',
                passwordInput: '',
                zipcodeInput: '',
                fileInput: null
            })

            this.props.history.push('/all-properties')

        })
    }

    handleFileChange(e){
        e.preventDefault()
        this.setState({
            fileInput: e.target.files[0]
        })
    }

    render(){
        
        return(


            <div>
                <form onSubmit={this.handleFormSubmit}>
                <h1><a className="neonHeader" href="">Sign-Up</a></h1>
                    <div class="form-group">
                        <input name="fullnameInput" onChange={e => this.handleChange(e)} value = {this.state.fullnameInput} type="text" placeholder="Full name" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <input name = "emailInput" onChange = {e => this.handleChange(e)} value = {this.state.emailInput} type="email" placeholder="email" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <input name = "passwordInput" onChange = {e => this.handleChange(e)} value = {this.state.passwordInput} type="password" placeholder="password" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <input name = "addressInput" onChange = {e => this.handleChange(e)} value = {this.state.addressInput} type="text" placeholder="Your address" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <div class="form-group">
                        <input name = "fileInput" onChange = {e => this.handleFileChange(e)} type ="file" class="form-control inputSpacingStyle" aria-describedby="emailHelp" />
                    </div>
                    <input className="btn btn-primary btn-lg neonButtons neonHeader" type="submit" />
                </form>
            </div>


        )
    }

}


 export default SignupForm;