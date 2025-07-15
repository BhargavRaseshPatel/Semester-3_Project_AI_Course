// /pages/api/generate-image.js
import Replicate from "replicate";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const topic = req.body.topic || "MySQL";

  try {
    const replicate = new Replicate({
      auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
    });

    const input = {
      prompt: `A visually appealing front cover of a book titled "${topic}". 
      Design it based on the course topic: 
      - If it's about programming, show code snippets, a laptop, or futuristic tech UI elements. 
      - If it's about creativity, show art supplies, vibrant colors, or a sketchbook. 
      - If it's about health, include medical symbols, healthy food, or wellness themes. 
      The book cover should look clean, professional, and realistic with good lighting and centered layout.`
    };

    const output = await replicate.run("black-forest-labs/flux-schnell", { input });

    for (const [index, file] of Object.entries(output)) {
      if (typeof file.url === "function") {
        const url = file.url().href;
        return res.status(200).json({ imageUrl: url });
      }
    }

    return res.status(500).json({ error: "Image URL not found in output." });

  } catch (error) {
    console.error("Error while generating the image:", error);
    return res.status(500).json({ error: "Failed to generate image.", details: error.message });
  }
}
