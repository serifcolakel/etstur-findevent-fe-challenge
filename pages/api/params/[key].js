// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import events from "../../../data/location.json";
export default async function handler(req, res) {
  let params = [];
  switch (req.query.key) {
    case "name":
      await events.map((event) => params.push(event.name));
      break;
    case "eventType":
      await events.map((event) => params.push(event.eventType));

      break;
    case "location":
      await events.map((event) => params.push(event.location.city));

      break;
    case "location2":
      await events.map((event) => params.push(event.location.city));

      break;
    default:
      break;
  }
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  const uniq = params.filter(onlyUnique);

  res.status(200).json(JSON.stringify(uniq));
}
