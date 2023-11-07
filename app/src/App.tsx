import './App.css';
import { ElectionResultsContextProvider } from './contexts/ElectionResults.context';
import { SidebarContextProvider } from './contexts/Sidebar.context';
import { AppDashboard } from './pages/Dashboard/Dashboard.page';

function App() {
	return (
		<ElectionResultsContextProvider>
			<SidebarContextProvider>
				<AppDashboard />
			</SidebarContextProvider>
		</ElectionResultsContextProvider>
	);
}

export default App;
