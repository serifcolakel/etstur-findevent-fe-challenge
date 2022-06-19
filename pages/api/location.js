// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from "fs";
export default async function handler(req, res) {
  let location = await fs.readFileSync("./data/location.json");
  res.status(200).json(location);
}
