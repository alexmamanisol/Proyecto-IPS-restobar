import React from "react";

const ButtonGoBack = ({ history, variant = "info", size = "lg" }) => {
    const handleClick = () => {
        history.goBack();
    };

    return (
        <button onClick={handleClick} className={`btn btn-${variant} btn-${size} mb-2`}>
            Go Back
        </button>
    );
};

export default ButtonGoBack;
