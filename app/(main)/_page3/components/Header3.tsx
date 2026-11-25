import GalleryHeader from "../../components/GalleryHeader";

type Header3Props = {
  header2AttachedTop: boolean;
  header3AttachedTop: boolean;
  isOpaque: boolean;
  goToHeader3: () => void;
};

export default function Header3({
  header2AttachedTop,
  header3AttachedTop,
  isOpaque,
  goToHeader3,
}: Header3Props) {
  return (
    <GalleryHeader
      title="Header3"
      position={3}
      header2AttachedTop={header2AttachedTop}
      header3AttachedTop={header3AttachedTop}
      isOpaque={isOpaque}
      onClick={goToHeader3}
    />
  );
}
