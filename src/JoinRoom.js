
import React from "react";
import io from "socket.io-client";


class JoinRoom extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: []
        };
        this.socket = io('localhost:8080');

        this.sendMessage = ev => {
            ev.preventDefault();
            this.socket.emit('SEND_MESSAGE', {
                author: this.state.username,
                message: this.state.message
            });
            this.setState({message: ''});

            this.socket.on('RECEIVE_MESSAGE', function(data){
                addMessage(data);
            });

            const addMessage = data => {
                console.log(data);
                this.setState({messages: [...this.state.messages, data]}); // les 3 petits points : spread operator : on reprend tout le premier param (tableau) et on rajoute le deuxième param à la fin
                console.log(this.state.messages);
            };
        }
    }
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default JoinRoom;
