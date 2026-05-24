import React from "react";

const Logo = ({ src = "/logo.png", alt = "Logo", text, className = "brand-image img-circle elevation-3", imgStyle }) => {
    return (
        <>
            <img
                src={src}
                alt={alt}
                className={className}
                style={{ opacity: ".8", ...imgStyle }}
            />
            {text && <span className="brand-text font-weight-light">{text}</span>}
        </>
    );
};

export default Logo;
