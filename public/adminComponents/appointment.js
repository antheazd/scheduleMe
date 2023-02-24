'use strict';

class Appointment extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        display: false,
        buttondisplay: false
    }
      this.updateState = this.updateState.bind(this),
      this.right = this.right.bind(this)
    }
      
  
    extra_days(dayt){
      var monday = new Date();
      monday.setDate(monday.getDate() + (((1 - monday.getDay()) % 7) || 7) + (this.props.extra_weeks * 7));
      var day = new Date(dayt);
      return day.getDate() - monday.getDate();
    }
  
    appointment_height(duration){
      if(duration == "1h") return '15.57%';
      else if(duration == "45min") return '11.69%';
      else if(duration == "2h") return '30.16%';
      return '0%';
    }
  
    right(day){
      if (this.extra_days(day) < 0 || this.extra_days(day) > 6){
          return '120%';
      }
      var days = (7 - this.extra_days(day) - 1) * 12.5 + 0.15;
      return days + '%';
    }
  
    top(hour, minute){
      var position =  18.25 + 7.5 * ((hour - 8) + (minute / 60));
      return position + '%';
    }

    start_time(){
        var zero = "";
        if(this.props.start_minute < 10) zero = "0";
        return this.props.start_hour + ':' + zero + this.props.start_minute
    }
  
    end_time(duration, start_hour, start_minute){
  
      var end_hour = parseInt(start_hour, 10);
      var end_minute = parseInt(start_minute, 10);
  
      if(duration == "1h"){
        end_hour++;
      }
      else if(duration == "2h"){
        end_hour+= 2;
      }
      else if(duration == "45min"){
        end_hour = start_hour;
        end_minute = start_minute;
  
        if(start_minute < 15){
          end_minute = Number(start_minute) + 45;
        }
        else if(start_minute == 15){
          end_hour++;
          end_minute = 0;
        }
        else{
          end_hour++;
          end_minute = Number(( 45 - (60 - start_minute) )); 
        }
      }
      else{
        var hours = parseInt((duration.toString().slice(0, 2)), 10);
        var minutes = parseInt((duration.toString().slice(3, 2)), 10);
        end_hour += hours;
  
        if(start_minute + minutes >= 60){
          end_minute = ( start_minute + minutes  ) - 60;
          end_hour++;
        }
        else{
          end_minute = start_minute + minutes;
        }
      }
      var zero = "";
      if(end_minute < 10) zero = "0";

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

    componentDidMount() {
        if (this.extra_days(this.props.day) >= 0 && this.extra_days(this.props.day) < 6){
            this.setState({buttonDisplay: true});
            console.log(this.extra_days(this.props.day));
          }
      }
    
    render() {
      return (
        <div>
            { 
              this.state.buttonDisplay 
                ? <div>
                    <button onClick={this.updateState}>
                    <div className="ui cards" style={{ height: this.appointment_height(this.props.duration), right: this.right(this.props.day), top: this.top(this.props.start_hour, this.props.start_minute)}}>
                        <div className="ui card" >
                            <div className="header">
                            { this.start_time() } - { this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute) }
                            </div>
                        </div>
                    </div>
                    </button>
                    </div>
                : null
            }

            { 
              this.state.display 
            ? <div className="ui center aligned container">
                <div className="half_page">
                <div className="ui attached message">
                <div className="content">
                <div className="header">Appointment</div>
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
      );}
  }
  