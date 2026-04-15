import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Medicine } from "../features/medicine/types";
import Checkbox from "@mui/material/Checkbox";
import { Card } from "@mui/material";

export default function Calendar() {
  const navigate = useNavigate();

  const today = new Date();
  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const todayStr = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState<string | null>(todayStr);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const days: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let i = 1; i <= lastDate; i++) days.push(i);

  const changeMonth = (offset: number) => {
    const newDate = new Date(year, month + offset, 1);

    const min = new Date(minDate.getFullYear(), minDate.getMonth(), 1);
    const max = new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

    if (newDate < min || newDate > max) return;

    setCurrentDate(newDate);
  };

  // 🔥 薬データ取得
  const [medicines, setMedicines] = useState<Medicine[]>(() => {
    const raw = localStorage.getItem("medicines");
    return raw ? JSON.parse(raw) : [];
  });

  // 🔥 フィルタ
  const filtered = medicines.filter((med) => {
    if (!selectedDate) return false;

    return (
      med.startDate <= selectedDate &&
      (!med.endDate || med.endDate >= selectedDate)
    );
  });

  const [checkedMap, setCheckedMap] = useState(() => {
    return JSON.parse(localStorage.getItem("checkedMap") || "{}");
  });

  const toggleCheck = (date: string, medId: string) => {
    const newMap = {
      ...checkedMap,
      [date]: {
        ...checkedMap[date],
        [medId]: !checkedMap[date]?.[medId],
      },
    };

    setCheckedMap(newMap);
    localStorage.setItem("checkedMap", JSON.stringify(newMap));
  };

  const handleDelete = (id: string) => {
    const updated = medicines.filter((med) => med.id !== id);

    setMedicines(updated); // ← これ重要🔥
    localStorage.setItem("medicines", JSON.stringify(updated));
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f5f6fa",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "20px 12px",
          boxSizing: "border-box",
          backgroundColor: "#EEF2FF",
        }}
      >
        {/* ヘッダー */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "85px",
            marginBottom: "16px",
            backgroundColor: "#a8d5a2",
            height: "50px",
          }}
        >
          {/* 戻る */}
          <button
            onClick={() => navigate(-1)}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translateY(1px)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            onTouchStart={(e) => {
              e.currentTarget.style.transform = "translateY(1px)";
            }}
            onTouchEnd={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
            }}
            style={{
              background: "#66bb6a",
              color: "#fff",
              border: "none",
              padding: "8px 20px",
              fontSize: "14px",
              cursor: "pointer",

              // ← これがポイント
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 50%, 100% 100%, 10px 100%, 0% 50%)",

              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            戻る
          </button>
          <h2
            style={{
              margin: -20,
              fontFamily: '"Zen Maru Gothic", sans-serif',
              color: "#FFFF",
              fontSize: "30px",
            }}
          >
            カレンダー
          </h2>
        </div>

        {/* 月移動 */}
        <div style={{ textAlign: "center", marginBottom: "16px" }}>
          <button onClick={() => changeMonth(-1)}>◀</button>
          <span style={{ margin: "0 12px" }}>
            {year}年 {month + 1}月
          </span>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>

        {/* 曜日 */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            textAlign: "center",
          }}
        >
          {["日", "月", "火", "水", "木", "金", "土"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        {/* カレンダー */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "6px",
          }}
        >
          {days.map((day, index) => {
            const dateStr =
              day &&
              `${year}-${String(month + 1).padStart(2, "0")}-${String(
                day,
              ).padStart(2, "0")}`;

            const isSelected = selectedDate === dateStr;

            return (
              <div
                key={index}
                onClick={() => {
                  if (!day) return;
                  const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                  setSelectedDate(dateStr);
                }}
                style={{
                  height: "60px",
                  borderRadius: "10px",
                  backgroundColor: isSelected ? "#90caf9" : "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                {day}
              </div>
            );
          })}
        </div>

        {/* 🔥 下に薬表示 */}
        {selectedDate && (
          <Card
            style={{
              marginTop: "24px",
              fontFamily: '"Zen Maru Gothic", sans-serif',
            }}
            sx={{
              borderRadius: 3,
              p: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            <h3>{selectedDate} の服薬</h3>

            {filtered.length === 0 ? (
              <p>なし</p>
            ) : (
              <>
                {(
                  [
                    { key: "morning", label: "☀️ 朝" },
                    { key: "noon", label: "🍱 昼" },
                    { key: "night", label: "🌙 夜" },
                    { key: "beforeSleep", label: "🛌 寝る前" },
                  ] as const
                ).map((section) => {
                  const meds = filtered.filter(
                    (med) => med.timing.timeOfDay[section.key],
                  );

                  return (
                    <div key={section.key} style={{ marginBottom: "12px" }}>
                      {/* ラベル */}
                      <span style={{ fontWeight: "bold" }}>
                        {section.label}：
                      </span>

                      {/* 中身 */}
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "12px",
                          marginTop: "4px",
                        }}
                      >
                        {meds.length === 0 ? (
                          <span style={{ color: "#999" }}>なし</span>
                        ) : (
                          meds.map((med) => {
                            const meal = med.timing.mealTiming;

                            const mealText = [
                              meal.beforeMeal && "食前",
                              meal.afterMeal && "食後",
                              meal.betweenMeal && "食間",
                            ]
                              .filter(Boolean)
                              .join("");

                            // 🔥 ここが重要（時間帯ごとに分ける）
                            const checkKey = `${med.id}_${section.key}`;

                            const isChecked =
                              checkedMap[selectedDate]?.[checkKey] || false;

                            return (
                              <label
                                key={checkKey}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "4px",
                                  opacity: isChecked ? 0.5 : 1,
                                }}
                              >
                                <Checkbox
                                  checked={isChecked}
                                  onChange={() =>
                                    toggleCheck(selectedDate, checkKey)
                                  }
                                  sx={{
                                    color: "#9CA3AF",
                                    "&.Mui-checked": {
                                      color: "#4F46E5",
                                    },
                                  }}
                                />
                                <span>
                                  {med.name}
                                  {mealText && `(${mealText})`}
                                </span>
                                <button
                                  onClick={() => {
                                    if (window.confirm("削除しますか？")) {
                                      handleDelete(med.id);
                                    }
                                  }}
                                  style={{
                                    marginLeft: "6px",
                                    color: "#DC2626",
                                    border: "none",
                                    background: "transparent",
                                    cursor: "pointer",
                                  }}
                                >
                                  🗑
                                </button>
                              </label>
                            );
                          })
                        )}
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </Card>
        )}
      </div>
    </div>
  );
}
