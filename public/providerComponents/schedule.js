'use strict';

class Schedule extends React.Component {

    constructor() {
        super();
        this.state = {
            extra_weeks: 0,
            appointments: {},
            loading: true
        };
        this.nextWeek = this.nextWeek.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
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
    componentDidMount() {
        axios.get('http://localhost:8000/schedule_info').then(resp => {
            this.setState({ appointments: resp });
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
                    <div className="full_page">
                        <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
                            <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" aria-label="Previous item" type="prevItem" className="item" onClick={this.previousWeek}>⟨</a>
                            <a aria-current="false" aria-disabled="false" tabIndex="0" value="2" aria-label="Next item" type="nextItem" className="item" onClick={this.nextWeek}>⟩</a>
                        </div>

                        <div className="table_div">
                            <Table extra_weeks={this.state.extra_weeks} />
                            <br></br>
                            <ul>
                                <div>
                                    {appointments.map(i =>
                                        <div key={i.id}>
                                            <Appointment key={i.id} extra_weeks={this.state.extra_weeks} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} alt={i.alt} lng={i.lng} day={i.day} name={i.user_name} surname={i.user_surname} price={i.price} kind={i.kind} />
                                        </div>
                                    )}
                                </div>

                            </ul>
                        </div>
                        <br></br>
                        <AddAppointment />
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