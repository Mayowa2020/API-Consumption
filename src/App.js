import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://free-nba.p.rapidapi.com/players?page=0&per_page=100", {
            method: "GET",
            headers: {
                "x-rapidapi-host": "free-nba.p.rapidapi.com",
                "x-rapidapi-key":
                    "03f75e5346mshe102d9b0cdcb5a0p1a7f92jsndd8d5123e45a",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then((data) => {
                setData(data.data);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return "Loading...";
    if (error) return "Error!";

    return (
        <div className="container">
            <Header />
            {data.map((record) => (
                <div key={record.id} style={{ margin: "30px" }}>
                    <div>{`Name: ${record.first_name}`}</div>
                    <div>{`Team_ID: ${record.team.id}`}</div>
                    {/* {record.first_name}, {record.team.id} */}
                </div>
            ))}
        </div>
    );
}
