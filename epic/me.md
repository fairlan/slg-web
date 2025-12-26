# 需求分析（PRD）- Me/Profile 页面

**版本**: 1.0
**状态**: Draft
**关联**: epic/index.md（总需求）

## 1. 概述
- 问题陈述: 用户需要管理个人资料、查看自己的 Journey 与 Vault，并理解个人数据统计。
- 解决方案: Profile 头部 + 统计 + Tabs + 内容列表，支持编辑与隐私设置。
- 范围（包含）:
  - 个人资料与头像
  - 统计数据与标签
  - My Journey 与 Vault 内容
  - 编辑资料 / 关注与消息
- 范围（不包含）:
  - Connections 动态流

## 2. 目标与成功指标
- 业务目标: 提升个人内容回访率与 Vault 使用率。
- 用户目标: 方便管理个人信息与回顾已解锁内容。
- 成功指标（KPIs）:
  - Vault 打开率
  - Profile 编辑完成率
  - Journey 浏览时长

## 3. 用户与场景
- 目标用户/画像:
  - 常驻用户与内容创建者
- 主要场景:
  - 查看个人统计与已解锁 Moments
  - 编辑资料与隐私设置
- 边缘场景:
  - 新用户无内容
  - 访问他人资料

## 4. 需求
### 4.1 功能性需求
- FR-1 Profile 头部
  - 描述: 展示头像、用户名、简介与标签。
  - 验收标准:
    - Given 用户进入页面, When 资料可用, Then 展示头像与简介。
- FR-2 统计数据
  - 描述: 展示 Moments、Following、Fans 等统计。
  - 验收标准:
    - Given 统计可用, When 页面加载, Then 展示三个关键指标。
- FR-3 编辑与互动
  - 描述: 自己页面显示 Edit Profile；他人页面显示 Follow/Message。
  - 验收标准:
    - Given 访问他人页面, When 页面加载, Then 显示 Follow/Message。
- FR-4 Tabs 与内容
  - 描述: Tab 切换 Journey/Vault/喜欢内容。
  - 验收标准:
    - Given 用户切换 Tab, When 内容加载, Then 列表更新。
- FR-5 空状态
  - 描述: 无内容时提供引导与创建入口。
  - 验收标准:
    - Given 用户无内容, When 进入页面, Then 显示引导文案。

### 4.2 非功能性需求
- 性能: Tab 切换 <200ms。
- 可访问性: 文字与按钮可读可点。
- 隐私: 编辑权限与他人视角区分清晰。

## 5. 用户体验
- 关键用户流程:
  - Me → Tab 切换 → Vault/Journey
  - Me → Edit Profile
- 信息架构:
  - Header + Profile + Stats + Actions + Tabs + Content
- 交互模型:
  - Tab 切换、列表滚动
- 内容模型:
  - Profile（Avatar/Name/Bio/Tags）
  - Content Card（Journey 预览 / Vault 条目）

## 6. 线框图（低保真）
- 线框 A [Me/Profile]
```
┌─────────────────────────┐
│ Header                  │
│ [←]              [⋯]    │
└─────────────────────────┘

┌─────────────────────────┐
│        Avatar           │
│        ○ ○ ○            │
│   Username / ID         │
│   Short Bio Text        │
│   [Tag] [Tag]           │
└─────────────────────────┘

┌─────────────────────────┐
│  12     340     89      │
│ Moments Following Fans  │
└─────────────────────────┘

┌─────────────────────────┐
│ [ Edit Profile ]        │
│ 或 [ Follow ] [ Message ]│
└─────────────────────────┘

┌─────────────────────────┐
│ Tab: Journey | Vault | …│
└─────────────────────────┘

┌─────────────────────────┐
│ Content Card            │
│ Content Card            │
│ Content Card            │
│ …                       │
└─────────────────────────┘
```
- 状态:
  - 空: 文案“这里还没有被收藏的故事”，主操作“去 Discover”，次操作“创建 Moment”
  - 加载: 文案“正在整理你的记录…” + 资料与内容骨架
  - 错误: 文案“资料暂时没加载出来”，主操作“重试”，次操作“返回”
- 备注: 自己页面显示编辑，他人页面显示关注/消息；Content Card 对应 Journey 预览与 Vault 列表

## 7. HIG 对齐
| 原则 | 需求映射 | 备注 |
| --- | --- | --- |
| 清晰 | 资料与统计结构清晰 | 重点突出 |
| 克制 | 内容卡片为主 | 视觉简洁 |
| 层次 | Profile/Stats/Content 分区 | 信息分层 |
| 审美一致性 | 视觉与个人记忆主题一致 | 氛围统一 |
| 一致性 | Tab/卡片样式统一 | 跨页复用 |
| 直接操作 | Tab 切换与列表点击 | 操作直观 |
| 反馈 | 编辑与切换反馈明确 | 状态清晰 |
| 隐喻 | Journey/Vault 语义清晰 | 易理解 |
| 用户可控 | 编辑入口明确 | 权限边界清楚 |

## 8. 数据与分析
- 关键事件:
  - profile_open, profile_edit_start
  - tab_switch, vault_open

### 错误码与处理
| 错误码 | 场景 | 用户文案 | 行为 |
| --- | --- | --- | --- |
| PROFILE_NET_UNAVAILABLE | 网络不可用 | “暂时连不上你的记录” | 主操作“重试”，次操作“返回” |
| PROFILE_LOAD_FAIL | 资料加载失败 | “资料暂时没加载出来” | 主操作“重试”，次操作“返回” |
| PROFILE_EDIT_SAVE_FAIL | 资料保存失败 | “修改没保存好” | 主操作“重试”，次操作“撤销修改” |
| PROFILE_EMPTY | 内容为空 | “这里还没有被收藏的故事” | 主操作“去 Discover”，次操作“创建 Moment” |

## 9. 风险与应对
- 风险: 个人信息暴露
  - 应对: 细粒度隐私设置与可见性控制

## 10. 依赖与约束
- 依赖: 用户资料服务、内容列表服务
- 约束: 他人视角权限需清晰区分

## 11. 里程碑
- MVP: Profile + Stats + Vault
- V1: Journey 可视化
- Future: 更多个性化展示

## 12. 开放问题
- Journey 是否需要地图与时间轴双视图？

## 13. 假设
- 用户资料与 Moments 数据可用
