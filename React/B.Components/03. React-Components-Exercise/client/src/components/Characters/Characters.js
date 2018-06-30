import React from 'react';

import Roster from './Roster';
import Details from './Details';
import fetcher from '../../fetcher';

const ROOSTER_ENPOINT = '/roster';
const DETAILS_ENDPOINT = '/character/';

export default class Characters extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            urls: [],
            details: {
                id: null,
                url: null,
                bio: null,
                name: null
            }
        }
    }

    componentDidMount = () => {
        this.getRosters()
    }

    getRosters = () => {
        fetcher.get(ROOSTER_ENPOINT, data => {
            this.setState({
                urls: data.map(e => {
                    return {id: e.id,
                            url: e.url}
                })
            })
        })
    }

    getDetails = (id) => {
        fetcher.get(DETAILS_ENDPOINT + id, data => 
            this.setState({details: data}))
    }

    render = () => (
        <div>
            <Roster images={this.state.urls} details={this.getDetails}/>
            <Details {...this.state.details}/>
        </div>
    )
}