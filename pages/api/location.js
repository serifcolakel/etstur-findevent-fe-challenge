// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import location from "../../data/location.json";
export default async function handler(req, res) {
  res.status(200).json(JSON.stringify(location));
}
