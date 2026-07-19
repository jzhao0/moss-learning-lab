# GitHub Exploration Log：Moss

## 1. 探索信息

- **探索日期：** 2026-07-19
- **项目名称：** Moss
- **官方仓库：** https://github.com/nishuzumi/moss
- **个人 Fork：** https://github.com/jzhao0/moss
- **学习记录仓库：** https://github.com/jzhao0/moss-learning-lab

## 2. 项目简介

Moss 是一个面向 AI Agent 的 Web3 开源框架。

它将不同 Monad 链上协议的复杂交互封装成 Agent 可以调用的统一 Capability，并将主要流程统一为：

    discover → load → action → simulate

Moss 负责发现协议能力、读取参数定义、构造未签名交易并执行模拟验证，但不会替用户持有私钥、签名或发送交易。

当前 Moss v1 主要支持 Monad Mainnet，Chain ID 为 143。项目仍属于未经审计的 Alpha 软件，不应直接用于生产资金。

## 3. 项目目录结构

### `.changeset`

用于管理 Monorepo 中各 Package 的版本变更和发布说明。

### `.claude/agents`

保存面向 AI Agent 的项目级辅助配置或规则。

### `.github`

保存 GitHub Actions、Issue、Pull Request 模板及其他仓库自动化配置。

### `docs`

保存入门指南、MCP 工具说明、Protocol 接入指南、安全规则、架构决策和领域词汇。

### `examples`

保存可以运行的 Moss 使用案例，例如 Agent Swap 和 Simple Flow。

### `packages`

项目的核心 Monorepo 代码，主要包括：

| Package | 主要职责 |
|---|---|
| `core` | Registry、参数契约、Capability Tree 和 Receipt 验证 |
| `simulator` | 交易 Trace、有序 Change 和模拟结果提取 |
| `erc` | ERC 标准、ABI 和 Receipt 语义 |
| `system` | Monad Runtime、系统常量和系统 Protocol |
| `protocols/*` | 各协议的 Capability、Query、ABI、依赖和 Receipt |
| `mcp-server` | MCP 传输和应用组合 |

### `AGENTS.md`

该文件实际指向 `CLAUDE.md`，用于让不同 AI Agent 读取统一的项目规则。

### `CLAUDE.md`

包含 Moss 的架构约束、开发规则、测试要求、类型安全要求和仓库事实。

### `CONTEXT.md`

定义 Moss 的统一领域语言和核心架构概念，例如：

- Protocol
- Capability
- Query
- Change
- Receipt Parser
- Receipt
- Receipt Tree

### `CONTRIBUTING.md`

说明可接受的贡献类型、开发环境、测试命令和 Protocol 的 Definition of Done。

### `SECURITY.md`

说明项目的安全边界、安全保证和漏洞报告方式。

### `package.json`、`pnpm-workspace.yaml`

定义 Node.js、pnpm Monorepo 和各 Workspace Package 的组织方式。

## 4. GitHub 各模块的作用

### README

帮助新用户快速了解 Moss 的定位、工作流程、支持协议、运行环境、安全边界和文档入口。

### Docs

提供比 README 更完整的技术说明，包括新手入门、MCP 工具、Protocol 接入和架构决策。

### Issues

用于记录 Bug、文档缺口、新功能建议、Protocol Adapter 需求和架构讨论。

Issue 还能帮助新贡献者找到适合自己的任务，并在开始开发前确认是否已经有人处理。

### Pull Requests

用于查看其他贡献者提交的代码、文档和示例修改。

通过 PR 可以观察：

- 修改了哪些文件；
- 为什么修改；
- 如何验证；
- Maintainer 提出了什么意见；
- 作者如何根据 Review 修改；
- CI 是否通过；
- 是否能够合并。

### Actions

用于自动执行构建、Lint、Typecheck、测试和其他 CI 检查。

### Security and Quality

用于查看仓库安全策略、依赖风险、代码扫描和质量相关信息。

### Agents

用于展示或管理与 AI Agent 协作有关的入口。

### Discussions

当前仓库首页未显示单独的 Discussions 页签。现阶段主要协作入口是 Issues、Pull Requests 和项目文档。

## 5. 开发和验证要求

根据 `CONTRIBUTING.md` 和 `CLAUDE.md`，主要开发命令包括：

    pnpm install
    pnpm build
    pnpm typecheck
    pnpm lint
    pnpm test

离线环境可以使用：

    pnpm test:offline

需要注意：

