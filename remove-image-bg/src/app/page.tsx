"use client";

import { useState } from "react";
import GlobalDropzone from "@/_components/GlobalDropzone";
import ImageEditor from "@/_components/ImageEditor";
import HeroLeft from "@/_components/HeroLeft";
import ImageDropzone from "@/_components/ImageDropzone";
import ImageExamples from "@/_components/ImageExamples";

export default function Home() {
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const handleImageDrop = async (file: File) => {
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

    setDroppedFile(file);

    const base64 = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const base64Data = result.split(",")[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

    setIsProcessing(true);
    try {
      const response = await fetch("/api/remove-bg", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to remove background");
      }

      const result = await response.json();

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
