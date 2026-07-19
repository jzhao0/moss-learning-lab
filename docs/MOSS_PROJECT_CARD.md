# Moss Project Card

## 1. 项目基本信息

- **项目名称：** Moss
- **官方仓库：** https://github.com/nishuzumi/moss
- **项目类型：** AI Agent × Web3 开源框架
- **当前阶段：** 未经审计的 Alpha 软件
- **当前支持网络：** Monad Mainnet
- **Chain ID：** 143
- **主要语言与工具：** TypeScript、Node.js、pnpm、MCP

## 2. 项目简介

Moss 将复杂的链上协议交互封装为 AI Agent 可以调用的统一 Capability。

它把协议交互流程统一为：

    discover → load → action → simulate

AI Agent 可以先发现可用能力、读取参数和规则、构造未签名交易，再通过模拟验证执行结果。

Moss 本身不负责签名，也不会直接广播交易。最终是否签名和发送，仍由用户的钱包决定。

## 3. Moss 希望解决的核心问题

不同 Web3 协议通常具有不同的：

- 合约地址；
- ABI；
- 函数参数；
- calldata 构造方式；
- 多步骤调用流程；
- 查询方式；
- 交易结果解析逻辑。

如果每个 AI Agent 都直接处理这些底层细节，开发者需要为每个协议重复编写集成代码，并承担参数错误、调用顺序错误和交易结果难以验证等风险。

Moss 希望通过标准化的 Protocol、Capability、Query 和 Receipt 体系，将这些复杂度封装在协议包中，使 Agent 面向统一接口工作。

## 4. 核心能力

### Discover

发现当前 Registry 中可以调用的 Protocol、Capability 和 Query。

### Load

读取某项能力的参数结构、类型、说明和调用规则。

### Action

根据用户意图和参数，构造一笔未签名交易。

### Simulate

在签名前模拟交易，检查执行结果、Event、原生 MON 转账、Warning 和结构化 Receipt。

## 5. 核心概念

### Protocol

把一个链上协议封装为自描述的 Adapter，可以包含多个合约，也可以声明其他 Protocol 作为依赖。

### Capability

表示一个链上写入意图。每个 Capability 拥有一笔直接的未签名交易和对应的 Receipt parser。

Capability 不负责签名或发送交易。

### Query

用于读取链上状态，不构造写入交易。

### Change

模拟成功后，按照真实执行顺序记录的 Event 或原生 MON 转账。

### Receipt Parser

将成功交易产生的有序 Change 转换为结构化结果。

Receipt parser 只能依据交易执行产生的证据进行解释，不能通过外部状态补造结果。

### Receipt

包含结构化 Outcome、展示文本和可核查的执行证据。

其中结构化数据是权威结果，文本主要用于向用户或 Agent 展示。

## 6. 当前支持的能力

根据当前 README，Moss 已支持：

| Protocol | Package | Capability | Query |
|---|---|---|---|
| WMON | `@themoss/system` | wrap、unwrap | balanceOf |
| ERC-20 与 Native MON | `@themoss/erc` | transfer、approve | balanceOf、allowance、metadata |
| ERC-721 | `@themoss/erc` | transfer | ownerOf、balanceOf |
| Kuru | `@themoss/protocol-kuru` | swap | quote |

## 7. 仓库主要结构

| 目录或模块 | 主要职责 |
|---|---|
| `packages/core` | Framework contract、Registry、参数契约、Capability tree、Receipt 验证 |
| `packages/simulator` | 交易 Trace、状态串联、有序 Change 提取 |
| `packages/erc` | ERC 标准、ABI 和 Receipt 语义 |
| `packages/system` | Monad Runtime、官方常量和系统 Protocol |
| `packages/protocols/*` | 各协议的 ABI、Capability、Query、依赖和 Receipt |
| `packages/mcp-server` | MCP 传输和应用组合 |
| `examples` | 可以运行的使用示例 |
| `docs` | 入门、架构、安全和 Protocol 接入文档 |

## 8. 开发与运行要求

Moss 当前要求：

- Node.js 22 或更高版本；
- pnpm 11；
- 先执行 build，再执行 typecheck。

主要命令包括：

    pnpm install
    pnpm build
    pnpm typecheck
    pnpm lint
    pnpm test

离线测试可以使用：

    pnpm test:offline

Moss 的测试和示例可以读取 Monad 主网状态，但 Moss 本身不会持有私钥、签名或发送交易。

## 9. 安全边界

Moss 当前的主要安全边界包括：