1. 必须先执行 `build`，再执行 `typecheck`；
2. 修改代码时，应同步维护相关测试、示例和文档；
3. CI 需要通过 Lint、Build、Typecheck 和 Tests；
4. ABI 不能随意手写，需要有明确的上游来源；
5. 固定合约地址需要提供官方来源，并验证部署 bytecode；
6. 新 Protocol 应从 `packages/protocols/_template` 开始；
7. Moss 不签名或发送交易，测试主要验证构造和模拟结果。

## 6. 感兴趣的 Issue

### Issue #55

**标题：**

`docs: add a simple end-to-end example explaining the discover → load → action → simulate workflow`

**链接：**

https://github.com/nishuzumi/moss/issues/55

该 Issue 指出，README 和现有文档分别解释了四个步骤，但新手不容易理解它们如何在一次完整操作中连接起来。

建议的新手示例需要展示：

1. 用户提出一个请求；
2. `discover` 找到可用能力；
3. `load` 获取 Capability 定义；
4. `action` 构造未签名交易；
5. `simulate` 在签名前验证执行结果；
6. 使用流程图或时序图说明完整过程。

我对这个 Issue 感兴趣，因为它反映了开源项目中一个常见问题：技术概念分别写清楚，不等于新用户能够理解完整工作流。

## 7. 感兴趣的 Pull Request

### Pull Request #58

**标题：**

`docs: add beginner simple-flow workflow guide`

**链接：**

https://github.com/nishuzumi/moss/pull/58

该 PR 用一个可运行的 Simple Flow Example 解决 Issue #55，并修改了：

1. `examples/simple-flow/README.md`
2. 根目录 `README.md`
3. 根目录 `README.zh-CN.md`

详细内容被放在对应的 Example 目录中，根目录 README 只增加导航入口。

Maintainer Review 后，贡献者进一步缩小了文档范围，只保留：

- 前置条件和环境变量；
- 两条运行命令；
- 工作流程图；
- 遇到 Warning 时停止；
- 不签名、不发送交易的安全边界；
- 源码和完整教程入口。

这避免了同一内容在多个文档中重复维护。

## 8. 从 Issue 和 PR 中获得的认识

高质量开源贡献不是修改内容越多越好，而应遵循：

    发现一个明确问题
    → 检查是否已有 Issue 或 PR
    → 控制修改范围
    → 提供运行或测试证据
    → 提交 Pull Request
    → 接受 Maintainer Review
    → 根据反馈修改
    → 清楚回复修改结果

PR #58 还说明，文档贡献同样需要考虑架构一致性、维护成本和内容重复问题。

## 9. 我的发现

1. Moss 不只是普通的 Protocol SDK，而是在建立 AI Agent 调用链上协议的统一语言和验证流程；
2. Protocol Package 负责隐藏地址、ABI、calldata 和结果解析细节；
3. Agent 只处理统一的 Capability 和 Query；
4. 模拟产生的有序 Change 和结构化 Receipt 是重要的验证证据；
5. 用户钱包保留最终签名权；
6. Moss 目前只支持 Monad Mainnet，仍处于 Alpha 阶段；
7. 项目非常重视架构术语、类型安全、测试和文档一致性；
8. 新增 Adapter 的工作量不仅是增加一个合约调用，还要完成 ABI 来源、参数契约、Receipt Parser、测试和主网模拟；
9. 第一次贡献更适合从真实运行后发现的文档、Example 或开发体验问题开始；
10. 不应重复提交已经有人处理的 Issue。

## 10. 我的后续贡献方向

我选择 Dev Builder 作为主方向，Research Builder 作为辅助方向。

本周计划：

1. 在本地安装并构建 Moss；
2. 运行离线测试；
3. 运行一个官方 Example；
4. 记录真实安装过程和错误；
5. 根据实际体验整理新手教程；
6. 检查发现的问题是否已有 Issue 或 PR；
7. 从一个范围明确的文档、Example 或测试改进开始第一次 Pull Request；
8. 在熟悉项目架构后，再评估 Protocol Adapter 任务。

## 11. 学习收获

通过本次 GitHub 探索，我第一次系统阅读了一个真实 Web3 开源项目的 README、目录结构、Issues、Pull Requests、贡献指南和 Agent 规则。

我认识到，阅读开源项目不能只看代码，还需要理解：

- 项目为什么存在；
- Maintainer 接受什么样的贡献；
- 架构边界是什么；
- 如何运行测试；
- Issue 是否已经有人处理；
- PR 如何提供证据；
- Review 如何改变最终方案。

后续我会先运行 Moss，再根据真实使用过程决定贡献内容，而不是直接让 AI 生成一份没有经过验证的修改。
