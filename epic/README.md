# 需求分析（PRD）- Project Aura（总需求）

**版本**: 2.1
**状态**: Draft
**依据**: index.md（Vision/Experience/Privacy）与 epic/index.md（初版需求）

## 1. 概述

- 问题陈述: 现有社交体验难以把地点与情绪记忆建立可信连接，同时位置隐私与安全感不足。
- 解决方案: Aura 以隐私优先的位置智能为核心，让用户在真实地点发现、创建并解锁 Moments，内容由可信关系与策展人驱动。
- 范围（包含）:
  - 发现与内容策展（Collections、Smart Search、Scanner）
  - Place View（Hero Moment、Aura Score、详情与入口）
  - Moments 生命周期（创建/封存/解锁）
  - Connections 与隐私控制（Circle、Echoes、Ghost Mode）
  - Me/Profile（My Journey、Vault、个人资料与统计）
  - 生态集成（Dynamic Island、Live Activities、Widgets、Siri Shortcuts）
- 范围（不包含）:
  - Android/Web
  - 广告变现
  - 公共广场式陌生人社交

## 2. 目标与成功指标

- 业务目标: 建立高信任、强情感链接的地点内容平台，并形成内容供给与留存循环。
- 用户目标: 在真实地点发现故事、与好友互动并安全保存记忆。
- 成功指标（KPIs）:
  - 7 日留存率
  - Discover → Place View 点击率
  - Moments 创建与解锁转化率
  - Live Activities 使用率
  - 负面隐私反馈率

## 3. 用户与场景

- 目标用户/画像:
  - 城市探索者、旅行者
  - 关注策展人/KOL 的内容消费者
  - 亲密关系用户群（好友、情侣）
- 主要场景:
  - 浏览 Discover 并前往地点解锁 Moment
  - 创建并封存 Moment，等待好友触发
  - 使用 Ghost Mode 控制隐私
- 边缘场景:
  - 位置权限拒绝、仅允许一次
  - UWB 不可用或精度不稳
  - 弱网/离线与低电量

## 4. 需求

### 4.1 功能性需求（总览）

- FR-1 内容与策展体系
  - 描述: Collections 聚合内容，来源包括策展人与好友；支持内容审核与分发策略。
  - 验收标准:
    - Given 进入 Discover, When 内容加载完成, Then 显示按主题聚合的 Collections。
- FR-2 位置与触发系统
  - 描述: 基于地理围栏与 UWB 触发 Moments 解锁，提供降级路径。
  - 验收标准:
    - Given 设备不支持 UWB, When 接近地点, Then 提供视觉/声音/震动降级指引。
- FR-3 Moments 生命周期
  - 描述: 支持创建、封存、触发通知与解锁内容。
  - 验收标准:
    - Given 用户创建 Moment, When 完成封存, Then 显示明确成功反馈并可在 Vault 查看。
- FR-4 关系与隐私控制
  - 描述: 支持 Circle、Echoes、Ghost Mode、近似位置分享与自动删除。
  - 验收标准:
    - Given 用户开启 Ghost Mode, When 退出页面, Then 隐私状态立即生效并提示。
- FR-5 身份与权限
  - 描述: Sign in with Apple 与按需授权位置权限。
  - 验收标准:
    - Given 新用户未授权定位, When 触发解锁流程, Then 仅在此时提示授权。
- FR-6 生态集成
  - 描述: Dynamic Island、Live Activities、Widgets、Siri Shortcuts。
  - 验收标准:
    - Given 用户正在接近解锁地点, When 切换到后台, Then Live Activities 显示实时距离。
- FR-7 反馈与氛围
  - 描述: 触觉、音效与动效作为关键体验反馈。
  - 验收标准:
    - Given 用户完成解锁, When 内容展示, Then 同步触发动画与触感反馈。
- FR-8 数据与可观测性
  - 描述: 关键事件埋点、错误日志与性能监控。
  - 验收标准:
    - Given 关键流程完成, When 事件上报, Then 包含用户路径与时间戳。

### 4.2 非功能性需求

- 性能: Discover 首屏 1s 内可交互；滚动与动画 60fps 目标。
- 可靠性: 位置唤醒与通知具备重试与降级策略。
- 安全: 敏感数据本地加密；网络通信安全传输。
- 隐私: 最小化采集与明确告知；可撤回授权。
- 可访问性: VoiceOver、动态字号、对比度与触控区域。
- 本地化: 语言与文化内容可扩展。
- 兼容性: UWB 设备优先，非 UWB 提供替代路径。
- 能耗: 低功耗定位策略与后台唤醒限制。

