'use strict';

class Appointment extends React.Component {

    constructor(props){
      super(props);
      }
  
    extra_days(dayt){
      var monday = new Date();
      monday.setDate(monday.getDate() + (((1 - monday.getDay()) % 7) || 7) + (this.props.extra_weeks * 7));
  
      var day = new Date(dayt);
      
      console.log("extra weeks", this.props.extra_weeks);
      console.log("day", day,  day.getDate());
      console.log("monday", monday,  monday.getDate());
      console.log("minus", day,  day.getDate() - monday.getDate());
  
      return day.getDate() - monday.getDate();
    }
  
    appointment_height(duration){
      console.log(duration);
      if(duration == "1h") return '15.57%';
      else if(duration == "45min") return '11.69%';
      else if(duration == "2h") return '30.16%';
      return '0%';
    }
  
    right(day){
      if (this.extra_days(day) < 0 || this.extra_days(day) > this.extra_days(day) > 6){
          return '120%';
      }
      var days = (7 - this.extra_days(day) - 1) * 12.5 + 0.15;
      console.log(days);
      return days + '%';
    }
  
    top(hour, minute){
      console.log(hour, minute);
      var position =  18.25 + 7.5 * ((hour - 8) + (minute / 60));
      return position + '%';
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
      return end_hour + ':' + end_minute;
    }
  
    
    render() {
      return (
        <div>
          <div className="ui cards" style={{ height: this.appointment_height(this.props.duration), right: this.right(this.props.day), top: this.top(this.props.start_hour, this.props.start_minute)}}><div className="ui card" ><div className="header">{ this.props.start_hour }:{ this.props.start_minute } - { this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute) }</div></div></div>
          <Separator extra_weeks={this.props.extra_weeks} start_time={this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute)} alt={this.props.alt} lng={this.props.lng} day={this.props.day} right={this.right(this.props.day)} top={this}
                     extra_days={this.extra_days} end_time={this.end_time} 
          />
        </div>
      );}
  }
  