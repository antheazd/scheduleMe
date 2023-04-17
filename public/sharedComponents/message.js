'use strict';

class Message extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
    <div>
        <div>
            <div className={this.props.received ? "right chat_message" : "chat_message"}>
                <div className="ui message">
                    <p>{this.props.message}</p>
                </div>
            </div>
            <div className={this.props.received ? "date right" : "date"}>{this.props.time}</div>
        </div>
    </div>

    );
}
}
