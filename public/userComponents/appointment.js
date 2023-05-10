'use strict';

class Appointment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      before_separator_display: false,
      after_separator_display: false,
      appointment_display: false,
      extra_weeks: 0
    };
    this.callback = this.callback.bind(this);
  }

  componentDidUpdate() {
    if (this.props.extra_weeks != this.state.extra_weeks) {
      this.setState({ extra_weeks: this.props.extra_weeks });
      this.check_visibility();
    }
  }

  check_visibility() {
    var extra_days = Number(this.extra_days());
    if ((extra_days >= 0) && (extra_days < 7)) {
      this.setState({ before_separator_display: true });
      this.setState({ after_separator_display: true });
      this.setState({ appointment_display: true });
    }
    else {
      this.setState({ before_separator_display: false });
      this.setState({ after_separator_display: false });
      this.setState({ appointment_display: false });
    }
    if (this.props.start_hour == 8) {
      this.setState({ before_separator_display: false });
    }
    if (Number((window.coordinates[0].alt) == Number(this.props.alt)) && (Number(window.coordinates[0].lng) == Number(this.props.lng))) {
      this.setState({ before_separator_display: false });
      this.setState({ after_separator_display: false });
    }
    if (this.end_time() >= "21:00") {
      this.setState({ after_separator_display: false });
    }
  }

  componentDidMount() {

    this.setState({ extra_weeks: this.props.extra_weeks });
    this.check_visibility();

    const destination = new google.maps.LatLng(Number(window.coordinates[0].alt), Number(window.coordinates[0].lng));
    const origin = new google.maps.LatLng(Number(this.props.alt), Number(this.props.lng));

    if (Number((window.coordinates[0].alt) == Number(this.props.alt)) && (Number(window.coordinates[0].lng) == Number(this.props.lng))) {
      this.setState({ before_separator_display: false });
      this.setState({ after_separator_display: false });
      this.props.add_appointment(this.props.day, this.props.start_hour, this.props.start_minute, this.props.duration, this.state.duration);
      return;
    }

    var service = new window.google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [destination],
        travelMode: window.google.maps.TravelMode.DRIVING,
        avoidHighways: false,
        avoidTolls: false,
        unitSystem: google.maps.UnitSystem.METRIC
      },
      this.callback
    );
  }

  callback(response, status) {
    if (status === 'OK') {
      this.setState({ duration: response.rows[0].elements[0].duration.value });
      this.props.add_appointment(this.props.day, this.props.start_hour, this.props.start_minute, this.props.duration, this.state.duration);
    } else {
      console.error('Error:', status);
    }
  }

  extra_days() {
    var monday = new Date();
    monday.setDate(monday.getDate() + (((1 - monday.getDay()) % 7) || 7) + (this.props.extra_weeks * 7));
    var day = new Date(this.props.day);
    if ((day.getMonth() != monday.getMonth()) || (day.getFullYear() != monday.getFullYear())) return -1;
    return day.getDate() - monday.getDate();
  }

  right() {
    var days = (6 - this.extra_days(this.props.day)) * 12.49 + 0.02;
    return days + '%';
  }

  appointment_height() {
    switch (this.props.duration) {
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

  separator_height() {
    var seconds = parseInt(this.state.duration);

    var hour = Math.floor(seconds / 3600);
    seconds -= hour * 3600;
    var minute = Math.ceil(seconds / 60);

    return ((hour + (minute / 60)) * 8) + '%';
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

    if (end_minute < 10) return end_hour + ':0' + end_minute;

    return end_hour + ':' + end_minute;
  }


  render() {
    return (
      <div>
        {this.state.appointment_display ?
          <div className="ui visible message" style={{ height: this.appointment_height(), right: this.right(), top: this.top() }}><span className="appointment_time">{this.start_time()} - {this.end_time(this.props.duration, this.props.start_hour, this.props.start_minute)}</span></div>
          : null}

        {this.state.before_separator_display ?
          <BeforeSeparator right={this.right()} extra_days={this.extra_days} duration={this.state.duration} separator_height={this.separator_height()}
            end_time={this.start_time()} appointment_start={this.top()}
          />
          : null}

        {this.state.after_separator_display ?
          <AfterSeparator right={this.right()} extra_days={this.extra_days} duration={this.state.duration} separator_height={this.separator_height()}
            start_time={this.end_time()} appointment_start={this.top()} appointment_height={this.appointment_height()}
          />
          : null}

      </div>
    );
  }
}