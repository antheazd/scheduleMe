'use strict';

class Schedule extends React.Component {

    constructor() {
        super();
        this.state = {
            extra_weeks: 0,
            appointments: {},
            apps: [],
            location: {},
            loading: true
        };
        this.nextWeek = this.nextWeek.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
        this.add_appointment = this.add_appointment.bind(this);
    }

    nextWeek() {
        var z = this.state.extra_weeks + 1;
        this.setState({ extra_weeks: z });
    }

    previousWeek() {
        var z = this.state.extra_weeks;
        if (z > 0) {
            z--;
            this.setState({ extra_weeks: z });
        }
    }

    add_appointment(day, start_hour, start_minute, duration, separator_duration) {

        let start = (start_hour * 60 + start_minute) - (separator_duration / 60);
        let end = (start_hour * 60 + start_minute) + (separator_duration / 60);

        switch (duration) {
            case "45min":
                end += 45;
            case "1h":
                end += 90;
            case "2h":
                end += 120;
        }

        let appointments = this.state.apps;
        appointments.push({ "day": day, "start": start, "end": end });

        this.setState({
            apps: appointments
        });
    }

    componentDidMount() {
        axios.get('http://localhost:8000/schedule_appointments').then(resp => {
            this.setState({ appointments: resp });
        }).catch(error => {
            console.log(error);
        });
        axios.get('http://localhost:8000/user_location').then(resp => {
            this.setState({ location: resp.data });
        }).catch(error => {
            console.log(error);
        });
    }

    componentDidUpdate() {
        if (this.state.appointments !== undefined && this.state.loading) {
            this.setState({ loading: false });
        }
    }

    render() {
        const appointments = this.state.appointments.data;
        const loading = this.state.loading;
        return (
            <div>
                {!loading ?
                    <div>
                        <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
                            <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" aria-label="Previous item" type="prevItem" className="item" onClick={this.previousWeek}>⟨</a>
                            <a aria-current="false" aria-disabled="false" tabIndex="0" value="2" aria-label="Next item" type="nextItem" className="item" onClick={this.nextWeek}>⟩</a>
                        </div>
                        <div className="table_div">
                            <Table extra_weeks={this.state.extra_weeks} />
                            <br></br>
                            <ul>
                                {appointments.map(i =>
                                    <div key={i.id}>
                                        <Appointment extra_weeks={this.state.extra_weeks} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} alt={i.alt} lng={i.lng} day={i.day} add_appointment={this.add_appointment} location={this.state.location} />
                                    </div>
                                )}
                            </ul>
                        </div>
                        <br></br>
                        <AddAppointment appointments={this.state.appointments} />
                        <br></br>
                    </div>
                    : <Loading />}
            </div>
        )
    }
}

let container = document.getElementById('schedule');
const root = ReactDOM.createRoot(container);
root.render(<Schedule />); 