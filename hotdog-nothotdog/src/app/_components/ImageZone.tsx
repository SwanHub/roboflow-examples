"use client";

import { SVSpinner } from "@/components/Spinner";
import Link from "next/link";
import { useState, useRef, useCallback, useEffect } from "react";

type ImageZoneState = null | "evaluating" | "success" | "fail" | "camera";

interface ImageZoneProps {
  state: ImageZoneState;
  imageUrl?: string;
  onImageUpload?: (file: File) => void;
  onReset?: () => void;
  onCameraClick?: () => void;
}

export default function ImageZone({
  state,
  imageUrl,
  onImageUpload,
  onReset,
  onCameraClick,
}: ImageZoneProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload?.(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload?.(e.target.files[0]);
    }
  };

  const handleCameraClick = () => {
    onCameraClick?.();
  };

  // Phone dimensions - approximately 9:16 aspect ratio
  const phoneStyle = {
    width: "375px",
    height: "667px",
    maxWidth: "100vw",
    maxHeight: "100vh",
  };

  const renderState = () => {
    switch (state) {
      case null:
        return (
          <Overlay_Empty
            handleCameraClick={handleCameraClick}
            handleFileInput={handleFileInput}
          />
        );
      case "evaluating":
        return <Overlay_Evaluating imageUrl={imageUrl} />;
      case "success":
        return <Overlay_Success imageUrl={imageUrl} onReset={onReset} />;
      case "fail":
        return <Overlay_Fail imageUrl={imageUrl} onReset={onReset} />;
      case "camera":
        return (
          <Overlay_Camera onImageUpload={onImageUpload} onReset={onReset} />
        );
      default:
        return (
          <Overlay_Empty
            handleCameraClick={handleCameraClick}
            handleFileInput={handleFileInput}
          />
        );
    }
  };

  return (
    <div
      style={phoneStyle}
      className={`mx-auto border-8 border-gray-800 rounded-4xl shadow-2xl ${
        dragActive ? "border-blue-400" : ""
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      {renderState()}
    </div>
  );
}

const Overlay_Empty = ({
  handleCameraClick,
  handleFileInput,
}: {
  handleCameraClick: () => void;
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="relative h-full rounded-3xl overflow-hidden flex flex-col items-center justify-center bg-black">
    {/* Layer 1: Background Image */}
    <img
      src="examples/hotdog.jpg"
      alt="Background"
      className="absolute inset-0 w-full h-full object-cover opacity-20"
      style={{ zIndex: 1 }}
    />

    {/* Layer 2: Header Banner */}
    <div
      className="absolute top-0 left-0 right-0 bg-red-500 text-white text-center py-12 border-b-4 border-white"
      style={{ zIndex: 10 }}
    ></div>

    {/* Layer 3: Header Text */}
    <div
      className="absolute top-0 left-0 right-0 text-white text-center py-6"
      style={{ zIndex: 20 }}
    >
      <h2
        className="text-5xl font-black tracking-wider mb-4"
        style={{
          textShadow: `
            -3px -3px 0 #000,
            3px -3px 0 #000,
            -3px 3px 0 #000,
            3px 3px 0 #000
          `,
          fontFamily: 'Impact, "Arial Black", sans-serif',
        }}
      >
        SeeFood
      </h2>
      <p className="text-lg bg-white text-black font-impact">
        Inspired by{" "}
        <Link
          href={"https://youtu.be/ACmydtFDTGs?si=xqB-lJpZoiITWziJ"}
          target="_blank"
          className="underline text-blue-600"
        >
          Not Hotdog
        </Link>{" "}
        🌭
      </p>
    </div>

    {/* Layer 4: Buttons */}
    <div className="text-center space-y-6 w-full px-4" style={{ zIndex: 30 }}>
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => document.getElementById("file-input")?.click()}
          className="text-3xl px-6 py-3 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 transition-colors font-black tracking-wider border-2 border-black"
          style={{
            textShadow: `
               -2px -2px 0 #000,
               2px -2px 0 #000,
               -2px 2px 0 #000,
               2px 2px 0 #000
             `,
            fontFamily: 'Impact, "Arial Black", sans-serif',
          }}
        >
          Select Photo
        </button>
        <button
          onClick={handleCameraClick}
          className="text-3xl px-6 py-3 cursor-pointer bg-green-500 text-white hover:bg-green-600 transition-colors font-black tracking-wider border-2 border-black"
          style={{
            textShadow: `
               -2px -2px 0 #000,
               2px -2px 0 #000,
               -2px 2px 0 #000,
               2px 2px 0 #000
             `,
            fontFamily: 'Impact, "Arial Black", sans-serif',
          }}
        >
          Take Picture
        </button>
      </div>
    </div>
    <input
      id="file-input"
      type="file"
      accept="image/*"
      onChange={handleFileInput}
      className="hidden"
    />
  </div>
);

const Overlay_Success = ({
  imageUrl,
  onReset,
}: {
  imageUrl?: string;
  onReset?: () => void;
}) => (
  <div className="relative h-full rounded-3xl overflow-hidden">
    <img
      src={imageUrl || "examples/dogs.jpg"}
      alt="Uploaded image"
      className="w-full h-full object-cover"
    />
    {/* Layer 1: White base circle (largest, creates border effect) */}
    <div className="absolute top-11 left-1/2 transform -translate-x-1/2">
      <div className="w-34 h-34 bg-white rounded-full"></div>
    </div>

    {/* Layer 2: Green banner with bottom border */}
    <div className="absolute top-0 left-0 right-0 bg-green-500 text-white text-center py-12 border-b-4 border-white"></div>

    {/* Layer 3: Green checkmark circle (smaller than white circle) */}
    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-10">
      <div className="w-32 h-32 bg-green-500 rounded-full flex items-center justify-center">
        <svg
          className="w-32 h-32 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{
            filter:
              "drop-shadow(2px 2px 0 #000) drop-shadow(-2px 2px 0 #000) drop-shadow(2px -2px 0 #000) drop-shadow(-2px -2px 0 #000)",
          }}
        >
          <path
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </div>

    {/* Layer 4: Hotdog title text */}
    <div className="absolute top-0 left-0 right-0 text-white text-center py-6 z-20">
      <h2
        className="text-5xl font-black tracking-wider"
        style={{
          textShadow: `
            -3px -3px 0 #000,
            3px -3px 0 #000,
            -3px 3px 0 #000,
            3px 3px 0 #000
          `,
          fontFamily: 'Impact, "Arial Black", sans-serif',
        }}
      >
        Hotdog
      </h2>
    </div>
    {/* Layer 5: "Again" button */}
    <div className="absolute bottom-0 left-0 right-0 text-center py-6 z-20">
      <button
        onClick={onReset}
        className="text-3xl px-6 py-3 cursor-pointer bg-cyan-500 text-white hover:bg-cyan-600 transition-colors font-black tracking-wider border-2 border-black"
        style={{
          textShadow: `
               -2px -2px 0 #000,
               2px -2px 0 #000,
               -2px 2px 0 #000,
               2px 2px 0 #000
             `,
          fontFamily: 'Impact, "Arial Black", sans-serif',
        }}
      >
        Again
      </button>
    </div>
  </div>
);

const Overlay_Fail = ({
  imageUrl,
  onReset,
}: {
  imageUrl?: string;
  onReset?: () => void;
}) => (
  <div className="relative h-full rounded-3xl overflow-hidden">
    <img
      src={imageUrl || "examples/dogs.jpg"}
      alt="Uploaded image"
      className="w-full h-full object-cover"
    />
    {/* Layer 1: White base circle (largest, creates border effect) */}
    <div className="absolute bottom-11 left-1/2 transform -translate-x-1/2">
      <div className="w-34 h-34 bg-white rounded-full"></div>
    </div>

    {/* Layer 2: Red banner with top border */}
    <div className="absolute bottom-0 left-0 right-0 bg-red-500 text-white text-center py-12 border-t-4 border-white"></div>

    {/* Layer 3: Red X circle (smaller than white circle) */}
    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-10">
      <div className="w-32 h-32 bg-red-500 rounded-full flex items-center justify-center">
        <svg
          className="w-32 h-32 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          style={{
            filter:
              "drop-shadow(2px 2px 0 #000) drop-shadow(-2px 2px 0 #000) drop-shadow(2px -2px 0 #000) drop-shadow(-2px -2px 0 #000)",
          }}
        >
          <path
            strokeLinecap="butt"
            strokeLinejoin="miter"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>

    {/* Layer 4: Not hotdog title text */}
    <div className="absolute bottom-0 left-0 right-0 text-white text-center py-6 z-20">
      <h2
        className="text-5xl font-black tracking-wider"
        style={{
          textShadow: `
            -3px -3px 0 #000,
            3px -3px 0 #000,
            -3px 3px 0 #000,
            3px 3px 0 #000
          `,
          fontFamily: 'Impact, "Arial Black", sans-serif',
        }}
      >
        Not hotdog
      </h2>
    </div>
    {/* Layer 5: "Again" button */}
    <div className="absolute top-0 left-0 right-0 text-center py-6 z-20">
      <button
        onClick={onReset}
        className="text-3xl px-6 py-3 cursor-pointer bg-cyan-500 text-white hover:bg-cyan-600 transition-colors font-black tracking-wider border-2 border-black"
        style={{
          textShadow: `
               -2px -2px 0 #000,
               2px -2px 0 #000,
               -2px 2px 0 #000,
               2px 2px 0 #000
             `,
          fontFamily: 'Impact, "Arial Black", sans-serif',
        }}
      >
        Again
      </button>
    </div>
  </div>
);

const Overlay_Evaluating = ({ imageUrl }: { imageUrl?: string }) => (
  <div className="relative h-full rounded-3xl overflow-hidden bg-black">
    <img
      src={imageUrl || "examples/dogs.jpg"}
      alt="Uploaded image"
      className="w-full h-full object-cover opacity-30"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center">
      {/* Custom Silicon Valley spinner */}
      <div className="mb-8">
        <SVSpinner />
      </div>
      <div
        className="text-white text-5xl font-black tracking-wider"
        style={{
          textShadow: `
          -3px -3px 0 #000,
          3px -3px 0 #000,
          -3px 3px 0 #000,
          3px 3px 0 #000
        `,
          fontFamily: 'Impact, "Arial Black", sans-serif',
        }}
      >
        Evaluating...
      </div>
    </div>
  </div>
);

const Overlay_Camera = ({
  onImageUpload,
  onReset,
}: {
  onImageUpload?: (file: File) => void;
  onReset?: () => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setIsCameraActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const startCamera = useCallback(async () => {
    try {
      // Check browser support
      if (!navigator.mediaDevices?.getUserMedia) {
        throw new Error(
          "Camera access is not supported in your browser. Try using Chrome or Safari."
        );
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 375 },
          height: { ideal: 667 },
          facingMode: "environment", // Use back camera on mobile
        },
      });

      if (videoRef.current) {
        console.log("Setting video stream...");
        videoRef.current.srcObject = stream;

        // Wait for video to be ready
        await videoRef.current.play();
        console.log("Video started playing");

        setIsCameraActive(true);
        setIsLoading(false);
        setError(null);
      }
    } catch (err) {
      const errorMessage = "Unable to start camera";
      setError(errorMessage);
      setIsLoading(false);
      console.error("Camera error:", err);
    }
  }, []);

  const capture = useCallback(() => {
    if (videoRef.current && canvasRef.current && onImageUpload) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "camera-photo.jpg", {
              type: "image/jpeg",
            });
            onImageUpload(file);
          }
        }, "image/jpeg");
      }
    }
  }, [onImageUpload]);

  const handleBack = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
    }
    onReset?.();
  }, [onReset]);

  // Start camera when component mounts
  useEffect(() => {
    startCamera();
  }, [startCamera]);

  return (
    <div className="relative h-full rounded-3xl overflow-hidden bg-black">
      {/* Always render video element, but show error overlay if needed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover"
      />

      {/* Loading overlay */}
      {isLoading && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-75 z-10">
          <div className="text-white text-center p-6">
            <p className="text-xl font-white tracking-wider">
              Starting camera...
            </p>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="absolute bottom-0 left-0 right-0 text-center py-6 z-20 bg-black">
        <button
          onClick={capture}
          className="p-8 cursor-pointer bg-white rounded-full transition-colors border-2 border-gray-800"
          style={{
            textShadow: `
               -2px -2px 0 #000,
               2px -2px 0 #000,
               -2px 2px 0 #000,
               2px 2px 0 #000
             `,
            fontFamily: 'Impact, "Arial Black", sans-serif',
          }}
        />
      </div>

      <div className="absolute top-0 left-0 right-0 text-center py-6 z-20">
        <button
          onClick={handleBack}
          className="text-3xl px-6 py-3 cursor-pointer bg-cyan-500 text-white hover:bg-cyan-600 transition-colors font-black tracking-wider border-2 border-black"
          style={{
            textShadow: `
               -2px -2px 0 #000,
               2px -2px 0 #000,
               -2px 2px 0 #000,
               2px 2px 0 #000
             `,
            fontFamily: 'Impact, "Arial Black", sans-serif',
          }}
        >
          Back
        </button>
      </div>
    </div>
  );
};
