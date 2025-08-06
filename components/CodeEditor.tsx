
import React from 'react';
import type { GameCode } from '../types';

interface CodeEditorProps {
  gameCode: GameCode | null;
  onCodeChange: (newCode: GameCode) => void;
}

const EditorSection: React.FC<{ title: string; language: string; value: string; onChange: (value: string) => void; disabled: boolean; }> = ({ title, language, value, onChange, disabled }) => (
  <div className="flex flex-col h-1/3">
    <div className="bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-300 border-b border-gray-700 flex justify-between items-center">
      <h3>{title}</h3>
      <span className="text-xs text-gray-500 uppercase">{language}</span>
    </div>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="flex-grow bg-gray-900 p-4 font-mono text-sm text-green-300 resize-none focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:text-gray-500"
      spellCheck="false"
    />
  </div>
);

const CodeEditor: React.FC<CodeEditorProps> = ({ gameCode, onCodeChange }) => {
  const handleHtmlChange = (value: string) => {
    if (gameCode) onCodeChange({ ...gameCode, html: value });
  };
  const handleCssChange = (value: string) => {
    if (gameCode) onCodeChange({ ...gameCode, css: value });
  };
  const handleJsChange = (value: string) => {
    if (gameCode) onCodeChange({ ...gameCode, js: value });
  };

  return (
    <div className="w-full h-full bg-gray-950 flex flex-col overflow-hidden">
      <EditorSection
        title="HTML"
        language="html"
        value={gameCode?.html ?? ''}
        onChange={handleHtmlChange}
        disabled={!gameCode}
      />
      <EditorSection
        title="CSS"
        language="css"
        value={gameCode?.css ?? ''}
        onChange={handleCssChange}
        disabled={!gameCode}
      />
      <EditorSection
        title="JavaScript"
        language="javascript"
        value={gameCode?.js ?? ''}
        onChange={handleJsChange}
        disabled={!gameCode}
      />
    </div>
  );
};

export default CodeEditor;
