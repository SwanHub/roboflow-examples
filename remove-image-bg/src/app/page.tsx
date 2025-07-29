"use client";

import { useState } from "react";
import GlobalDropzone from "@/_components/GlobalDropzone";
import ImageEditor from "@/_components/ImageEditor";
import Header from "@/_components/Header";
import HeroLeft from "@/_components/HeroLeft";
import ImageDropzone from "@/_components/ImageDropzone";
import ImageExamples from "@/_components/ImageExamples";

export default function Home() {
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const handleImageDrop = async (file: File) => {
    if (apiKey === "") {
      setShowApiKeyModal(true);
      return;
    }
    console.log("Image dropped:", file.name);

    // 1. Check that it's a qualifying image type
    const validImageTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    if (!validImageTypes.includes(file.type)) {
      alert("Please upload a valid image file (JPEG, PNG, or WebP)");
      return;
    }

    // Set the file immediately to show ImageEditor
    setDroppedFile(file);

    // 2. Convert to base64
    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data:image/...;base64, prefix
        const base64Data = result.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    // 3. Send to backend
    setIsProcessing(true);
    try {
      const response = await fetch("/api/remove-bg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64,
          apiKey: apiKey,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove background");
      }

      const result = await response.json();
      console.log("Background removal result:", result);

      if (result.success && result.processedImage) {
        const dataUrl = `data:image/png;base64,${result.processedImage.value}`;
        setProcessedImage(dataUrl);
      } else {
        throw new Error("No processed image received from API");
      }
    } catch (error) {
      console.error("Error removing background:", error);
      alert(
        `Error removing background: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleOriginal = () => {
    setShowOriginal(!showOriginal);
  };

  const resetImage = () => {
    setProcessedImage(null);
    setDroppedFile(null);
    setShowOriginal(false);
  };

  return (
    <GlobalDropzone onImageDrop={handleImageDrop}>
      <div className="min-h-screen bg-white">
        <Header
          apiKey={apiKey}
          onApiKeyChange={setApiKey}
          showApiKeyModal={showApiKeyModal}
          onShowApiKeyModal={setShowApiKeyModal}
        />
        {droppedFile ? (
          <div className="pt-16">
            <ImageEditor
              file={droppedFile}
              processedImage={processedImage}
              isProcessing={isProcessing}
              showOriginal={showOriginal}
              onToggleOriginal={toggleOriginal}
              onReset={resetImage}
            />
          </div>
        ) : (
          <div className="container mx-auto px-4 max-w-screen-lg pt-16">
            <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 min-h-[calc(100vh-8rem)]">
              <div className="flex items-start pt-8 lg:pt-12 order-1">
                <HeroLeft />
              </div>
              <div className="flex justify-center lg:justify-end items-start lg:items-end pb-8 lg:pb-16 order-2">
                <div className="w-full max-w-md space-y-6 mt-8 lg:mt-36">
                  <ImageDropzone onImageSelect={handleImageDrop} />
                  <ImageExamples onImageSelect={handleImageDrop} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlobalDropzone>
  );
}
