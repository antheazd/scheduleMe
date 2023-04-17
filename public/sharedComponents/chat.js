'use strict';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    const { messageList } = this.refs;
    messageList.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
  }
  render() {
    
    return (
        <div className="full_page">
            <div className="chat_container" ref="messageList">
                <br></br>
                <ul>
                    {window.context.map(i => 
                    <div key={i.id}>
                        <Message received={i.is_admin} message={i.content} time={i.created}/>
                    </div>
                    )}
                </ul>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
            </div>
            <div className="chat_input">
                <form className="ui form" method="post">
                    <input style={{ width: '80%', display:'inline', marginLeft: '8%', marginRight: '2%', maxlength: "1000" }} id="content" name="content" />
                    <button type="submit" className="ui button" style={{ maxWidth: '16%' }}>Send</button>
                </form>
            </div>
        </div>
    );}
}

let container = document.getElementById('chat');
const root = ReactDOM.createRoot(container);
root.render(<Chat />);