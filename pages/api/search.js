// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import events from "../../data/location.json";
export default async function handler(req, res) {
  let { name, category, location, date, price } = req.query;
  let _filteredEvent = events.filter(
    (event) =>
      event.location.city.toLowerCase() === location.toLowerCase() &&
      event.eventType.toLowerCase() === category.toLowerCase() &&
      event.name.includes(name)
  );
  res.send(JSON.stringify(_filteredEvent));
}
