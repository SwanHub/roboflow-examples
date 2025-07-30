"use client";

import { Minus, Plus, RotateCcw, SquareSplitHorizontal } from "lucide-react";
import React, { useState, useRef } from "react";

interface ImageEditorProps {
  file: File;
  processedImage?: string | null;
  isProcessing?: boolean;
  showOriginal?: boolean;
  onReset?: () => void;
  onToggleOriginal?: () => void;
}

export default function ImageEditor({
  file,
  processedImage,
  isProcessing = false,
  showOriginal = false,
  onToggleOriginal,
  onReset,
}: ImageEditorProps) {
  const [imageUrl, setImageUrl] = useState<string>(
    () => processedImage || URL.createObjectURL(file)
  );
  const [zoom, setZoom] = useState(1);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `processed-${file.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  React.useEffect(() => {
    if (showOriginal) {
      setImageUrl(URL.createObjectURL(file));
    } else if (processedImage) {
      setImageUrl(processedImage);
    } else {
      setImageUrl(URL.createObjectURL(file));
    }
  }, [processedImage, showOriginal, file]);

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.1, 3));
  };

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.1, 1));
  };

  return (
    <div className="min-h-screen bg-white flex items-start justify-center p-4 sm:p-8">
      <div className="max-w-6xl w-full space-y-6 sm:space-y-8">
        <div className="flex flex-col justify-start items-start w-full">
          <div
            ref={imageContainerRef}
            className={`w-full rounded-2xl max-w-2xl ${
              zoom > 1
                ? "overflow-auto max-h-[60vh] sm:max-h-[70vh]"
                : "overflow-hidden max-h-[60vh] sm:max-h-[70vh]"
            }`}
          >
            {isProcessing ? (
              <Skeleton />
            ) : (
              <img
                src={imageUrl}
                alt="Uploaded image"
                className="w-full h-auto object-contain select-none rounded-2xl"
                style={{
                  transform: `scale(${zoom})`,
                  transformOrigin: "center",
                  minWidth: zoom > 1 ? "100%" : "auto",
                  minHeight: zoom > 1 ? "100%" : "auto",
                }}
              />
            )}
          </div>

          <div className="w-full max-w-2xl mt-4">
            <Controls
              handleZoomOut={handleZoomOut}
              handleZoomIn={handleZoomIn}
              isProcessing={isProcessing}
              zoom={zoom}
              handleDownload={handleDownload}
              onToggleOriginal={onToggleOriginal}
              onReset={onReset}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ControlsProps {
  handleZoomOut: () => void;
  handleZoomIn: () => void;
  onToggleOriginal?: () => void;
  isProcessing: boolean;
  zoom: number;
  handleDownload: () => void;
  onReset?: () => void;
}

const Controls = ({
  handleZoomOut,
  handleZoomIn,
  onToggleOriginal,
  isProcessing,
  zoom,
  handleDownload,
  onReset,
}: ControlsProps) => {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-4 w-full justify-center sm:justify-end">
      <button
        onClick={handleZoomOut}
        className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={isProcessing || zoom <= 1}
      >
        <Minus size={16} className="sm:w-5 sm:h-5" />
      </button>

      <button
        onClick={handleZoomIn}
        className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        disabled={isProcessing || zoom >= 3}
      >
        <Plus size={16} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={onToggleOriginal}
        className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
        disabled={isProcessing}
      >
        <SquareSplitHorizontal size={16} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={onReset}
        className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed`}
        disabled={isProcessing}
      >
        <RotateCcw size={16} className="sm:w-5 sm:h-5" />
      </button>
      <button
        onClick={handleDownload}
        disabled={isProcessing}
        className={`px-4 sm:px-8 py-2 sm:py-3 font-semibold rounded-full transition-colors cursor-pointer text-sm sm:text-base ${
          isProcessing
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-violet-600 hover:bg-violet-700 text-white"
        }`}
      >
        {isProcessing ? "Loading..." : "Download"}
      </button>
    </div>
  );
};

const Skeleton = () => {
  return (
    <div className="w-full h-96 bg-gray-600 rounded-2xl flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
                      linear-gradient(45deg, #666 25%, transparent 25%), 
                      linear-gradient(-45deg, #666 25%, transparent 25%), 
                      linear-gradient(45deg, transparent 75%, #666 75%), 
                      linear-gradient(-45deg, transparent 75%, #666 75%)
                    `,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 0 10px, 10px -10px, -10px 0px",
          }}
        />
      </div>

      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-400 animate-pulse duration-75"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              fontSize: `${Math.random() * 12 + 8}px`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`,
            }}
          >
            ★
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 relative z-10 bg-black/20 px-4 py-1 rounded-full">
        <p className="text-lg text-white">Removing background...</p>
      </div>
    </div>
  );
};
