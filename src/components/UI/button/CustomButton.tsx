import React from "react";

// импорт таким образом позволяет добиться изоляции стилей без BAM
declare function require(name: string) : {
    customButton: string;
};

const classes = require('.//CustomButton.module.css');

interface CustomButtonProps extends React.ComponentPropsWithoutRef<'button'> {
    children?: React.ReactNode;
    onClick?: () => void;
}

const CustomButton = ({children, ...props} : CustomButtonProps) => {
    return (
        <button {...props} className={classes.customButton}>
            {children}
        </button>
    );
};


export default CustomButton;