
import React, { useMemo } from 'react';
import type { GameCode } from '../types';
import PlayIcon from './icons/PlayIcon';

interface GamePreviewProps {
  gameCode: GameCode | null;
}

const GamePreview: React.FC<GamePreviewProps> = ({ gameCode }) => {
  const srcDoc = useMemo(() => {
    if (!gameCode) return '';
    const { html, css, js } = gameCode;
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Game Preview</title>
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
  }, [gameCode]);

  return (
    <div className="w-full h-full bg-gray-950 flex flex-col">
      {gameCode ? (
        <iframe
          srcDoc={srcDoc}
          title="Game Preview"
          sandbox="allow-scripts allow-pointer-lock"
          className="w-full h-full border-0"
        />
      ) : (
        <div className="m-auto flex flex-col items-center justify-center text-gray-500">
          <PlayIcon className="w-16 h-16 mb-4" />
          <h2 className="text-xl font-semibold">Game Preview</h2>
          <p className="mt-2 text-center">Your generated game will appear here.</p>
          <p className="text-sm text-gray-600 mt-1">Describe your game and click "Generate" to start.</p>
        </div>
      )}
    </div>
  );
};

export default GamePreview;
