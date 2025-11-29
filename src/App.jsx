import "./app.css";
import { useState } from "react";

export default function App() {
  const [inputValue, setInputValue] = useState("");
  const link = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputValue}`;

  const handleDownload = async () => {
    try {
      const response = await fetch(link);
      if (!response.ok) throw new Error("Failed to generate QR");

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download =
        inputValue && inputValue.length < 20
          ? `${inputValue}_qr.png`
          : "qr_code.png";
      a.click();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
    } catch (error) {
      console.error(error);
      alert("❌ Failed to download QR. Check your internet connection.");
    }
  };

  return (
    <div
      className={`App grid gap-5 w-[400px] bg-white p-6 rounded-lg shadow-lg ${
        inputValue ? "h-[420px]" : "h-[190px]"
      }`}
    >
      <h4 className="font-semibold">Enter your text or URL</h4>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        type="text"
        placeholder="Enter text or URL"
        className="border border-[#4f50ee] focus:outline-none h-[42px] p-2 rounded placeholder:text-[14px]"
      />

      <img
        className={`mx-auto w-[200px] p-2 border border-[#CBCBCB] rounded  ${
          inputValue ? "block" : "hidden"
        }`}
        src={link}
        alt=""
      />
      <button
        onClick={handleDownload}
        className={`text-center bg-[#4f4feea1] !text-white p-2 rounded hover:bg-[#3b3ddf] h-10 ${
          inputValue
            ? "bg-[#4f50ee] pointer-events-auto "
            : "bg-[#4f4feea1] pointer-events-none"
        }`}
      >
        Download
      </button>
    </div>
  );
}
