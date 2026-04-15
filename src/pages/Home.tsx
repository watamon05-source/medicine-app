import { Pill, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TodayCard from "../components/TodayCard";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw", // ← これ追加（重要）
        display: "flex",
        justifyContent: "center", // 横中央
        backgroundColor: "#fbfbfc",
      }}
    >
      {/* スマホUI全体（灰色） */}
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          minHeight: "100vh",
          backgroundColor: "#EEF2FF",
          padding: "40px 16px",
          boxSizing: "border-box",
        }}
      >
        {/* タイトル */}
        <h1
          style={{
            textAlign: "center",
            color: "#4a90e2",
            marginBottom: "40px",
            fontFamily: '"Zen Maru Gothic", sans-serif',
          }}
        >
          服薬管理
        </h1>

        {/* カード */}
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "16px",
            padding: "16px",
            marginBottom: "60px",
          }}
        >
          <TodayCard />
        </div>

        {/* ボタン */}
        <div
          style={{
            display: "flex",
            gap: "12px",
          }}
        >
          <button
            style={{
              flex: 1,
              backgroundColor: "#4caf50",
              color: "#fff",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px", // ← アイコンと文字の間
              fontWeight: "bold",
              fontFamily: '"Zen Maru Gothic", sans-serif',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.96)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => navigate("/register")}
          >
            <Pill size={18} />
            薬を登録
          </button>

          <button
            style={{
              flex: 1,
              backgroundColor: "#ffffff",
              color: "#333",
              padding: "14px",
              borderRadius: "12px",
              border: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              fontWeight: "bold",
              fontFamily: '"Zen Maru Gothic", sans-serif',
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.96)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
            onClick={() => navigate("/calendar")}
          >
            <Calendar size={18} />
            カレンダー
          </button>
        </div>
      </div>
    </div>
  );
}
