import React from "react";

interface ImageDropzoneProps {
  onImageSelect: (file: File) => void;
}

export default function ImageDropzone({ onImageSelect }: ImageDropzoneProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        onImageSelect(file);
      }
    }
    // Reset the input value so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="bg-white rounded-3xl shadow-[0px_0px_35px_rgba(0,0,0,0.15)] px-4 sm:px-8 cursor-pointer hover:shadow-[0px_0px_40px_rgba(0,0,0,0.2)] transition-shadow duration-200"
      onClick={handleClick}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <div className="text-center mb-6 sm:mb-8 pt-24 sm:pt-36">
        <button
          className="bg-violet-600 hover:bg-violet-500 text-white font-semibold
        py-2 sm:py-3 px-6 sm:px-8 rounded-full text-lg sm:text-2xl transition-colors duration-200 cursor-pointer"
        >
          Upload Image
        </button>
      </div>

      {/* Alternative upload options */}
      <div className="text-center space-y-1 pb-12 sm:pb-16">
        <p className="text-gray-600 font-semibold text-lg sm:text-xl">
          or drop a file,
        </p>
        <p className="text-sm text-gray-600">
          paste image or <span className="underline cursor-pointer">URL</span>
        </p>
      </div>
    </div>
  );
}
