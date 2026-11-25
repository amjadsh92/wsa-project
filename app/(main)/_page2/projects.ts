export const projects = [
    {
      slug: "image1",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
    {
      slug: "image2",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
    {
      slug: "image3",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
    {
      slug: "image4",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
    {
      slug: "image5",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
    {
      slug: "image6",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
    {
      slug: "image7",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
    {
      slug: "image8",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
    {
      slug: "image9",
      title: "Building 140 CERN",
      location: "GENEVA, CH",
      year: "2025",
      category: "Architecture",
      description:
        "Building 140 CERN is a contemporary architectural project focused on clarity, functionality, and the relationship between structure and surrounding space. The project combines refined proportions, carefully controlled materials, and a strong visual identity.",
      image: "/architecture/images/project1.jpg",
    },
  ];



export type Project = (typeof projects)[number];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug);
}