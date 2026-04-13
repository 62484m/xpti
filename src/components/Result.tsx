import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Share2, ShoppingCart } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Dimension } from '../data/questions';
import { resultTypes } from '../data/types';

interface ResultProps {
  scores: Record<Dimension, number>;
  onRestart: () => void;
}

// Add this component above the Result component
const WaifuImage: React.FC<{ url: string, name: string, desc: string }> = ({ url, name, desc }) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="aspect-[3/4] w-[85%] sm:w-full flex-none snap-center rounded-lg overflow-hidden bg-gray-200 relative shadow-sm">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin"></div>
        </div>
      )}
      <img 
        src={url}
        alt={name}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent flex flex-col justify-end p-4">
        <h4 className="text-white font-bold text-xl mb-0.5">{name}</h4>
        <p className="text-white/90 text-xs leading-tight">{desc}</p>
      </div>
    </div>
  );
}

export default function Result({ scores, onRestart }: ResultProps) {
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
    const waifus: Record<string, { name: string, imageUrls: string[], taobaoUrl: string, desc: string, quote: string }> = {
      'DVP': { 
        name: '纯情小女仆', 
        imageUrls: [
          '/images/女仆2.webp', 
          '/images/女仆.webp' // 备用图片，可替换
        ],
        taobaoUrl: 'https://s.tb.cn/c.0xmLqL',
        desc: '乖巧听话，满眼都是你',
        quote: '“主人，欢迎回来...（提裙摆）您是先吃饭，先洗澡，还是...先拆开下面的包裹呢？”'
      },
      'DVN': { 
        name: '温情猫娘', 
        imageUrls: [
          '/images/猫娘.webp',
          '/images/猫娘1.webp'
        ],
        taobaoUrl: 'https://s.tb.cn/c.0xm2Oq',
        desc: '有点坏坏的，但完全被你掌控',
        quote: '“喵呜~ 主人今天也辛苦啦！（蹭蹭）作为奖励，下面有猫猫为你准备的特别礼物哦~”'
      },
      'DEP': { 
        name: '温柔青梅竹马', 
        imageUrls: [
          '/images/千金.webp',
          '/images/千金1.webp'
        ],
        taobaoUrl: 'https://s.tb.cn/c.0x3j2K',
        desc: '懂你的奇奇怪怪，永远支持你',
        quote: '“真是的，从小到大你的XP还是这么好懂...（叹气）喏，你要的东西我帮你找好了，在下面。”'
      },
      'DEN': { 
        name: '堕落修女的侍奉', 
        imageUrls: [
          '/images/修女.webp',
          '/images/修女1.webp'
        ],
        taobaoUrl: 'https://s.tb.cn/c.0x3y5M',
        desc: '灵魂深处的纠葛与臣服',
        quote: '“迷途的羔羊啊，你的欲望已经满溢了...（轻笑）来吧，接受这专属的‘惩罚工具’吧。”'
      },
      'SVP': { 
        name: '高冷御姐', 
        imageUrls: [
          '/images/古桥.webp',
          '/images/古桥2.webp'
        ],
        taobaoUrl: 'https://s.tb.cn/c.0DB3BG',
        desc: '外表高冷，只把你当成专属宠物',
        quote: '“就这点出息？（挑眉）既然你这么想要，下面那个东西...自己拿去用吧。”'
      },
      'SVN': { 
        name: '抖S女王', 
        imageUrls: [
          '/images/旋风.webp',
          '/images/旋风2.webp'
        ],
        taobaoUrl: 'https://s.tb.cn/c.0DFCI5',
        desc: '绝对的支配者，让你欲罢不能',
        quote: '“原来你喜欢这种刺激...（踩）刚好，我为你准备了专属的‘惩罚工具’，就在下面，还不快谢恩？”'
      },
      'SEP': { 
        name: '知性大姐姐', 
        imageUrls: [
          '/images/近邻.webp',
          '/images/近邻1.webp'
        ],
        taobaoUrl: 'https://s.tb.cn/c.0xOmdL',
        desc: '在精神上完全包容并引导你',
        quote: '“哎呀，真是个不坦率的孩子呢...（摸头）姐姐懂你的，你需要的东西，已经放在下面了哦。”'
      },
      'SEN': { 
        name: '腹黑地雷女', 
        imageUrls: [
          '/images/地雷.webp',
          '/images/地雷1.webp'
        ],
        taobaoUrl: 'https://s.tb.cn/c.0x3UHx',
        desc: '将你玩弄于股掌之间的危险迷人精',
        quote: '“呐呐，你只能看着我一个人对吧？（病娇笑）如果你敢看别人，我就用下面的东西把你...”'
      },
    };
    
    return waifus[key];
  }, [scores]);

  const handleShare = async () => {
    const shareText = '【XP测试】转发给你的绅士朋友也试试吧 https://xpti.pages.dev/';
    try {
      await navigator.clipboard.writeText(shareText);
      alert('已复制网址，转发给朋友测试一下');
    } catch (err) {
      alert('复制失败，请手动复制网址：https://xpti.pages.dev/');
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
            <div className="absolute top-4 left-4 bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-20 shadow-sm">
              100% 契合
            </div>
            
            {/* Horizontal Scroll Container */}
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
              {waifu.imageUrls.map((url, idx) => (
                <WaifuImage key={idx} url={url} name={waifu.name} desc={waifu.desc} />
              ))}
            </div>
            
            <div className="text-center text-xs text-gray-400 mt-1 mb-2">
              左右滑动查看更多形态 👉
            </div>
            
            {/* 专属台词 */}
            <div className="mt-2 mb-3 px-3 py-2.5 bg-pink-50/80 rounded-lg border border-pink-100 relative">
              <div className="absolute -top-2 left-2 text-pink-300 text-3xl leading-none font-serif">"</div>
              <p className="text-sm text-gray-700 italic relative z-10 pl-4 pr-1 leading-relaxed">
                {waifu.quote}
              </p>
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
