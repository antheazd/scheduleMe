'use strict';

class Providers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            providers: [],
            loading: true
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/providers_info').then(resp => {
            this.setState({ providers: resp.data });
        }).catch(error => {
            console.log(error);
        });
    }

    componentDidUpdate() {
        if (this.state.loading && this.state.providers !== undefined) {
            this.setState({ loading: false });
        }
    }

    render() {
        const living_room = './static/photos/living_room.jpg';
        const providers = this.state.providers;

        return (
            <div>
                {!this.state.loading ?
                    <div className="pusher">
                        <PublicNavbar title="Service providers" />
                        <div className="ui vertical stripe segment">
                            <div className="ui middle aligned stackable grid container">
                                {providers.map(i =>
                                        <Provider key={i.id} id={i.id} name={i.name} surname={i.surname} phone={i.phone} />
                                )}
                            </div>
                        </div>
                    </div>
                    : <Loading />}
            </div>
        );
    }
}

let container = document.getElementById('providers');
const root = ReactDOM.createRoot(container);
root.render(<Providers />);