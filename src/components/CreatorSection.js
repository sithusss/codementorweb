import Image from 'next/image';

export default function Creator() {
  return (
    <section className="text-center py-12 px-6 bg-white">
      <h4 className="text-xl font-bold text-gray-800 mb-2">Creator’s <span className="text-blue-700">Word</span></h4>
      <p className="text-gray-600 max-w-xl mx-auto">
        Learning is the key that unlocks endless opportunities, broadens your horizons, and empowers you to turn dreams into reality.
      </p>
      <div className="bg-blue-800 text-white mt-6 px-6 py-4 rounded-lg inline-block">
        <p className="text-sm">"Education is the most powerful weapon which you can use to change the world"<br />-Nelson Mandela-</p>
      </div>
      <div className="mt-4 text-sm text-gray-700">
        <div className="mx-auto w-10 h-10 relative">
          <Image src="/images/creator.png" alt="Creator" fill className="rounded-full object-cover" />
        </div>
        <p className="mt-2 font-bold">Sandali Liyanage</p>
        <p>CREATOR</p>
      </div>
    </section>
  );
}
