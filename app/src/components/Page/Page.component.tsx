import { FC, PropsWithChildren, useContext } from "react";
import { AppHeader } from "../Header/Header.component";
import { ElectionResultsContext } from "../../contexts/ElectionResults.context";
import { AppSidebar } from "../Sidebar/Sidebar.component";
import './Page.component.css';

export const AppPage: FC<React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & PropsWithChildren> = ({ className, children, ...props }) => {
    const { selectedResults } = useContext(ElectionResultsContext);
    return (
        <div className="app-page" { ...props } >
            <AppHeader />
            <div className="app-page-body" >
                <AppSidebar />
                <div className="app-page-body-main" >
                    <div className='app-dashboard-selected-results' >{ selectedResults }</div>
                    <div className={ `app-page-content ${ className || '' }` } >
                        { children }
                    </div>
                </div>
            </div>
        </div>
    )
};
