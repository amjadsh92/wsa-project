import GalleryHeader from "../../components/GalleryHeader";

type Header1Props = {
  header2AttachedTop: boolean;
  isOpaque: boolean;
  goToHeader1: () => void;
};

export default function Header1({
  header2AttachedTop,
  isOpaque,
  goToHeader1,
}: Header1Props) {
  return (
    <GalleryHeader
      title="Header 1"
      position={1}
      header2AttachedTop={header2AttachedTop}
      isOpaque={isOpaque}
      onClick={goToHeader1}
    />
  );
}
