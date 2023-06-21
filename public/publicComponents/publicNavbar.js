'use strict';

class PublicNavbar extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            highlight: -0
        }
        this.componentDidMount = this.componentDidMount.bind(this)
    }
    componentDidMount(){
        if(window.location.href.includes('home')){
            this.setState({ highlight: 1});
        }
        else if(window.location.href.includes('providers')){
            this.setState({ highlight: 2});
        }
        else if(window.location.href.includes('contact')){
            this.setState({ highlight: 3});
        }
    }

    render() {
        const living_room = './static/photos/living_room.jpg';
        return (
            <div className="ui inverted vertical masthead center aligned segment" style={{ background: `url(${living_room})`, boxShadow: 'inset 0 0 0 2000px rgba(0, 0, 0, 0.7)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                <div>
                    <div className="ui container">
                        <div className="ui large secondary inverted pointing menu">
                            <a className="toc item"><i className="sidebar icon"></i></a>
                            <a className={this.state.highlight === 1 ? "active item" : "item"} href="/">Home</a> 
                            <a className={this.state.highlight === 2 ? "active item" : "item"} href="/providers">Service Providers</a>
                            <a className={this.state.highlight === 3 ? "active item" : "item"}>Contact</a>
                            <div className="right item">
                                <a className="ui inverted button" href="/login">Log in</a>
                                <a className="ui inverted button" href="/signup">Sign Up</a>
                            </div>
                        </div>
                    </div>
                    <div className="ui text container">
                        <h1 className="ui inverted header">{this.props.title}</h1>
                        <h2> ↓ </h2>
                    </div>
                </div>
            </div>
        );
    }
}