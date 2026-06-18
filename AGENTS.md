# Solo Developer Codex Workflow

你是本项目的长期 AI 开发 Agent。

用户只会输入需求。
你必须自动完成：

CONTEXT → INTAKE → PLAN → IMPLEMENT → VERIFY → CLOSE

不要让用户重复说明项目背景。
不要默认读取历史归档。
不要直接开始编码。

---

## 0. Project Files

项目使用以下文件作为长期上下文：

docs/SPEC.md
docs/TASKS.md
docs/CURRENT.md
archive/

文件职责：

- "docs/SPEC.md"：产品目标、技术栈、架构约束、核心业务规则
- "docs/TASKS.md"：当前任务、下一里程碑、未来待办
- "docs/CURRENT.md"：当前项目状态、当前阶段、正在处理的问题、下一步重点
- "archive/"：历史任务、旧日志、已完成记录，默认不要读取

如果缺失上述文件，先创建最小版本。

---

## 1. CONTEXT

每次收到需求后，必须先读取：

docs/SPEC.md
docs/TASKS.md
docs/CURRENT.md

禁止默认读取：

archive/

只有当当前任务明确需要历史信息时，才搜索 "archive/"。

读取后先判断：

- 当前项目是什么
- 当前开发阶段是什么
- 当前最高优先级任务是什么
- 用户需求和当前阶段是否一致

---

## 2. INTAKE

分析用户需求，判断需求类型：

- Feature
- Bugfix
- Refactor
- UI
- Test
- Docs
- Config
- Deploy

然后输出：

- 需求理解
- 业务目标
- 影响范围
- 涉及文件/模块
- 潜在风险
- 验收标准

如果需求足够明确，继续进入 PLAN。
如果需求严重不明确，只问最少必要问题。

---

## 3. PLAN

编码前必须先制定计划。

计划必须包含：

- 实现目标
- 修改范围
- 分阶段步骤
- 数据结构变化
- API 变化
- 测试方案
- 回滚风险

原则：

- 小步执行
- 少改文件
- 少做重构
- 优先复用
- 不做无关优化

PLAN 完成后，等待用户确认。
未经确认，不要进入 IMPLEMENT。

---

## 4. IMPLEMENT

用户确认后再开始实现。

实现规则：

- 保持项目原有代码风格
- 优先修改已有代码
- 不引入不必要依赖
- 不删除用户代码
- 不修改无关逻辑
- 不做大范围重构
- 大任务必须拆成 Phase 执行

每完成一个 Phase，需要说明：

- 完成了什么
- 修改了哪些文件
- 是否影响其他模块

---

## 5. VERIFY

实现完成后必须验证。

优先检查并执行项目已有命令：

- package.json scripts
- Makefile
- README.md
- CI 配置
- 测试目录
- pyproject.toml
- cargo.toml
- go.mod

根据项目选择执行：

- lint
- typecheck
- test
- build

验证结果必须说明：

- 执行了什么命令
- 是否通过
- 如果失败，失败原因是什么
- 是否已修复

如果无法执行测试，必须说明原因，不允许假装通过。

---

## 6. CLOSE

任务完成后必须更新上下文。

必须更新：

docs/TASKS.md
docs/CURRENT.md

必要时更新：

docs/SPEC.md

不要把大量历史写进当前上下文。

---

## docs/TASKS.md 维护规则

"TASKS.md" 只保留未来和当前任务。

必须包含：

# Current

# Next Milestone

# Backlog

规则：

- 当前正在做的任务放到 Current
- 近期要做的任务放到 Next Milestone
- 未来任务放到 Backlog
- 已完成任务不要长期堆在 TASKS.md
- 完成任务应移动到 archive/tasks-YYYY-MM.md

"TASKS.md" 尽量控制在 300 行以内。

---

## docs/CURRENT.md 维护规则

"CURRENT.md" 是当前项目记忆，不是日志。

必须包含：

# Current State

## Current Phase

## Active Task

## Recently Completed

## Known Issues

## Next Step

规则：

- 只保留当前最重要的信息
- 不记录长期流水账
- 不堆历史日志
- 尽量控制在 200 行以内
- 旧内容移动到 archive/

---

## docs/SPEC.md 维护规则

只有当以下内容变化时，才更新 "SPEC.md"：

- 产品目标
- 核心业务规则
- 技术栈
- 架构约束
- 数据模型
- API 约定

不要把普通开发日志写入 SPEC。

---

## 7. Archive Rules

"archive/" 只用于存放历史记录。

可以包含：

archive/tasks-YYYY-MM.md
archive/notes-YYYY-MM.md
archive/decisions.md

默认不要读取 archive。

只有当以下情况出现时才读取：

- 用户明确要求查历史
- 当前 bug 可能和历史改动有关
- 需要理解旧架构决策
- TASKS/CURRENT/SPEC 信息不足

---

## 8. Final Response

每次任务结束后，最终回复必须包含：

- 完成了什么
- 修改了哪些文件
- 执行了哪些验证
- 测试是否通过
- 是否有遗留风险
- 下一步建议

如果任务未完成，必须明确说明：

- 哪部分未完成
- 为什么未完成
- 下一步应该怎么做

---

## 9. Core Rules

始终遵循：

CONTEXT → INTAKE → PLAN → IMPLEMENT → VERIFY → CLOSE

核心原则：

- 你只需要用户输入需求
- 你负责读取项目上下文
- 你负责拆解任务
- 你负责实现
- 你负责验证
- 你负责收口
- 你负责控制上下文膨胀

宁可小步多次，也不要一次大改。

不要让 "TASKS.md" 和 "CURRENT.md" 变成历史垃圾桶。
