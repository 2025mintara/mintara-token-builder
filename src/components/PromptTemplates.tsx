// src/components/PromptTemplates.tsx
import { useState } from "react";
import { PROMPT_STYLES, SUBJECT_TEMPLATES, combine } from "@/prompt/presets";

type Props = { onUse: (prompt: string) => void };

export default function PromptTemplates({ onUse }: Props) {
  const [style, setStyle] = useState(PROMPT_STYLES[0]);
  const [subject, setSubject] = useState(SUBJECT_TEMPLATES[0]);

  return (
    <div className="border rounded-xl p-4 flex flex-col gap-3 bg-gray-50 shadow-sm">
      <h3 className="font-semibold text-sm text-gray-700">🎨 AI Prompt Templates</h3>

      <select
        value={style}
        onChange={(e) => setStyle(e.target.value)}
        className="border rounded p-2 text-sm"
      >
        {PROMPT_STYLES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <select
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        className="border rounded p-2 text-sm"
      >
        {SUBJECT_TEMPLATES.map((s) => (
          <option key={s}>{s}</option>
        ))}
      </select>

      <button
        onClick={() => onUse(combine(style, subject))}
        className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition text-sm"
      >
        Use This Prompt
      </button>
    </div>
  );
}
