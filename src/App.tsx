/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { Dimension } from './data/questions';

type AppState = 'home' | 'quiz' | 'result';

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [scores, setScores] = useState<Record<Dimension, number> | null>(null);

  const handleStart = () => {
    setAppState('quiz');
  };

  const handleComplete = (finalScores: Record<Dimension, number>) => {
    setScores(finalScores);
    setAppState('result');
  };

  const handleRestart = () => {
    setScores(null);
    setAppState('home');
  };

  return (
    <div className="font-sans text-gray-900 antialiased">
      {appState === 'home' && <Home onStart={handleStart} />}
      {appState === 'quiz' && <Quiz onComplete={handleComplete} />}
      {appState === 'result' && scores && (
        <Result scores={scores} onRestart={handleRestart} />
      )}
    </div>
  );
}
