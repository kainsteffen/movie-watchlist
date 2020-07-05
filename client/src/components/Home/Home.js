import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [watchlists, setWatchlists] = useState(null);
    const [newWatchlistName, setNewWatchlistName] = useState("");

    useEffect(
        () => {
            fetch('/api/watchlists?apiToken=53hxc46ixNhBrqnW').then(res => res.json())
                .then(
                    (result) => {
                        setWatchlists(result.data.watchlists);
                    },
                    // Note: it's important to handle errors here
                    // instead of a catch() block so that we don't swallow
                    // exceptions from actual bugs in components.
                    (error) => {
                        console.log(error);
                    }
                )
        }
    );

    const renderWatchlists = () => {
        if (watchlists) {
            return watchlists.map((watchlist) =>
                <li><Link to={`/watchlist/${watchlist._id}`}>{watchlist.name}</Link></li>
            )
        }
    }

    const handleChange = (event) => {
        setNewWatchlistName(event.target.value);
    }

    const handleSubmit = (event) => {
        alert('A name was submitted: ' + newWatchlistName);

        fetch('/api/watchlists/create?apiToken=53hxc46ixNhBrqnW', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ownerId: '5f01e9eb86472107749b6528',
                name: newWatchlistName,
            })
        })
        event.preventDefault();
    }

    return <div>
        <h2>Home</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Name:
          <input type="text" value={newWatchlistName} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
        </form>
        {
            <ul>{renderWatchlists()}</ul>
        }
    </div>;
}
