import React from 'react';

declare function require(name: string) : {
    customInput: string;
};

const classes = require('.//CustomInput.module.css');

interface CustomInputProps extends React.ComponentPropsWithoutRef<'input'> {
    value?: string;
}

const CustomInput = React.forwardRef<HTMLInputElement, CustomInputProps>((props, ref) => {
    return (
        <input ref={ref} className={classes.customInput} {...props}/>
    );
});

export default CustomInput;