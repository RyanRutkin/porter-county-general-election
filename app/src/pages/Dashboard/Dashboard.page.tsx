import { useContext } from 'react';
import './Dashboard.page.css';
import { ElectionResultsContext } from '../../contexts/ElectionResults.context';
import { AppResultSection } from '../../components/ResultSection/ResultSection.component';

export const AppDashboard = () => {
    const { results } = useContext(ElectionResultsContext);

    return (
        <div className='app-dashboard' >
            {
                results?.sections.map((section, idx) => (
                    <AppResultSection 
                        key={`app-dashboard-section_${ idx }`} 
                        section={ section } 
                    />
                ))
            }
        </div>
    )
}