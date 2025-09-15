import Image from "next/image";
import Link from "next/link";

export const RoboflowLogo = () => {
  return (
    <div className="flex flex-row items-center relative">
      <Link href={"https://roboflow.com"} className="flex w-full relative z-10">
        <Image
          src={"/logos/roboflow-logo.png"}
          alt="Roboflow Logo"
          className="object-contain"
          width={120}
          height={22}
        />
        <span className="absolute -top-3 -right-4 text-xs font-medium text-violet-600">
          templates
        </span>
      </Link>
    </div>
  );
};
