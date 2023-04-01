'use strict';

class Chat extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
        <div className="full_page">
            <div className="chat_container">
                <br></br>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={false} message={"sent"} day={"3/3/2023"} time={"20:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={false} message={"sent"} day={"3/3/2023"} time={"20:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={true} message={"Message"} day={"2/3/2023"} time={"19:00"}/>
                <Message received={false} message={"sent"} day={"3/3/2023"} time={"20:00"}/>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <div class="chat_input">
                <form className="ui form">
                    <input style={{ width: '80%', display:'inline', marginLeft: '8%', marginRight: '2%' }}/>
                    <button type="submit" class="ui button" style={{ maxWidth: '16%' }}>Send</button>
                </form>
            </div>
        </div>
    );}
}

let container = document.getElementById('chat');
const root = ReactDOM.createRoot(container);
root.render(<Chat />);