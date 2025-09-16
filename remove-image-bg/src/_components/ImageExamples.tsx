interface ImageExamplesProps {
  onImageSelect: (file: File) => void;
}

export default function ImageExamples({ onImageSelect }: ImageExamplesProps) {
  const exampleImages = [
    { src: "/example-images/dogs.jpg", alt: "Dogs" },
    { src: "/example-images/cats.jpg", alt: "Cats" },
    { src: "/example-images/airplane.jpg", alt: "Airplane" },
    { src: "/example-images/stopsign.jpg", alt: "Stop Sign" },
  ];

  const handleImageClick = async (imageSrc: string, alt: string) => {
    try {
      const response = await fetch(imageSrc);
      const blob = await response.blob();
      const file = new File([blob], `${alt.toLowerCase()}.jpg`, {
        type: "image/jpeg",
      });
      onImageSelect(file);
    } catch (error) {
      console.error("Error loading example image:", error);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
      <span className="flex flex-col justify-center">
        <p className="text-gray-700 font-semibold whitespace-nowrap">
          No image?
        </p>
        <p className="text-gray-700 font-semibold whitespace-nowrap">
          Try one of these:
        </p>
      </span>
      <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-xs sm:max-w-none">
        {exampleImages.map((image, index) => (
          <div
            key={index}
            className="aspect-square hover:opacity-80 bg-gray-200 rounded-xl flex items-center justify-center border border-gray-200
            cursor-pointer overflow-hidden"
            onClick={() => handleImageClick(image.src, image.alt)}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
