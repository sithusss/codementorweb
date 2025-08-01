export default function Navbar() {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
      <h1 className="text-xl font-bold text-blue-700">CodeMentor</h1>
      <div className="flex gap-4">
        <a href="#" className="text-gray-700">Sign in</a>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Sign Up</button>
      </div>
    </header>
  );
}