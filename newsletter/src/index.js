import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css'
import validator from 'validator';

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: null,
            errormessage: ''
        };
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        //alert("You are submitting " + this.state.username);
        let url = 'https://api.sheety.co/a059a44709599c766a704967b9cc3d24/subscribers/subscribers';
        let body = {
            subscriber: {
                fullName: this.state.username,
                gender: "bar",
                emailAddress: this.state.email,
                state: "subscribed"
            }
        }
        fetch(url, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {"Content-type": "application/json; charset=UTF-8"}
        })
            .then((response) => response.json())
            .then(json => {
                // Do something with object
                console.log(json.subscriber);
            });
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let err = '';

        if (nam === "email") {
            if (validator.isEmail(val)) {
                err = <strong>This email is valid</strong>;
            }
            else
                err = <strong className={styles.err}>This email is not valid</strong>;

        }
        this.setState({errormessage: err});
        this.setState({[nam]: val});
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <h1>Hello {this.state.username} {this.state.age}</h1>
                <p>Enter your name:</p>
                <input
                    type='text'
                    name='username'
                    onChange={this.myChangeHandler}
                />
                <p>Enter your email:</p>
                <input
                    type='text'
                    name='email'
                    onChange={this.myChangeHandler}
                />
                {this.state.errormessage}
                <input
                    type='submit'
                    />

            </form>
        );
    }
}


ReactDOM.render(<MyForm />, document.getElementById('root'));