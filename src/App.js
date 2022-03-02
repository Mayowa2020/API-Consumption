import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";

export default function App() {
    const [data, setData] = useEffect(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("https://free-nba.p.rapidapi.com/players?page=0&per_page=25", {
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
                setData(data);
            })
            .catch((error) => {
                console.error("Error fetching data", error);
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    // if (loading) {
    //   "Loading players...";
    // } else
    // if (error) "Error loading players!";

    return (
        <div className="container">
            <Header />
            {loading ? (
                <div>Loading players!</div>
            ) : (
                <ul>
                    {data.map((item) => {
                        return <li>{item.body}</li>;
                    })}
                </ul>
            )}
        </div>
    );
}
