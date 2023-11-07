import { useContext } from 'react';
import { ElectionResultsContext } from '../../contexts/ElectionResults.context';
import { AppPieChart } from '../../components/PieChart/PieChart.component';
import { AppHeader } from '../../components/Header/Header.component';
import './Dashboard.page.css';
import { AppPage } from '../../components/Page/Page.component';

export const AppDashboard = () => {
    const { resultOptions, selectedResults } = useContext(ElectionResultsContext);

    return (
        <AppPage className='app-dashboard' >
            <div className='app-dashboard-chart-section' >
                {
                    selectedResults && resultOptions[selectedResults]?.result.sections.map((section, idx) => (
                        <div className='app-dashboard-chart' key={ `app-dashboard-chart_${ idx }` } >
                            <AppPieChart section={ section } />
                        </div>
                    ))
                }
            </div>
        </AppPage>
    )
}