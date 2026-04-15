import { useState } from "react";
import type { Medicine } from "../features/medicine/types";
import { Card } from "@mui/material";

export default function TodayCard() {
  const today = new Date();

  const todayStr = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const medicines: Medicine[] = JSON.parse(
    localStorage.getItem("medicines") || "[]",
  );

  const todayMedicines = medicines.filter((med) => {
    return (
      med.startDate <= todayStr && (!med.endDate || med.endDate >= todayStr)
    );
  });

  const [checkedMap] = useState(() => {
    return JSON.parse(localStorage.getItem("checkedMap") || "{}");
  });

  const timeSections = [
    { key: "morning", label: "☀️ 朝" },
    { key: "noon", label: "🍱 昼" },
    { key: "night", label: "🌙 夜" },
    { key: "beforeSleep", label: "🛌 寝る前" },
  ] as const;

  const now = new Date().getHours();

  const getCurrentSection = () => {
    if (now >= 5 && now < 10) return "morning";
    if (now >= 10 && now < 15) return "noon";
    if (now >= 15 && now < 21) return "night";
    return "beforeSleep";
  };

  const current = getCurrentSection();

  return (
    <div
      style={{
        marginTop: "24px",
        padding: "0 16px",
      }}
    >
      {/* カード */}
      <Card
        sx={{
          borderRadius: 3,
          p: 2.5,
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        }}
      >
        {/* タイトル */}
        <h2
          style={{
            fontSize: "18px",
            fontWeight: 600,
            marginBottom: "12px",
            fontFamily: '"Zen Maru Gothic", sans-serif',
          }}
        >
          今日の服薬
        </h2>

        {/* 各時間帯 */}
        {timeSections.map((section) => {
          const meds = todayMedicines.filter(
            (med) => med.timing.timeOfDay[section.key],
          );

          const totalMed = meds.length;

          const checkedCount = meds.filter((med) => {
            const key = `${med.id}_${section.key}`;
            return checkedMap[todayStr]?.[key];
          }).length;

          let status = "";

          if (totalMed === 0) {
            status = "なし";
          } else if (checkedCount === totalMed) {
            status = "✔ 完了";
          } else {
            status = "未完了";
          }

          return (
            <div
              key={section.key}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                opacity: totalMed === 0 ? 0.5 : 1,
                background: section.key === current ? "#EEF2FF" : "transparent",
                borderRadius: "8px",
                padding: "10px",
                fontFamily: '"Zen Maru Gothic", sans-serif',
              }}
            >
              {/* 左：時間帯 */}
              <span style={{ fontSize: "16px" }}>{section.label}</span>

              {/* 右：状態 */}
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "4px 8px",
                  borderRadius: "999px",
                  background:
                    status === "✔ 完了"
                      ? "#DCFCE7"
                      : status === "未完了"
                        ? "#FEE2E2"
                        : "#F3F4F6",
                  color:
                    status === "✔ 完了"
                      ? "#166534"
                      : status === "未完了"
                        ? "#991B1B"
                        : "#6B7280",
                }}
              >
                {status}
              </span>
            </div>
          );
        })}
      </Card>
    </div>
  );
}