1. 只构造未签名交易；
2. 不持有或请求用户私钥；
3. 不替用户签名；
4. 不直接广播交易；
5. 在签名前执行模拟；
6. 返回结构化 Receipt 和 Warning；
7. 遇到交易回滚、Trace 失败或证据覆盖不一致时停止；
8. 最终交易是否签名，由用户钱包决定；
9. 当前为未经审计的 Alpha 软件，不应用于生产资金。

## 10. 开源贡献要求

Moss 接受的贡献包括：

1. 新 Protocol package、Capability 或 Query；
2. 可运行的 Tutorial、Example 和 Documentation；
3. Bug 修复、安全检查和聚焦的核心改进。

提交代码前通常需要运行：

    pnpm lint
    pnpm build
    pnpm typecheck
    pnpm test

同一次修改中的代码、测试、示例和文档应保持一致。

新增 Protocol 时，应从以下模板开始：

    packages/protocols/_template

新增 Protocol 还需要：

- 明确 ABI 来源；
- 明确固定地址的官方来源；
- 验证部署 bytecode；
- 编写 Capability 和 Query；
- 编写 Receipt parser；
- 覆盖成功和失败测试；
- 通过 Monad 主网模拟；
- 保持修改范围聚焦。

## 11. 感兴趣的 Issue 和 Pull Request

### Issue #55

标题：

`docs: add a simple end-to-end example explaining the discover → load → action → simulate workflow`

链接：

https://github.com/nishuzumi/moss/issues/55

该 Issue 指出，现有文档分别解释了四个阶段，但新手不容易理解它们如何在一次真实操作中连接起来。

Issue 建议增加：

1. 一个用户请求；
2. `discover` 如何发现能力；
3. `load` 如何读取能力定义；
4. `action` 如何准备交易；
5. `simulate` 如何在签名前验证结果；
6. 一张流程图或时序图。

### Pull Request #58

链接：

https://github.com/nishuzumi/moss/pull/58

该 PR 为 Issue #55 增加了新手工作流说明，并展示了真实的开源协作过程：

    明确问题
    → 编写文档
    → 提交 Commit
    → 发起 Pull Request
    → Maintainer Review
    → 根据反馈缩小范围
    → 再次修改和回复

维护者要求详细内容放在对应 Example 目录中，根 README 只增加导航链接，避免复制已有教程和产生多份重复维护的文档。

这让我认识到，高质量开源贡献不是修改得越多越好，而是要解决明确问题、控制修改范围、提供验证证据，并根据维护者反馈迭代。

## 12. 可能的应用场景

我认为 Moss 未来可能应用于：

1. AI Agent 自动发现并调用链上协议；
2. 钱包中的自然语言交易助手；
3. DeFi 操作的交易构造与签名前模拟；
4. 多协议投资组合和资产管理 Agent；
5. 链上风险分析和交易解释工具；
6. 自动化测试与协议集成验证；
7. 预测市场研究和链上执行辅助；
8. 面向开发者的 MCP Server 和 Agent 工具平台；
9. 链上量化策略的模拟和风险检查；
10. 用户签名前的意图核对与结果解释。

## 13. 我的理解

Moss 的价值并不是让 AI 绕过用户并自动控制钱包，而是把不同协议的复杂调用规则转化为统一、可发现、可模拟和可验证的能力。

它将 Agent 与原始 ABI、calldata 和多步骤协议细节隔离，让 Protocol package 负责描述交互规则，让模拟器负责提供执行证据，让用户钱包保留最终签名权。

这种设计适合用于 AI Agent、链上数据工具、交易模拟和风险分析。

对我后续计划开发的预测市场与量化研究工具而言，Moss 可以作为“研究结果到链上操作”之间的标准化执行层。例如，链下系统负责市场数据采集、概率分析和风险判断，Moss 负责把经过人工确认的意图转化为可模拟、可检查的链上操作。

但 Moss 当前仍是未经审计的 Alpha 软件，因此现阶段只应在学习、测试和模拟环境中使用，不应用于真实生产资金。

## 14. 参考资料

- Moss GitHub  
  https://github.com/nishuzumi/moss

- 中文 README  
  https://github.com/nishuzumi/moss/blob/main/README.zh-CN.md

- Contributing Guide  
  https://github.com/nishuzumi/moss/blob/main/CONTRIBUTING.md

- Architecture Context  
  https://github.com/nishuzumi/moss/blob/main/CONTEXT.md

- Agent Instructions  
  https://github.com/nishuzumi/moss/blob/main/CLAUDE.md

- Issue #55  
  https://github.com/nishuzumi/moss/issues/55

- Pull Request #58  
  https://github.com/nishuzumi/moss/pull/58
