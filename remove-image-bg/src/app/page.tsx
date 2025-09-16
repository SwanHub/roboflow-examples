"use client";

import { useState } from "react";
import GlobalDropzone from "@/_components/GlobalDropzone";
import ImageEditor from "@/_components/ImageEditor";
import HeroLeft from "@/_components/HeroLeft";
import ImageDropzone from "@/_components/ImageDropzone";
import ImageExamples from "@/_components/ImageExamples";

async function removeImageBackground(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const response = await fetch("/api/remove-bg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const result = await response.json();

      if (!response.ok) {
        reject(new Error(result.error || "Unknown error occurred"));
        return;
      }

      const processedImage = result.result.outputs[0].annotated_image.value;
      resolve(processedImage);
    };
  });
}

export default function Home() {
  const [droppedFile, setDroppedFile] = useState<File | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);

  const handleFileSelect = async (file: File) => {
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
    setIsProcessing(true);
    try {
      const result = await removeImageBackground(file);
      setProcessedImage(`data:image/png;base64,${result}`);
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "An error occurred while removing background"
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
    <GlobalDropzone onImageDrop={handleFileSelect}>
      <div className="min-h-screen bg-white pb-24">
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
                  <ImageDropzone onImageSelect={handleFileSelect} />
                  <ImageExamples onImageSelect={handleFileSelect} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GlobalDropzone>
  );
}
