# BMAD Quick Reference Card

## Essential Commands

All commands run from: `/Users/adamjudeh/everyday-lending/BMAD-METHOD`

### Analysis
```bash
npx bmad analyze --repo ../everyday-lending --mode deep
```

### Greenfield Build
```bash
npx bmad dev --project everyday-lending --mode greenfield
```

### Continuous Improvement Cluster
```bash
npx bmad start --cluster everyday-lending
```

### Invoke Agent
```bash
agent [module]/[agent-name]
```

---

## Quick Agent Reference

### Core
```bash
agent core/bmad-master          # Main orchestrator
```

### Analysis Phase
```bash
agent bmm/analyst               # Research & briefs
  > *brainstorm-project
  > *research
  > *product-brief

agent cis/brainstorming-coach   # Ideation
  > *brainstorm

agent cis/innovation-strategist # Strategy
  > *innovation-strategy
```

### Planning Phase
```bash
agent bmm/pm                    # Product planning
  > *plan-project

agent cis/design-thinking-coach # UX design
  > *design-thinking
```

### Solutioning Phase
```bash
agent bmm/architect             # Architecture
  > *solution-architecture
  > *tech-spec

agent cis/creative-problem-solver # Problem solving
  > *problem-solving
```

### Implementation Phase
```bash
agent bmm/sm                    # Sprint management
  > *create-story
  > *story-context

agent bmm/dev                   # Development
  > *implement-story
```

### Content & Documentation
```bash
agent cis/storyteller           # Narratives
  > *storytelling
```

---

## CIS Agents at a Glance

| Agent | Use When | Workflow |
|-------|----------|----------|
| Carson | Need creative ideas | `*brainstorm` |
| Maya | Designing user experience | `*design-thinking` |
| Dr. Quinn | Stuck on a problem | `*problem-solving` |
| Victor | Strategic decisions | `*innovation-strategy` |
| Sophia | Writing content | `*storytelling` |

---

## Common Workflows

### New Feature
1. Carson → Brainstorm
2. Maya → Design UX
3. Analyst → Product brief
4. PM → PRD
5. Architect → Tech spec
6. SM → Create stories
7. Dev → Implement

### Bug/Problem
1. Dr. Quinn → Root cause
2. Architect → Solution design
3. Dev → Fix

### Strategic Planning
1. Victor → Innovation strategy
2. Analyst → Research
3. PM → Roadmap

---

## File Locations

- **BMAD Installation**: `/Users/adamjudeh/everyday-lending/bmad/`
- **Reports**: `/Users/adamjudeh/everyday-lending/reports/`
- **Greenfield**: `/ui-v6/`, `/services/`, `/db-v6/`
- **Docs**: `/Users/adamjudeh/everyday-lending/docs/`

---

## Configuration

- **User**: adam
- **Language**: English
- **Output**: `{project-root}/docs`
- **Project**: everyday-lending

---

*Keep this handy for quick BMAD command lookup!*
