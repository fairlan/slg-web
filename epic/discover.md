# 需求分析（PRD）- Discover 页面

**版本**: 1.0
**状态**: Draft
**关联**: epic/index.md（总需求）

## 1. 概述
- 问题陈述: 用户需要在不被噪音干扰的前提下，快速发现与地点相关的高质量内容。
- 解决方案: 以 Collections 形式呈现内容，提供 Smart Search 与 Scanner，引导用户进入 Place View。
- 范围（包含）:
  - Collections 流、卡片与媒体预览
  - Smart Search（关键词/建议/快捷入口）
  - Scanner（Aura Code 扫描）
  - 空状态与引导
- 范围（不包含）:
  - Moments 创建流程
  - Connections/Me 相关功能

## 2. 目标与成功指标
- 业务目标: 提升 Discover → Place View 的转化率与停留时长。
- 用户目标: 快速找到想去的地点与可解锁内容。
- 成功指标（KPIs）:
  - Discover 首屏点击率
  - Collections 打开率
  - Search 使用率与搜索转化率
  - Scanner 使用率

## 3. 用户与场景
- 目标用户/画像:
  - 城市探索者与旅行者
  - 关注策展内容的用户
- 主要场景:
  - 首页浏览 Collections
  - 输入关键词查找地点
  - 线下扫描 Aura Code 进入地点详情
- 边缘场景:
  - 无内容/低内容密度
  - 弱网媒体加载缓慢

## 4. 需求
### 4.1 功能性需求
- FR-1 Collections 流
  - 描述: 以卡片方式展示策展内容，支持连续滚动与懒加载。
  - 验收标准:
    - Given 用户进入 Discover, When 向下滑动, Then 按顺序加载 Collections。
- FR-2 Smart Search
  - 描述: 支持关键词搜索与推荐结果，支持快捷搜索入口。
  - 验收标准:
    - Given 用户输入关键词, When 提交, Then 展示相关地点/Collections。
- FR-3 Scanner
  - 描述: 提供 Aura Code 扫描入口，支持 haptic 反馈。
  - 验收标准:
    - Given 用户点击 Scanner, When 成功识别, Then 进入对应 Place View。
- FR-4 内容预览
  - 描述: 卡片支持预览图/短视频与基本信息。
  - 验收标准:
    - Given 卡片可用, When 展示, Then 显示标题/缩略图/策展信息。
- FR-5 空状态与引导
  - 描述: 内容不足时提供推荐与引导。
  - 验收标准:
    - Given 无可用内容, When 页面加载, Then 显示引导卡片与搜索入口。

### 4.2 非功能性需求
- 性能: 首屏 1s 内可交互；滚动 60fps 目标。
- 可靠性: 弱网时优先加载低清预览。
- 隐私: 不在 Discover 强制请求位置权限。
- 可访问性: VoiceOver 支持与足够触控区域。
- 本地化: 文案可配置，支持多语言。

## 5. 用户体验
- 关键用户流程:
  - Discover → Collection → Place View
  - Discover → Search → Result → Place View
  - Discover → Scanner → Place View
- 信息架构:
  - Header（标题/搜索/扫描） + 卡片列表 + Floating Dock
- 交互模型:
  - 纵向滚动、卡片点击、轻触反馈
- 内容模型:
  - Collection（标题/封面/摘要/策展人）
  - Moment Preview（缩略图/地点/评分）

## 6. 线框图（低保真）
- 线框 A [Discover]
```
┌─────────────────────────┐
│ Header: Discover         │
│ [ Search ]      [ Scan ] │
└─────────────────────────┘

┌─────────────────────────┐
│ Collection Card          │
│ Cover + Title + Curator  │
└─────────────────────────┘

┌─────────────────────────┐
│ Collection Card          │
│ Cover + Title + Curator  │
└─────────────────────────┘

┌─────────────────────────┐
│ Floating Dock            │
└─────────────────────────┘
```
- 状态:
  - 空: 文案“这里还没有新的发现”，主操作“去看看热门”，次操作“开始搜索”
  - 加载: 文案“正在为你铺开风景…” + 卡片骨架屏 + 顶部加载提示
  - 错误: 文案“网络有点远，暂时连不上”，主操作“重试”，次操作“离线浏览”
- 备注: 滚动时 Dock 自动隐藏

## 7. HIG 对齐
| 原则 | 需求映射 | 备注 |
| --- | --- | --- |
| 清晰 | 搜索与扫描入口清晰 | 主任务明确 |
| 克制 | 内容卡片优先 | 控件不抢戏 |
| 层次 | 卡片层级与标题结构 | 信息分层 |
| 审美一致性 | 视觉风格与策展内容一致 | 情绪匹配 |
| 一致性 | 卡片与列表样式统一 | 跨页复用 |
| 直接操作 | 卡片点击直达内容 | 交互直观 |
| 反馈 | 点击与滚动触感反馈 | 即时响应 |
| 隐喻 | Collections 作为策展集合 | 易理解 |
| 用户可控 | 搜索可随时取消 | 降低负担 |

## 8. 数据与分析
- 关键事件:
  - discover_open, collection_impression, collection_open
  - search_submit, search_result_click
  - scan_open, scan_success
- 数据保留与隐私说明:
  - Discover 不强制采集位置

### 错误码与处理
| 错误码 | 场景 | 用户文案 | 行为 |
| --- | --- | --- | --- |
| DISCOVER_NET_UNAVAILABLE | 网络不可用 | “网络有点远，暂时连不上” | 主操作“重试”，次操作“离线浏览” |
| DISCOVER_FEED_EMPTY | Collections 为空 | “这里还没有新的发现” | 主操作“去看看热门”，次操作“开始搜索” |
| DISCOVER_SEARCH_FAIL | 搜索失败 | “搜索有点慢，稍后再试” | 主操作“重试”，次操作“清空条件” |
| DISCOVER_SCAN_DENIED | 相机权限被拒 | “需要相机权限才能扫码” | 主操作“去设置”，次操作“取消” |

## 9. 风险与应对
- 风险: 媒体内容过重导致性能问题
  - 应对: 渐进加载与低清预览
- 风险: 内容质量影响转化
  - 应对: 策展规则与质量审核

## 10. 依赖与约束
- 依赖: 内容服务、媒体 CDN、搜索服务、相机权限
- 约束: 弱网环境需要缓存与降级

## 11. 里程碑
- MVP: Collections 流 + 基础搜索
- V1: Scanner + 更丰富卡片
- Future: 个性化推荐

## 12. 开放问题
- 搜索是否与 Spotlight 深度集成？
- Scanner 是否支持离线码校验？

## 13. 假设
- Collections 内容与策展规则可用
