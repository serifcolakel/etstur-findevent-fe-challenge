// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import location from "../../../data/location.json";
export default async function handler(req, res) {
  let id = req.query.id;
  let filtered = await location.find((loc) => loc.id === id);
  if (!!filtered) {
    res.status(200).json(JSON.stringify(filtered));
  } else {
    res.status(404).json(JSON.stringify({ error: "Data not found" }));
  }
}
