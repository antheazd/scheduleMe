'use strict';

class Appointment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      appointment_display: false,
      display: false,
      extra_weeks: 0
    };
    this.updateState = this.updateState.bind(this);
  }

  componentDidUpdate(){
    if(this.props.extra_weeks != this.state.extra_weeks){
      this.setState({extra_weeks: this.props.extra_weeks});
      this.check_visibility();
    }
  }

  check_visibility(){
    var extra_days = Number(this.extra_days());
    if((extra_days >= 0) && (extra_days < 7)) {
      this.setState({appointment_display: true});
    }
    else{
      this.setState({appointment_display: false});
    }
  }

  extra_days() {
    var monday = new Date();
    monday.setDate(monday.getDate() + (((1 - monday.getDay()) % 7) || 7) + (this.props.extra_weeks * 7));
    var day = new Date(this.props.day);
    if((day.getMonth() != monday.getMonth()) || (day.getFullYear() != monday.getFullYear())) return -1;
    return day.getDate() - monday.getDate();
  }

  right() {
    var days = (6 - this.extra_days(this.props.day)) *  12.49 + 0.02;
    return days + '%';
  }

  appointment_height() {
    switch(this.props.duration){
      case "45min":
        return 0.75 * 8 + '%';
      case "1h":
        return 8 + '%';
      case "2h":
        return 2 * 8 + '%';
      default:
        return '0%';
    }
  }

  top() {
    var position = 12.48 + 8 * ((this.props.start_hour - 8) + (this.props.start_minute / 60));
    return position + '%';
  }

  start_time() {
    var zero = "";
    if (this.props.start_minute < 10) zero = "0";
    return this.props.start_hour + ':' + zero + this.props.start_minute
  }

  end_time() {
    var end_hour = parseInt(this.props.start_hour, 10);
    var end_minute = parseInt(this.props.start_minute, 10);

    switch (this.props.duration) {
      case "45min": {
        if (this.props.start_minute < 15) {
          end_minute = Number(this.props.start_minute) + 45;
        }
        else if (this.props.start_minute >= 15) {
          end_hour++;
          end_minute = Number((45 - (60 - this.props.start_minute)));
        }
        break;
      }
      case "1h":
        end_hour++;
        break;
      case "2h":
        end_hour += 2;
    }
    var zero = "";
    if (end_minute < 10) zero = "0";

    return end_hour + ':' + zero + end_minute;
  }

  location_link(){
    var alt = Number(this.props.alt);
    var lng = Number(this.props.lng);
    return "https://maps.google.com/?q=" + alt + "," + lng;
}

  updateState(){ 
    this.setState({display: !this.state.display});
  }

  render() {
    return (
      <div>
        {this.state.appointment_display?
            <div onClick={this.updateState} className="ui visible message" style={{ height: this.appointment_height(), right: this.right(), top: this.top() }}>{this.start_time()} - {this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute)}<br></br>{this.props.name} {this.props.surname}</div>
        :null }

        {this.state.display 
            ? <div className="ui center aligned container">
                <div className="half_page">
                <div className="ui attached message" style={{ zIndex : "200" }}>
                <div className="content">
                <i class="close icon" onClick={this.updateState}></i>
                <div className="header">{ this.props.kind }</div>
                    <p>{ this.props.name } { this.props.surname }</p></div></div>
                    <form className="ui form attached fluid segment" method="post">
                        <div className="equal width fields">

                            <div className="field">
                            <label>Date</label>
                                { this.props.day}
                            </div>

                            <div className="field">
                            <label>Time</label>
                            { this.start_time() }-{ this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute) }
                            </div>

                            <div className="field">
                                <label>Duration</label>
                                { this.props.duration }
                            </div>
                        </div>

                    <div className="equal width fields">

                            <div className="field">
                                <label>Price</label>
                                { this.props.price } €
                            </div>

                            <div className="field">
                              <label>Location</label>
                                <a href={ this.location_link() }>Location</a>
                            </div>

                        </div>

                    </form>
                    </div>
                
              </div>

            : null
            }
      
      </div>
    );
  }
}