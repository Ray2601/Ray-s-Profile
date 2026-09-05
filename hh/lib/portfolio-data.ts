export const profile = {
  name: '王雯睿',
  role: '产品经理 · AI Builder · 认真生活的人',
  tagline:
    'Hi~我是Ray。\n从销售到技术，再到产品\n我始终相信：\n离用户足够近的工程师，\n才可能成为好的产品设计师。',
  intro:
    '我喜欢和人聊天、发现那些还没被解决的小麻烦，再亲手把方案做出来。从校园外卖到 AI Agent，这里记录的是我的判断、试错，还有一点点不服输。',
  tags: ['产品定义 & 用户洞察', 'AI Agent 搭建 & 迭代', 'Vibe Coding 快速验证'],
  avatar: '/images/projects/individual.jpg',
  location: '广州 · Guangzhou',
  email: '1959851743@qq.com',
}

export const stats = [
  { value: '10+', label: '主导 / 参与项目' },
  { value: '70+', label: '拓展合作商家' },
  { value: '2', label: '搭建上线 Agent' },
  { value: '34 强', label: '产品大赛名次' },
]

export type Experience = {
  period: string
  role: string
  org: string
  summary: string
  details: string[]
  tags: string[]
}

export const experiences: Experience[] = [
  {
    period: '2024 - 至今',
    role: 'AI 产品 / 独立开发',
    org: 'Respulse(占位)',
    summary: '从 0 到 1 定义产品、组建团队，推进 MVP 与早期融资。',
    details: [
      '完成 30+ 场用户深访，提炼核心痛点与产品定位',
      '主导产品定义与原型设计，牵头组建早期团队',
      '推进 MVP 上线并对接早期融资（占位数据）',
    ],
    tags: ['产品定义', '用户访谈', '0→1', '融资'],
  },
  {
    period: '2023 - 2024',
    role: '产品运营负责人',
    org: '25° 外卖平台(占位)',
    summary: '搭建社群运营与配送体系，从供给侧到履约侧全链路优化。',
    details: [
      '拓展 70+ 合作商家，搭建从供给到履约的完整链路',
      '负责社群运营，沉淀用户增长与复购策略',
      '通过数据分析优化配送体系，提升履约效率（占位数据）',
    ],
    tags: ['社群运营', '商家拓展', '数据优化', '增长'],
  },
  {
    period: '2022 - 2023',
    role: '研究 / 实习',
    org: '清华 AIR(占位)',
    summary: '参与 AI 相关研究与项目实践，打下技术与产品的双重底座。',
    details: [
      '参与 AI 方向课题研究与工程实践',
      '协作完成技术验证与产品化探索（占位数据）',
    ],
    tags: ['AI 研究', '工程实践'],
  },
]

export type Project = {
  id: string
  title: string
  subtitle: string
  description: string
  image: string
  tags: string[]
  metrics: { value: string; label: string }[]
  accent: 'primary' | 'accent'
  displayType: 'featured' | 'regular' | 'side'
  href?: string
  tryHref?: string
  video?: string
  modalOnly?: boolean
}

