import React, { Component } from 'react'
import { Line, Bar, Pie } from 'react-chartjs-2'
import { Segment, Grid } from 'semantic-ui-react';


class ChartLine extends Component {
    constructor(props) {
        super(props)
        this.showData = this.showData.bind(this)
        this.state = {
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday", "Sunday"],
                datasets: [{
                    label: 'apples',
                    data: [12, 19, 3, 17, 28, 24, 7],
                    backgroundColor: ['red', 'blue', 'green']
                }, {
                    label: 'oranges',
                    data: [30, 29, 5, 5, 20, 3, 10]
                }]
            }
        }
    }
    showData() {
        console.log(this.props.data)
    }
    render() {
        const { data } = this.props
        return (
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column><Segment><Bar data={data} /></Segment></Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Line data={data} /></Segment></Grid.Column>
                </Grid.Row>

                <Grid.Row>
                <Line width={200} height={100} data={data} options={{
                    maintainAspectRatio: true
                }} />
                </Grid.Row>

                
            </Grid>
        )
    }
}
export default ChartLine
