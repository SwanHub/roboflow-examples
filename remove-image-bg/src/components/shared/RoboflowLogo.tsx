import Link from "next/link";

export const RoboflowLogo = ({ inverted = false }: { inverted?: boolean }) => {
  const logoSrc = inverted
    ? "/logos/roboflow-logo-white.png"
    : "/logos/roboflow-logo.png";
  return (
    <div className="flex flex-row items-center relative">
      <Link href={"/"} className="flex w-full relative z-10">
        <img
          src={logoSrc}
          className="object-contain"
          style={{ width: 120, height: 22 }}
        />
      </Link>
    </div>
  );
};
