import React from "react";
import io from "socket.io-client";
import uuidv4 from "uuid/v4";

class Chat extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            username: '',
            message: '',
            messages: [],
            room: '',
        };

        this.socket = io('localhost:8080');

        this.socket.on('receive_message', function(data){
            addMessage(data);
        });

        const addMessage = data => {
            console.log(data);
            this.setState({messages: [...this.state.messages, data]});
            console.log(this.state.messages);
        };

        this.sendMessage = ev => {
          ev.preventDefault();
          this.socket.emit('send_message', {
              author: this.state.username,
              message: this.state.message
          })
          this.setState({message: ''});
        }

        this.joinRoom = ev => {
          ev.preventDefault();
          this.setState({room: uuidv4()}, () => {
            window.alert("Please join this room: " + this.state.room);
            console.log(this.state.room);
            this.socket.emit('join_room', this.state.room);
          })
        }
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">Global Chat</div>
                                <hr/>
                                <div className="messages">
                                    {this.state.messages.map(message => {
                                        return (
                                            <div>{message.author}: {message.message}</div>
                                        )
                                    })}
                                </div>

                            </div>
                            <div className="card-footer">
                              <input type="text" placeholder="Username" value={this.state.username} onChange={ev => this.setState({username: ev.target.value})} className="form-control"/>
                              <br/>
                              <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                              <br/>
                              <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                            </div>
                            <div className="container">
                              <button  onClick = {this.joinRoom} className="btn btn-secondary form-control">Generate Room</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
