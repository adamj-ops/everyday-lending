# .cursor Directory

This directory contains documentation, tools, and rules specifically for AI agent collaboration on the Everyday Lending project.

## Directory Structure

```
.cursor/
├── README.md           # This file
├── notes/             # Project documentation and notes
│   ├── agentnotes.md  # Critical info for agent sessions
│   ├── notebook.md    # Ongoing project discoveries
│   ├── project_checklist.md  # Current tasks and status
│   ├── bmad-workflow.md  # BMAD usage guide
│   ├── agent-interaction-guide.md  # Which agents to use when
│   ├── cis-usage-guide.md  # Creative Intelligence Suite guide
│   ├── bmad-integration-summary.md  # Integration status
│   ├── bmad-analysis-results.md  # Analysis findings
│   └── greenfield-decisions.md  # Architecture decisions
├── rules/             # Agent behavior rules
├── tools/             # Development tools
└── docs/              # Technical specifications
```

## Purpose

### notes/
Contains all project documentation that agents should reference:
- **agentnotes.md** - Read FIRST in every session for project overview
- **notebook.md** - Interesting findings and patterns
- **project_checklist.md** - Current tasks and progress
- **bmad-*.md** - BMAD-specific documentation

### rules/
Agent behavior guidelines:
- Code style preferences
- Communication patterns
- Project-specific rules
- Development workflows

### tools/
Utility scripts and tools:
- Web scraping tools
- Analysis scripts
- Build helpers
- Testing utilities

### docs/
Technical specifications:
- Architecture documents
- Design documents
- Technical decisions
- API specifications

## For New Agent Sessions

When starting a new agent session:

1. **Read** `.cursor/notes/agentnotes.md` first
2. **Check** `.cursor/notes/project_checklist.md` for current status
3. **Review** `.cursor/notes/notebook.md` for recent discoveries
4. **Consult** BMAD guides if using BMAD workflows

## BMAD Integration

This project is BMAD-enabled. BMAD v6's multi-agent ecosystem is available for:
- Deep codebase analysis
- Architecture proposals
- Creative problem-solving
- Continuous improvement

See `.cursor/notes/bmad-workflow.md` for complete BMAD usage guide.

## Maintenance

- Update `agentnotes.md` when project structure or approach changes
- Add to `notebook.md` when discovering interesting patterns
- Keep `project_checklist.md` current with task status
- Document decisions in appropriate files

---

*This directory structure follows the agent collaboration rules defined in user preferences.*
