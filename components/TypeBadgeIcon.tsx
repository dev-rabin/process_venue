import { ImageIcon, TypeIcon, Volume2 } from "lucide-react";
export type TaskType = "Audio" | "Text" | "Image";

const typeIconConfig: Record<
  TaskType,
  { icon: React.ReactNode; bg: string; fg: string }
> = {
  Audio: {
    icon: <Volume2 className="w-4 h-4" />,
    bg: "bg-indigo-100",
    fg: "text-indigo-600",
  },
  Text: {
    icon: <TypeIcon className="w-4 h-4" />,
    bg: "bg-emerald-100",
    fg: "text-emerald-600",
  },
  Image: {
    icon: <ImageIcon className="w-4 h-4" />,
    bg: "bg-rose-100",
    fg: "text-rose-500",
  },
};

export function TypeBadgeIcon({ type }: { type: TaskType }) {
  const cfg = typeIconConfig[type];
  return (
    <div
      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${cfg.bg} ${cfg.fg}`}
    >
      {cfg.icon}
    </div>
  );
}
