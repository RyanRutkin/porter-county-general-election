import './App.css';
import { DeviceModeContextProvider } from './contexts/DeviceMode.context';
import { ElectionResultsContextProvider } from './contexts/ElectionResults.context';
import { SidebarContextProvider } from './contexts/Sidebar.context';
import { AppDashboard } from './pages/Dashboard/Dashboard.page';

function App() {
	return (
		<ElectionResultsContextProvider>
			<DeviceModeContextProvider>
				<SidebarContextProvider>
					<AppDashboard />
				</SidebarContextProvider>
			</DeviceModeContextProvider>
		</ElectionResultsContextProvider>
	);
}

export default App;
