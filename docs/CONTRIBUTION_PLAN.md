# Moss Open Source Contribution Plan

## 1. Builder 身份

- **主方向：** Dev Builder
- **辅助方向：** Research Builder
- **项目：** Moss
- **官方仓库：** https://github.com/nishuzumi/moss
- **个人 Fork：** https://github.com/jzhao0/moss
- **学习记录仓库：** https://github.com/jzhao0/moss-learning-lab

## 2. 为什么选择这个方向

我选择 Dev Builder 作为主方向，因为我希望把需求和研究判断转化为可以运行、测试和公开验证的代码、脚本、智能合约或 Agent 工具。

我已经完成过 DailyCheckIn Solidity 合约的 AI 辅助开发、人工逻辑修改、Monad Testnet 部署和链上交互。目前还在进行 EA 开发、预测市场研究和数据工具规划。

Moss 将 AI Agent 与链上协议交互结合，和我的以下兴趣直接相关：

- AI Coding；
- Web3 智能合约和 DApp；
- 链上数据分析；
- 预测市场；
- 量化研究；
- 交易模拟和风险验证。

Research Builder 将作为辅助能力，用于理解 Moss 架构、分析产品价值、研究协议文档并判断适合贡献的问题。

## 3. 贡献方向

本周优先选择以下贡献路线：

### 第一优先级：文档和新手体验改进

通过真实安装、构建、测试和运行 Example，寻找：

- 环境配置不清楚的地方；
- 新手容易误解的命令；
- README 与实际行为不一致的地方；
- Example 缺少的运行说明；
- 常见错误及解决方法；
- 安全边界说明不足的地方。

### 第二优先级：Example 或测试改进

在理解现有代码后，尝试：

- 补充一个范围明确的 Example；
- 改进已有 Example 的输出或说明；
- 增加必要的测试；
- 修复一个可复现的小问题。

### 第三优先级：Protocol Adapter

完成基础贡献并熟悉架构后，再评估开发新的 Protocol Adapter。

Adapter 需要满足：

- 协议在 Monad Mainnet 有正式部署；
- 官方文档和 ABI 来源明确；
- 固定合约地址有权威来源；
- 能够完成本地或主网模拟；
- 可以编写成功和失败测试；
- Moss 当前尚未支持；
- Maintainer 认可贡献方向。

## 4. 为什么不直接开发大型 Adapter

Protocol Adapter 不只是增加一个合约函数调用，还需要理解和实现：

- Protocol 类；
- Capability；
- Query；
- 参数契约；
- Protocol 依赖；
- ABI 来源；
- 固定地址验证；
- Receipt Parser；
- Change 覆盖；
- 成功和失败测试；
- Monad Mainnet 模拟；
- 文档和 Example。

我目前仍处于学习 Moss 架构和运行流程的阶段，因此先从真实的新手问题或小范围改进开始，更容易形成可靠、可验证的贡献。

## 5. 本周目标

### 目标一：完成本地环境配置

- 检查 Node.js 版本；
- 检查 pnpm 版本；
- Clone 个人 Fork；
- 安装依赖；
- 完成 Build；
- 完成 Typecheck；
- 完成 Lint；
- 运行离线测试。

### 目标二：运行一个官方 Example

优先运行 Simple Flow 或其他适合新手的 Example，并记录：

- 使用的命令；
- 必要环境变量；
- 终端输出；
- 模拟结果；
- Warning；
- 遇到的错误；
- 解决过程。

### 目标三：完成 Prototype Evidence

将运行过程整理为可检查的证据：

- GitHub 代码或文档；
- README；
- 成功运行截图；
- 测试截图；
- Mock 内容说明；
- Known Issues；
- Commit 记录。

### 目标四：完成一次真实开源协作

根据本地运行过程发现一个真实问题，并执行：

    检查现有 Issue 和 PR
    → 确认没有重复工作
    → 必要时先提交 Issue 或留言
    → 创建独立 Branch
    → 完成聚焦修改
    → 运行验证命令
    → 人工检查 Diff
    → 提交 Pull Request
    → 根据 Review 修改

