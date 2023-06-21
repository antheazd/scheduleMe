'use strict';

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    time() {
        return new Date(this.props.time * 1000).toLocaleString();
    }

    render() {
        return (
            <div>
                <div>
                    <div className={!this.props.received ? "right chat_message" : "chat_message"}>
                        <div className="ui message">
                            <p>{this.props.message}</p>
                        </div>
                    </div>
                    <div className={!this.props.received ? "date right" : "date"}>{this.time()}</div>
                </div>
            </div>

        );
    }
}
