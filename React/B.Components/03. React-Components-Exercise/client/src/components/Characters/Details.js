import React from 'react';

export default class Details extends React.Component {
    render = () => (
            <section id="bio">
                <div className="image">
                    <img src={this.props.url} alt='details'/>
                </div>
                <div className="info">
                    <p>Name: <strong>{this.props.name}</strong></p>
                    <p>Bio:</p>
                    <p>{this.props.bio}</p>
                </div>
            </section>
        )
}