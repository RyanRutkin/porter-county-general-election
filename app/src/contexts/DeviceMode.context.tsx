import { FC, PropsWithChildren, createContext, useEffect, useRef, useState } from "react";

type DeviceMode = 'mobile' | 'desktop';

export const DeviceModeContext = createContext<{
    mode: DeviceMode;
    bbox: DOMRect | null;
}>({
    mode: 'desktop' as DeviceMode,
    bbox: null
});

export const DeviceModeContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [ mode, setMode ] = useState<DeviceMode>('desktop');
    const [ bbox, setBBox ] = useState<DOMRect | null>(null);
    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref?.current) {
            return;
        }
        const bbox = ref.current.getBoundingClientRect();
        setMode(bbox.width < 900 ? 'mobile' : 'desktop');
        setBBox(bbox);
    }, [ref]);

    return <DeviceModeContext.Provider value={{ mode, bbox }} >
        <div className="app-device-mode" ref={ref} >
            { children }
        </div>
    </DeviceModeContext.Provider>
}