import React, { Component } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { Segment, Grid } from 'semantic-ui-react';


class ChartLine extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"],
                datasets: [{
                    label: 'apples',
                    data: [12, 19, 3, 17, 28, 24, 7],
                    backgroundColor: [ 'red', 'blue', 'green']
                }, {
                    label: 'oranges',
                    data: [30, 29, 5, 5, 20, 3, 10]
                }]
            }
        }
    }
    render() {
        const { data } = this.state
        return (
            <Grid>
                <Grid.Row columns={2}>
                <Grid.Column><Segment><Bar data={data} /></Segment></Grid.Column>
                <Grid.Column>
                    <Segment>
                    <Line data={data}  /></Segment></Grid.Column>
                </Grid.Row>

                <Grid.Row columns={2}>
                <Grid.Column><Segment><Pie data={data} /></Segment></Grid.Column>

                </Grid.Row>

                <Line width={200} height={100} options={{
                    maintainAspectRatio: true
                }} />
            </Grid>
        )
    }
}
export default ChartLine
