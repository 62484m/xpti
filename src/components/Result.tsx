import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Share2, ShoppingCart } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Dimension } from '../data/questions';
import { resultTypes } from '../data/types';

interface ResultProps {
  scores: Record<Dimension, number>;
  onRestart: () => void;
}

export default function Result({ scores, onRestart }: ResultProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const resultType = useMemo(() => {
    const d1 = scores.D >= scores.S ? 'D' : 'S';
    const d2 = scores.V >= scores.E ? 'V' : 'E';
    const d3 = scores.P >= scores.N ? 'P' : 'N';
    const d4 = scores.F >= scores.R ? 'F' : 'R';
    const code = `${d1}${d2}${d3}${d4}`;
    return resultTypes[code] || resultTypes['DVPF']; // fallback
  }, [scores]);

  const radarData = useMemo(() => {
    return [
      { subject: '支配(D)', A: scores.D, fullMark: 5 },
      { subject: '视觉(V)', A: scores.V, fullMark: 5 },
      { subject: '纯爱(P)', A: scores.P, fullMark: 5 },
      { subject: '幻想(F)', A: scores.F, fullMark: 5 },
      { subject: '顺从(S)', A: scores.S, fullMark: 5 },
      { subject: '情感(E)', A: scores.E, fullMark: 5 },
      { subject: '混沌(N)', A: scores.N, fullMark: 5 },
      { subject: '现实(R)', A: scores.R, fullMark: 5 },
    ];
  }, [scores]);

  const waifu = useMemo(() => {
    const isD = scores.D >= scores.S;
    const isV = scores.V >= scores.E;
    const isP = scores.P >= scores.N;
    
    // 组合前三个维度生成8种老婆类型
    const key = `${isD ? 'D' : 'S'}${isV ? 'V' : 'E'}${isP ? 'P' : 'N'}`;
    
    // 在这里修改你的立绘图片和淘宝链接！
    const waifus: Record<string, { name: string, imageUrl: string, taobaoUrl: string, desc: string }> = {
      'DVP': { 
        name: '纯情小女仆', 
        imageUrl: '/images/女仆2.png', // 替换为你上传的图片名
        taobaoUrl: 'https://s.taobao.com/search?q=%E7%BA%AF%E6%83%85%E5%B0%8F%E5%A5%B3%E4%BB%86+%E4%BA%8C%E6%AC%A1%E5%85%83+%E6%8A%B1%E6%9E%95',
        desc: '乖巧听话，满眼都是你' 
      },
      'DVN': { 
        name: '温情猫娘', 
        imageUrl: '/images/猫娘.png', // 替换为你上传的图片名
        taobaoUrl: 'https://s.taobao.com/search?q=%E7%97%85%E5%A8%87%E5%B0%8F%E6%81%B6%E9%AD%94+%E4%BA%8C%E6%AC%A1%E5%85%83+%E6%8A%B1%E6%9E%95',
        desc: '有点坏坏的，但完全被你掌控' 
      },
      'DEP': { 
        name: '温柔青梅竹马', 
        imageUrl: '/images/千金.png', // 替换为你上传的图片名
        taobaoUrl: 'https://s.taobao.com/search?q=%E6%B8%A9%E6%9F%94%E9%9D%92%E6%A2%85%E7%AB%B9%E9%A9%AC+%E4%BA%8C%E6%AC%A1%E5%85%83+%E6%8A%B1%E6%9E%95',
        desc: '懂你的奇奇怪怪，永远支持你' 
      },
      'DEN': { 
        name: '堕落修女', 
        imageUrl: '/images/修女.png', // 替换为你上传的图片名
        taobaoUrl: 'https://s.taobao.com/search?q=%E5%A0%95%E8%90%BD%E5%9C%A3%E5%A5%B3+%E4%BA%8C%E6%AC%A1%E5%85%83+%E6%8A%B1%E6%9E%95',
        desc: '灵魂深处的纠葛与臣服' 
      },
      'SVP': { 
        name: '高冷御姐', 
        imageUrl: '/images/古桥.png', // 替换为你上传的图片名
        taobaoUrl: 'https://s.taobao.com/search?q=%E9%AB%98%E5%86%B7%E5%BE%A1%E5%A7%90+%E4%BA%8C%E6%AC%A1%E5%85%83+%E6%8A%B1%E6%9E%95',
        desc: '外表高冷，只把你当成专属宠物' 
      },
      'SVN': { 
        name: '抖S女王', 
        imageUrl: '/images/旋风.png', // 替换为你上传的图片名
        taobaoUrl: 'https://s.taobao.com/search?q=%E6%8A%96S%E5%A5%B3%E7%8E%8B+%E4%BA%8C%E6%AC%A1%E5%85%83+%E6%8A%B1%E6%9E%95',
        desc: '绝对的支配者，让你欲罢不能' 
      },
      'SEP': { 
        name: '知性大姐姐', 
        imageUrl: '/images/近邻.png', // 替换为你上传的图片名
        taobaoUrl: 'https://s.taobao.com/search?q=%E7%9F%A5%E6%80%A7%E5%A4%A7%E5%A7%90%E5%A7%90+%E4%BA%8C%E6%AC%A1%E5%85%83+%E6%8A%B1%E6%9E%95',
        desc: '在精神上完全包容并引导你' 
      },
      'SEN': { 
        name: '腹黑地雷女', 
        imageUrl: '/images/地雷.png', // 替换为你上传的图片名
        taobaoUrl: 'https://s.taobao.com/search?q=%E8%85%B9%E9%BB%91%E9%AD%94%E5%A5%B3+%E4%BA%8C%E6%AC%A1%E5%85%83+%E6%8A%B1%E6%9E%95',
        desc: '将你玩弄于股掌之间的危险迷人精' 
      },
    };
    
    return waifus[key];
  }, [scores]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'XPTI 人格测试',
          text: `我的XPTI测试结果是：${resultType.code} - ${resultType.name}！快来测测你的XP吧！`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Share failed', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('链接已复制到剪贴板，快去粘贴分享给朋友吧！');
      } catch (err) {
        alert('复制失败，请手动复制浏览器地址栏的链接哦~');
      }
    }
  };

  return (
    <div className="min-h-screen py-6 px-4 flex flex-col items-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
      >
        {/* Header Section - Compact */}
        <div 
          className="p-5 text-center text-white relative overflow-hidden"
          style={{ backgroundColor: resultType.color }}
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          <div className="relative z-10">
            <h2 className="text-sm font-medium opacity-90 mb-1">你的 XPTI 类型</h2>
            <h1 className="text-4xl font-black tracking-wider mb-1 drop-shadow-md">
              {resultType.code}
            </h1>
            <h3 className="text-xl font-bold mb-3">{resultType.name}</h3>
            
            <div className="flex flex-wrap justify-center gap-1.5">
              {resultType.traits.map((trait, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium border border-white/30"
                >
                  {trait}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-6">
          
          {/* Waifu Card - Moved to top, compact */}
          <div className="w-full bg-gray-50 rounded-xl p-3 border border-gray-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-4 left-4 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm">
              100% 契合
            </div>
            <div className="aspect-[3/4] w-full rounded-lg overflow-hidden bg-gray-200 relative">
              {/* Loading Spinner */}
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                  <div className="w-8 h-8 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin"></div>
                </div>
              )}
              <img 
                src={waifu.imageUrl}
                alt={waifu.name}
                loading="lazy"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
                <h4 className="text-white font-bold text-xl mb-0.5">{waifu.name}</h4>
                <p className="text-white/90 text-xs leading-tight">{waifu.desc}</p>
              </div>
            </div>
            
            <a 
              href={waifu.taobaoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full flex items-center justify-center px-4 py-2.5 bg-[#ff5000] text-white rounded-lg text-sm font-bold hover:bg-[#e04600] transition-colors shadow-sm"
            >
              <ShoppingCart className="w-4 h-4 mr-1.5" />
              前往淘宝带她回家
            </a>
          </div>

          {/* Description - Compact */}
          <div>
            <h4 className="text-base font-bold text-gray-800 mb-2">类型解析</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {resultType.description}
            </p>
          </div>

          {/* Radar Chart - Compact */}
          <div className="h-[220px] w-full flex flex-col items-center bg-gray-50 rounded-xl p-2 border border-gray-100">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="#e5e7eb" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke={resultType.color}
                  fill={resultType.color}
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          {/* Action Buttons - Compact */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleShare}
              className="flex-1 flex items-center justify-center py-3 bg-gray-900 text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors shadow-sm"
            >
              <Share2 className="w-4 h-4 mr-1.5" />
              分享
            </button>
            <button
              onClick={onRestart}
              className="flex-1 flex items-center justify-center py-3 bg-white text-gray-700 border border-gray-200 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4 mr-1.5" />
              重测
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
