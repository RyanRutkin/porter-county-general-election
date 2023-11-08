import { useContext } from "react";
import { ElectionResultsContext } from "../../contexts/ElectionResults.context";
import { SidebarContext } from "../../contexts/Sidebar.context";
import './Sidebar.component.css';
import { DeviceModeContext } from "../../contexts/DeviceMode.context";

export const AppSidebar = () => {
    const { selectedResults, setSelectedResults, resultOptions, sound, toggleSound } = useContext(ElectionResultsContext);
    const { showSidebar, setShowSidebar } = useContext(SidebarContext);
    const { mode } = useContext(DeviceModeContext);
    const options = Object.keys(resultOptions);

    return (
        <div className={ `app-sidebar ${ showSidebar ? 'app-sidebar-show' : '' }` } >
            <div className="app-sidebar-content" >
                <div className="app-sidebar-option app-sidebar-sound-toggle" onClick={ () => toggleSound(!sound) } >
                    <button className="app-sidebar-toggle-sound-btn" onClick={ () => toggleSound(!sound) } >{ sound ? 'Disable sound' : 'Enable sound' }</button>
                </div>
                {
                    options.map((option, idx) => (
                        <div 
                            className={ `app-sidebar-option ${ selectedResults === option ? 'app-sidebar-option-selected' : '' }` }
                            onClick={ () => {
                                setSelectedResults(option);
                                if (mode === 'mobile') {
                                    setShowSidebar(false);
                                }
                            } } 
                            key={ `app-sidebar-option_${ idx }` }
                        >{ option }</div>
                    ))
                }
            </div>
        </div>
    )
}