import { SiReact, SiNodedotjs, SiPython, SiJavascript, SiTypescript, SiHtml5, SiCss3, SiTailwindcss, SiMongodb, SiPostgresql, SiDocker, SiKubernetes, SiAmazon, SiGit, SiFigma, SiGraphql, SiRedis, SiExpress, SiNextdotjs, SiVim } from "react-icons/si";
import '../home.css';

// Tech skills data
interface TechSkill {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const techSkills: TechSkill[] = [
  { name: "React", icon: SiReact, color: "text-cyan-400" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-400" },
  { name: "Python", icon: SiPython, color: "text-yellow-400" },
  { name: "JavaScript", icon: SiJavascript, color: "text-yellow-300" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "HTML5", icon: SiHtml5, color: "text-orange-400" },
  { name: "CSS3", icon: SiCss3, color: "text-blue-500" },
  { name: "Tailwind", icon: SiTailwindcss, color: "text-cyan-300" },
  { name: "MongoDB", icon: SiMongodb, color: "text-green-500" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-600" },
  { name: "Docker", icon: SiDocker, color: "text-blue-400" },
  { name: "Kubernetes", icon: SiKubernetes, color: "text-blue-500" },
  { name: "AWS", icon: SiAmazon, color: "text-orange-400" },
  { name: "Git", icon: SiGit, color: "text-red-400" },
  { name: "Vim", icon: SiVim, color: "text-green-400" },
  { name: "Figma", icon: SiFigma, color: "text-purple-400" },
  { name: "GraphQL", icon: SiGraphql, color: "text-pink-400" },
  { name: "Redis", icon: SiRedis, color: "text-red-500" },
  { name: "Express", icon: SiExpress, color: "text-gray-400" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
];

// Tech Skills Component
export function TechSkills() {
  const tripleSkills = [...techSkills, ...techSkills, ...techSkills];

  return (
    <section className="home-tech-skills">
      {/* Dark blue aesthetic spots */}
      <div className="home-tech-skills-spots home-tech-skills-spot-1"></div>
      <div className="home-tech-skills-spots home-tech-skills-spot-2"></div>
      <div className="home-tech-skills-spots home-tech-skills-spot-3"></div>
      
      <div className="home-tech-skills-container">
        <div className="home-tech-skills-header">
          <h2 className="home-tech-skills-title">
            <span className="home-tech-skills-title-white">Technical</span>{" "}
            <span className="home-tech-skills-title-blue">Skills</span>
          </h2>
          <p className="home-tech-skills-description">
            Technologies and tools we master to build exceptional solutions
          </p>
        </div>

        <div className="home-tech-skills-rows">
          {/* First row - Left to Right */}
          <div className="home-tech-skills-row">
            <div className="home-tech-skills-track">
              {tripleSkills.map((skill, index) => (
                <div
                  key={`left-${index}`}
                  className={`home-tech-skill-item ${
                    index === 0 ? 'home-tech-skill-item-first' : index === tripleSkills.length - 1 ? 'home-tech-skill-item-last' : ''
                  }`}
                >
                  <skill.icon className={`home-tech-skill-icon ${skill.color}`} />
                  <span className="home-tech-skill-text">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Second row - Right to Left */}
          <div className="home-tech-skills-row">
            <div className="home-tech-skills-track home-tech-skills-track-right">
              {tripleSkills.map((skill, index) => (
                <div
                  key={`right-${index}`}
                  className={`home-tech-skill-item ${
                    index === 0 ? 'home-tech-skill-item-last' : index === tripleSkills.length - 1 ? 'home-tech-skill-item-first' : ''
                  }`}
                >
                  <skill.icon className={`home-tech-skill-icon ${skill.color}`} />
                  <span className="home-tech-skill-text">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Third row - Left to Right */}
          <div className="home-tech-skills-row">
            <div className="home-tech-skills-track">
              {tripleSkills.map((skill, index) => (
                <div
                  key={`left2-${index}`}
                  className={`home-tech-skill-item ${
                    index === 0 ? 'home-tech-skill-item-first' : index === tripleSkills.length - 1 ? 'home-tech-skill-item-last' : ''
                  }`}
                >
                  <skill.icon className={`home-tech-skill-icon ${skill.color}`} />
                  <span className="home-tech-skill-text">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
