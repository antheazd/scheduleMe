'use strict';

class Appointment extends React.Component {

  extra_days(dayt){
    var monday = new Date();
    monday.setDate(monday.getDate() + (((1 - monday.getDay()) % 7) || 7));

    var day = new Date(dayt);
    
    console.log("day", day,  day.getDate());
    console.log("monday", monday,  monday.getDate());
    console.log("minus", day,  day.getDate() - monday.getDate());

    return day.getDate() - monday.getDate();
  }

  height(duration){
    console.log(duration);
    if(duration == "1h") return '15.57%';
    else if(duration == "45min") return '11.69%';
    else if(duration == "2h") return '30.16%';
    return '8.55%';
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
    var position =  18.25 + 7.5 * ((hour - 8) + (minute / 60)); //;(((hour - 8) + (minute / 60)) * 11.5)+ 14.53;
    //console.log(position);
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
    return end_hour + ':' + end_minute;
  }

  render() {
    return (
        <div className="ui cards" style={{ height: this.height(this.props.duration), right: this.right(this.props.day), top: this.top(this.props.start_hour, this.props.start_minute)}}><div className="ui card" ><div className="header">{ this.props.start_hour }:{ this.props.start_minute } - { this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute) }</div></div></div>

    );}
}

const container = document.querySelector("#table");
const x = container.querySelectorAll(".appointment1");
var i;
for (i = 0; i < x.length; i++) {
      let place = x[i].getAttribute("place");
      let start_hour  = x[i].getAttribute('start_hour');
      let start_minute = x[i].getAttribute('start_minute');
      let duration = x[i].getAttribute('duration');
      let alt = x[i].getAttribute('location_alt');
      let lng = x[i].getAttribute('location_lng');
      let day = x[i].getAttribute('day');
      const root = ReactDOM.createRoot(x[i]);
      root.render(<Appointment start_hour={start_hour} start_minute={start_minute} place={place} duration={duration} alt={alt} lng={lng} day={day}/>);
    }
/*
const container = document.getElementById('appointment');
let place = container.getAttribute('place');
let start_hour  = container.getAttribute('start_hour');
let start_minute = container.getAttribute('start_minute');
let duration = container.getAttribute('duration');
let alt = container.getAttribute('location_alt');
let lng = container.getAttribute('location_lng');
let day = container.getAttribute('day');
const root = ReactDOM.createRoot(container);
root.render(<Appointment start_hour={start_hour} start_minute={start_minute} place={place} duration={duration} alt={alt} lng={lng}/>); */
