export default function HeroLeft() {
  return (
    <div className="space-y-6 md:space-y-8 text-center md:text-left">
      <div className="relative max-w-xs mx-auto md:mx-0">
        <img
          src="/header/clown-fish-before-remove-bg.jpg"
          alt="Original clown fish"
          className="w-full h-auto opacity-80 rounded-2xl"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-white"></div>
        <img
          src="/header/clown-fish-after-remove-bg.png"
          alt="Clown fish with background removed"
          className="absolute inset-0 w-full h-auto"
        />
      </div>
      <div className="space-y-4">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-800 leading-tight"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          Remove Image Background
        </h1>
        <div className="flex items-center gap-3 justify-center md:justify-start">
          <p className="text-lg sm:text-xl text-gray-700 font-semibold">
            100% Automatically and
          </p>
          <span className="bg-amber-400 px-4 py-2 text-lg sm:text-xl font-semibold">
            Free
          </span>
        </div>
      </div>
    </div>
  );
}
