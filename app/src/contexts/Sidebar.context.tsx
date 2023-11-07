import { FC, PropsWithChildren, SetStateAction, createContext, useState } from "react";

export const SidebarContext = createContext<{
    showSidebar: boolean;
    setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}>({
    showSidebar: false,
    setShowSidebar: (value: SetStateAction<boolean>) => { throw new Error('SidebarContext is not within scope') }
});

export const SidebarContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ showSidebar, setShowSidebar ] = useState<boolean>(false);

    return <SidebarContext.Provider value={{ showSidebar, setShowSidebar }} >
        { children }
    </SidebarContext.Provider>
}
