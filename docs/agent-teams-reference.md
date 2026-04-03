# Agent Teams — Master Reference Guide

> Source: https://code.claude.com/docs/en/agent-teams
> Requires: Claude Code v2.1.32+, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

---

## What Are Agent Teams?

Agent teams coordinate multiple Claude Code instances working together. One session is the **team lead** — it coordinates work, assigns tasks, and synthesizes results. **Teammates** work independently, each in its own context window, and can communicate directly with each other.

Key distinction from subagents: teammates message each other directly; subagents only report back to the main agent.

---

## Enable Agent Teams

Already enabled in this project via `.claude/settings.local.json`:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

---

## Architecture

| Component    | Role                                                                          |
| :----------- | :---------------------------------------------------------------------------- |
| Team lead    | Main Claude Code session — creates team, spawns teammates, coordinates work   |
| Teammates    | Separate Claude Code instances, each working on assigned tasks                |
| Task list    | Shared list of work items that teammates claim and complete                   |
| Mailbox      | Messaging system for direct inter-agent communication                         |

**Storage locations:**
- Team config: `~/.claude/teams/{team-name}/config.json`
- Task list: `~/.claude/tasks/{team-name}/`

> Do NOT hand-edit the team config — it is overwritten on every state update.

---

## Subagents vs Agent Teams

| Dimension      | Subagents                                       | Agent Teams                                          |
| :------------- | :---------------------------------------------- | :--------------------------------------------------- |
| Context        | Own window; results return to caller            | Own window; fully independent                        |
| Communication  | Report results back to main agent only          | Teammates message each other directly                |
| Coordination   | Main agent manages all work                     | Shared task list with self-coordination              |
| Best for       | Focused tasks where only the result matters     | Complex work requiring discussion and collaboration  |
| Token cost     | Lower — results summarized back to main context | Higher — each teammate is a separate Claude instance |

**Rule of thumb:** use subagents for quick, focused delegation; use agent teams when workers need to share findings and coordinate independently.

---

## When to Use Agent Teams

**Strong use cases (parallel exploration adds real value):**
- Research and review — multiple angles simultaneously
- New modules or features — teammates own separate pieces
- Debugging with competing hypotheses — parallel theory testing
- Cross-layer work — frontend/backend/tests, each owned by a different teammate

**Avoid agent teams for:**
- Sequential tasks
- Same-file edits
- Work with many inter-dependencies
- Routine tasks (a single session is more cost-effective)

---

## Starting a Team

Tell Claude in natural language. Example:

```
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Create an agent team to explore this from different angles:
one teammate on UX, one on technical architecture, one playing devil's advocate.
```

Claude creates the team, spawns teammates, assigns tasks, synthesizes findings, and cleans up.

---

## Display Modes

| Mode         | Description                                                                 | Requirement              |
| :----------- | :-------------------------------------------------------------------------- | :----------------------- |
| `in-process` | All teammates in main terminal. Shift+Down to cycle; type to message        | Any terminal             |
| `tmux`       | Each teammate in its own split pane. Click to interact                      | tmux or iTerm2 + `it2`   |
| `auto`       | Default — uses split panes if inside tmux, in-process otherwise             | —                        |

**Override globally** in `~/.claude.json`:
```json
{ "teammateMode": "in-process" }
```

**Override per session:**
```bash
claude --teammate-mode in-process
```

> Split-pane mode is NOT supported in VS Code integrated terminal, Windows Terminal, or Ghostty.

---

## Key Controls (In-Process Mode)

| Action                          | Key / Command               |
| :------------------------------ | :-------------------------- |
| Cycle through teammates         | Shift+Down                  |
| Interrupt a teammate's turn     | Escape (while in their view)|
| Toggle task list                | Ctrl+T                      |
| Message a specific teammate     | Cycle to them, then type    |

---

## Task System

- Tasks have three states: **pending**, **in progress**, **completed**
- Tasks can have **dependencies** — a task with unresolved deps cannot be claimed
- Task claiming uses **file locking** to prevent race conditions
- Lead assigns tasks, OR teammates self-claim the next unassigned unblocked task

**Practical sizing:** 5–6 tasks per teammate keeps everyone productive. For 15 tasks → start with 3 teammates.

---

## Messaging

- `message` — send to one specific teammate
- `broadcast` — send to all teammates simultaneously (use sparingly; cost scales with team size)

Teammate messages are delivered automatically to recipients — the lead does not need to poll.

---

## Plan Approval Workflow

For risky tasks, require teammates to plan before implementing:

