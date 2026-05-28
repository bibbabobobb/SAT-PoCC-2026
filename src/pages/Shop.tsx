import { useEffect, useState } from "react";
function Shop(){
    const [data, setData] = useState([]);
    const API_KEY = "1783c36aeeda221e820b059e33dddae77e2c29fe96b90b7fccca9c563e711177"
    const ENDPOINT = "https://serpapi.com/search";

    const params = {
        engine: "google_shopping",
        q: "Samsung Galaxy S26",
        location: "Indonesia",
        gl: "id",
        api_key: API_KEY,
    }
    const [limit, setLimit] = useState(5);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const queryString = new URLSearchParams({ ...params, api_key: API_KEY }).toString()
        const serpUrl = `${ENDPOINT}?${queryString}`

        fetch("https://corsproxy.io/?" + encodeURIComponent(serpUrl))
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setData(result.shopping_results)
                setLoading(false)
            })
            .catch((err) => console.error("Error:", err))
    }, [])

    if (loading) {
        return <div className="loading"><h1>Loading...</h1></div>
    }

    return (
      <div className="wrap">
          <div className="header">
             <h1>Samsung Shop</h1>
             <p>Find the best deals in Indonesia</p>
          </div>
        <div className="grid">
            {data.slice(0, limit).map((item, index) => (
                <div key={index} style={{ overflow: "hidden", borderBottom: index < data.length - 1 ? "2px solid #1d1d37" : "none", paddingBottom: "3rem", marginBottom: "3rem" }}>
                    {item.thumbnail && (
                        <img src={item.thumbnail} width="400" height="400" />
                    )}
                    <h1>{item.title}</h1>
                    <h2>{item.source}</h2>
                    <p>{item.price}</p>
                    <p>Rating: ⭐{item.rating}</p>
                    <a href={item.product_link} target="_blank" rel="noopener noreferrer">View Product</a>
                </div>
            ))}
        </div>
        <button onClick={() => setLimit(limit + 5)}>View More</button>
    </div>
    )
}
export default Shop;