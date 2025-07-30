"use client";

import Link from "next/link";
import React, { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  onApiKeyChange: (key: string) => void;
}

export default function ApiKeyModal({
  isOpen,
  onClose,
  apiKey,
  onApiKeyChange,
}: ApiKeyModalProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="space-y-6 pb-6">
            <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto">
              <svg
                className="w-8 h-8 text-violet-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>

            <h2 className="text-2xl font-bold text-gray-900">
              API Key Required
            </h2>

            <p className="text-gray-600 leading-relaxed">
              To test the Not Hotdog template, provide your Roboflow API key.
            </p>
          </div>

          <div className="space-y-2 pb-4">
            <label
              htmlFor="modal-api-key"
              className="text-sm font-medium text-gray-700 text-left block"
            >
              Roboflow API Key:
            </label>
            <div className="relative">
              <input
                id="modal-api-key"
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => onApiKeyChange(e.target.value)}
                placeholder="Enter your Roboflow API key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowApiKey(!showApiKey)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                {showApiKey ? <EyeOffIcon size={14} /> : <EyeIcon size={14} />}
              </button>
            </div>
          </div>

          <Link
            href="https://docs.roboflow.com/developer/authentication/find-your-roboflow-api-key"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mb-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            Find your API key
          </Link>

          <button
            onClick={onClose}
            className="text-gray-500 cursor-pointer hover:text-gray-700 font-medium transition-colors duration-200"
          >
            {apiKey ? "Save and close" : "Close"}
          </button>
        </div>
      </div>
    </div>
  );
}