```
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

Flow:
1. Teammate works in read-only plan mode
2. Sends plan approval request to lead
3. Lead approves or rejects with feedback
4. If rejected → teammate revises and resubmits
5. If approved → teammate exits plan mode and implements

Influence lead's approval criteria in the spawn prompt:
> "only approve plans that include test coverage"
> "reject plans that modify the database schema"

---

## Shutdown & Cleanup

Shut down a teammate gracefully:
```
Ask the researcher teammate to shut down
```

Clean up the entire team when done:
```
Clean up the team
```

> Always use the **lead** to run cleanup. Teammates running cleanup may leave resources in an inconsistent state.
> Shut down all teammates before running cleanup — cleanup fails if active teammates are still running.

---

## Hooks for Quality Gates

| Hook             | Trigger                                          | Exit 2 effect                                      |
| :--------------- | :----------------------------------------------- | :------------------------------------------------- |
| `TeammateIdle`   | Teammate is about to go idle                     | Send feedback; keep teammate working               |
| `TaskCreated`    | Task is being created                            | Prevent creation; send feedback                    |
| `TaskCompleted`  | Task is being marked complete                    | Prevent completion; send feedback                  |

---

## Permissions

- Teammates inherit the **lead's permission settings** at spawn time
- If lead runs `--dangerously-skip-permissions`, all teammates do too
- Per-teammate permission modes can be changed **after spawning**, not at spawn time

---

## Context Each Teammate Receives

- Project `CLAUDE.md` files (from working directory)
- MCP servers and skills
- Spawn prompt from the lead
- **Does NOT receive** the lead's conversation history

Always include task-specific context in the spawn prompt:

```
Spawn a security reviewer teammate with the prompt:
"Review src/auth/ for security vulnerabilities.
Focus on token handling, session management, and input validation.
The app uses JWT tokens stored in httpOnly cookies.
Report any issues with severity ratings."
```

---

## Reusable Teammate Roles (Subagent Definitions)

Define a subagent type once (project/user/plugin scope) and reference it when spawning:

```
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

The teammate inherits that subagent's system prompt, tools, and model.

---

## Best Practices

### Team size
- Start with **3–5 teammates** for most workflows
- Each extra teammate adds linear token cost and coordination overhead
- 3 focused teammates often outperform 5 scattered ones

### Task sizing
- Too small → coordination overhead exceeds benefit
- Too large → risk of wasted effort between check-ins
- Just right → self-contained unit with a clear deliverable (function, test file, review)

### Avoiding file conflicts
- Each teammate should own a **different set of files**
- Two teammates editing the same file causes overwrites

### Keeping the team on track
```
Wait for your teammates to complete their tasks before proceeding
```
Use this if the lead starts implementing instead of delegating.

### Start with research tasks
If new to agent teams: start with review/research tasks (no code writes) to learn the coordination patterns before doing parallel implementation.

### Monitor and steer
Check in regularly. Redirect poor approaches early. Synthesize findings as they arrive. Don't let a team run unattended for long.

---

## Proven Use Case Patterns

### Parallel Code Review
```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

### Competing Hypothesis Debugging
```
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific
debate. Update the findings doc with whatever consensus emerges.
```

### Design Exploration
```
Create an agent team to explore [feature] from different angles:
one teammate on UX, one on technical architecture, one playing devil's advocate.
```

---

## Limitations (Experimental)

| Limitation                        | Detail                                                                                        |
| :-------------------------------- | :-------------------------------------------------------------------------------------------- |
| No session resumption             | `/resume` and `/rewind` do not restore in-process teammates                                   |
| Task status can lag               | Teammates sometimes fail to mark tasks complete — check and nudge manually if stuck           |
| Slow shutdown                     | Teammates finish current request/tool call before shutting down                               |
| One team per session              | Clean up current team before starting a new one                                               |
| No nested teams                   | Teammates cannot spawn their own teams — only the lead can manage the team                    |
| Fixed lead                        | Session that creates the team is always the lead; leadership cannot be transferred            |
| Permissions set at spawn          | Cannot set per-teammate modes at spawn time, only after                                       |
| Split panes: terminal restriction | Not supported in VS Code integrated terminal, Windows Terminal, or Ghostty                    |

---

## Troubleshooting

| Problem                          | Fix                                                                                     |
| :------------------------------- | :-------------------------------------------------------------------------------------- |
| Teammates not appearing          | Press Shift+Down; check tmux is in PATH (`which tmux`); verify task complexity          |
| Too many permission prompts      | Pre-approve common operations in permission settings before spawning                    |
| Teammate stopped on error        | Cycle to them with Shift+Down; give instructions or spawn a replacement                 |
| Lead shuts down too early        | Tell lead to keep going; instruct it to wait for teammates before proceeding            |
| Orphaned tmux session            | `tmux ls` → `tmux kill-session -t <session-name>`                                       |
| Lead messages non-existent agents| After `/resume`, tell lead to spawn new teammates                                       |

---

## Token Cost Reminder

- Each teammate = separate Claude instance = separate token usage
- Costs scale **linearly** with team size
- Worthwhile for research/review/new features; expensive for routine tasks
- See: https://code.claude.com/docs/en/costs#agent-team-token-costs
