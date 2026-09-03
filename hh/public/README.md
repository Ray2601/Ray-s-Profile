# 素材占位系统

这里是所有图片 / 素材的统一存放位置。当前每个空位都放了一个 `.svg` 占位图，图上标明了「这个位置该放什么」。

## 替换规则

1. 找到对应文件夹里的 `.svg` 占位图。
2. 把你的真实素材放到**同一个文件夹**，命名建议 `同名.png`（如 `01-cover.png`）。
3. 在 `lib/portfolio-data.ts`（或对应组件）里，把图片路径从 `.svg` 改成你的 `.png` 路径。

> 例：`/images/projects/tencent-ad/01-cover.svg` → `/images/projects/tencent-ad/01-cover.png`

## 目录结构

```
public/
├── placeholder.svg                 # 通用兜底占位图（代码 fallback 用到，保留）
├── apple-icon.png / icon*.png / icon.svg   # favicon（保留）
│
├── images/
│   ├── hero/
│   │   └── ray.png                 # 【已有】个人头像
│   │
│   ├── experience/                 # 实习/经历照片
│   │   ├── respulse.svg            #   Respulse 照片/截图
│   │   ├── food-delivery.svg       #   外卖平台照片/截图
│   │   └── air.svg                 #   清华 AIR 照片/截图
│   │
│   ├── projects/
│   │   ├── tencent-ad/             # ⭐ 腾讯 PCG 产品大赛（主推项目）
│   │   │   ├── 01-cover.svg        #   项目宣传图（封面）
│   │   │   ├── 02-problem.svg      #   广告痛点截图
│   │   │   ├── 03-solution.svg     #   产品核心界面
│   │   │   ├── 04-gameplay-1.svg   #   射击玩法
│   │   │   ├── 05-gameplay-2.svg   #   点选玩法
│   │   │   ├── 06-gameplay-3.svg   #   养成玩法
│   │   │   ├── 07-gameplay-4.svg   #   探秘玩法
│   │   │   ├── 08-reward.svg       #   背包/换装
│   │   │   ├── 09-dashboard.svg    #   广告商数据看板
│   │   │   └── 10-tech.svg         #   技术架构图
│   │   │
│   │   ├── resume-agent/           # 简历优化 Agent
│   │   │   ├── cover.png           #   【已有】项目封面
│   │   │   ├── workflow.svg        #   Agent 架构图
│   │   │   ├── product-1.svg       #   产品截图 1
│   │   │   ├── product-2.svg       #   产品截图 2
│   │   │   └── result.svg          #   效果数据截图
│   │   │
│   │   ├── zhijing/                # 智鲸助手
│   │   │   ├── cover.png           #   【已有】项目封面
│   │   │   ├── architecture.svg    #   架构图
│   │   │   ├── product.svg         #   飞书/产品截图
│   │   │   └── result.svg          #   效果数据
│   │   │
│   │   └── interactive-3d/         # Interactive-edit-3D
│   │       ├── cover.png           #   【已有】项目封面
│   │       ├── result-1.svg        #   3D 结果图 1
│   │       └── result-2.svg        #   3D 结果图 2
│   │
│   └── interests/                  # 兴趣相关照片/GIF
│       ├── interest-1.svg
│       ├── interest-2.svg
│       └── interest-3.svg
│
├── resume/
│   └── README.md                   # 简历放这里，命名 Ray-Resume.pdf
│
└── _legacy/                        # v0 模板遗留，确认无用可删除
    ├── placeholder.jpg
    ├── placeholder-logo.png
    ├── placeholder-logo.svg
    └── placeholder-user.jpg
```

## 当前代码引用（已对齐）

| 用途 | 代码引用 | 对应文件 |
| --- | --- | --- |
| 头像 | `profile.avatar` | `/images/hero/ray.png` |
| 简历优化 Agent | `projects[0].image` | `/images/projects/resume-agent/cover.png` |
| 智鲸助手 | `projects[1].image` | `/images/projects/zhijing/cover.png` |
| Vibe Coding Demo | `projects[2].image` | `/images/projects/interactive-3d/cover.png` |
