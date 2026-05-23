import { useEffect, useState } from "react";
function Shop(){
    const [data, setData] = useState(null);
    const API_KEY = "1783c36aeeda221e820b059e33dddae77e2c29fe96b90b7fccca9c563e711177"
    const ENDPOINT = "https://serpapi.com/search";

    const params = {
        engine: "google_shopping",
        q: "Samsung Galaxy S26 Ultra",
        location: "Indonesia",
        api_key: API_KEY,
    }

    useEffect(() => {
        const queryString = new URLSearchParams({ ...params, api_key: API_KEY }).toString()
        const serpUrl = `${ENDPOINT}?${queryString}`

        fetch("https://corsproxy.io/?" + encodeURIComponent(serpUrl))
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
                setData(result)
            })
            .catch((err) => console.error("Error:", err))
    }, [])

    if (!data) {
        return <h1>Loading...</h1>
    }

    return (
        <div>
            {data.thumbnail && (
                <img src={data.thumbnail} width="400" height="400" />
            )}
            <h2>{data.title}</h2>
            <p>{data.source}</p>
            <p>{data.price}</p>
            <p>{data.rating}</p>
            <p>{data.product_link}</p>
        </div>
    )
}
export default Shop;