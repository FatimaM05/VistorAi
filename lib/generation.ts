import OpenAI from "openai";

export type ImageResult = { url: string };
export type VideoResult = { url: string; demo: boolean };

/**
 * Image generation. Uses OpenAI if OPENAI_API_KEY is set (costs money per
 * image). Otherwise falls back to Pollinations.ai, a free, keyless image
 * generation API — no card, no signup, still a real model call.
 */
export async function generateImage(prompt: string): Promise<ImageResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (apiKey) {
    const client = new OpenAI({ apiKey });
    const response = await client.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: "1024x1024",
      quality: "standard",
    });
    const url = response.data?.[0]?.url;
    if (!url) throw new Error("The model returned no image. Try a different prompt.");
    return { url };
  }

  // Free fallback — Pollinations.ai renders the image at this URL directly.
  const seed = Math.floor(Math.random() * 1_000_000);
  const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${seed}&nologo=true`;

  // Pollinations generates lazily on first fetch of the URL, so warm it up
  // here to confirm it actually succeeded before we call the render "done".
  const check = await fetch(url);
  if (!check.ok) {
    throw new Error("The image provider is busy. Try again in a moment.");
  }
  return { url };
}

/**
 * Video generation via Replicate, if a token + model version are configured.
 * Video model APIs (Sora/Veo/Runway-class) change fast and require picking an
 * exact model version, so this is left explicitly configurable rather than
 * hardcoding a version that could silently break or bill unexpectedly.
 *
 * Without configuration, this returns a clearly-labeled demo clip so the rest
 * of the product (credits, history, status states) is still fully exercised.
 */
export async function generateVideo(prompt: string): Promise<VideoResult> {
  const token = process.env.REPLICATE_API_TOKEN;
  const modelVersion = process.env.REPLICATE_VIDEO_MODEL_VERSION;

  if (!token || !modelVersion) {
    // Demo fallback — full flow still runs end to end.
    await new Promise((r) => setTimeout(r, 1500));
    return {
      url: "https://res.cloudinary.com/dvujgfucy/video/upload/f_auto,q_auto,w_1280/bgvideo.mp4",
      demo: true,
    };
  }

  const createRes = await fetch("https://api.replicate.com/v1/predictions", {
    method: "POST",
    headers: {
      Authorization: `Token ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      version: modelVersion,
      input: { prompt },
    }),
  });

  if (!createRes.ok) {
    throw new Error("The video provider rejected the request. Try again shortly.");
  }

  const prediction = await createRes.json();
  let status = prediction.status;
  let result = prediction;
  const pollUrl = prediction.urls?.get;

  const started = Date.now();
  while (status !== "succeeded" && status !== "failed" && status !== "canceled") {
    if (Date.now() - started > 120_000) {
      throw new Error("Video generation timed out. Try again.");
    }
    await new Promise((r) => setTimeout(r, 2000));
    const pollRes = await fetch(pollUrl, {
      headers: { Authorization: `Token ${token}` },
    });
    result = await pollRes.json();
    status = result.status;
  }

  if (status !== "succeeded") {
    throw new Error("Video generation failed. Try a different prompt.");
  }

  const output = Array.isArray(result.output) ? result.output[0] : result.output;
  if (!output) throw new Error("The model returned no video.");
  return { url: output, demo: false };
}