## 6. 预计产出

本周预计形成：

1. Moss Project Card；
2. GitHub Exploration Log；
3. Open Source Contribution Plan；
4. 本地安装和运行记录；
5. Prototype Evidence；
6. Moss 新手教程；
7. Moss 介绍文章；
8. 至少一个 GitHub Issue、文档改进或 Pull Request；
9. Open Source Contribution Log；
10. Dev Portfolio Pack。

## 7. 时间安排

### 阶段一：项目理解

- 阅读 README；
- 阅读 CONTRIBUTING；
- 阅读 CONTEXT；
- 阅读 Agent Rules；
- 浏览 Issues 和 Pull Requests；
- 完成项目卡片和探索日志。

状态：已完成。

### 阶段二：本地运行

- Clone Fork；
- 检查环境；
- 安装依赖；
- Build；
- Typecheck；
- Lint；
- Test；
- 运行 Example。

### 阶段三：整理教程和证据

- 整理真实运行命令；
- 整理错误和解决方法；
- 编写新手教程；
- 创建 Prototype Evidence；
- 更新 README。

### 阶段四：第一次贡献

- 寻找真实问题；
- 检查重复 Issue 和 PR；
- 确认修改范围；
- 提交独立分支和 Commit；
- 发起 Pull Request；
- 响应 Maintainer Review。

### 阶段五：高阶挑战

- 阅读 Protocol Onboarding；
- 分析 `_template`；
- 选择适合的 Monad 协议；
- 与 Maintainer 确认；
- 尝试 Protocol Adapter。

## 8. AI 如何参与

AI 可以帮助我：

- 阅读和解释项目文档；
- 梳理架构术语；
- 生成初步技术方案；
- 分析错误日志；
- 生成代码或文档初稿；
- 检查遗漏的测试和边界；
- 整理 README、教程和贡献记录。

## 9. 必须由我人工完成的工作

以下内容不能直接交给 AI：

1. 判断项目需求是否真实；
2. 检查是否存在重复 Issue 或 PR；
3. 验证文档与实际运行结果是否一致；
4. 执行安装、构建、测试和 Example；
5. 核对 AI 修改的全部 Diff；
6. 判断代码是否符合 Moss 架构；
7. 与 Maintainer 沟通；
8. 决定是否提交 Pull Request；
9. 处理钱包、私钥和真实资产；
10. 对最终贡献内容承担责任。

## 10. 完成标准

本周贡献计划至少满足：

- [ ] Moss 可以在本地成功安装；
- [ ] Build 成功；
- [ ] Typecheck 成功；
- [ ] Lint 成功；
- [ ] 离线测试或完整测试成功；
- [ ] 至少运行一个官方 Example；
- [ ] 保留运行和错误证据；
- [ ] 完成一份公开新手教程；
- [ ] 找到一个真实、未重复的问题；
- [ ] 完成 Issue、Documentation 或 Pull Request 中至少一种；
- [ ] 整理 AI Collaboration Log；
- [ ] 汇总为 Dev Portfolio Pack。

## 11. 风险与约束

- Moss 当前是未经审计的 Alpha 软件；
- 不使用生产资金；
- 不提交私钥、助记词、API Key 或敏感 `.env`；
- 不允许 AI 自动签名或发送交易；
- 不未经确认修改核心架构；
- 不重复他人正在处理的 Issue；
- 不为了完成任务而提交低价值 PR；
- 不在没有实际运行的情况下编写虚假教程；
- 不声称代码安全，除非有充分测试和人工审查。

## 12. 最终目标

我的目标不是只完成一次课程打卡，而是通过 Moss 形成一条可以公开展示的能力链：

    阅读开源项目
    → 理解架构
    → 本地运行
    → 记录错误
    → 编写教程
    → 提出真实问题
    → 完成 GitHub 协作
    → 提交 Pull Request
    → 整理 Proof of Work

这份经历将作为我后续参与 AI Agent、Web3 金融工具、预测市场和链上量化项目的基础。
