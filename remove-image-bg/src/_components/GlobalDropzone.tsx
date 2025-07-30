"use client";

import { useState, useCallback } from "react";

interface GlobalDropzoneProps {
  children: React.ReactNode;
  onImageDrop: (file: File) => void;
}

export default function GlobalDropzone({
  children,
  onImageDrop,
}: GlobalDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragPreview, setDragPreview] = useState<{
    name: string;
    preview?: string;
  } | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
      setDragPreview(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      setDragPreview(null);

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile) {
        onImageDrop(imageFile);
      }
    },
    [onImageDrop]
  );

  const handleDragOverWithPreview = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const files = Array.from(e.dataTransfer.files);
      const imageFile = files.find((file) => file.type.startsWith("image/"));

      if (imageFile && !dragPreview) {
        setDragPreview({
          name: imageFile.name,
          preview: URL.createObjectURL(imageFile),
        });
      }
    },
    [dragPreview]
  );

  return (
    <div
      className="relative min-h-screen"
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}
      {isDragOver && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center"
          onDragOver={handleDragOverWithPreview}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="absolute top-4 left-4 w-8 h-8 border-l-4 border-t-4 border-white rounded-tl-lg"></div>
          <div className="absolute top-4 right-4 w-8 h-8 border-r-4 border-t-4 border-white rounded-tr-lg"></div>
          <div className="absolute bottom-4 left-4 w-8 h-8 border-l-4 border-b-4 border-white rounded-bl-lg"></div>
          <div className="absolute bottom-4 right-4 w-8 h-8 border-r-4 border-b-4 border-white rounded-br-lg"></div>

          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-white">
              Drop image anywhere
            </h2>

            {dragPreview && (
              <div className="mt-6">
                <div className="inline-block bg-white rounded-lg p-2 shadow-lg">
                  {dragPreview.preview ? (
                    <img
                      src={dragPreview.preview}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-500">IMG</span>
                    </div>
                  )}
                </div>
                <div className="mt-2">
                  <span className="bg-violet-600 text-white px-3 py-1 rounded text-sm">
                    {dragPreview.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
