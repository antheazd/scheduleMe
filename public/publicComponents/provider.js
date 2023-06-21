'use strict';

class Provider extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="eight wide column">
                    <h3 className="ui header"><a href={"/schedule/" + this.props.id} >{this.props.name} {this.props.surname}</a></h3>
                    <p>
                        Mi smo tim fizioterapeuta kojima je glavni cilj da niti
                        jedna osoba ne čeka na rehabilitaciju te da se čim prije
                        vrati u aktivnosti svakodnevnog života.
                    </p>
                </div>
                <div className="six wide right floated column">
                    <img
                        className="ui large bordered rounded image"
                        src="./static/photos/physiotogo.png"
                    />
                </div>
            </div>
        );
    }
}