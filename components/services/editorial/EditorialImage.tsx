import React from "react";
import Image from "next/image";
import { EditorialImageItem } from "@/lib/data/editorialImagesData";

interface EditorialImageProps {
  image: EditorialImageItem;
  secondaryImage?: EditorialImageItem;
  layout?: "full" | "asymmetric" | "diptych";
  className?: string;
}

export default function EditorialImage({
  image,
  secondaryImage,
  layout = "full",
  className = "",
}: EditorialImageProps) {
  if (layout === "diptych" && secondaryImage) {
    return (
      <div className={`py-12 md:py-20 ${className}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Image 1 */}
          <div className="space-y-3">
            <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden bg-[#E8E5DE]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center grayscale contrast-105"
              />
            </div>
            {image.caption && (
              <p className="text-[11px] font-light tracking-wide text-[#6F706A]">
                {image.caption}
              </p>
            )}
          </div>

          {/* Image 2 */}
          <div className="space-y-3 md:mt-12">
            <div className="relative w-full h-[40vh] sm:h-[50vh] overflow-hidden bg-[#E8E5DE]">
              <Image
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center grayscale contrast-105"
              />
            </div>
            {secondaryImage.caption && (
              <p className="text-[11px] font-light tracking-wide text-[#6F706A]">
                {secondaryImage.caption}
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (layout === "asymmetric") {
    return (
      <div className={`py-12 md:py-20 ${className}`}>
        <div className="max-w-5xl ml-auto space-y-3">
          <div className="relative w-full h-[45vh] sm:h-[55vh] overflow-hidden bg-[#E8E5DE]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 80vw"
              className="object-cover object-center grayscale contrast-105"
            />
          </div>
          {image.caption && (
            <p className="text-[11px] font-light tracking-wide text-[#6F706A]">
              {image.caption}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Full-width default
  return (
    <div className={`py-12 md:py-20 ${className}`}>
      <div className="space-y-3">
        <div className="relative w-full h-[45vh] sm:h-[60vh] overflow-hidden bg-[#E8E5DE]">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover object-center grayscale contrast-105"
          />
        </div>
        {image.caption && (
          <p className="text-[11px] font-light tracking-wide text-[#6F706A]">
            {image.caption}
          </p>
        )}
      </div>
    </div>
  );
}
