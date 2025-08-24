'use client';
import CodePlayground from '@/components/CodePlayground';
import { useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function StartHere() {
  const [categories, setCategories] = useState([]);
  const [concepts, setConcepts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedConcept, setSelectedConcept] = useState("");

  
  useEffect(() => {
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    setSelectedConcept('');

    fetch(`/api/concepts?category=${value}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Concepts fetched:", data); // DEBUG
        setConcepts(data || []);
      });
  };

  const isBoxesUnlocked = selectedCategory && selectedConcept;

  const selectedConceptData = concepts.find(c => c.concept_no === Number(selectedConcept));

  return (
    <div className="w-full p-6 bg-gray-50 space-y-6">
      <h2 className="text-3xl font-bold text-blue-800 text-center">Start Learning</h2>

      <div className="w-full p-6 bg-white rounded-xl shadow-md space-y-6">
        {/* Dropdowns */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Category Dropdown */}
          <div className="flex flex-col flex-1">
            <label className="font-semibold text-gray-700 mb-2">Select Category</label>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-3 border rounded bg-blue-50 text-blue-700"
            >
              <option value="">-- Choose a Category --</option>
              {categories.map((cat) => (
                <option key={cat.category_no} value={cat.category_no}>
                  {cat.category_name}
                </option>
              ))}
            </select>
          </div>

          {/* Concept Dropdown */}
          <div className="flex flex-col flex-1">
            <label className="font-semibold text-gray-700 mb-2">Select Concept</label>
            <select
              value={selectedConcept}
              onChange={(e) => {
                setSelectedConcept(e.target.value);
              }}
              disabled={!selectedCategory}
              className={`p-3 border rounded transition ${
                  !selectedCategory
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-50 text-blue-700'
                }`}
            >
              <option value="">
                {!selectedCategory ? '-- Select a Category First --' : '-- Choose a Concept --'}
              </option>
              {concepts.map((concept) => (
                <option key={concept.concept_no} value={concept.concept_no}>
                  {concept.concept_name}
                </option>
              ))}
            </select>
          </div>
          

        </div>

        {/* Info Boxes */}
        {isBoxesUnlocked && selectedConceptData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Concept Description */}
            <div className="p-6 bg-pink-100 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2 text-pink-800">Concept Description</h3>
              <p className="text-pink-900">
                <strong>{selectedConceptData.concept_name}:</strong> {selectedConceptData.description}
              </p>
            </div>

            {/* Real-world Example */}
            <div className="p-6 bg-green-100 rounded-lg shadow">
              <h3 className="font-bold text-lg mb-2 text-green-800">Real-world Example</h3>
              <p className="text-green-900">{selectedConceptData.real_example}</p>
            </div>

            {/* Sample Code */}
            <div className="p-6 bg-blue-100 rounded-lg shadow font-mono whitespace-pre-wrap">
              <h3 className="font-bold text-lg mb-2 text-blue-800">Sample Code</h3>
              <pre className="text-blue-900">{selectedConceptData.eg_code}</pre>
            </div>
          </div>
        )}

        {/* Code Editor + Optimal Button */}
        {isBoxesUnlocked && (
          <CodePlayground
            conceptNo={selectedConcept}
            category={Number(selectedCategory)}
          />
        )}
      </div>
    </div>
  );
}
