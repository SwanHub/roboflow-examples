"use client";

import { useState } from "react";
import Header from "@/app/_components/Header";
import ImageZone from "@/app/_components/ImageZone";

export default function Home() {
  const [apiKey, setApiKey] = useState<string>("");
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [imageZoneState, setImageZoneState] = useState<
    null | "evaluating" | "success" | "fail" | "camera"
  >(null);
  const [imageUrl, setImageUrl] = useState<string>("");

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:image/jpeg;base64, prefix to get just the base64 string
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleImageUpload = async (file: File) => {
    try {
      // Check if API key is set
      if (apiKey === "") {
        setShowApiKeyModal(true);
        return;
      }

      const url = URL.createObjectURL(file);
      setImageUrl(url);
      setImageZoneState("evaluating");

      // Convert image to base64
      const base64Image = await convertToBase64(file);

      // Send to backend
      const response = await fetch("/api/classify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          apiKey: apiKey,
        }),
      });

      const result = await response.json();

      if (result.error) {
        console.error("API Error:", result.error);
        setImageZoneState("fail");
      } else {
        // Set state based on the result
        const isHotdog = result.result === "hot dog";
        setImageZoneState(isHotdog ? "success" : "fail");
      }
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
    <div className="min-h-screen bg-white">
      <Header
        apiKey={apiKey}
        onApiKeyChange={setApiKey}
        showApiKeyModal={showApiKeyModal}
        onShowApiKeyModal={setShowApiKeyModal}
      />

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
    </div>
  );
}
