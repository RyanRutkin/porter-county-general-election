import './App.css';
import { ElectionResultsContextProvider } from './contexts/ElectionResults.context';
import { AppDashboard } from './pages/Dashboard/Dashboard.page';

function App() {
	return (
		<ElectionResultsContextProvider>
			<AppDashboard />
		</ElectionResultsContextProvider>
	);
}

export default App;
