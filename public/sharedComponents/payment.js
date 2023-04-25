'use strict';

class Payment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
        <div className="ui card" style={{ margin: "4px"}}>
        <div className="content">
          <div className="header">{this.props.day}-{this.props.start_hour}:{this.props.start_minute}</div>
        </div>
        <div className="content">
          <h4 className="ui sub header">Masaža</h4>
          <div className="ui small feed">
            <div className="event">
              <div className="content">
                <div className="summary">
                    {this.props.duration}
                </div>
              </div>
            </div>
            <div className="event">
              <div className="content">
                <div className="summary">
                    {this.props.price}
                </div>
              </div>
            </div>
          </div>
        </div>
        {!this.props.paid?
            <div className="extra content">
            <button className="ui button">Pay</button>
            </div>
        :null}
      </div>
    );}
}