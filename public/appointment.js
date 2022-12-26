'use strict';

class Appointment extends React.Component {
  render() {
    
    return (
        <div class="ui cards"><div class="ui card"><div class="header">{ this.props.time }<br></br>{ this.props.place }</div></div></div>

    );}
}

let domContainer = document.querySelector('#appointment');
ReactDOM.render(<Appointment time="8.10-9.10" place="Kastav"/>, domContainer);