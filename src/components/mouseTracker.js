import React, {useEffect, useState} from 'react';


// TODO: This uses GET request constantly. But will want to make request only once, but still update rectangle position with mouse
const MouseTracker = ({width = 400, height = 250}) => {
    const [position, setPosition] = useState({x: 0, y: 0});
    const [wikiParagraph, setWikiParagraph] = useState('');

    useEffect(() => {
        const handleMouseMove = async (e) => {
            setPosition({x: e.clientX, y: e.clientY});

            const pageTitle = 'acetoin';
            const apiUrl = `http://localhost:5000/api/wikipedia/${encodeURIComponent(pageTitle)}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                console.log('Wikipedia API response:', data);

                const pageId = Object.keys(data.query.pages)[0];
                const pageData = data.query.pages[pageId];

                if (pageData && pageData.extract) {
                    setWikiParagraph(pageData.extract);
                } else {
                    setWikiParagraph('No data found.');
                }
            } catch (error) {
                console.error('Error fetching Wikipedia data:', error);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Re-render the component when wikiParagraph changes
    useEffect(() => {
        // Empty dependency array to ensure this effect runs only when wikiParagraph changes
    }, [wikiParagraph]);

    return (<div>
            <p>Mouse coordinates: {position.x}, {position.y}</p>
            <div
                style={{
                    position: 'absolute',
                    left: position.x,
                    top: position.y - height,
                    width: `${width}px`,
                    height: `${height}px`,
                    backgroundColor: 'lightgray',
                }}
            >
                <p>{wikiParagraph}</p>
            </div>
        </div>);
};

export default MouseTracker;