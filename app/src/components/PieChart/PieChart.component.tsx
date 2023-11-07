import React, { FC, useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { ElectionResultSection } from '../../types/ElectionResults.types';
import './PieChart.component.css';
import { AppSquare } from '../Square/Square.component';

ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.overrides['pie'].plugins.legend.display = false;

const COLOR_REP = 'rgba(209,78,52, 0.';
const COLOR_DEM = 'rgba(85,169,209, 0.';
const COLOR_LIB = 'rgba(209,157,56, 0.';
const COLORS = [
    'rgba(187,89,189, 0.',
    'rgba(120,183,66, 0.',
    'rgba(116,116,203, 0.',
    'rgba(89,191,143, 0.',
    'rgba(205,66,110, 0.',
    'rgba(66,127,67, 0.',
    'rgba(190,109,146, 0.',
    'rgba(142,142,66, 0.',
    'rgba(190,117,77, 0.',
];

function getColor(label: string, index: number, isBorder?: boolean) {
    let choiceColor = COLORS[index%COLORS.length];
    if (label.indexOf('(REP)') > -1) {
        choiceColor = COLOR_REP;
    }
    if (label.indexOf('(DEM)') > -1) {
        choiceColor = COLOR_DEM;
    }
    if (label.indexOf('(LIB)') > -1) {
        choiceColor = COLOR_LIB;
    }
    if (isBorder) {
        return `${choiceColor}8)`;
    }
    return `${choiceColor}2)`;
}

type PieChartDataset = {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderColor: string[];
    borderWidth: number;
}

export const AppPieChart: FC<{section: ElectionResultSection}> = ({section}) => {
    const choices = section.content.map((choice, idx) => {
        const choiceColor = getColor(choice.choice, idx);
        return {
            ...choice,
            label: `${ choice.choice } - ${ choice.percent || 0 }%`,
            color: choiceColor,
            borderColor: getColor(choice.choice, idx, true)
        }
    }).sort((a, b) => (b.total || 0) - (a.total || 0));
    const totalVotes = choices.reduce<number>((acc, cur) => acc += (cur.total || 0), 0);
    const parseChartData = () => {
        const chartData = {
            labels: [] as string[],
            datasets: [] as PieChartDataset[],
            options: {
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        };
        const dataset: PieChartDataset = {
            label: section.title,
            data: [] as number[],
            backgroundColor: [] as string[],
            borderColor: [] as string[],
            borderWidth: 1
        };
        for (let i = 0; i < choices.length; i++) {
            const choice = choices[i];
            dataset.data.push(choice.total || 0);
            dataset.backgroundColor.push(choice.color);
            dataset.borderColor.push(choice.borderColor);
            chartData.labels.push(`${ choice.choice } - ${ choice.percent }%`);
        }
        chartData.datasets.push(dataset);
        return chartData;
    }
    const readiedChartData = parseChartData();
    return (
        <div className='app-pie-chart' >
            <div className='app-pie-chart-title' >{ section.title } - { totalVotes } votes</div>
            <div className='app-pie-chart-body' >
                <div className='app-pie-chart-legend' >
                    {
                        choices.map(choice => (
                            <div className='app-pie-chart-legend-entry' key={ `app-pie-chart-legend_${ choice.label }` } >
                                <div className='app-pie-chart-label' >{ choice.label }</div>
                                <div className='app-pie-chart-label-color' style={{ 
                                    backgroundColor: choice.color, 
                                    borderColor: choice.borderColor
                                }}></div>
                            </div>
                        ))
                    }
                </div>
                <div className='app-pie-chart-container' >
                    <AppSquare>
                        <Pie data={readiedChartData} />
                    </AppSquare>
                </div>
            </div>
        </div>
    )
}
