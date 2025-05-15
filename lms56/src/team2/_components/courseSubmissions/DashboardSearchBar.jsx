import React, { useState } from "react";

const DashboardSearchBar = ({ searchTerm, setSearchTerm, placeholder = "Хайх..." }) => {
    const [input, setInput] = useState(searchTerm || "");

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSearchTerm(input);
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
            <input
                type="text"
                value={input}
                onChange={handleChange}
                placeholder={placeholder}
                style={{
                    padding: "8px 14px",
                    borderRadius: 6,
                    border: "1px solid #bdbdbd",
                    fontSize: 16,
                    width: 850,
                    marginRight: 8
                }}
            />
            <button
                type="submit"
                style={{
                    padding: "8px 16px",
                    borderRadius: 6,
                    border: "none",
                    background: "#1976d2",
                    color: "#fff",
                    fontSize: 16,
                    cursor: "pointer"
                }}
            >
                Хайх
            </button>
        </form>
    );
};

export default DashboardSearchBar;