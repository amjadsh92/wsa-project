
export default function Home(){

const projects = [
  {
    title: "Project One",
    date: "2025",
    image: "/home/images/project1.jpg",
  },
  {
    title: "Project Two",
    date: "2024",
    image: "/home/images/project2.jpg",
  },
  {
    title: "Project Three",
    date: "2023",
    image: "/home/images/project3.jpg",
  },
];

return(
<div className="bg-white relative">
  {projects.map((project, index) => (
    <section
      key={project.title}
      
    >
      {/* Sticky Header */}
      <div
        className="sticky bg-white border-t border-black z-20"
        style={{
          top: `${index * 60}px`,
        }}
      >
        <div className="flex justify-between px-4 py-4">
          <h2>{project.title}</h2>
          <span>{project.date}</span>
        </div>
      </div>

      {/* Image */}
      <div className="h-[120vh]">
        <img
          src={project.image}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
    </section>
  ))}
</div>
)

}