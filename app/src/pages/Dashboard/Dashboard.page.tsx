import { useContext, useMemo } from 'react';
import { ElectionResultsContext } from '../../contexts/ElectionResults.context';
import { AppPieChart } from '../../components/PieChart/PieChart.component';
import { AppPage } from '../../components/Page/Page.component';
import './Dashboard.page.css';

export const AppDashboard = () => {
    const { resultOptions, selectedResults, contentFilter } = useContext(ElectionResultsContext);
    const sections = useMemo(() => {
        if (!selectedResults || !resultOptions[selectedResults]) {
            return [];
        }
        if (!contentFilter) {
            return resultOptions[selectedResults].result.sections;
        }
        return resultOptions[selectedResults].result.sections.filter(section => section.title.toLowerCase().indexOf(contentFilter.toLowerCase()) > -1);
    }, [contentFilter, selectedResults, resultOptions]);


    return (
        <AppPage className='app-dashboard' >
            <div className='app-dashboard-chart-section' >
                {
                    sections.map((section, idx) => (
                        <div className='app-dashboard-chart' key={ `app-dashboard-chart_${ idx }` } >
                            <AppPieChart section={ section } />
                        </div>
                    ))
                }
            </div>
        </AppPage>
    )
}