import React from 'react';

export default class Roster extends React.Component {

    render = () => {
        const imgs = []
        for (const obj of this.props.images) {
            imgs.push((
                <div className='roster-image-container' key={obj.id}>
                    <img src={obj.url} alt='roster' onClick={() => this.props.details(obj.id)}/>
                </div>
            ))
        }

        return (
            <section id="roster">
                {imgs}
            </section>
        )
    }
}