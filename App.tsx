
import React, { useState, useCallback } from 'react';
import { GameCode, WorkspaceTab } from './types';
import { generateGameCode } from './services/geminiService';
import Header from './components/Header';
import PromptPanel from './components/PromptPanel';
import WorkspacePanel from './components/WorkspacePanel';
import AIAssistantPanel from './components/AIAssistantPanel';
import LandingPage from './components/LandingPage';
import { useNavigate } from 'react-router-dom';
import { useUser, UserButton, useClerk } from '@clerk/clerk-react';
import SparklesIcon from './components/icons/SparklesIcon';
import WandIcon from './components/icons/WandIcon';

const App: React.FC = () => {
  const { isSignedIn, isLoaded } = useUser();
  const navigate = useNavigate();
  const { signOut } = useClerk();

  const [prompt, setPrompt] = useState<string>('A classic Snake game where the player controls a snake to eat food and grow longer.');
  const [gameCode, setGameCode] = useState<GameCode | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<WorkspaceTab>(WorkspaceTab.Preview);
  const [showPromptMobile, setShowPromptMobile] = useState<boolean>(false);
  const [showAssistantMobile, setShowAssistantMobile] = useState<boolean>(false);

  const handleSignIn = () => navigate('/sign-in');
  const handleSignUp = () => navigate('/sign-up');

  const handleGenerate = useCallback(async () => {
    if (!prompt || isLoading) return;
    setIsLoading(true);
    setError(null);
    setGameCode(null);
    setAiExplanation('');
    setActiveTab(WorkspaceTab.Preview);

    try {
      const { gameCode: newGameCode, explanation } = await generateGameCode(prompt);
      setGameCode(newGameCode);
      setAiExplanation(explanation);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(errorMessage);
      setAiExplanation(`An error occurred: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, isLoading]);

  const handleCodeChange = (newCode: GameCode) => {
    setGameCode(newCode);
  };

  const handleExport = useCallback(() => {
    if (!gameCode) return;
    const { html, css, js, gameName } = gameCode;
    const fullHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${gameName}</title>
        <style>
          ${css}
        </style>
      </head>
      <body>
        ${html}
        <script>
          ${js}
        </script>
      </body>
      </html>
    `;
    const blob = new Blob([fullHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gameName.replace(/\s+/g, '_').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [gameCode]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return <LandingPage onSignIn={handleSignIn} onSignUp={handleSignUp} />;
  }

  // Main app UI for signed-in users
  return (
    <div className="h-screen w-screen bg-gray-950 text-gray-100 flex flex-col font-sans">
      <Header
        onExport={handleExport}
        isExportDisabled={!gameCode || isLoading}
        onLogout={signOut}
      />
      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden">
        <div className="hidden md:block md:min-h-0 md:max-w-[24rem] lg:max-w-[28rem]">
          <PromptPanel
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        <WorkspacePanel
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          gameCode={gameCode}
          onCodeChange={handleCodeChange}
        />
        <div className="hidden md:block md:min-h-0 md:max-w-[24rem] lg:max-w-[28rem]">
          <AIAssistantPanel explanation={aiExplanation} isLoading={isLoading} />
        </div>
      </div>

      {/* Mobile floating action buttons */}
      <div className="md:hidden fixed bottom-4 left-4 z-40">
        <button
          onClick={() => setShowPromptMobile(true)}
          className="p-3 rounded-full bg-indigo-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          aria-label="Open prompt panel"
        >
          <SparklesIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <button
          onClick={() => setShowAssistantMobile(true)}
          className="p-3 rounded-full bg-purple-600 text-white shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Open AI assistant panel"
        >
          <WandIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile overlays */}
      {showPromptMobile && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowPromptMobile(false)}
          />
          <div className="absolute inset-y-0 left-0 w-11/12 max-w-sm bg-gray-900 border-r border-gray-800 shadow-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-gray-200">Game Idea</h2>
              <button
                onClick={() => setShowPromptMobile(false)}
                className="px-2 py-1 text-sm rounded bg-gray-800 text-gray-200 hover:bg-gray-700"
              >
                Close
              </button>
            </div>
            <PromptPanel
              prompt={prompt}
              setPrompt={setPrompt}
              onGenerate={handleGenerate}
              isLoading={isLoading}
              isMobileFullHeight
            />
          </div>
        </div>
      )}

      {showAssistantMobile && (
        <div className="fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setShowAssistantMobile(false)}
          />
          <div className="absolute inset-y-0 right-0 w-11/12 max-w-sm bg-gray-900 border-l border-gray-800 shadow-2xl p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-base font-semibold text-gray-200">AI Assistant</h2>
              <button
                onClick={() => setShowAssistantMobile(false)}
                className="px-2 py-1 text-sm rounded bg-gray-800 text-gray-200 hover:bg-gray-700"
              >
                Close
              </button>
            </div>
            <AIAssistantPanel
              explanation={aiExplanation}
              isLoading={isLoading}
              isMobileFullHeight
            />
          </div>
        </div>
      )}

      {error && (
        <div
          className="absolute bottom-4 right-4 bg-red-800 border border-red-600 text-white p-4 rounded-lg shadow-xl max-w-sm animate-pulse"
          role="alert"
          onClick={() => setError(null)}
        >
          <p className="font-bold mb-1">Error Generating Game</p>
          <p className="text-sm">{error}</p>
        </div>
      )}
    </div>
  );
};

export default App;
