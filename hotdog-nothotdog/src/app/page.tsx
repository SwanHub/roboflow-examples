"use client";

import { useState } from "react";
import ImageZone from "@/app/ImageZone";

async function classifyHotdog(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const result = await response.json();

      if (!response.ok) {
        reject(new Error(result.error || "Unknown error occurred"));
        return;
      }

      const mostSimilarClass =
        result.result.outputs[0].clip_comparison.most_similar_class;
      resolve(mostSimilarClass);
    };
    reader.onerror = () => reject(new Error("Failed to read file"));
  });
}

export default function Home() {
  const [imageZoneState, setImageZoneState] = useState<
    null | "evaluating" | "success" | "fail" | "camera"
  >(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleImageUpload = async (file: File) => {
    try {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setImageZoneState("evaluating");
      const classification = await classifyHotdog(file);
      const isHotdog = classification === "hot dog";
      setImageZoneState(isHotdog ? "success" : "fail");
    } catch (error) {
      console.error("Error processing image:", error);
      setImageZoneState("fail");
    }
  };

  const resetToNull = () => {
    setImageZoneState(null);
    setImageUrl("");
  };

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 mt-12">
        <div className="flex flex-col items-center space-y-6">
          <ImageZone
            state={imageZoneState}
            imageUrl={imageUrl}
            onImageUpload={handleImageUpload}
            onReset={resetToNull}
            onCameraClick={() => setImageZoneState("camera")}
          />
        </div>
      </div>
    </main>
  );
}
