'use strict';

class Inbox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
        <div className="full_page">
                <ul>
                    {window.users.map(i => 
                    <div key={i.user_id}>
                        <a href={'/adminchat/' + i.user_id}>{i.user_id}</a>
                        <br></br>
                    </div>
                    )}
                </ul>
        </div>
    );}
}

let container = document.getElementById('inbox');
const root = ReactDOM.createRoot(container);
root.render(<Inbox />);