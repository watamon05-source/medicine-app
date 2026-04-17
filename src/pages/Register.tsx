import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box } from "@mui/material";
import { COLORS } from "../styles/colors";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  type TimeOfDayKey = "morning" | "noon" | "night" | "beforeSleep";

  type MealTimingKey = "beforeMeal" | "afterMeal" | "betweenMeal";

  const leftItems: { key: TimeOfDayKey; label: string }[] = [
    { key: "morning", label: "朝" },
    { key: "noon", label: "昼" },
    { key: "night", label: "晩" },
    { key: "beforeSleep", label: "寝る前" },
  ];

  const rightItems: { key: MealTimingKey; label: string }[] = [
    { key: "beforeMeal", label: "食前" },
    { key: "afterMeal", label: "食後" },
    { key: "betweenMeal", label: "食間" },
  ];

  const [timing, setTiming] = useState({
    timeOfDay: {
      morning: false,
      noon: false,
      night: false,
      beforeSleep: false,
    },
    mealTiming: {
      beforeMeal: false,
      afterMeal: false,
      betweenMeal: false,
    },
  });

  const handleSubmit = () => {
    if (!name) {
      alert("薬の名前を入力してください");
      return;
    }

    if (!startDate) {
      alert("開始日を入力してください");
      return;
    }

    if (!endDate) {
      alert("終了日を入力してください");
      return;
    }

    const newMedicine = {
      id: Date.now().toString(),
      name,
      startDate,
      endDate,
      timing,
    };

    const list = JSON.parse(localStorage.getItem("medicines") || "[]");
    list.push(newMedicine);
    localStorage.setItem("medicines", JSON.stringify(list));

    navigate("/");
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#f7f8fc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          padding: "20px 12px",
          boxSizing: "border-box",
          backgroundColor: COLORS.background,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "75px", // ← これが距離
            marginBottom: "16px",
            bgcolor: COLORS.headerLabel,
            width: "100%", // ← これ必須
            height: "60px", // ← これで高さ固定
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
              background: COLORS.backButton,
              border: "none",
              padding: "8px 20px",
              fontSize: "14px",
              cursor: "pointer",
              color: COLORS.backButtonChar,

              // ← これがポイント
              clipPath:
                "polygon(10px 0%, 100% 0%, calc(100% - 10px) 50%, 100% 100%, 10px 100%, 0% 50%)",

              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            戻る
          </button>
          {/* タイトル */}
          <h2
            style={{
              margin: -5,
              fontSize: "30px",
              fontWeight: "600",
              color: COLORS.backButtonChar,
              fontFamily: '"Zen Maru Gothic", sans-serif',
            }}
          >
            薬を登録
          </h2>
        </Box>

        {/* カード */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "16px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Card
            sx={{
              borderRadius: 3,
              p: 2,
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          >
            {/* 名前 */}
            <TextField
              placeholder="薬の名前"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "95%",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "8px",
                border: "1px solid #6464e7",
              }}
              sx={{
                mt: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "10px",
                },
              }}
              variant="outlined"
            />

            {/* 日付 */}
            <div style={{ marginBottom: "12px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      color: "#4a90e2",
                      fontSize: "20px",
                      fontFamily: '"Zen Maru Gothic", sans-serif',
                    }}
                  >
                    開始日
                  </label>
                  <DatePicker
                    format="YYYY/MM/DD"
                    value={startDate ? dayjs(startDate) : null}
                    onChange={(newValue) =>
                      setStartDate(
                        newValue ? newValue.format("YYYY-MM-DD") : "",
                      )
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            minHeight: "40px",
                            borderRadius: "12px",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "6px 10px",
                            backgroundColor: "#f9fafb",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                            borderColor: "#4a90e2",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </LocalizationProvider>
            </div>

            <div style={{ marginBottom: "12px" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <div style={{ marginBottom: "12px" }}>
                  <label
                    style={{
                      color: "#4a90e2",
                      fontSize: "20px",
                      fontFamily: '"Zen Maru Gothic", sans-serif',
                    }}
                  >
                    終了日
                  </label>
                  <DatePicker
                    format="YYYY/MM/DD"
                    value={endDate ? dayjs(endDate) : null}
                    onChange={(newValue) =>
                      setEndDate(newValue ? newValue.format("YYYY-MM-DD") : "")
                    }
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        size: "small",
                        sx: {
                          "& .MuiOutlinedInput-root": {
                            minHeight: "40px",
                            borderRadius: "12px",
                          },
                          "& .MuiOutlinedInput-input": {
                            padding: "6px 10px",
                            backgroundColor: "#f9fafb",
                          },
                          "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                            borderColor: "#4a90e2",
                          },
                        },
                      },
                    }}
                  />
                </div>
              </LocalizationProvider>
            </div>
            <div
              style={{
                height: "1px",
                backgroundColor: "#4a90e2",
                margin: "32px 0 16px",
                width: "100%",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />

            {/* タイミング */}
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "25px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* 左グループ */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center", // ← 中央寄せ
                  }}
                >
                  {leftItems.map((item) => (
                    <div
                      key={item.key}
                      onClick={() =>
                        setTiming({
                          ...timing,
                          timeOfDay: {
                            ...timing.timeOfDay,
                            [item.key]: !timing.timeOfDay[item.key],
                          },
                        })
                      }
                      style={{
                        marginBottom: "12px",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          position: "relative",
                          padding: "4px 10px",
                          display: "inline-block",
                          fontSize: "20px",
                          fontFamily: '"Zen Maru Gothic", sans-serif',
                          textDecoration: "underline",
                          textDecorationThickness: "2px",
                          textUnderlineOffset: "4px",
                          color: "#6464e7",
                        }}
                      >
                        {item.label}

                        {timing.timeOfDay[item.key] && (
                          <span
                            style={{
                              position: "absolute",
                              top: "-4px",
                              bottom: "-4px",
                              left: "-4px",
                              right: "-4px",
                              border: "2px solid #ff4d4f",
                              borderRadius: "50% / 60%",
                              //transform: "rotate(-6deg) scaleX(0.95)",
                              pointerEvents: "none",
                            }}
                          />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
                {/* 右グループ */}
                <div
                  style={{
                    display: "flex",
                    gap: " 10px",
                    flexWrap: "wrap",
                    marginTop: "0px",
                  }}
                >
                  {rightItems.map((item) => (
                    <div
                      key={item.key}
                      onClick={() =>
                        setTiming({
                          ...timing,
                          mealTiming: {
                            ...timing.mealTiming,
                            [item.key]: !timing.mealTiming[item.key],
                          },
                        })
                      }
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          position: "relative",
                          padding: "4px 8px",
                          display: "inline-block",
                          fontSize: "20px",
                          fontFamily: '"Zen Maru Gothic", sans-serif',
                          color: "#6464e7",
                        }}
                      >
                        {item.label}

                        {timing.mealTiming[item.key] && (
                          <span
                            style={{
                              position: "absolute",

                              // ← ここ調整がキモ
                              top: "-4px",
                              bottom: "-4px",
                              left: "-4px",
                              right: "-4px",

                              border: "2px solid #ff4d4f",
                              borderRadius: "50% / 60%", // ← 縦長にする！
                              transform: "rotate(-8deg)",
                              pointerEvents: "none",
                            }}
                          />
                        )}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "60px",
                display: "flex",
                justifyContent: "flex-end", // ← 右寄せ
              }}
            >
              <button
                onClick={handleSubmit}
                style={{
                  width: "30%",
                  backgroundColor: "#66bb6a",
                  color: "#fff",
                  padding: "13px",
                  borderRadius: "12px",
                  border: "none",
                  fontWeight: "bold",
                  fontSize: "15px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
              >
                登録
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
