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

        let paramId = props.match.params.id;
        this.state.room = paramId;
        console.log(paramId);
        this.socket.emit('join_room', paramId);

        this.socket.on('receive_message', function(data){
            addMessage(data);
        });
        const addMessage = data => {
            // if ((this.state.room = data.room)) {
                // console.log("this.state.room = " + this.state.room);
                // console.log("data.room = " + data.room);
                this.setState({messages: [...this.state.messages, data]});
                // console.log(this.state.messages);
            // }
        };

        this.sendMessage = ev => {
          ev.preventDefault();
          this.socket.emit('send_message', {
              author: this.state.username,
              message: this.state.message,
              room: this.state.room
          })
          this.setState({message: ''});
        }

        this.home = ev => {
            ev.preventDefault();
            window.location.replace("http://localhost:3000/");
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
                              <button  onClick = {this.home} className="btn btn-secondary form-control">Home</button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;
