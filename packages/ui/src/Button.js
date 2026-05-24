import React from "react";

const Button = ({ children, variant = "primary", size = "", className = "", ...props }) => {
    const classes = `btn btn-${variant}${size ? ` btn-${size}` : ""}${className ? ` ${className}` : ""}`;
    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
};

export default Button;
