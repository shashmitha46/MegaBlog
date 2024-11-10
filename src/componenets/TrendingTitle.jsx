import React, { useState, useEffect } from 'react';

const TrendingTitles = () => {
    const [titles, setTitles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(1); // Start at 1 to show the first title
    const [isButtonVisible, setIsButtonVisible] = useState(true);

    useEffect(() => {
        const fetchTrendingTitles = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/generate_trending_titles');
                const data = await response.json();

                // Clean and format the titles
                const cleanedTitles = data.trending_titles.map(item =>
                    item
                        .replace(/^\d+\.\s*/, '')  // Remove numbering
                        .replace(/^\*\*(.*)\*\*$/, '$1')  // Remove bold formatting
                );

                setTitles(cleanedTitles);
                console.log(cleanedTitles);
            } catch (error) {
                console.error('Error fetching trending titles:', error);
            }
        };

        fetchTrendingTitles();
    }, []);

    const renderNextTitle = () => {
        if (currentIndex < titles.length) {
            setCurrentIndex(currentIndex + 1);
        }

        if (currentIndex + 1 === titles.length) {
            setIsButtonVisible(false);
        }
    };

    return (
        <div className="p-6 mx-auto bg-white shadow-lg dark:bg-gray-800">
            <div>
                <div className="mx-auto p-6 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 leading-tight mb-4">
                        ✨ Discover Inspiring Ideas for Your Next Blog Post ✨
                    </h1>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
                        Uncover unique topics and spark creativity for your blog with these hand-picked ideas.
                    </p>
                </div>

                <div className="my-6 border-t border-gray-300 dark:border-gray-600"></div>

                <div id="trending-titles" className="space-y-4">
                    {titles.slice(0, currentIndex).map((title, index) => (
                        <div
                            key={index}
                            className={`text-xl font-semibold text-gray-900 dark:text-gray-200 transform animate-fade-in-up transition-all duration-1000`}
                            style={{
                                animationDelay: `${index * 0.3}s`, // Staggering the animations
                            }}
                        >
                            {title}
                        </div>
                    ))}
                </div>

                {isButtonVisible && (
                    <button
                        id="nextTitleButton"
                        onClick={renderNextTitle}
                        className="mt-6  py-3 w-2/5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold rounded-lg shadow-md"
                    >
                        Generate New Title ✨
                    </button>
                )}
            </div>
        </div>
    );
};

export default TrendingTitles;
