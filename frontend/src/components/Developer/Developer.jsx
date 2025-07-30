import React from "react";
import VarunImage from "../../images/developer1.jpeg";

const techStack = [
  "React", "Node.js", "Express", "MongoDB",
  "Tailwind CSS", "JWT", "JavaScript", "HTML", "CSS"
];

const Developer = () => {
  return (
    <section className="min-h-screen bg-[#fdfaf4] text-[#222] font-serif px-6 pt-28 pb-20">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
        
        {/* Image Section - shifted left and top */}
       <div className="flex justify-center md:justify-start md:pl-20 mt-5">


          <div className="border-4 border-[#e6dcc9] rounded-[3rem] p-2 shadow-lg">
            <img
              src={VarunImage}
              alt="Varun Kumar"
              className="w-[300px] h-[400px] object-cover rounded-[2.5rem]"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-center md:text-left max-w-[500px] mx-auto md:mx-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Hi, I’m Varun <span className="inline-block">👋</span>
          </h1>

          <p className="text-lg leading-relaxed mb-4">
            I’m a passionate Mern Stack Developer from Ghaziabad, crafting modern and efficient web
            applications using the <strong>MERN stack</strong>.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            I focus on building apps that are not only functional but also aesthetically pleasing.
            I love learning new technologies and continuously enhancing my skillset.
          </p>

          <h3 className="text-xl font-semibold mb-2">Tech Stack</h3>
          <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="bg-[#f1eadf] text-[#333] px-3 py-1 rounded-full text-sm shadow-sm border border-[#e0d5c0]"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex justify-center md:justify-start gap-4 text-xl">
            <a
              href="https://github.com/varunrajput27"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-black"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/varun-kumar-9b7263301"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0e76a8]"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="mailto:varunaarya709@gmail.com"
              className="hover:text-[#b23121]"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Developer;
