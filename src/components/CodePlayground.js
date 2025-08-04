'use client';

import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';

export default function CodePlayground() {
  const [code, setCode] = useState('// Write your JS code here');
  const [output, setOutput] = useState('');

  const handleRunCode = async () => {
    const res = await fetch('/api/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
    const data = await res.json();
    setOutput(data.output);
  };

  return (
    <div className="max-w-9xl mx-auto p-6 space-y-6 bg-white rounded-xl shadow">
    <h2 className="text-2xl font-bold text-blue-800">Try Your Code</h2>
    <p className="text-lg font-normal text-blue-600">Question : lorem
      ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
    </p>
    {/* Horizontal container */}
    <div className="flex flex-col md:flex-row gap-6">
      {/* Code Input */}
      <div className="flex-1 bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-700">Code Editor</h3>
        <CodeMirror
          value={code}
          height="300px"
          extensions={[javascript()]}
          onChange={(value) => setCode(value)}
          theme="light"
          style={{ color: '#03320cff' }}
        />
      </div>

      {/* Output */}
      <div className="flex-1 bg-gray-100 rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Output</h3>
        <pre className="text-sm text-gray-800 whitespace-pre-wrap">{output}</pre>
      </div>
    </div>

    {/* Run button */}
    <button
      onClick={handleRunCode}
      className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
      Run Code
    </button>
  </div>

  );
}
