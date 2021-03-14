import React from 'react';
import ReactDOM from 'react-dom';
import Popup from "./Popup";
import Backend from "./Backend";
import NewWindow from 'react-new-window';

import styles from './index.module.css'
import validator from 'validator';

class MyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: null,
            errormessageName: '*This field is required',
            errormessageEmail: '*This field is required',
            errormessageGender: '*This field is required',
            disabled: false,
            isOpen: false,
            data:["male","female","diverse"],
            gender: '',
            policyState: false
        };
        this.baseState=this.state;
    }
    mySubmitHandler = (event) => {
        event.preventDefault();
        if(this.state.errormessageName === ''  && this.state.errormessageEmail === '' && this.state.errormessageGender === '' && this.state.policyState === true){
            this.setState({disabled: true});
            let url = 'https://api.sheety.co/a4c738ad49ee1d97b368830238289575/subscribers/subscribers';
            let body = {
                subscriber: {
                    fullName: this.state.username,
                    gender: this.state.gender,
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
                    this.setState({isOpen: true})
                    // Do something with object
                    console.log(json.subscriber);
                });
        }
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        let errN = '';
        let errE = '';

        if (nam === "email") {
            if (!validator.isEmail(val)) {
                errE = <strong>This email is not valid</strong>;
                this.setState({errormessageEmail: errE});
            }
            else
                this.setState({errormessageEmail: ''});
        }
        else if (nam === 'username'){
            let letters = /^[A-Za-z]+$/;
            if (!val.match(letters)) {
                errN = <strong>Please use only letters </strong>
                this.setState({errormessageName: errN});
            }
            else
                this.setState({errormessageName: ''});
        }
        this.setState({[nam]: val});
    }

    handleChange = (e) => {
        if(e.target.name === 'gender'){
            if(e.target.value !== ''){
                this.setState({gender:e.target.value});
                this.setState({errormessageGender: ''});
            }
        }
        else{
            this.setState({policyState: !this.state.policyState});
        }
    }

    closeWindow = (event) => {
        event.preventDefault();

        document.getElementById('uname').value='';
        document.getElementById('email').value='';

        this.setState(this.baseState);
    }
    render() {
        return (
            <form onSubmit={this.mySubmitHandler}>
                <h1>ADDITIVE NEWSLETTER</h1>

                <select
                    className={styles.dropdown} name='gender' value={this.state.gender} disabled={this.state.disabled} onChange={this.handleChange.bind(this)}>
                    <option>Select</option>
                    {this.state.data.map(data=><option>{data}</option>)}
                </select><br />
                <p className={styles.err}>
                    {this.state.errormessageGender}
                </p>

                <p>Enter your name:</p>
                <input className={styles.info} id='uname'
                    type='text'
                    name='username'
                    placeholder='My Name'
                    disabled= {this.state.disabled}
                    onChange={this.myChangeHandler}
                /><br />
                <p className={styles.err}>
                    {this.state.errormessageName}
                </p>
                <p>Enter your email:</p>
                <input className={styles.info} id='email'
                    type='text'
                    name='email'
                    placeholder='additive@newsletter.com'
                    disabled= {this.state.disabled}
                    onChange={this.myChangeHandler}
                /><br />
                <p className={styles.err}>
                    {this.state.errormessageEmail}
                </p><br/>
                <label className={styles.container}>I agree with the privacy policies
                <input
                    type="checkbox"
                    checked={this.state.policyState}
                    disabled={this.state.disabled}
                    onChange={this.handleChange.bind(this)}
                /><span className={styles.checkmark}/>
                </label>

                <br/>
                <input
                    type='submit'
                    value='Submit'
                    disabled={this.state.disabled}
                    /><br/>

                <div>
                    {this.state.isOpen && <Popup
                        content={<>
                            <b>YOUR SUBSCRIPTION WAS SUCCESSFUL, {this.state.username.toUpperCase()}!</b>
                            <p>Thanks for your subscription, we are looking forward to send you the greatest news from us!</p>
                        </>}
                        handleClose={this.closeWindow}
                    />}
                </div>
                <NewWindow >
                    <Backend />
                </NewWindow>
            </form>
        );
    }
}


ReactDOM.render(<MyForm />, document.getElementById('root'));
//ReactDOM.render(<Backend/>, document.getElementById('root2'));