import React, { Component } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Segment, Grid,} from 'semantic-ui-react';

const chartData = {
    labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
    datasets: [
        {
            label: 'Population',
            data: [
                617594,
                181045,
                153060,
                106519,
                105162,
                95072
            ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)'
            ]
        }
    ]
}

class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chartData: props.chartData
        }
    }

    static defaultProps = {
        displayTitle: true,
        displayLegend: true,
        legendPosition: 'right',
        location: 'Massachusetts'
    }

    render() {
        return (
            <Grid>
                <Grid.Row centered columns={2}>
                    <Grid.Column>
                        <Segment size='big' clearing>
                            <Bar
                                data={chartData}
                                options={{
                                    title: {
                                        display: this.props.displayTitle,
                                        text: 'Largest Cities In ' + this.props.location,
                                        fontSize: 12
                                    },
                                    legend: {
                                        display: this.props.displayLegend,
                                        position: this.props.legendPosition
                                    }
                                }}
                            />
                        </Segment>
                    </Grid.Column>
                    <Grid.Column>
                        <Segment>
                            <Line
                                data={chartData}
                                options={{
                                    title: {
                                        display: this.props.displayTitle,
                                        text: 'Largest Cities In ' + this.props.location,
                                        fontSize: 25
                                    },
                                    legend: {
                                        display: this.props.displayLegend,
                                        position: this.props.legendPosition
                                    }
                                }}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Segment>
                            <Pie
                                data={chartData}
                                options={{
                                    title: {
                                        display: this.props.displayTitle,
                                        text: 'Largest Cities In ' + this.props.location,
                                        fontSize: 25
                                    },
                                    legend: {
                                        display: this.props.displayLegend,
                                        position: this.props.legendPosition
                                    }
                                }}
                            />
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        )
    }
}

export default Chart;