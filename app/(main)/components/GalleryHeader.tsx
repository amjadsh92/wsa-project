import { suisse } from "@/app/fonts";

type GalleryHeaderProps = {
  title: string;
  position: 1 | 2 | 3;
  header2AttachedTop: boolean;
  header3AttachedTop?: boolean;
  isOpaque: boolean;
  onClick: () => void;
};

const fadeMask =
  "linear-gradient(to bottom, black 0%, black 35%, transparent 100%)";

export default function GalleryHeader({
  title,
  position,
  header2AttachedTop,
  header3AttachedTop = false,
  isOpaque,
  onClick,
}: GalleryHeaderProps) {
  // Only the exposed bottom edge of the attached header stack fades out.
  const faded = !isOpaque && (
    position === 1
      ? !header2AttachedTop
      : position === 2
        ? header2AttachedTop && !header3AttachedTop
        : header2AttachedTop && header3AttachedTop
  );

  let backdrop: string;
  if (faded) {
    backdrop = `bg-white/60 top-0 left-0 right-0 h-[160%] ${
      position === 3 ? "backdrop-blur-sm" : "backdrop-blur-[0.5rem]"
    }`;
  } else if (position === 1 && header2AttachedTop) {
    backdrop = "bg-white";
  } else {
    backdrop = "bg-white backdrop-blur-[1rem]";
  }

  return (
    <>
      <div
        className={`absolute inset-0 duration-1000 ease-in-out ${
          position === 3
            ? "transition-[backdrop-filter,background-color]"
            : "transition-[backdrop-filter]"
        } ${position === 1 ? "" : "border-t"} ${backdrop}`}
        style={{
          WebkitMaskImage: faded ? fadeMask : "",
          maskImage: faded ? fadeMask : "",
        }}
      />
      <div
        onClick={onClick}
        className={`${suisse.className} cursor-pointer pl-[1.25rem] relative font-[400] tracking-wide text-[2.5rem] max-[960px]:text-[2.1875rem] max-[750px]:text-[2.03125rem] max-[650px]:text-[1.875rem] max-[500px]:text-[1.71875rem] ${
          position === 1 ? "" : "py-[0.3125rem]"
        }`}
      >
        {title}
      </div>
    </>
  );
}
