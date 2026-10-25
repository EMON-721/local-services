import Image from "next/image";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: { width: 120, height: 40 },
  md: { width: 160, height: 53 },
  lg: { width: 200, height: 67 },
};

export function Logo({ className = "", size = "md" }: LogoProps) {
  const { width, height } = sizes[size];

  return (
    <div className={className}>
      <Image
        src="/logo.png"
        alt="Service Lagbe?"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
      />
    </div>
  );
}
