import { useEffect, useState } from "react";
function Job(){
    const [data, setData] = useState(null);
    const API_KEY = "20f2d6abcd078d8614fad7334f584100db78ca9628437bc941437b295aadcc28"
    const ENDPOINT = "https://serpapi.com/search?engine=google_jobs";

    const params = {
        engine: "google_jobs",
        q: "Engineer",
        location: "Indonesia",
        google_domain: "google.com",
        hl: "en",
        gl: "id",
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
            <h2>{data.title}</h2>
            <img src={data.thumbnail} width="400" height="400" />
            <p>{data.company_name}</p>
            <p>{data.location}</p>
            <p>{data.description}</p>
        </div>
    )
}
export default Job;