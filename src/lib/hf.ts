// src/lib/hf.ts
// ✅ Hugging Face entegrasyonu - AI NFT Builder için

export async function generateImage(prompt: string) {
  const HF_API_KEY = import.meta.env.VITE_HF_API_KEY;
  const MODEL = import.meta.env.VITE_HF_MODEL || "stabilityai/sdxl-turbo";

  if (!HF_API_KEY) {
    throw new Error("⚠️ Missing VITE_HF_API_KEY in environment variables.");
  }

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${MODEL}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt }),
    }
  );

  if (!response.ok) {
    throw new Error(`❌ Hugging Face request failed: ${response.statusText}`);
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
