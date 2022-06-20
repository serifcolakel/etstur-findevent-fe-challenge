// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import events from "../../data/location.json";
export default async function handler(req, res) {
  let { name, category, location, date, price } = req.query;

  res.send(JSON.stringify(req.query));
}
