import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Watchlist() {
    const { id } = useParams();
    const [watchlist, setWatchlist] = useState(null);

    useEffect(
        () => {
            fetch('/api/watchlists?apiToken=53hxc46ixNhBrqnW').then(res => res.json())
                .then(
                    (result) => {
                        let targetWatchlist = result.data.watchlists.find(
                            (watchlist) => watchlist._id === id
                        );

                        setWatchlist(targetWatchlist);
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

    return <div>
        {
            watchlist && <h2>{watchlist.name}</h2>
        }
    </div>
}