import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer
      className="w-full border-t border-gray-200 mt-16 py-4 z-30 bottom-0 left-0 right-0 fixed bg-white"
      style={{ fontFamily: "var(--font-inter)" }}
    >
      <div className="flex items-start gap-2 px-4 flex-wrap">
        <Link
          href="https://roboflow.com/?ref=roboflow-examples-face-detection.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex items-center gap-2 hover:underline"
          aria-label="Roboflow - Computer Vision Platform"
        >
          <Image
            src="/icons/roboflow.png"
            alt="Roboflow logo"
            width={16}
            height={16}
            className="rounded-full"
          />
          <span className="text-xs text-gray-600 whitespace-nowrap">
            Roboflow for computer vision
          </span>
        </Link>
        <Link
          href="https://nextjs.org?ref=roboflow-examples-face-detection.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex items-center gap-2 hover:underline"
          aria-label="Next.js - The React Framework for the Web"
        >
          <Image
            src="/icons/nextjs.png"
            alt="Next.js logo"
            width={16}
            height={16}
            className="rounded-full"
          />
          <span className="text-xs text-gray-600 whitespace-nowrap">
            Next.js for frontend/backend
          </span>
        </Link>

        <Link
          href="https://vercel.com/?ref=roboflow-examples-face-detection.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded flex items-center gap-2 hover:underline"
          aria-label="Vercel - Frontend Cloud Platform"
        >
          <Image
            src="/icons/vercel.png"
            alt="Vercel logo"
            width={16}
            height={16}
            className="rounded-full"
          />
          <span className="text-xs text-gray-600 whitespace-nowrap">
            Vercel for deployment
          </span>
        </Link>
      </div>
    </footer>
  );
}
