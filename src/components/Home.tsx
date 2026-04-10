import { ArrowRight } from 'lucide-react';

interface HomeProps {
  onStart: () => void;
}

export default function Home({ onStart }: HomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 text-center">
      <div className="max-w-xl w-full bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          XPTI 人格测试
        </h1>
        
        <p className="text-lg text-gray-600 mb-8">
          MBTI已经过时，是时候来测测你的真实XP了！
        </p>
        
        <div className="text-left text-gray-600 mb-10 bg-gray-50 p-6 rounded-xl text-sm leading-relaxed">
          <p className="font-semibold mb-3 text-gray-800">测试说明：</p>
          <ul className="list-disc list-inside space-y-2">
            <li>本测试共20题，专为男生打造，基于4个维度评估你的XP倾向。</li>
            <li>请根据你的<strong>第一直觉</strong>和<strong>真实想法</strong>作答。</li>
          </ul>
        </div>

        <button
          onClick={onStart}
          className="inline-flex items-center justify-center px-8 py-3 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800 transition-colors w-full sm:w-auto"
        >
          开始测试
          <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
