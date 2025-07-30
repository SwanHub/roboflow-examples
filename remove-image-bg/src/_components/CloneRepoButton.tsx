"use client";

import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function CloneRepoButton() {
  return (
    <Link
      href="https://github.com/SwanHub/roboflow-templates/tree/main/remove-image-bg"
      className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-black text-black hover:text-white
      text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer border border-gray-300"
    >
      <FaGithub className="w-4 h-4" />
      <span className="text-sm">Clone</span>
    </Link>
  );
}
