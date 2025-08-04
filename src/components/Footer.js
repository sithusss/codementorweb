// components/Footer.js
export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white px-6 py-8">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h5 className="font-bold text-lg">Education</h5>
          <p className="text-sm mt-2">
            Learn to code and build a future in programming.
          </p>
          <div className="flex space-x-2 mt-4">
            <span>🌐</span>
            <span>🔗</span>
            <span>📘</span>
          </div>
        </div>
        <div>
          <h5 className="font-bold text-lg">Contact Us</h5>
          <p className="text-sm mt-2">
            CodeMentor, Sri Lanka<br />
            +94 77 000 0000<br />
            email@codementor.com
          </p>
        </div>
      </div>
      <p className="text-xs text-center mt-8">www.codementor.com</p>
    </footer>
  );
}