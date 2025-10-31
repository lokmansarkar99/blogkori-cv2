import TeamCard from "@/app/Components/TeamCard";

export default function Page() {
  const Teammembers = [
    {
      name: "Lokman Sarker",
      role: "Fullstack Developer ",
      image: "",
      github: "https://github.com/talha",
      linkedin: "https://linkedin.com/in/talha",
      facebook: "https://facebook.com/talha"
    },
    {
      name: "Azizul Haque",
      role: "Fullstack Developer ",
      image: "https://avatars.githubusercontent.com/u/124841821?v=4",
      github: "https://github.com/azizul-haque-dev",
      linkedin: "https://www.linkedin.com/in/dev-azizul-haque/",
      facebook: "https://www.facebook.com/share/1Y4Tbru1PY/"
    },
    {
      name: "Md Sinikdho",
      role: "MERN Developer",
      image:
        "https://res.cloudinary.com/dds5xmojk/image/upload/v1760379877/uploads/eqlt7sjohbifg86x56sm.jpg",
      github: "https://github.com/mdsinikdho12",
      linkedin: "https://linkedin.com/in/mdhasan",
      facebook: "https://facebook.com/mdhasan"
    },
    {
      name: "Md Nasim Hosen",
      role: "Frontend developer ",
      image: "/images/talha.jpg",
      github: "https://github.com/talha",
      linkedin: "https://linkedin.com/in/talha",
      facebook: "https://facebook.com/talha"
    },
    {
      name: "Md Talha",
      role: "Full Stack Ai  ",
      image: "/images/talha.jpg",
      github: "https://github.com/talha",
      linkedin: "https://linkedin.com/in/talha",
      facebook: "https://facebook.com/talha"
    }
  ];

  return (
    <main className="min-h-screen  py-12 px-4">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Meet Our Team</h1>
        <div className="flex flex-wrap justify-center gap-6">
          {Teammembers.map((member, index) => (
            <TeamCard
              key={index}
              name={member.name}
              role={member.role}
              image={member.image}
              github={member.github}
              linkedin={member.linkedin}
              facebook={member.facebook}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
