import React, { useState } from "react";

// Multi-slice Pie Chart using SVG
const PieChart = ({ data, size = 120 }) => {
    const [hovered, setHovered] = useState(null);
    const radius = size / 2 - 10;
    const total = data.reduce((sum, d) => sum + d.value, 0);

    // Precompute start/end percentages for each slice
    let cumulative = 0;
    const slices = data.map((slice) => {
        const startPercent = cumulative / total;
        cumulative += slice.value;
        const endPercent = cumulative / total;
        return { ...slice, startPercent, endPercent };
    });

    // Helper to get coordinates for arc
    const getCoordinates = (percent) => {
        const angle = 2 * Math.PI * percent - Math.PI / 2;
        return [
            size / 2 + radius * Math.cos(angle),
            size / 2 + radius * Math.sin(angle),
        ];
    };

    return (
        <div style={{ position: "relative", width: size, height: size }}>
            <svg width={size} height={size}>
                {slices.map((slice, i) => {
                    const [startX, startY] = getCoordinates(slice.startPercent);
                    const [endX, endY] = getCoordinates(slice.endPercent);
                    const largeArcFlag = slice.endPercent - slice.startPercent > 0.5 ? 1 : 0;

                    const pathData = [
                        `M ${size / 2} ${size / 2}`,
                        `L ${startX} ${startY}`,
                        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                        "Z",
                    ].join(" ");

                    return (
                        <path
                            key={slice.label}
                            d={pathData}
                            fill={slice.color}
                            stroke="#fff"
                            strokeWidth="2"
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                            style={{ cursor: "pointer" }}
                        />
                    );
                })}
                <text
                    x="50%"
                    y={size - 10}
                    textAnchor="middle"
                    fontSize="1.1em"
                    fill="#333"
                >
                    Нийт: {total}
                </text>
            </svg>
            {hovered !== null && (
                <div
                    style={{
                        position: "absolute",
                        left: size / 2,
                        top: 10,
                        background: "#fff",
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        padding: "4px 10px",
                        pointerEvents: "none",
                        transform: "translate(-50%, 0)",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        zIndex: 10,
                        fontSize: "0.95em",
                    }}
                >
                    {slices[hovered].label}: {slices[hovered].value}
                </div>
            )}
        </div>
    );
};

export default PieChart;