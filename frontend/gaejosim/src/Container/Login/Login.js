import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionCreators from '../../store/actions/index';

class Login extends Component {
    state = {
        email : '',
        password : '',
    }

    componentDidMount() {
        console.log('[ComponentDidMount]')
        this.props.onGetUsers()
    }

    loginHandler = () => {
        console.log('[LoginHandler]')
        if((this.state.email === 'swpp@snu.ac.kr') && (this.state.password === 'iluvswpp')) {
            const user = this.props.storedUsers.find((user) => {
                return ((user.email === this.state.email) && (user.password === this.state.password))
            })
            this.props.onSetUser(user)
        }
        else {
            alert('Email or password is wrong')
        }
    }

    render () {
        let redirect = null
        let loginUser = this.props.storedUsers.find((user) => (user.logged_in))
        console.log('loginUser :: ', loginUser)
        if(loginUser) redirect = <Redirect to = '/articles'/>
        return (
            <div className = 'Login'>
                {redirect}
                LoginPage
                <input 
                    id = 'email-input' 
                    type = 'text' 
                    placeholder = 'Email'
                    onChange = {(event) => this.setState( { email : event.target.value })}
                >
                </input>
                <input 
                    id = 'pw-input' 
                    type = 'text' 
                    placeholder = 'Password'
                    onChange = {(event) => this.setState( { password : event.target.value })}
                >
                </input>
                <button 
                    id = 'login-button'
                    onClick = {(event) => this.loginHandler()}>
                    log-in
                </button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        storedUsers : state.userR.users,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onGetUsers : () => {
            dispatch(actionCreators.getUsers())
        },
        onSetUser : (targetUser) => {
            dispatch(actionCreators.setUser(targetUser))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);