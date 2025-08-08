
import React, { useState, useCallback, useRef } from 'react';
import { GameCode, WorkspaceTab } from './types';
import { generateGameCode } from './services/geminiService';
import Header from './components/Header';
import PromptPanel from './components/PromptPanel';
import WorkspacePanel from './components/WorkspacePanel';
import AIAssistantPanel from './components/AIAssistantPanel';
import LandingPage from './components/LandingPage';
import { useNavigate } from 'react-router-dom';
import { useUser, UserButton, useClerk } from '@clerk/clerk-react';

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
  const [mobileSection, setMobileSection] = useState<'prompt' | 'workspace' | 'assistant'>('workspace');
  const swipeStartX = useRef<number | null>(null);
  const swipeEndX = useRef<number | null>(null);

  const mobileSections: Array<'prompt' | 'workspace' | 'assistant'> = ['prompt', 'workspace', 'assistant'];
  const goToSectionIndex = (index: number) => {
    const clamped = Math.max(0, Math.min(mobileSections.length - 1, index));
    setMobileSection(mobileSections[clamped]);
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    swipeStartX.current = e.touches[0].clientX;
    swipeEndX.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    swipeEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (swipeStartX.current == null || swipeEndX.current == null) return;
    const deltaX = swipeEndX.current - swipeStartX.current;
    const threshold = 50; // px
    if (Math.abs(deltaX) >= threshold) {
      const currentIndex = mobileSections.indexOf(mobileSection);
      if (deltaX < 0) {
        goToSectionIndex(currentIndex + 1);
      } else {
        goToSectionIndex(currentIndex - 1);
      }
    }
    swipeStartX.current = null;
    swipeEndX.current = null;
  };

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
      <div className={`${mobileSection === 'workspace' ? 'hidden' : 'flex'} md:flex justify-end p-4`}>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className={`${mobileSection === 'workspace' ? 'hidden' : 'block'} md:block`}>
        <Header
          onExport={handleExport}
          isExportDisabled={!gameCode || isLoading}
          onLogout={signOut}
        />
      </div>
      {/* Mobile section switcher */}
      <div className="md:hidden px-4 pb-2">
        <div className="grid grid-cols-3 gap-2">
          <button
            className={`px-3 py-2 text-sm font-medium rounded-md border ${mobileSection === 'prompt' ? 'bg-gray-800 text-indigo-400 border-indigo-400' : 'bg-gray-900 text-gray-300 border-gray-700'}`}
            onClick={() => setMobileSection('prompt')}
          >
            Prompt
          </button>
          <button
            className={`px-3 py-2 text-sm font-medium rounded-md border ${mobileSection === 'workspace' ? 'bg-gray-800 text-indigo-400 border-indigo-400' : 'bg-gray-900 text-gray-300 border-gray-700'}`}
            onClick={() => setMobileSection('workspace')}
          >
            Preview
          </button>
          <button
            className={`px-3 py-2 text-sm font-medium rounded-md border ${mobileSection === 'assistant' ? 'bg-gray-800 text-indigo-400 border-indigo-400' : 'bg-gray-900 text-gray-300 border-gray-700'}`}
            onClick={() => setMobileSection('assistant')}
          >
            Assistant
          </button>
        </div>
      </div>
      <div className="flex flex-col md:flex-row flex-1 min-h-0 overflow-hidden md:overflow-visible" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div className={`${mobileSection === 'prompt' ? 'block' : 'hidden'} md:block`}>
          <PromptPanel
            prompt={prompt}
            setPrompt={setPrompt}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        <div className={`${mobileSection === 'workspace' ? 'flex min-h-0 flex-1' : 'hidden'} md:flex md:flex-1 min-h-0 relative`}>
          <WorkspacePanel
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            gameCode={gameCode}
            onCodeChange={handleCodeChange}
          />
          {/* Floating controls on mobile while in Preview */}
          {mobileSection === 'workspace' && (
            <div className="md:hidden absolute bottom-4 right-4 flex gap-2">
              <button
                onClick={() => setMobileSection('prompt')}
                className="px-3 py-2 rounded-md bg-gray-900/80 text-gray-100 border border-gray-700 backdrop-blur shadow"
              >
                Back
              </button>
              <button
                onClick={handleExport}
                disabled={!gameCode || isLoading}
                className="px-3 py-2 rounded-md bg-indigo-600 text-white border border-indigo-500 shadow disabled:bg-gray-600 disabled:border-gray-600"
              >
                Export
              </button>
            </div>
          )}
        </div>
        <div className={`${mobileSection === 'assistant' ? 'block' : 'hidden'} md:block`}>
          <AIAssistantPanel explanation={aiExplanation} isLoading={isLoading} />
        </div>
      </div>
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
