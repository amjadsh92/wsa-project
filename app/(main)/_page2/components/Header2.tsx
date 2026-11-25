import GalleryHeader from "../../components/GalleryHeader";

type Header2Props = {
  header2AttachedTop: boolean;
  header3AttachedTop: boolean;
  isOpaque: boolean;
  goToHeader2: () => void;
};

export default function Header2({
  header2AttachedTop,
  header3AttachedTop,
  isOpaque,
  goToHeader2,
}: Header2Props) {
  return (
    <GalleryHeader
      title="Header2"
      position={2}
      header2AttachedTop={header2AttachedTop}
      header3AttachedTop={header3AttachedTop}
      isOpaque={isOpaque}
      onClick={goToHeader2}
    />
  );
}
