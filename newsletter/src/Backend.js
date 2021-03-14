import React from 'react';
import './table.css';
import styles from './index.module.css';
import Popup from './Popup';


export default class Backend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            isOpen: false,
            items: []
        };
    }

    componentDidMount() {
        fetch("https://api.sheety.co/a4c738ad49ee1d97b368830238289575/subscribers/subscribers")
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        subscribers: result.subscribers
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    renderTableHeader(){
        let header = Object.keys(this.state.subscribers[0])
        return header.map((key, index) =>{
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    clickHandler(){
        console.log('clicked');
    }

    editContent = (e) =>{
        this.setState({isOpen: true});
    }

    closeWindow = (e) =>{
        e.preventDefault();
        this.setState({isOpen: false});
    }

    deleteContent(){

    }

    render() {
        const { error, isLoaded, subscribers } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div>
                    <h1 id='title'>SUBSCRIBERS</h1>
                    <table id='subscribers'>
                        <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {subscribers.map(subscriber => (
                            <tr key={subscriber.id}  onClick={this.clickHandler}>
                                <td>{subscriber.fullName}</td>
                                <td>{subscriber.gender}</td>
                                <td>{subscriber.emailAddress}</td>
                                <td>{subscriber.state}</td>
                                <td>{subscriber.id}</td>
                                <td>
                                    <div className={styles.dropdown}>
                                        <button className={styles.dropbtn}>:</button>
                                        <div className={styles.dropdownContent}>
                                            <a onClick={this.editContent}>Edit</a>
                                            <a onClick={this.deleteContent}>Delete</a>
                                        </div>
                                    </div>
                                </td>

                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <div>
                        {this.state.isOpen && <Popup
                            content={<>
                                <input
                                type='text'
                                name='username'

                                />
                            </>}
                            handleClose={this.closeWindow}
                        />}
                    </div>
                </div>
            );
        }
    }
}