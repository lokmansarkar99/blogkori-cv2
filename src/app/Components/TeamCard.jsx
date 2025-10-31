import Image from "next/image";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";

function TeamCard({ name, role, image, github, linkedin, facebook }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center w-full sm:w-[300px] transition hover:shadow-lg">
      <div className="relative w-24 h-24 mx-auto mb-4">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover border-2 border-purple-300"
        />
      </div>
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-sm text-gray-500 mb-4">{role}</p>

      <div className="flex justify-center gap-4 text-xl text-gray-600">
        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-black transition" />
          </a>
        )}
        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-blue-600 transition" />
          </a>
        )}
        {facebook && (
          <a href={facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="hover:text-blue-500 transition" />
          </a>
        )}
      </div>
    </div>
  );
}

export default TeamCard;
