"use client";

import { useState } from "react";

async function detectFaces(
  file: File
): Promise<{ annotatedImage: string; count: number }> {
  const reader = new FileReader();
  return new Promise((resolve) => {
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      const response = await fetch("/api/detect-faces", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: base64 }),
      });
      const result = await response.json();
      const annotatedImage = result.result.outputs[0].annotated_image.value;
      const count = result.result.outputs[0].count;
      resolve({ annotatedImage, count });
    };
  });
}

export default function Home() {
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState<number | null>(null);

  const handleFileSelect = async (file: File) => {
    setInputImage(URL.createObjectURL(file));
    setIsLoading(true);
    const result = await detectFaces(file);
    setResultImage(result.annotatedImage);
    setCount(result.count);
    setIsLoading(false);
  };

  const reset = () => {
    setInputImage(null);
    setResultImage(null);
    setIsLoading(false);
    setCount(null);
  };

  return (
    <main className="flex flex-col items-center justify-start h-screen py-24">
      <h1 className="text-3xl font-bold mb-4">Detect Faces</h1>
      <p className="text-sm text-gray-500 mb-12">
        Detect and count faces in an image using Roboflow.
      </p>
      <div className="flex flex-row items-center gap-4 md:gap-8">
        <ImagePanel
          title="Input Image"
          image={inputImage}
          onFileSelect={handleFileSelect}
          dim={isLoading ? true : resultImage ? true : false}
        />
        <span className="text-xl md:text-4xl">→</span>
        <ImagePanel
          title={
            resultImage && count !== null
              ? `${count} face${count !== 1 ? "s" : ""} detected`
              : "Result"
          }
          image={resultImage}
          isLoading={isLoading}
          dim={isLoading ? false : resultImage ? false : true}
        />
      </div>
      {resultImage && (
        <button
          onClick={reset}
          className="mt-12 px-4 py-2 bg-amber-100 rounded cursor-pointer hover:bg-amber-200"
        >
          Reset
        </button>
      )}
    </main>
  );
}

interface ImagePanelProps {
  title: string;
  image?: string | null;
  isLoading?: boolean;
  onFileSelect?: (file: File) => void;
  dim?: boolean;
}

function ImagePanel({
  title,
  image,
  isLoading,
  onFileSelect,
  dim,
}: ImagePanelProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onFileSelect) onFileSelect(file);
  };

  return (
    <div
      className={`flex flex-col items-center space-y-4 ${
        dim ? "opacity-50" : ""
      }`}
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg w-48 md:w-80 h-48 md:h-80 flex items-center justify-center">
        {isLoading ? (
          <span className="text-gray-500">Analyzing...</span>
        ) : image ? (
          <img
            src={
              image.startsWith("data:") || image.startsWith("blob:")
                ? image
                : `data:image/jpeg;base64,${image}`
            }
            alt={title}
            className="max-w-full max-h-full object-contain"
          />
        ) : onFileSelect ? (
          <label className="cursor-pointer px-4 py-2 bg-violet-100 rounded text-violet-600 hover:bg-violet-200">
            Select Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        ) : (
          <span className="text-gray-400">No result</span>
        )}
      </div>
    </div>
  );
}
