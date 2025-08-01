'use client';

import { useState } from 'react';

export default function StartHere()  {
  const categories = ['OOP', 'SQL', 'Algorithms'];
  const concepts = {
    OOP: ['Class & Object', 'Inheritance', 'Polymorphism'],
    SQL: ['SELECT', 'JOIN', 'GROUP BY'],
    Algorithms: ['Sorting', 'Searching', 'Recursion'],
  };

  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedConcept, setSelectedConcept] = useState('');

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSelectedConcept(''); // Reset concept when category changes
  };

  const isConceptLocked = !selectedCategory;
  const isBoxesUnlocked = selectedCategory && selectedConcept;

  return (
    <div className="w-full p-6 bg-white shadow space-y-6">
    <h2 className="text-2xl font-bold text-blue-800 text-center">Start Learning</h2>

    <div className="w-full min-h-screen p-6 bg-white rounded-xl shadow space-y-6">

      {/* Your dropdowns container here */}
      <div className="flex gap-10 p-4 rounded-lg shadow">
        {/* Category Dropdown */}
        <div className="flex flex-col flex-1">
          <label className="font-semibold text-gray-700 mb-2">Select Category</label>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-3 border rounded bg-blue-100 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'"
          >
            <option value="">-- Choose a Category --</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        {/* Concept Dropdown */}
        <div className="flex flex-col flex-1">
          <label className="font-semibold text-gray-700 mb-2">Select Concept</label>
          <select
            value={selectedConcept}
            onChange={(e) => setSelectedConcept(e.target.value)}
            disabled={!selectedCategory}
            className={`p-3 border rounded focus:outline-none transition
              ${!selectedCategory ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'p-3 border rounded bg-blue-100 text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200'}
            `}
          >
            <option value="">
              {!selectedCategory ? '-- Select a Category First --' : '-- Choose a Concept --'}
            </option>
            {selectedCategory && concepts[selectedCategory].map((concept) => (
              <option key={concept} value={concept}>{concept}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Boxes for description, example, sample code */}
          {isBoxesUnlocked && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-pink-200 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-2 text-pink-800">Concept Description</h3>
                <p className="text-pink-900">Description of {selectedConcept} in {selectedCategory} goes here.</p>
              </div>

              <div className="p-6 bg-green-200 rounded-lg shadow-lg">
                <h3 className="font-bold text-lg mb-2 text-green-800">Real-world Example</h3>
                <p className="text-green-900">Real-world example for {selectedConcept} in {selectedCategory}.</p>
              </div>

              <div className="p-6 bg-blue-200 rounded-lg shadow-lg font-mono whitespace-pre-wrap">
                <h3 className="font-bold text-lg mb-2 text-blue-800">Sample Code</h3>
                <pre className="text-blue-900">
      {`// Sample code for ${selectedConcept}
      console.log("Hello, world!");`}
                </pre>
              </div>
            </div>
          )}
      </div>

    </div>
  );
}
