# BMAD Workflow Guide for Everyday Lending

## Overview

The Everyday Lending project is now a BMAD-enabled development workspace. BMAD v6's multi-agent ecosystem orchestrates development across Frontend, Backend, Database, and UX streams using Build-Measure-Automate-Decide feedback loops.

## Installation Status

✅ **BMAD v6 Alpha installed** - October 11, 2025
- **Location**: `/Users/adamjudeh/everyday-lending/bmad/`
- **Modules**: Core, BMM (BMad Method), BMB (BMad Builder), CIS (Creative Intelligence Suite)
- **Configuration**: User: adam, Language: English, Output: `{project-root}/docs`

## Core BMAD Commands

### Phase 2: Analysis & Deep Dive

#### Run System Analysis
```bash
cd /Users/adamjudeh/everyday-lending/BMAD-METHOD
npx bmad analyze --repo ../everyday-lending --mode deep
```

This activates five specialized agents sequentially:
1. **System Analyst** (🔍) - Scans repo structure and builds architecture map
2. **Design Auditor** (🎨) - Reviews Shadcn/Tailwind usage and visual hierarchy
3. **Schema Validator** (📊) - Audits Drizzle schema and relational integrity
4. **Frontend Synthesizer** (🧩) - Evaluates React structure, hooks, and state flow
5. **BMAD Tracker** (📈) - Logs metrics and recommendations

**Expected Outputs** in `/reports/`:
- `design_audit.md` - Shadcn/Tailwind assessment
- `schema_audit.md` - Database schema analysis
- `frontend_review.md` - React architecture evaluation
- `architecture_overview.json` - Complete system map
- `bmad_summary.md` - Consolidated recommendations

### Phase 3: Greenfield Build Mode

#### Activate Greenfield Architecture
```bash
cd /Users/adamjudeh/everyday-lending/BMAD-METHOD
npx bmad dev --project everyday-lending --mode greenfield
```

This spins up three parallel sub-agents:
1. **Frontend Architect** (🎨) - Rebuilds visual hierarchy → `/ui-v6/` folder
2. **Service Architect** (⚙️) - Designs REST/RPC endpoints → `/services/` folder
3. **Data Architect** (🗄️) - Normalizes Drizzle schema → `/db-v6/` folder

Each agent outputs:
- `proposal.md` - Detailed architectural proposal
- Code scaffolding ready for review and commit

### Phase 4: Continuous Improvement Cluster

#### Start Persistent Agent Cluster
```bash
cd /Users/adamjudeh/everyday-lending/BMAD-METHOD
npx bmad start --cluster everyday-lending
```

This deploys four persistent agents:
1. **UX Composer** (🧩) - Builds dynamic components using BMAD design tokens
2. **Service Builder** (⚙️) - Autogenerates CRUD and action endpoints
3. **Documentation Agent** (📝) - Writes inline API + system docs
4. **BMAD Evaluator** (📊) - Scores commits and generates improvement prompts

The cluster runs continuously, watching the repo and proposing structured improvements like a live in-repo PM.

## BMM (BMad Method) Workflows

### Phase 1: Analysis

**Analyst workflows:**
```bash
# Interactive brainstorming for features
agent bmm/analyst
> *brainstorm-project

# Market research
> *research

# Create product brief
> *product-brief
```

### Phase 2: Planning

**PM workflows:**
```bash
agent bmm/pm
> *plan-project
```

### Phase 3: Solutioning

**Architect workflows:**
```bash
agent bmm/architect
> *solution-architecture
> *tech-spec
```

### Phase 4: Implementation

**Scrum Master & Dev workflows:**
```bash
# SM creates story context
agent bmm/sm
> *create-story
> *story-context

# Dev implements the story
agent bmm/dev
> *implement-story
```

## CIS (Creative Intelligence Suite) Agents

Access creative problem-solving workflows:

### Carson - Brainstorming Coach
```bash
agent cis/brainstorming-coach
> *brainstorm
```
Use for: Ideating new lending features, exploring product opportunities

### Maya - Design Thinking Coach
```bash
agent cis/design-thinking-coach
> *design-thinking
```
Use for: User-centered design for lender/borrower experiences

### Dr. Quinn - Problem Solver
```bash
agent cis/creative-problem-solver
> *problem-solving
```
Use for: Tackling complex loan calculation challenges

### Victor - Innovation Strategist
```bash
agent cis/innovation-strategist
> *innovation-strategy
```
Use for: Disrupting lending business models, strategic planning

### Sophia - Storyteller
```bash
agent cis/storyteller
> *storytelling
```
Use for: Crafting compelling user narratives, content strategy

## Daily Development Workflow

### 1. Morning Analysis
Run quick health check:
```bash
npx bmad analyze --repo ../everyday-lending --mode quick
```

### 2. Feature Development
- Use CIS agents (Carson, Maya) for ideation and design
- Use BMM Analyst for product brief
- Use BMM PM for PRD/planning
- Use BMM Architect for technical specification
- Use BMM SM/Dev for implementation

### 3. Continuous Improvement
Keep the cluster running during development:
```bash
npx bmad start --cluster everyday-lending
```

## File Locations

- **BMAD Installation**: `/Users/adamjudeh/everyday-lending/bmad/`
- **Analysis Reports**: `/Users/adamjudeh/everyday-lending/reports/`
- **Greenfield Proposals**:
  - UI: `/Users/adamjudeh/everyday-lending/ui-v6/`
  - Services: `/Users/adamjudeh/everyday-lending/services/`
  - Database: `/Users/adamjudeh/everyday-lending/db-v6/`
- **Documentation**: `/Users/adamjudeh/everyday-lending/docs/`
- **Stories**: `/Users/adamjudeh/everyday-lending/docs/stories/`

## Agent Customization

All agents can be customized via YAML files in:
```
/Users/adamjudeh/everyday-lending/bmad/_cfg/agents/
```

Each agent has a `.customize.yaml` file where you can modify:
- Agent name
- Persona and communication style
- Language
- Custom instructions

## Best Practices

1. **Start with Analysis**: Always run deep analysis before major refactoring
2. **Use Greenfield for New Features**: Let BMAD propose architecture for significant new features
3. **Leverage CIS Early**: Use creative agents during ideation phase, not after implementation
4. **Keep Cluster Running**: The continuous improvement cluster provides valuable real-time feedback
5. **Review All Proposals**: Always review BMAD-generated proposals before committing
6. **Document Decisions**: Update `.cursor/notes/` with decisions and rationale

## Troubleshooting

### Command Not Found
Ensure you're running commands from the BMAD-METHOD directory:
```bash
cd /Users/adamjudeh/everyday-lending/BMAD-METHOD
```

### Interactive Prompts
Most BMAD commands are interactive. Ensure you're running in a proper terminal environment.

### Module Not Available
Check installed modules:
```bash
cat /Users/adamjudeh/everyday-lending/bmad/_cfg/manifest.yaml
```

## Next Steps

1. ✅ BMAD installed and configured
2. ⏳ Run deep dive analysis
3. ⏳ Review analysis reports
4. ⏳ Execute greenfield build mode
5. ⏳ Activate continuous improvement cluster
6. ⏳ Integrate CIS workflows into development process

---

*Last Updated: October 11, 2025*
*BMAD Version: 6.0.0-alpha.0*
