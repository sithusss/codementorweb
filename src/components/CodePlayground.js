'use client';
import { useState, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { Sparkles } from 'lucide-react';

export default function CodePlayground({ conceptNo, category, questionNo }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [optimalCode, setOptimalCode] = useState('');
  const [showOptimal, setShowOptimal] = useState(false);

  // Map category to Judge0 language ID
  const categoryToLanguageId = {
    1: 62, // Java
    2: 51, // C#
    3: 82, // MySQL
  };

  const currentLanguageId = categoryToLanguageId[Number(category)];

  // Fetch questions for the given conceptNo
  useEffect(() => {
    if (conceptNo) {
      fetch(`/api/question?concept_no=${conceptNo}`)
        .then((res) => res.json())
        .then((data) => {
          setQuestions(data || []);
          setCurrentIdx(0);
        });
    }

    if(questionNo){
      fetch(`/api/question?question_no=${questionNo}`)
        .then((res) => res.json())
        .then((data) => {
          setCode(data || []);
        });
    }
  }, [conceptNo, questionNo]);

  const currentQuestion = questions[currentIdx];

  useEffect(() => {
    setShowOptimal(false);
    setOptimalCode('');
  }, [currentIdx]);

  const handleRunCode = async () => {
    if (!currentLanguageId) {
      setOutput('Invalid category selected.');
      return;
    }

    setOutput('Running...');
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language_id: currentLanguageId }),
      });
      const data = await res.json();
      setOutput(data.output || 'No output');
    } catch (error) {
      setOutput('Error: ' + error.message);
    }
  };

  const fetchOptimalCode = async (questionNo) => {
  try {
    const res = await fetch(`/api/answers?question_no=${questionNo}`);
    const data = await res.json();
    if (res.ok && data.code) {
      setOptimalCode(data.code);
    } else {
      setOptimalCode('// No optimal code found.');
    }
    setShowOptimal(true);
  } catch (err) {
    console.error('Error fetching optimal code:', err);
    setOptimalCode('// Error fetching optimal code.');
    setShowOptimal(true);
  }
};

  const handlePrev = () => setCurrentIdx((idx) => Math.max(0, idx - 1));
  const handleNext = () => setCurrentIdx((idx) => Math.min(questions.length - 1, idx + 1));

  return (
    <div className="max-w-9xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-blue-800">Try Your Code</h2>

      {/* Show current question */}
      {currentQuestion && (
        <div className="mb-4 p-4 bg-blue-50 rounded">
          <div className="font-semibold text-xl text-blue-700">
            Practice Question {currentIdx + 1} of {questions.length}
          </div>
          <div className="text-lg text-gray-700">{currentQuestion.question}</div>
          <div className="flex gap-2 text-lg mt-2">
            <button onClick={handlePrev} disabled={currentIdx === 0} className="px-3 py-1 bg-blue-700 rounded disabled:opacity-50">Previous</button>
            <button onClick={handleNext} disabled={currentIdx === questions.length - 1} className="px-3 py-1 bg-blue-700 rounded disabled:opacity-50">Next</button>
          </div>
        </div>
      )}

      {/* Code Editor + Output */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Code Editor</h3>
          <CodeMirror value={code} height="300px" extensions={[javascript()]} onChange={setCode} theme="light"  style={{ color: 'black' }} />
        </div>
        <div className="flex-1 bg-gray-100 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Output</h3>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
        </div>
      </div>

      <button onClick={handleRunCode} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Run Code</button>

      {/* Optimal Code Section */}
      {currentQuestion && (
        <button
          onClick={() => fetchOptimalCode(currentQuestion.question_no)}
          className="flex items-center gap-2 bg-purple-600 text-white px-5 py-3 rounded-full hover:bg-purple-700 transition mt-4"
        >
          <Sparkles size={20} /> See the Answer
        </button>
      )}

      {showOptimal && optimalCode && (
        <textarea
          className="mt-4 w-full h-60 p-3 rounded-md border border-gray-300 bg-gray-50 resize-none text-gray-700"
          value={optimalCode}
          readOnly
        />
      )}
    </div>
  );
}
