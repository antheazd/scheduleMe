'use strict';

class Schedule extends React.Component{

    constructor() {
        super();
        this.state = {
            extra_weeks: 0
        };
        this.nextWeek = this.nextWeek.bind(this);
        this.previousWeek = this.previousWeek.bind(this);
        }

    nextWeek(){ 
            var z = this.state.extra_weeks + 1;
            this.setState({extra_weeks: z});
              }
        
    previousWeek(){
            var z = this.state.extra_weeks;
            if(z > 0){
              z--;
              this.setState({extra_weeks: z});
            }
        }
    render(){
                return(
                    <div>
                        <Table extra_weeks={this.state.extra_weeks}/>
                        <br></br>
                        <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
                            <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" aria-label="Previous item" type="prevItem" className="item" onClick={this.previousWeek}>⟨</a>
                            <a aria-current="false" aria-disabled="false" tabIndex="0" value="2" aria-label="Next item" type="nextItem" className="item" onClick={this.nextWeek}>⟩</a>
                        </div>  

                        <ul>
                          {window.context.map(i => 
                            <div  key = {i.appointment_id}>
                                <Appointment extra_weeks={this.state.extra_weeks} start_hour={i.start_hour} start_minute={i.start_minute} duration={i.duration} alt={i.alt} lng={i.lng} day={i.day} name={i.name} surname={i.surname} price={i.price}/>
                            </div>
                            )}
                        </ul>

                    </div>
                )
            }
}

let container = document.getElementById('schedule');
const root = ReactDOM.createRoot(container);
root.render(<Schedule />); 