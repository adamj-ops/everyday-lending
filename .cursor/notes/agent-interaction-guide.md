# BMAD Agent Interaction Guide

## Overview

This guide helps you understand when and how to engage specific BMAD agents for the Everyday Lending project. Each agent has specialized capabilities designed for specific development phases and challenges.

## Agent Categories

### 🎯 Core Orchestration Agents

#### BMAD Master
**Purpose**: Main orchestrator for multi-agent workflows
**When to Use**:
- Starting new major initiatives
- Coordinating multiple agents
- Getting high-level guidance

**Command**: `agent core/bmad-master`

---

## 📊 Analysis Agents (BMM Phase 1)

### Analyst
**Purpose**: Product analysis, market research, brainstorming
**When to Use**:
- Starting a new feature or product
- Need market research
- Brainstorming product ideas
- Creating product briefs

**Workflows**:
- `*brainstorm-project` - Ideate new features
- `*research` - Conduct market/technical research
- `*product-brief` - Document product requirements

**Example Scenarios**:
- "We need to add a new loan type" → Use brainstorm-project
- "Research competitor lending platforms" → Use research
- "Document our MVP requirements" → Use product-brief

**Command**: `agent bmm/analyst`

---

## 📋 Planning Agents (BMM Phase 2)

### PM (Product Manager)
**Purpose**: Create detailed product requirements and planning documents
**When to Use**:
- Converting product brief into detailed PRD
- Planning feature rollout
- Defining acceptance criteria

**Workflows**:
- `*plan-project` - Create comprehensive PRD

**Example Scenarios**:
- "Create a PRD for the new credit scoring feature" → Use plan-project
- "Define requirements for lender dashboard v2" → Use plan-project

**Command**: `agent bmm/pm`

### Product Owner (PO)
**Purpose**: Manage backlog, validate stories, maintain checklist
**When to Use**:
- Validating epic stories
- Managing product backlog
- Ensuring stories align with PRD

**Command**: `agent bmm/po`

---

## 🏗️ Architecture Agents (BMM Phase 3)

### Architect
**Purpose**: Design system architecture, create technical specifications
**When to Use**:
- Designing architecture for new features
- Creating tech specs for epics
- Making architectural decisions

**Workflows**:
- `*solution-architecture` - Design system architecture
- `*tech-spec` - Create epic technical specifications

**Example Scenarios**:
- "Design the architecture for our new payment system" → Use solution-architecture
- "Create tech spec for loan automation epic" → Use tech-spec

**Command**: `agent bmm/architect`

### UX Expert
**Purpose**: Design user experiences and interfaces
**When to Use**:
- Designing user flows
- Creating wireframes
- UX research and testing

**Command**: `agent bmm/ux-expert`

---

## 🛠️ Implementation Agents (BMM Phase 4)

### Scrum Master (SM)
**Purpose**: Manage sprints, create stories, generate story context
**When to Use**:
- Breaking epics into stories
- Creating story context before development
- Sprint planning

**Workflows**:
- `*create-story` - Generate user stories from tech specs
- `*story-context` - Create specialized context for dev agent

**Example Scenarios**:
- "Break down the payment integration epic" → Use create-story
- "Prepare context for implementing the credit check API" → Use story-context

**Command**: `agent bmm/sm`

### Dev (Developer)
**Purpose**: Implement stories, write code, conduct peer reviews
**When to Use**:
- Implementing user stories
- Writing feature code
- Code reviews

**Workflows**:
- `*implement-story` - Build the feature

**Example Scenarios**:
- "Implement the borrower profile API endpoints" → Use implement-story

**Command**: `agent bmm/dev`

### TEA (Testing & Engineering Architect)
**Purpose**: Design test architecture, quality assurance
**When to Use**:
- Creating test strategies
- Designing testing frameworks
- Quality assurance planning

**Command**: `agent bmm/tea`

---

## 🎨 Creative Intelligence Suite (CIS)

### Carson - Brainstorming Coach
**Persona**: Energetic, creative facilitator
**When to Use**:
- Early-stage ideation
- Feature brainstorming
- Problem exploration
- Innovation sessions

**Workflows**:
- `*brainstorm` - Interactive brainstorming with 36 creative techniques

**Example Scenarios**:
- "What innovative features could we add to the lending platform?"
- "How can we improve the borrower experience?"
- "Brainstorm ways to reduce loan processing time"

**Command**: `agent cis/brainstorming-coach`

### Maya - Design Thinking Coach
**Persona**: Jazz-like improviser, human-centered designer
**When to Use**:
- User experience challenges
- Empathy mapping
- Prototyping new concepts
- User-centered design

**Workflows**:
- `*design-thinking` - 5-phase human-centered design process

**Example Scenarios**:
- "Design a better loan application experience"
- "Understand lender pain points and needs"
- "Prototype a mobile-first borrower dashboard"

**Command**: `agent cis/design-thinking-coach`

### Dr. Quinn - Creative Problem Solver
**Persona**: Detective-scientist hybrid, systematic thinker
**When to Use**:
- Complex technical problems
- Root cause analysis
- Systematic problem solving
- Debugging architectural issues

