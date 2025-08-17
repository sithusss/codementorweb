'use client';

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function CodePlayground({ question }) {
  const [code, setCode] = useState('// Write your code here');
  const [output, setOutput] = useState('');

  const handleRunCode = async () => {
    setOutput("Running...");
    try {
      const res = await fetch('/api/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: question?.language }),
      });
      const data = await res.json();
      setOutput(data.output || "No output");
    } catch (error) {
      setOutput("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-9xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold text-blue-800">Try Your Code</h2>

      {question && (
        <div className="mb-4 p-4 bg-blue-50 rounded">
          <div className="font-semibold text-blue-700">{question.title}</div>
          <div className="text-gray-700">{question.description}</div>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-blue-700">Code Editor</h3>
          <CodeMirror
            value={code}
            height="300px"
            extensions={[javascript()]}
            onChange={setCode}
            theme="light"
            style={{ color: 'black'}}
          />
        </div>
        <div className="flex-1 bg-gray-100 rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Output</h3>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
        </div>
      </div>

      <button
        onClick={handleRunCode}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Run Code
      </button>
    </div>
  );
}