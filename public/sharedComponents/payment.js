'use strict';

class Payment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
        <div className="ui card" style={{ margin: "4px"}}>
        <div className="content">
          <div className="header">Masaža</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Day: {this.props.day}  </h4>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                    Start time: {this.props.start_hour}:{this.props.start_minute}
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
            <GooglePayButton id={this.props.id} price={this.props.price} />
            </div>
        :null}
      </div>
    );}
}