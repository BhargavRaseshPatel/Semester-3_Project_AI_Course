// /app/api/generate-image/route.js
import Replicate from "replicate";

export async function POST(request) {
  try {
    const body = await request.json();
    const topic = body.topic || "MySQL";

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
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

    // ✅ Your loop logic applied
    for (const [index, file] of Object.entries(output)) {
      if (typeof file.url === "function") {
        const url = file.url().href;
        return Response.json({ imageUrl: url });
      }
    }

    return Response.json({ error: "No image URL returned" }, { status: 500 });

  } catch (error) {
    console.error("Replicate error:", error.message);
    return Response.json({ error: "Generation failed", details: error.message }, { status: 500 });
  }
}
