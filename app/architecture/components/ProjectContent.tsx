import Img from "next/image";
import type { Project } from "../projects";
import { projects } from "../projects"

export default function ProjectContent({
  project,
}: {
  project: Project;
}) {
  return (
    <div
      className="
        w-full
        px-[clamp(1.5rem,4vw,5rem)]
        pt-[clamp(7rem,12vh,10rem)]
        pb-[6rem]
      "
    >
      {/* Project information */}
      <div
        className="
          mb-[3rem]
          grid
          grid-cols-[1fr_auto]
          items-end
          gap-10
        "
      >
        <h1
          className="
            text-[clamp(2.5rem,6vw,6rem)]
            leading-[0.95]
            font-medium
            tracking-[-0.04em]
          "
        >
          {project.title}
        </h1>

        <div
          className="
            flex
            flex-col
            gap-1
            text-right
            text-[0.75rem]
            uppercase
            tracking-[0.14em]
          "
        >
          <span>{project.location}</span>

          <span>{project.year}</span>

          <span>{project.category}</span>
        </div>
      </div>

      {/* Main project image */}
      <div
        className="
          relative
          h-[75vh]
          min-h-[520px]
          w-full
          overflow-hidden
        "
      >
        <Img
          src={project.image}
          alt={project.title}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Description */}
      <div
        className="
          grid
          grid-cols-12
          py-[clamp(4rem,8vw,8rem)]
        "
      >
        <p
          className="
            col-span-7
            col-start-5
            max-w-[900px]
            text-[clamp(1.4rem,2.4vw,2.7rem)]
            leading-[1.25]
            tracking-[-0.025em]
          "
        >
          {project.description}
        </p>
      </div>

      {/* Gallery */}
      <div
        className="
          grid
          grid-cols-2
          gap-x-[1.5rem]
          gap-y-[1.5rem]
        "
      >
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              relative
              h-[25vh]
              min-h-[220px]
              w-full
              overflow-hidden
            "
          >
            <Img
              src={project.image}
              alt={`${project.title} image ${index + 1}`}
              fill
              sizes="50vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}