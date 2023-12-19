import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle the GET request
  if (req.method === "GET") {
    // Send a JSON response
    res.status(200).json({ message: "Hello from the API!" });
  } else {
    // Handle other HTTP methods
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
