import Image from 'next/image';

export default function LandingSection() {
  return (
    <section className="bg-white px-12 py-12 flex flex-col md:flex-row items-center justify-between">
      <div className="max-w-xl">
        <h1 className="text-7xl font-bold">
          <span className="text-gray-400">Online </span><span className="text-blue-900">Learning</span> <br />
          <span className="text-purple-900">you can access</span> <br />
          <span className="text-gray-400">anywhere easily!</span>
        </h1>
        <p className="mt-4 text-gray-600">
          Learn from a global library of coding and mentoring resources. CodeMentor helps you build skills quickly.
        </p>
      </div>
      <div className="mt-8 md:mt-0">
        <Image
          src="/images/hero-man.png"
          alt="Hero"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
}
