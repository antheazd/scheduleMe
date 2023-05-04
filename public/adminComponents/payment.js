'use strict';

class Payment extends React.Component {
  constructor(props) {
    super(props);
  }
  appointment_id(){
    return this.props.id.toString();
  }

  render() {
    
    return (
        <div className="ui card" style={{ margin: "4px"}}>
        <div className="content">
          <div className="header">{this.props.kind}</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Day: {this.props.day}  </h4>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                    Start time: {this.props.start_hour}:{this.props.start_minute >= 10 ? this.props.start_minute : this.props.start_minute + '0'}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                    Duration: {this.props.duration}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                    Price: {this.props.price} EUR
                </div>
              </div>
            </div>
          </div>
        </div>
        {!this.props.paid?
            <div className="extra content">
                <form method="post">
                    <input type="hidden" id="id" name="id" value={this.appointment_id()}/>
                    <button className="ui blue button">Mark as paid</button>
                </form>
            </div>
        :null}
      </div>
    );}
}
