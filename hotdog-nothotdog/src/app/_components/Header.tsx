"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { RoboflowLogo } from "@/components/shared/RoboflowLogo";
import ApiKeyModal from "./ApiKeyModal";
import CloneRepoButton from "./CloneRepoButton";

interface HeaderProps {
  apiKey: string;
  onApiKeyChange: (key: string) => void;
  showApiKeyModal?: boolean;
  onShowApiKeyModal?: (show: boolean) => void;
}

export default function Header({
  apiKey,
  onApiKeyChange,
  showApiKeyModal = false,
  onShowApiKeyModal,
}: HeaderProps) {
  const [showApiKey, setShowApiKey] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-50 px-4 py-3 z-50 shadow-xs">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <RoboflowLogo />
          <span className="ml-2 text-sm text-gray-500 opacity-60 hidden sm:inline">
            templates
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <label
            htmlFor="api-key"
            className="text-sm font-medium text-gray-700 hidden sm:inline"
          >
            Roboflow API Key:
          </label>
          <div className="relative">
            <input
              id="api-key"
              type={showApiKey ? "text" : "password"}
              value={apiKey}
              onChange={(e) => onApiKeyChange(e.target.value)}
              placeholder="API Key"
              className="w-48 md:w-64 px-2 sm:px-3 py-1 sm:py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute cursor-pointer right-1 sm:right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showApiKey ? (
                <EyeOffIcon size={12} className="sm:w-3.5 sm:h-3.5" />
              ) : (
                <EyeIcon size={12} className="sm:w-3.5 sm:h-3.5" />
              )}
            </button>
          </div>
          <CloneRepoButton repoUrl="https://github.com/SwanHub/roboflow-templates/tree/main/remove-image-bg" />
        </div>
      </div>

      {onShowApiKeyModal && (
        <ApiKeyModal
          isOpen={showApiKeyModal}
          onClose={() => onShowApiKeyModal(false)}
          apiKey={apiKey}
          onApiKeyChange={onApiKeyChange}
        />
      )}
    </header>
  );
}
