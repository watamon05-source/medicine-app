import { Sun, CloudSun, Moon } from "lucide-react";

// 👇 ここに書く
type Props = {
  time: "morning" | "noon" | "night";
};

export default function IconTime({ time }: Props) {
  const common = "text-gray-500";

  switch (time) {
    case "morning":
      return <Sun size={18} className={common} />;
    case "noon":
      return <CloudSun size={18} className={common} />;
    case "night":
      return <Moon size={18} className={common} />;
    default:
      return null;
  }
}
