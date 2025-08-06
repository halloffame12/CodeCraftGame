
import React from 'react';
import { WorkspaceTab } from '../types';
import type { GameCode } from '../types';
import GamePreview from './GamePreview';
import CodeEditor from './CodeEditor';
import PlayIcon from './icons/PlayIcon';
import CodeIcon from './icons/CodeIcon';
import EyeIcon from './icons/EyeIcon';

interface WorkspacePanelProps {
  activeTab: WorkspaceTab;
  setActiveTab: (tab: WorkspaceTab) => void;
  gameCode: GameCode | null;
  onCodeChange: (newCode: GameCode) => void;
}

const SceneEditorPlaceholder = () => (
  <div className="m-auto flex flex-col items-center justify-center text-indigo-400 bg-gray-900/80 rounded-xl shadow-lg p-10 border-2 border-dashed border-indigo-500 animate-fade-in-up">
    <EyeIcon className="w-20 h-20 mb-6 text-indigo-500 animate-pulse" />
    <h2 className="text-2xl font-extrabold mb-2 tracking-wide">Scene Editor</h2>
    <p className="mt-2 text-center max-w-md text-lg text-indigo-200">
      <span className="block font-semibold mb-2">Visual scene editing is coming soon!</span>
      <span className="text-indigo-300">For now, please modify object positions and properties directly in the <span className="font-mono text-indigo-400">Code Editor</span>.</span>
    </p>
    <div className="mt-6 flex gap-2">
      <span className="inline-block px-3 py-1 bg-indigo-600/80 text-white rounded-full text-xs font-bold animate-bounce">Coming Soon</span>
      <span className="inline-block px-3 py-1 bg-indigo-800/60 text-indigo-200 rounded-full text-xs font-semibold">Stay tuned!</span>
    </div>
  </div>
);

const TabButton: React.FC<{
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, icon, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-t-md border-b-2 transition-colors ${isActive
      ? 'bg-gray-800 text-indigo-400 border-indigo-400'
      : 'text-gray-400 border-transparent hover:bg-gray-800/50 hover:text-gray-200'
      }`}
  >
    {icon}
    {label}
  </button>
);


const WorkspacePanel: React.FC<WorkspacePanelProps> = ({ activeTab, setActiveTab, gameCode, onCodeChange }) => {
  return (
    <div className="flex-1 bg-gray-800 flex flex-col">
      <div className="flex items-center px-2 pt-2 bg-gray-900 border-b border-gray-700">
        <TabButton
          label="Preview"
          icon={<PlayIcon className="w-5 h-5" />}
          isActive={activeTab === WorkspaceTab.Preview}
          onClick={() => setActiveTab(WorkspaceTab.Preview)}
        />
        <TabButton
          label="Code"
          icon={<CodeIcon className="w-5 h-5" />}
          isActive={activeTab === WorkspaceTab.Code}
          onClick={() => setActiveTab(WorkspaceTab.Code)}
        />
        <TabButton
          label="Scene"
          icon={<EyeIcon className="w-5 h-5" />}
          isActive={activeTab === WorkspaceTab.Scene}
          onClick={() => setActiveTab(WorkspaceTab.Scene)}
        />
      </div>
      <div className="flex-1 overflow-auto bg-gray-950">
        {activeTab === WorkspaceTab.Preview && <GamePreview gameCode={gameCode} />}
        {activeTab === WorkspaceTab.Code && <CodeEditor gameCode={gameCode} onCodeChange={onCodeChange} />}
        {activeTab === WorkspaceTab.Scene && <div className="w-full h-full flex"><SceneEditorPlaceholder /></div>}
      </div>
    </div>
  );
};

export default WorkspacePanel;
