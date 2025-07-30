// Silicon Valley Spinner
export const SVSpinner = () => {
  // Number of circles
  const count = 12;
  // Circle radius (distance from center)
  const radius = 70;
  // Min/max size for the dots
  const minSize = 12;
  const maxSize = 28;

  // Helper to interpolate color from white to red
  const getColor = (i: number) => {
    // 0 = white, 1 = red
    const t = i / (count - 1);
    const r = 255;
    const g = Math.round(255 * (1 - t));
    const b = Math.round(255 * (1 - t));
    return `rgb(${r},${g},${b})`;
  };

  // Helper to interpolate size
  const getSize = (i: number) => {
    const t = i / (count - 1);
    return minSize + t * (maxSize - minSize);
  };

  return (
    <div
      className="relative"
      style={{ width: radius * 2 + maxSize, height: radius * 2 + maxSize }}
    >
      <div
        className="absolute inset-0 flex items-center justify-center animate-spin"
        style={{ animationDuration: "2.5s" }}
      >
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i / count) * 2 * Math.PI;
          const size = getSize(i);
          const color = getColor(i);
          const x = radius + radius * Math.cos(angle) + maxSize / 2 - size / 2;
          const y = radius + radius * Math.sin(angle) + maxSize / 2 - size / 2;
          return (
            <span
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: size,
                height: size,
                borderRadius: "50%",
                background: color,
                boxShadow: "0 0 2px #0008",
                border: "2px solid #000",
                display: "block",
              }}
            />
          );
        })}
      </div>
    </div>
  );
};