## 5. 用户体验

- 关键用户流程:
  - Onboarding → Discover → Place View → Unlock Moment
  - Create Moment → Seal → 触发通知 → 解锁
  - Connections → Ghost Mode → Echoes 浏览
- 信息架构:
  - Floating Dock: Discover / Connections / Me
  - Place View 与 Moments 为 Discover 的深层页面
- 交互模型:
  - 大图卡片 + 轻触反馈 + 沉浸式过渡
  - UWB 精准引导与降级指引
- 内容模型:
  - Collection、Moment、Aura Score、Echo、Vault
- 全局状态规范:
  - 空: 给出原因 + 主操作（去发现/去创建/去邀请）+ 次操作（搜索/返回）
  - 加载: 骨架屏 + 简短提示（例如“加载中…”），允许用户返回或取消
  - 错误: 明确原因 + 主操作“重试”+ 次操作“离线查看/稍后”；权限错误提供“去设置”
  - 反馈: 成功/失败均有清晰提示与触感反馈，保持动效克制
  - 文案语气: 温和、轻盈、带一点情绪但克制，避免命令感
- 页面需求拆分:
  - Discover: epic/discover.md
  - Place View: epic/place-view.md
  - Create Moment: epic/create-moment.md
  - Unlock Moment: epic/unlock-moment.md
  - Connections: epic/connections.md
  - Me/Profile: epic/me.md
  - Onboarding: epic/onboarding.md

## 6. 线框图（低保真）

- 应用骨架（Floating Dock）:

```
┌─────────────────────────┐
│ Header / Page Title     │
│ Content Area            │
│ Floating Dock           │
└─────────────────────────┘
```

- 具体页面线框见各页面文档。

## 7. HIG 对齐

| 原则       | 需求映射                          | 备注                 |
| ---------- | --------------------------------- | -------------------- |
| 清晰       | 主任务聚焦发现/解锁，动作命名明确 | 减少认知负担         |
| 克制       | 内容优先，界面服务内容            | 视觉简洁             |
| 层次       | 卡片层级与过渡传达结构            | 流程清晰             |
| 审美一致性 | 氛围与场景一致                    | Hero Moment 统一风格 |
| 一致性     | 组件/状态/命名统一                | 跨页复用             |
| 直接操作   | UWB 引导与触感反馈                | 解锁可感知           |
| 反馈       | 动效/触感/通知反馈                | 关键动作可见         |
| 隐喻       | Moments/Vault/Journey             | 避免过度拟物         |
| 用户可控   | Ghost Mode 与权限可控             | 可撤回与退出         |

## 8. 数据与分析

- 关键事件:
  - discover_open, collection_open, place_view_open
  - moment_create_start, moment_create_complete
  - moment_unlock_start, moment_unlock_success
  - ghost_mode_toggle, echo_view
  - permission_prompt, permission_granted
- 数据保留与隐私说明:
  - 默认最小化采集；位置数据优先在设备端处理
  - 任何云端存储需用户明确授权

## 9. 风险与应对

- 风险: 隐私敏感导致信任不足
  - 应对: 权限说明透明、选择清晰、默认最小化采集
- 风险: 位置与 UWB 精度不稳定
  - 应对: 多模态降级（视觉/声音/触感）
- 风险: 重媒体导致性能与能耗问题
  - 应对: 渐进加载与缓存策略
- 风险: 内容质量与安全
  - 应对: 可信关系优先与审核策略

## 10. 依赖与约束

- 依赖: CoreLocation、UWB、ARKit、Apple Pay、App Clips、Sign in with Apple、Siri Shortcuts、Widgets、Live Activities
- 约束: 需要位置权限与部分硬件支持；App Clip 体验依赖线下触点与码部署

## 11. 里程碑

- MVP: Discover + Place View + 基础 Moments 创建/解锁 + 登录
- V1: Connections + Ghost Mode + UWB 指引 + Live Activities
- Future: AR Note 强化、Gift 体验完善、App Clip 大规模投放

## 12. 开放问题

- Aura Score 的算法与权重如何定义？
- 策展人与内容供给机制如何建立？
- 线下 App Clip 触点与分发策略是什么？

## 13. 假设

- 目标平台为 iOS，用户愿意授权位置权限
- 内容来源以可信关系与策展人优先
- 体验优先于功能复杂度，避免破坏沉浸感