import React, { Component } from 'react';
import Timetable from 'react-timetable-events';

class Planer extends Component {
    constructor(probs) {
        super(probs);
    this.state = {
        recipes: [1, 2, 3, 4, 5, 6, 7]
        }
    };

    render () {
        return (
            <div>
                <h1>Random Weekly Meal Plan</h1>
                <h2>Date</h2>
                <table>
                    <tr>
                        <th>Monday</th>
                        <th>Tuesday</th>
                        <th>Wednesday</th>
                        <th>Thursday</th>
                        <th>Friday</th>
                        <th>Saturday</th>
                        <th>Sunday</th>
                    </tr>
                    <tr>
                        <td>this.state.recipes.[0]</td>
                        <td>Meal 2</td>
                        <td>Meal 3</td>
                        <td>Meal 4</td>
                        <td>Meal 5</td>
                        <td>Meal 6</td>
                        <td>Meal 7</td>
                    </tr>
                </table>
                <p>
                    <button>Create Random Plan</button>
                </p>
            </div>
        )
    }
};

export default Planer;

