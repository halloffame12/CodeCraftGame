
import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

interface PromptPanelProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const examplePrompts = [
  "A classic Snake game",
  "A brick breaker game like Arkanoid",
  "A top-down car driving on a road",
  "A simple platformer with one moving platform",
  "A clicker game where you earn points",
];

const PromptPanel: React.FC<PromptPanelProps> = ({ prompt, setPrompt, onGenerate, isLoading }) => {
  return (
    <div className="w-full md:w-80 shrink-0 bg-gray-900 p-4 flex flex-col border-r border-gray-800 md:overflow-y-auto">
      <h2 className="text-lg font-semibold text-gray-200 mb-4">Game Idea</h2>
      <p className="text-sm text-gray-400 mb-4">
        Describe the game you want to create. Be as specific as you like!
      </p>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="e.g., A simple pong game with a score counter"
        className="flex-grow bg-gray-800 border border-gray-700 rounded-md p-3 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow resize-none"
        rows={8}
      />
      
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">Or try an example:</h3>
        <div className="flex flex-col gap-2">
            {examplePrompts.map((p) => (
                <button 
                    key={p}
                    onClick={() => setPrompt(p)}
                    className="text-left text-sm text-indigo-400 hover:text-indigo-300 hover:bg-gray-800 p-2 rounded-md transition-colors"
                >
                    {p}
                </button>
            ))}
        </div>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading || !prompt}
        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-600 text-white font-bold rounded-md shadow-lg hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed transition-all transform hover:scale-105"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon className="w-5 h-5" />
            Generate Game
          </>
        )}
      </button>
    </div>
  );
};

export default PromptPanel;