import { ImageIcon, TypeIcon, Video, Volume2 } from "lucide-react";

const typeIconConfig = {
  audio: {
    icon: <Volume2 className="w-4 h-4" />,
    bg: "bg-indigo-100",
    fg: "text-indigo-600",
  },
  text: {
    icon: <TypeIcon className="w-4 h-4" />,
    bg: "bg-emerald-100",
    fg: "text-emerald-600",
  },
  image: {
    icon: <ImageIcon className="w-4 h-4" />,
    bg: "bg-rose-100",
    fg: "text-rose-500",
  },
  video: {
    icon: <Video className="w-4 h-4" />,
    bg: "bg-amber-100",
    fg: "text-amber-600",
  },
} as const;

type TaskType = keyof typeof typeIconConfig;

export function TypeBadgeIcon({ type }: { type: string }) {
  const key = type.toLowerCase() as TaskType;

  const cfg = typeIconConfig[key] ?? {
    icon: <TypeIcon className="w-4 h-4" />,
    bg: "bg-slate-100",
    fg: "text-slate-600",
  };

  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.fg}`}
    >
      {cfg.icon}
    </div>
  );
}
