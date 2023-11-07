import { useContext } from 'react';
import './Dashboard.page.css';
import { ElectionResultsSummaryContext } from '../../contexts/ElectionResultsSummary.context';
import { AppResultSection } from '../../components/ResultSection/ResultSection.component';
import { ElectionResultsPrecinctsContext } from '../../contexts/ElectionResultsPrecincts.context';
import { AppPieChart } from '../../components/PieChart/PieChart.component';
import './Dashboard.page.css';

export const AppDashboard = () => {
    const { results } = useContext(ElectionResultsSummaryContext);
    const { results: precintResults } = useContext(ElectionResultsPrecinctsContext);

    return (
        <div className='app-dashboard' >
            <div className='app-dashboard-chart-section' >
                {
                    results?.sections.map((section, idx) => (
                        <div className='app-dashboard-chart' >
                            <AppPieChart section={ section } />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}