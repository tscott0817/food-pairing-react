import React, {useEffect, useState, useRef} from "react";
import IngredientThumbnail from "../components/cards/ingredientThumbnail";
import {
    defaultPageColor, defaultPageNeonColor,
    mainAppColor,
    pageColor,
    pageSectionColor,
    randomTempColor,
    sectionItemColor
} from "../colors";


const DefaultPage = ({setSelectedIngredientRef, handleDisplayIngredient, searchQuery, selectedFilters}) => {
    const [flavors, setFlavors] = useState([]);
    const containerRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/api/flavordb')
            .then((response) => response.json())
            .then((data) => {
                const sortedFlavors = data.data.sort((a, b) => a.alias.localeCompare(b.alias));
                setFlavors(sortedFlavors);
            })
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const handleThumbnailClick = (ingredient) => {
        setSelectedIngredientRef({current: ingredient});
        handleDisplayIngredient(true);
    };

    // TODO: Transition on both in and out
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateX(0)';
                    } else {
                        entry.target.style.opacity = 0;
                        entry.target.style.transform = 'translateX(-30px)';
                    }
                });
            },
            {threshold: 0.25} // TODO: Adjust this for how much of item on screen before transition starts
        );

        const elements = document.querySelectorAll('.thumbnail');

        const rowMap = new Map(); // Map to track row indices and their cumulative width

        elements.forEach((element, index) => {
            observer.observe(element);

            const rect = element.getBoundingClientRect();
            const row = Math.floor(rect.top / rect.height);

            if (!rowMap.has(row)) {
                rowMap.set(row, 0);
            }

            const cumulativeWidth = rowMap.get(row);
            const delay = cumulativeWidth / rect.width * 0.1;

            element.style.transition = `opacity 0.5s ${delay}s, transform 0.5s ${delay}s`;
            element.style.transform = `translateX(-${cumulativeWidth}px)`;

            rowMap.set(row, cumulativeWidth + rect.width);
        });

        return () => {
            observer.disconnect();
        };
    }, [flavors, searchQuery]); // Include [flavors] and [searchQuery] in the dependency array


    // Reset styles when search is cleared
    useEffect(() => {
        const elements = document.querySelectorAll('.thumbnail');
        elements.forEach((element) => {
            element.style.opacity = 1;
            element.style.transform = 'translateX(0)';
        });
    }, [searchQuery]); // Include [searchQuery] in the dependency array

    const filteredFlavors = flavors.filter((flavor) =>
        flavor.alias.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ backgroundColor: pageColor, minWidth: '800px' }}>
            <div
                ref={containerRef}
                style={{
                    width: '98%',
                    height: '100%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    padding: '1%',
                    backgroundColor: defaultPageColor,
                }}
            >
                {filteredFlavors.map((flavor) => (
                    <div
                        key={flavor.index}
                        className="thumbnail"
                        style={{
                            flex: '1 0 23%',
                            margin: '1%',
                            cursor: 'pointer',
                            minWidth: '250px',
                            height: '40vh',
                            minHeight: '275px',
                            opacity: 0,
                            transform: 'translateX(-30px)',
                            transition: 'opacity 0.5s, transform 0.5s',
                            // Apply neon glow effect
                        }}
                        onClick={() => handleThumbnailClick(flavor)}
                    >
                        <IngredientThumbnail ingredient_name={flavor.alias} ingredient_id={flavor.entityID} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DefaultPage;