export const projects: Project[] = [
  {
    id: '25-degree',
    title: '25° 外卖',
    subtitle: '从微信群接龙开始的校园创业实验',
    description:
      '一个从微信群接龙开始，最后真的跑起来的校园外卖平台。我们连接学生、校外商家和配送骑手，也在真实订单里一点点把产品磨出来。',
    image: '/images/projects/25/project-cover-v2.png',
    tags: ['0→1 产品', '本地生活', '服务设计', '数据驱动'],
    metrics: [
      { value: '70+', label: '合作商家' },
      { value: '95%', label: '配送准时率' },
    ],
    accent: 'primary',
    displayType: 'featured',
    href: '/projects/25-degree',
    tryHref: '#小程序://25度/XncAVyMKSv6bpvy',
  },
  {
    id: 'resume-agent',
    title: '简历优化 Agent',
    subtitle: 'AI Agent · 产品定义 + 搭建 + Badcase 迭代',
    description:
      '面向求职者的简历优化助手：从问题定义、Prompt 设计到 Badcase 复盘迭代，全流程亲自把控，让 AI 输出真正可用的修改建议。',
    image: '/images/projects/resume-agent/cover.png',
    tags: ['Agent 搭建', 'Prompt 工程', 'Badcase 迭代', '用户调研'],
    metrics: [
      { value: '90%+', label: '有效建议率(占位)' },
      { value: '3x', label: '迭代提效(占位)' },
    ],
    accent: 'primary',
    displayType: 'featured',
    modalOnly: true,
    tryHref: 'https://resume-agent-phi.vercel.app/',
  },
  {
    id: 'tencent-pcg',
    title: '腾讯 PCG 产品大赛',
    subtitle: '34 强复赛 · 独立完成 · 产品设计 + 开发 Demo',
    description:
      '从问题定义、产品设计到开发可交互 Demo 全程独立完成，最终入围 34 强复赛（2026.05 — 2026.06）。',
    image: '/images/projects/tencent-ad/01-cover.png',
    tags: ['产品大赛', '产品设计', 'Demo 开发', '独立完成'],
    metrics: [
      { value: '34 强', label: '复赛入围' },
      { value: '1 人', label: '独立完成' },
    ],
    accent: 'accent',
    displayType: 'regular',
    href: '/projects/tencent-ad',
    tryHref: 'https://tencent-ad.vercel.app',
  },
  {
    id: 'xiniuniao',
    title: 'Interactive-edit-3D',
    subtitle: '腾讯犀牛鸟 · AI × 3D',
    description:
      '把一张普通图片变成可交互的 3D 模型。完成从交互式抠像、图像补全到 3D 生成的一体化流程。',
    image: '/images/projects/interactive-3d/cover.png',
    tags: ['SAM 分割', 'Qwen 补全', 'Hunyuan3D', '模型评测'],
    metrics: [
      { value: '60s', label: '单个 3D 生成' },
      { value: 'TOP 4.3%', label: '腾讯犀牛鸟优秀学生' },
    ],
    accent: 'primary',
    displayType: 'regular',
    video: '/images/projects/xiniuniao/raw.mp4',
    tryHref: 'https://github.com/Wenrui0319/middletask-1-1-hunyuan',
  },
  {
    id: 'zhijing',
    title: '智鲸助手',
    subtitle: 'AI Agent · 从场景定义到数据验证',
    description:
      '围绕真实业务场景搭建的智能助手，覆盖需求拆解、工具调用与效果验证，用数据驱动持续优化。',
    image: '/images/projects/zhijing/cover.png',
    tags: ['场景定义', '工具调用', '数据验证', 'A/B 测试'],
    metrics: [
      { value: '2k+', label: '日均调用(占位)' },
      { value: '4.6', label: '用户满意度(占位)' },
    ],
    accent: 'accent',
    displayType: 'side',
    modalOnly: true,
    video: '/images/projects/zhijing/raw.mp4',
  },
]

export const skills = {
  product: ['用户访谈', '产品定义', '需求拆解', 'PRD 撰写', '数据分析', 'A/B 测试'],
  ai: ['Agent 搭建', 'Prompt 工程', 'Badcase 迭代', 'RAG', '效果评估'],
  build: ['Vibe Coding', 'Next.js', 'React', 'Vercel 部署', '原型 / Demo'],
}

export const interests = [
  { title: '折腾新工具', desc: '看到有意思的 AI 产品就想拆开看看它怎么做的。' },
  { title: '做小玩具', desc: '周末喜欢用 Vibe Coding 做点没什么用但很好玩的东西。' },
  { title: '记录与分享', desc: '把踩过的坑和想法写下来，偶尔分享给同样在折腾的人。' },
]

export const navItems = [
  { id: 'home', label: '首页' },
  { id: 'education', label: '教育' },
  { id: 'experience', label: '经历' },
  { id: 'projects', label: '作品' },
  { id: 'skills', label: '能力' },
  { id: 'contact', label: '联系' },
]
