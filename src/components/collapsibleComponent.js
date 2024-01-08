import React, { useState } from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';

const CollapsibleComponent = ({ title, children, isCollapsed, onToggle }) => {
    const [contentHeight, setContentHeight] = useState(isCollapsed ? 0 : 'auto');

    const toggleCollapse = () => {
        const newHeight = contentHeight === 'auto' ? 0 : 'auto';
        setContentHeight(newHeight);
        onToggle();
    };

    return (
        <div>
            <div
                style={{
                    cursor: 'pointer',
                    borderBottom: '1px solid #ccc',
                    padding: '10px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    transition: 'background-color 0.3s',
                    backgroundColor: isCollapsed ? '#e0e0e0' : 'white',
                    borderRadius: '8px',
                    // boxShadow: '0 0 8px rgba(0, 0, 0, 0.2)',
                }}
                onClick={toggleCollapse}
            >
                <div>{title}</div>
                {isCollapsed ? <FaArrowDown /> : <FaArrowRight />}
            </div>
            <div
                style={{
                    overflow: 'hidden',
                    height: contentHeight,
                    opacity: isCollapsed ? 0 : 1,
                    transition: 'height 0.8s ease-in-out, opacity 0.8s ease-in-out',
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default CollapsibleComponent;