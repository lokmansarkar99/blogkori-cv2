function Aboutus() {
  return (
    <div className="min-h-screen  py-16">
      <div className="max-w-6xl mx-auto text-center px-6 mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          About <span className="text-indigo-600">Us</span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We’re passionate about building digital solutions that make life
          easier. Our goal is to blend creativity, technology, and innovation to
          bring your ideas to life.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="  py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">
          <div className="p-6 border-l-4 border-indigo-600 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To empower individuals and businesses with simple, effective, and
              innovative digital solutions that inspire creativity and growth.
            </p>
          </div>
          <div className="p-6 border-l-4 border-indigo-600 rounded-lg bg-gray-50">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become a trusted global brand that bridges technology with
              human potential, creating a better future through code and design.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Aboutus;
