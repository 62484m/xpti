/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { Dimension } from './data/questions';

type AppState = 'home' | 'quiz' | 'result';

// All waifu images to preload
const PRELOAD_IMAGES = [
  '/images/女仆2.webp', '/images/女仆.webp',
  '/images/猫娘.webp', '/images/猫娘1.webp',
  '/images/千金.webp', '/images/千金1.webp',
  '/images/修女.webp', '/images/修女1.webp',
  '/images/古桥.webp', '/images/古桥2.webp',
  '/images/旋风.webp', '/images/旋风2.webp',
  '/images/近邻.webp', '/images/近邻1.webp',
  '/images/地雷.webp', '/images/地雷1.webp'
];

export default function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [scores, setScores] = useState<Record<Dimension, number> | null>(null);

  // Preload images when quiz starts
  useEffect(() => {
    if (appState === 'quiz') {
      PRELOAD_IMAGES.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    }
  }, [appState]);

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
