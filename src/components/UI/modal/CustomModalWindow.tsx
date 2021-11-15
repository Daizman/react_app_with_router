import React from "react";

const cssClasses = require('.//CustomModalWindow.module.css');

interface CustomModalWindowProps {
    children: React.ReactNode;
    visible: boolean;
    setVisible(visible: boolean): void;
}


export default function CustomModalWindow({children, visible, setVisible} : CustomModalWindowProps) {
    
    const rootClasses = [cssClasses.customModal];
    if(visible === false) {
        rootClasses.splice(1, 1);
    } else {
        rootClasses.push(cssClasses.active);
    }
    
    return (
        <>
            <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
                <div className={cssClasses.customModalContent} onClick={(e) => e.stopPropagation()}>
                    {children}
                </div>
            </div>
        </>
    );
};
