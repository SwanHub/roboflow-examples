import { RoboflowLogo } from "./RoboflowLogo";
import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-3 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <RoboflowLogo />
        <div className="flex items-center space-x-2">
          <p className="hidden sm:block pr-2 text-sm font-medium text-gray-400 whitespace-nowrap">
            Live demo
          </p>
          <Link
            href="https://github.com/SwanHub/roboflow-templates/tree/main/face-detection-test"
            className="group flex items-center gap-2 px-3 py-2 bg-white hover:bg-black text-black hover:text-white
      text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer border border-gray-300"
          >
            <img
              src="/icons/github.svg"
              className="w-4 h-4 transition-all duration-200 group-hover:invert"
            />
            <span className="text-sm">Clone project</span>
          </Link>
          <Link
            href="https://app.roboflow.com/workflows/fork/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3b3JrZmxvd0lkIjoiTUZSVEdYa2llSVVtcmVFQ0NleGYiLCJ3b3Jrc3BhY2VJZCI6Im5mUlVnMnlZeThOdzhsVjNrajhNUkpOSFFYOTIiLCJ1c2VySWQiOiJuZlJVZzJ5WXk4Tnc4bFYza2o4TVJKTkhRWDkyIiwiaWF0IjoxNzUyNzgyMTUwfQ.uZK9Us_L-HuB7qmduSLhIcfbrPQ4R-wUBcq8CgwQZuk"
            className="flex items-center px-3 py-2 bg-violet-700 hover:bg-violet-800 text-white
            text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer border border-violet-700 hover:border-violet-800"
          >
            <span className="text-sm">Use This Template</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
