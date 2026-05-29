export default async function handler(req, res) {
  const params = new URLSearchParams({
    engine: "google_shopping",
    q: "Samsung Galaxy S26",
    location: "Indonesia",
    gl: "id",
    api_key: process.env.SERPAPI_KEY,
  });

  const response = await fetch(`https://serpapi.com/search?${params}`);
  const data = await response.json();
    res.status(200).json(data);
}