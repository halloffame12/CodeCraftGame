
import React from 'react';
import WandIcon from './icons/WandIcon';

interface AIAssistantPanelProps {
  explanation: string;
  isLoading: boolean;
}

const AIAssistantPanel: React.FC<AIAssistantPanelProps> = ({ explanation, isLoading }) => {
  return (
    <div className="w-full md:w-80 shrink-0 bg-gray-900 p-4 border-l border-gray-800 flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <WandIcon className="w-6 h-6 text-purple-400" />
        <h2 className="text-lg font-semibold text-gray-200">AI Assistant</h2>
      </div>
      <div className="bg-gray-800 rounded-md p-4 flex-grow overflow-y-auto">
        {isLoading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
          </div>
        ) : explanation ? (
          <p className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed">{explanation}</p>
        ) : (
          <div className="text-center text-gray-500 h-full flex flex-col justify-center">
             <p>The AI will provide an explanation of the generated code here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIAssistantPanel;