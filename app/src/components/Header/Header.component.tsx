import { useContext } from "react";
import { ElectionResultsContext } from "../../contexts/ElectionResults.context";
import { SidebarContext } from "../../contexts/Sidebar.context";
import HamburgerIcon from '../../icons/Hamburger_icon.svg.png';
import './Header.component.css';

export const AppHeader = () => {
    const { lastUpdateTimestamp } = useContext(ElectionResultsContext);
    const { setShowSidebar } = useContext(SidebarContext);

    return (
        <div className="app-header" >
            <div className="app-header-sidebar-area" onClick={ () => setShowSidebar(show => !show) } >
                <img className="app-header-sidebar-icon" src={ HamburgerIcon } alt="Toggle Sidebar" />
            </div>
            <div className="app-header-details" >
                <div className="app-header-title" >Porter County General Election 2022</div>
                <div className="app-header-last-update" >Last Updated: { lastUpdateTimestamp }</div>
            </div>
        </div>
    )
}