import React, { Component } from 'react';
import Timetable from 'react-timetable-events';

class Planer extends Component {
    constructor(probs) {
        super(probs);
    this.state = {
        events: {
            monday: [
                {
                    id: 1,
                    name: 'Custom Event 1',
                }
            ],
            tuesday: [
                {
                    id: 2,
                    name: 'Custom Event 2',
                },
                {
                    id: 3,
                    name: 'Custom Event 3',
                }
            ],
            wednesday: [],
            thursday: [],
            friday: []
        }
    }
    };

    render () {
        return (
            <Timetable events={this.state.events}/>
        )
    }
};

export default Planer;

