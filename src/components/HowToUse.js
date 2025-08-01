import Image from 'next/image';

export default function HowToUse() {
  return (
    <section className="relative bg-yellow-300 py-16 px-6 overflow-hidden">
      {/* Blue decorative shapes */}
      <div className="absolute top-0 left-0 w-52 h-52 bg-blue-500 rounded-full opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500 rounded-full opacity-40 translate-x-1/3 translate-y-1/3"></div>

      {/* Grid layout */}
      <div className="relative z-10 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left side: Image */}
        <div className="flex justify-center">
          <Image
            src="/images/student-girl.png"
            alt="Student"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>

        {/* Right side: Steps */}
        <div>
          <h2 className="text-3xl font-bold text-blue-900 mb-6 text-center md:text-left">
            How to Use CodeMentor
          </h2>
          <div className="space-y-4">
            {[
              'Sign up and choose a topic to begin.',
              'Read the concept and try coding examples.',
              'Test yourself and get instant feedback.',
            ].map((text, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-6 shadow text-left"
              >
                <h3 className="text-xl font-semibold text-blue-800">{`Step ${index + 1}`}</h3>
                <p className="text-md mt-2 text-gray-700">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
