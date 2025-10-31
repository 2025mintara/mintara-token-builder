// src/lib/hf.ts
// Hugging Face entegrasyonu (sdxl-turbo + cache + debounce)
const HF_TOKEN = import.meta.env.VITE_HF_API_KEY;
const MODEL = "stabilityai/sdxl-turbo";

const cache = new Map<string, string>();
const pending: Record<string, Promise<string>> = {};

function key(prompt: string) {
  return `${MODEL}::${prompt.trim()}`;
}

export async function generateImage(prompt: string): Promise<{ image_base64: string }> {
  const k = key(prompt);
  if (cache.has(k)) return { image_base64: cache.get(k)! };
  if (pending[k]) return { image_base64: await pending[k] };

  const exec = async () => {
    const r = await fetch(`https://api-inference.huggingface.co/models/${MODEL}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: prompt, options: { wait_for_model: true } }),
    });

    if (!r.ok) throw new Error(await r.text());
    const buf = await r.arrayBuffer();
    const b64 = `data:image/png;base64,${btoa(String.fromCharCode(...new Uint8Array(buf)))}`;
    cache.set(k, b64);
    return b64;
  };

  pending[k] = exec();
  try {
    const image_base64 = await pending[k];
    return { image_base64 };
  } finally {
    delete pending[k];
  }
}
