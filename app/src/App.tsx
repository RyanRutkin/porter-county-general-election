import './App.css';
import { ElectionResultsPrecinctsContextProvider } from './contexts/ElectionResultsPrecincts.context';
import { ElectionResultsSummaryContextProvider } from './contexts/ElectionResultsSummary.context';
import { AppDashboard } from './pages/Dashboard/Dashboard.page';

function App() {
	return (
		<ElectionResultsSummaryContextProvider>
		<ElectionResultsPrecinctsContextProvider>
			<AppDashboard />
		</ElectionResultsPrecinctsContextProvider>
		</ElectionResultsSummaryContextProvider>
	);
}

export default App;
