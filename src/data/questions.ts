export type Dimension = 'D' | 'S' | 'V' | 'E' | 'P' | 'N' | 'F' | 'R';

export interface Option {
  text: string;
  value: Dimension;
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "在一段关系中，你更倾向于？",
    options: [
      { text: "掌控节奏，带领她，让她依赖我", value: "D" },
      { text: "听从她的安排，享受被大姐姐或强势女友照顾", value: "S" },
    ],
  },
  {
    id: 2,
    text: "遇到冲突时，你通常会？",
    options: [
      { text: "强势表达自己的观点，让她听我的", value: "D" },
      { text: "倾向于退让，或者希望她能主动来哄我", value: "S" },
    ],
  },
  {
    id: 3,
    text: "你更喜欢哪种互动方式？",
    options: [
      { text: "稍微欺负一下她，看她害羞脸红的样子", value: "D" },
      { text: "被她稍微欺负一下，甚至被踩在脚下，觉得很心动", value: "S" },
    ],
  },
  {
    id: 4,
    text: "在约会时，你更喜欢？",
    options: [
      { text: "提前规划好一切行程，直接带她去", value: "D" },
      { text: "让她决定去哪，我只管跟着她走", value: "S" },
    ],
  },
  {
    id: 5,
    text: "亲密接触时，你更希望？",
    options: [
      { text: "把她按在墙上强吻，占据绝对主动", value: "D" },
      { text: "被她推倒，或者被她用命令的口吻要求", value: "S" },
    ],
  },
  {
    id: 6,
    text: "吸引你注意力的第一要素是？",
    options: [
      { text: "脸蛋、身材（比如腿、胸）、穿搭等外在条件", value: "V" },
      { text: "性格、谈吐、共同话题等内在特质", value: "E" },
    ],
  },
  {
    id: 7,
    text: "如果要选择一个伴侣，你更看重？",
    options: [
      { text: "带出去有面子，看着就赏心悦目，身材火辣", value: "V" },
      { text: "懂我的奇奇怪怪，能提供情绪价值，懂事体贴", value: "E" },
    ],
  },
  {
    id: 8,
    text: "让你瞬间下头的原因通常是？",
    options: [
      { text: "对方不修边幅，或者素颜/身材有某个你无法接受的缺点", value: "V" },
      { text: "对方三观不合，或者对你冷暴力、无理取闹", value: "E" },
    ],
  },
  {
    id: 9,
    text: "刷短视频时，你更容易给哪种女生点赞？",
    options: [
      { text: "穿着清凉、跳舞好看的颜值/身材博主", value: "V" },
      { text: "分享生活感悟、声音好听、性格有趣的博主", value: "E" },
    ],
  },
  {
    id: 10,
    text: "朋友给你介绍女朋友，你最先问的问题是？",
    options: [
      { text: "“有照片吗？长得好看吗？身材怎么样？”", value: "V" },
      { text: "“性格怎么样？有什么爱好？好相处吗？”", value: "E" },
    ],
  },
  {
    id: 11,
    text: "你对“爱情”的理想状态是？",
    options: [
      { text: "一生一世一双人，绝对的忠诚和专一，互相是彼此的唯一", value: "P" },
      { text: "充满刺激和变数，甚至带点背德、牛头人（NTR）色彩", value: "N" },
    ],
  },
  {
    id: 12,
    text: "看小说或动漫时，你更喜欢哪种剧情？",
    options: [
      { text: "男女主角双向奔赴，甜甜的纯爱日常", value: "P" },
      { text: "充满纠葛、修罗场、黄毛介入，甚至有点胃疼的剧情", value: "N" },
    ],
  },
  {
    id: 13,
    text: "如果你的伴侣和其他异性走得很近，你会？",
    options: [
      { text: "非常介意，吃醋，要求她保持绝对距离", value: "P" },
      { text: "觉得有点刺激，或者甚至会幻想一些奇怪的展开（比如绿帽癖）", value: "N" },
    ],
  },
  {
    id: 14,
    text: "对于“前男友”这个存在，你的态度是？",
    options: [
      { text: "极其介意，希望她是一张白纸，最好我是初恋", value: "P" },
      { text: "不太介意，甚至觉得她有经验或者当着我的面提别人有点莫名的刺激", value: "N" },
    ],
  },
  {
    id: 15,
    text: "玩黄油（Galgame）或看本子时，你更倾向于？",
    options: [
      { text: "纯爱向，全心全意攻略女主，打出Happy Ending", value: "P" },
      { text: "恶堕、寝取（NTR）向，或者故意看一些扭曲的剧情", value: "N" },
    ],
  },
  {
    id: 16,
    text: "你更喜欢哪种类型的角色/对象？",
    options: [
      { text: "拥有超能力、兽耳、魅魔、或者非人类设定的二次元老婆", value: "F" },
      { text: "贴近现实生活，有血有肉的三次元普通女孩", value: "R" },
    ],
  },
  {
    id: 17,
    text: "你的性幻想通常是？",
    options: [
      { text: "天马行空，触手、异世界、魔法等现实中不可能发生的场景", value: "F" },
      { text: "基于现实生活，比如办公室、学校、家里等比较日常的场景", value: "R" },
    ],
  },
  {
    id: 18,
    text: "你对“角色扮演”的看法是？",
    options: [
      { text: "非常喜欢，觉得能体验不同的身份（如女仆、护士）很刺激", value: "F" },
      { text: "觉得有点尴尬，更喜欢真实的她，穿日常衣服就好", value: "R" },
    ],
  },
  {
    id: 19,
    text: "如果可以拥有一个完美伴侣，你希望她是？",
    options: [
      { text: "从动漫里走出来的纸片人老婆，完美符合我的所有XP", value: "F" },
      { text: "现实中一个懂我、爱我、能和我一起过日子的真实女性", value: "R" },
    ],
  },
  {
    id: 20,
    text: "晚上睡觉前的脑内小剧场，通常是？",
    options: [
      { text: "我穿越到异世界开后宫，或者和魔王/精灵谈恋爱", value: "F" },
      { text: "幻想和喜欢的现实中的女生一起做饭、看电影、约会", value: "R" },
    ],
  },
];
