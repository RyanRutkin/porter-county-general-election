import { useContext } from "react";
import { ElectionResultsContext } from "../../contexts/ElectionResults.context";
import './Sidebar.component.css';
import { SidebarContext } from "../../contexts/Sidebar.context";

export const AppSidebar = () => {
    const { selectedResults, setSelectedResults, resultOptions } = useContext(ElectionResultsContext);
    const { showSidebar } = useContext(SidebarContext);
    const options = Object.keys(resultOptions);

    return (
        <div className={ `app-sidebar ${ showSidebar ? 'app-sidebar-show' : '' }` } >
            <div className="app-sidebar-content" >
                {
                    options.map((option, idx) => (
                        <div 
                            className={ `app-sidebar-option ${ selectedResults === option ? 'app-sidebar-option-selected' : '' }` }
                            onClick={ () => setSelectedResults(option) } 
                            key={ `app-sidebar-option_${ idx }` }
                        >{ option }</div>
                    ))
                }
            </div>
        </div>
    )
}