import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, Dimension } from '../data/questions';

interface QuizProps {
  onComplete: (answers: Record<Dimension, number>) => void;
}

export default function Quiz({ onComplete }: QuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    D: 0, S: 0,
    V: 0, E: 0,
    P: 0, N: 0,
    F: 0, R: 0,
  });

  const question = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / questions.length) * 100;

  const handleOptionClick = (value: Dimension | null) => {
    const newScores = { ...scores };
    if (value) {
      newScores[value] = scores[value] + 1;
    }
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      onComplete(newScores as Record<Dimension, number>);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-pink-50 p-4 sm:p-6">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
            <span>进度</span>
            <span>{currentQuestionIndex + 1} / {questions.length}</span>
          </div>
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-10 border border-white/50 flex flex-col"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed text-center flex-grow flex items-center justify-center">
                {question.text}
              </h2>

              <div className="space-y-3 sm:space-y-4">
                {question.options.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 244, 255, 0.8)' }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleOptionClick(option.value)}
                    className="w-full p-4 sm:p-5 text-left text-base sm:text-lg font-medium text-gray-700 bg-white border-2 border-pink-100 rounded-2xl hover:border-pink-400 hover:text-pink-600 transition-colors shadow-sm"
                  >
                    {option.text}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
