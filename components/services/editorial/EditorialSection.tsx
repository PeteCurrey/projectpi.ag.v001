import React from "react";

interface EditorialSectionProps {
  children: React.ReactNode;
  variant?: "light" | "stone" | "dark";
  borderTop?: boolean;
  borderBottom?: boolean;
  className?: string;
  id?: string;
}

export default function EditorialSection({
  children,
  variant = "light",
  borderTop = false,
  borderBottom = true,
  className = "",
  id,
}: EditorialSectionProps) {
  const bgStyles =
    variant === "dark"
      ? "bg-[#111111] text-[#F5F3EE]"
      : variant === "stone"
      ? "bg-[#E8E5DE] text-[#111111]"
      : "bg-[#F5F3EE] text-[#111111]";

  const borderTopStyle = borderTop
    ? variant === "dark"
      ? "border-t border-[#343832]"
      : "border-t border-[#D6D3CB]"
    : "";

  const borderBottomStyle = borderBottom
    ? variant === "dark"
      ? "border-b border-[#343832]"
      : "border-b border-[#D6D3CB]"
    : "";

  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${bgStyles} ${borderTopStyle} ${borderBottomStyle} ${className}`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">{children}</div>
    </section>
  );
}