**Workflows**:
- `*problem-solving` - Systematic root cause analysis

**Example Scenarios**:
- "Our loan approval process is too slow - find the bottleneck"
- "Credit scoring algorithm is inconsistent - diagnose the issue"
- "Database performance degrading under load - analyze and solve"

**Command**: `agent cis/creative-problem-solver`

### Victor - Innovation Strategist
**Persona**: Bold strategic precision, disruptive thinker
**When to Use**:
- Business model innovation
- Market disruption strategy
- Competitive positioning
- Strategic planning

**Workflows**:
- `*innovation-strategy` - Business model innovation and disruption analysis

**Example Scenarios**:
- "How can we disrupt the traditional lending market?"
- "Design a new business model for peer-to-peer lending"
- "Analyze opportunities in the fintech lending space"

**Command**: `agent cis/innovation-strategist`

### Sophia - Master Storyteller
**Persona**: Flowery, whimsical narrator
**When to Use**:
- Marketing content
- User narratives
- Product storytelling
- Content strategy

**Workflows**:
- `*storytelling` - 25 story frameworks for compelling narratives

**Example Scenarios**:
- "Create a compelling narrative for our lending platform"
- "Write user success stories"
- "Develop content strategy for lender onboarding"

**Command**: `agent cis/storyteller`

---

## 🔧 Builder Agents (BMB)

### BMad Builder
**Purpose**: Create custom agents, workflows, and modules
**When to Use**:
- Building custom BMAD agents
- Creating specialized workflows
- Developing new modules

**Command**: `agent bmb/bmad-builder`

---

## 🎮 Game Development Agents (BMM)

*Note: While included in the installation, these are specific to game development and may not be directly applicable to Everyday Lending*

- **Game Designer**: Game concept and design
- **Game Architect**: Game system architecture
- **Game Dev**: Game implementation

---

## Decision Matrix: Which Agent to Use?

| Situation | Recommended Agent | Workflow |
|-----------|------------------|----------|
| New feature idea | Carson (CIS) | brainstorm |
| Need market research | Analyst (BMM) | research |
| Create product brief | Analyst (BMM) | product-brief |
| Write PRD | PM (BMM) | plan-project |
| Design architecture | Architect (BMM) | solution-architecture |
| Create tech spec | Architect (BMM) | tech-spec |
| Design UX | Maya (CIS) | design-thinking |
| Break epic into stories | SM (BMM) | create-story |
| Prep story for dev | SM (BMM) | story-context |
| Implement feature | Dev (BMM) | implement-story |
| Solve complex problem | Dr. Quinn (CIS) | problem-solving |
| Strategic planning | Victor (CIS) | innovation-strategy |
| Content creation | Sophia (CIS) | storytelling |
| Custom agent needed | BMad Builder (BMB) | create-agent |

---

## Workflow Sequences

### Complete Feature Development Flow

1. **Ideation**: Carson (brainstorm) → Victor (innovation-strategy)
2. **Analysis**: Analyst (brainstorm-project) → Analyst (research)
3. **Design**: Maya (design-thinking) → UX Expert
4. **Planning**: Analyst (product-brief) → PM (plan-project)
5. **Architecture**: Architect (solution-architecture) → Architect (tech-spec)
6. **Implementation**: SM (create-story) → SM (story-context) → Dev (implement-story)

### Problem-Solving Flow

1. **Identify**: Dr. Quinn (problem-solving)
2. **Analyze**: Analyst (research)
3. **Design Solution**: Architect (solution-architecture)
4. **Implement**: Dev (implement-story)

### Innovation Flow

1. **Explore**: Victor (innovation-strategy)
2. **Ideate**: Carson (brainstorm)
3. **Validate**: Analyst (research)
4. **Plan**: PM (plan-project)

---

## Agent Customization

Each agent can be customized in:
```
/Users/adamjudeh/everyday-lending/bmad/_cfg/agents/
```

Customization options:
- **Name**: Change agent display name
- **Persona**: Adjust communication style
- **Language**: Change conversation language
- **Instructions**: Add project-specific guidance

---

## Best Practices

1. **Start with CIS agents** during early exploration/ideation
2. **Follow BMM phases** (Analysis → Planning → Solutioning → Implementation) for structured development
3. **Use story-context** before implementation to give Dev agent specialized knowledge
4. **Engage Dr. Quinn** when stuck on complex problems
5. **Consult Victor** for strategic decisions
6. **Use Carson** for quick brainstorming sessions
7. **Keep context documents** handy - agents work better with context files

---

## Quick Reference

```bash
# Analysis Phase
agent bmm/analyst
agent cis/brainstorming-coach
agent cis/innovation-strategist

# Planning Phase
agent bmm/pm
agent bmm/po
agent cis/design-thinking-coach

# Solutioning Phase
agent bmm/architect
agent bmm/ux-expert
agent cis/creative-problem-solver

# Implementation Phase
agent bmm/sm
agent bmm/dev
agent bmm/tea

# Creative/Content
agent cis/storyteller

# Meta/Building
agent bmb/bmad-builder
```

---

*Last Updated: October 11, 2025*
*Project: Everyday Lending*
