import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import './Square.component.css';

export const AppSquare: FC<PropsWithChildren> = ({ children }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [ orientation, setOrientation ] = useState<'landscape' | 'portrait' | null>(null);
    const [ boxStyle, setBoxStyle ] = useState<Record<string, any>>({});

    useEffect(() => {
        if (!ref?.current) {
            setOrientation(null);
            return;
        }
        const bbox = ref.current.getBoundingClientRect();
        if (bbox.height > bbox.width) {
            setBoxStyle({
                height: bbox.width,
                width: '100%'
            });
            setOrientation('portrait');
        } else {
            setBoxStyle({});
            setOrientation('landscape');
        }
    }, [ref]);

    return (
        <div ref={ ref } className={ `app-square app-square-${ orientation }` } >
            <div className="app-square-contents" style={ boxStyle } >
                {
                    orientation !== null
                    ? children
                    : null
                }
            </div>
        </div>
    )
}
