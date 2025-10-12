# Creative Intelligence Suite (CIS) Usage Guide

## Overview

The Creative Intelligence Suite provides five specialized agents with unique personas and methodologies for creative problem-solving, innovation, and strategic thinking. This guide explains how to integrate CIS workflows into the Everyday Lending development process.

---

## CIS Philosophy

**Facilitation Over Generation**: CIS agents guide you to discover your own insights through strategic questioning rather than generating solutions directly.

**Energy-Aware Sessions**: Built-in checkpoints monitor and adapt to user engagement levels.

**Context Integration**: All workflows accept optional context documents for domain-specific guidance.

---

## The Five CIS Agents

### 1. Carson - Elite Brainstorming Specialist

**Persona**: Energetic facilitator with enthusiasm and positive energy

**Specialty**: 36 creative techniques across 7 categories for ideation

**When to Use Carson**:
- Beginning a new product feature
- Exploring multiple solution approaches
- Breaking through creative blocks
- Innovation sessions with team
- Early-stage product discovery

**Workflow**: `*brainstorm`

**Technique Categories**:
1. **Divergent Thinking** - Generate many ideas
2. **Associative** - Connect unrelated concepts
3. **Perspective Shift** - View from different angles
4. **Constraints** - Use limitations creatively
5. **Visual/Spatial** - Think in images and structures
6. **Collaborative** - Leverage group dynamics
7. **Analytical** - Break down and recombine

**Example Sessions for Everyday Lending**:
```bash
agent cis/brainstorming-coach
> *brainstorm

Topics to explore with Carson:
- "How can we make loan applications more engaging?"
- "What features would delight lenders?"
- "How could we reduce default rates creatively?"
- "What's a completely new approach to credit scoring?"
- "How can we gamify the borrowing experience?"
```

**Carson's Process**:
1. Define challenge clearly
2. Select from 36 brainstorming techniques
3. Facilitate divergent thinking
4. Generate ideas without judgment
5. Converge on promising concepts
6. Action planning

---

### 2. Maya - Design Thinking Maestro

**Persona**: Jazz-like improviser, fluid and adaptive

**Specialty**: Complete 5-phase human-centered design process

**When to Use Maya**:
- Redesigning user experiences
- Understanding user pain points
- Prototyping new features
- Empathy mapping for borrowers/lenders
- User research and validation

**Workflow**: `*design-thinking`

**5-Phase Process**:
1. **Empathize** - Deep user understanding
2. **Define** - Clarify the real problem
3. **Ideate** - Generate creative solutions
4. **Prototype** - Build to think
5. **Test** - Learn and iterate

**Example Sessions for Everyday Lending**:
```bash
agent cis/design-thinking-coach
> *design-thinking

Design challenges for Maya:
- "Design a borrower-first loan application flow"
- "Reimagine the lender dashboard experience"
- "Create an intuitive credit check interface"
- "Design mobile-first property evaluation"
- "Build trust in the lending platform"
```

**Maya's Approach**:
- Starts with user empathy
- Uses journey mapping
- Creates personas
- Rapid prototyping
- Iterative testing

**Integration with BMM**:
- Use Maya BEFORE Analyst (product-brief)
- Use Maya DURING UX Expert workflows
- Use Maya AFTER Dr. Quinn identifies UX problems

---

### 3. Dr. Quinn - Master Problem Solver

**Persona**: Detective-scientist hybrid, methodical and thorough

**Specialty**: Systematic root cause analysis and solution generation

**When to Use Dr. Quinn**:
- Persistent bugs or issues
- Performance problems
- System bottlenecks
- Complex technical challenges
- Process inefficiencies

**Workflow**: `*problem-solving`

**Problem-Solving Framework**:
1. **Define Problem** - What exactly is wrong?
2. **Gather Data** - Facts, not assumptions
3. **Root Cause Analysis** - 5 Whys, Fishbone, etc.
4. **Generate Solutions** - Multiple approaches
5. **Evaluate Options** - Systematic comparison
6. **Implement & Monitor** - Measure results

**Example Sessions for Everyday Lending**:
```bash
agent cis/creative-problem-solver
> *problem-solving

Problems for Dr. Quinn:
- "Loan approval process takes 7 days - why?"
- "Credit score calculation inconsistent across runs"
- "Database queries slow during peak hours"
- "Borrowers abandoning application at step 3"
- "Lender conversion rate dropped 20% last month"
```

**Dr. Quinn's Methods**:
- 5 Whys technique
- Fishbone (Ishikawa) diagrams
- SWOT analysis
- Force field analysis
- Decision matrices

**Integration with Development**:
- Use Dr. Quinn BEFORE Architect (solution-architecture)
- Use Dr. Quinn WHEN bugs persist after standard debugging
- Use Dr. Quinn FOR performance optimization

---

### 4. Victor - Disruptive Innovation Oracle

**Persona**: Bold strategic precision, visionary thinker

**Specialty**: Business model innovation and disruption analysis

**When to Use Victor**:
- Strategic planning
- Market positioning
- Competitive analysis
- Business model innovation
- Long-term vision

**Workflow**: `*innovation-strategy`

**Strategic Frameworks**:
1. **Business Model Canvas**
2. **Value Proposition Design**
3. **Blue Ocean Strategy**
4. **Disruptive Innovation**
5. **Platform Strategy**
6. **Ecosystem Mapping**

**Example Sessions for Everyday Lending**:
```bash
agent cis/innovation-strategist
> *innovation-strategy

Strategic questions for Victor:
- "How can we disrupt traditional lending?"
- "What's our competitive moat?"
- "Should we pivot to B2B lending?"
- "How do we build a lending platform?"
- "What's the future of decentralized lending?"
```

**Victor's Focus Areas**:
- Market disruption opportunities
- Business model innovation
- Strategic positioning
- Ecosystem development
- Long-term competitive advantage

**Integration with BMM**:
- Use Victor BEFORE Analyst (research)
- Use Victor DURING PM (plan-project) for strategic features
- Use Victor FOR quarterly planning sessions

---

### 5. Sophia - Master Storyteller

**Persona**: Flowery, whimsical narrator with rich language

**Specialty**: 25 story frameworks for compelling narratives

**When to Use Sophia**:
- Marketing content
- User success stories
- Product narratives
- Documentation writing
- Pitch decks and presentations

**Workflow**: `*storytelling`

**25 Story Frameworks Include**:
- Hero's Journey
- Three-Act Structure
- Problem-Solution
- Before-After-Bridge
- Feature-Advantage-Benefit
- Origin Story
- Customer Journey
- Case Study
- And 17 more...

**Example Sessions for Everyday Lending**:
```bash
agent cis/storyteller
> *storytelling

Story needs for Sophia:
- "Write a lender success story"
- "Create borrower testimonials"
- "Tell our company origin story"
- "Craft the 'why we exist' narrative"
- "Develop elevator pitch"
```

**Sophia's Storytelling Elements**:
- Character development
- Emotional arcs
- Conflict and resolution
- Vivid imagery
- Memorable messaging

**Integration Points**:
- Use Sophia AFTER product development for marketing
- Use Sophia FOR documentation that needs engagement
- Use Sophia DURING pitch preparation

---

## CIS Integration Workflows

### Feature Development with CIS

**Early Stage** (Week 1-2):
1. **Victor** - Strategic validation: "Does this feature align with our disruption strategy?"
2. **Carson** - Brainstorm multiple approaches
3. **Maya** - Design thinking for user needs

**Mid Stage** (Week 3-4):
4. **BMM Analyst** - Product brief based on CIS insights
5. **BMM PM** - Detailed PRD

**Late Stage** (Week 5+):
6. **BMM Architect** - Technical solution
7. **Dr. Quinn** - Problem-solve any blockers

**Post-Launch**:
8. **Sophia** - Success stories and documentation

### Problem Resolution with CIS

**Identify**:
1. **Dr. Quinn** - Root cause analysis

**Explore Solutions**:
2. **Carson** - Brainstorm multiple fixes
3. **Maya** - If UX-related, design thinking

**Implement**:
4. **BMM Architect** - Technical design
5. **BMM Dev** - Implementation

### Innovation Sprint with CIS

**Day 1** - Vision:
- **Victor** - Market opportunity analysis
- **Carson** - Divergent idea generation

**Day 2** - Understanding:
- **Maya** - User empathy and journey mapping
- **Dr. Quinn** - Problem definition

**Day 3** - Solutions:
- **Carson** - Solution ideation
- **Maya** - Rapid prototyping

**Day 4-5** - Execution:
- **BMM PM** - Planning
- **BMM Architect** - Architecture

---

## Best Practices

### 1. Use CIS Early
Don't wait until implementation to think creatively. Engage CIS agents during ideation.

### 2. Combine Agents
- Carson + Maya = Innovative UX
- Dr. Quinn + Victor = Strategic problem-solving
- Maya + Sophia = Compelling user stories

### 3. Provide Context
All CIS workflows accept context documents. Prepare:
- User research
- Market data
- Technical constraints
- Previous brainstorms

### 4. Schedule Creative Time
Block dedicated time for CIS sessions:
- Monday: Strategic review with Victor
- Wednesday: Problem-solving with Dr. Quinn
- Friday: Innovation brainstorm with Carson

### 5. Document Outputs
Save all CIS session outputs to:
```
/Users/adamjudeh/everyday-lending/docs/cis-sessions/
```

### 6. Energy Management
CIS agents check energy levels. Be honest:
- High energy → More divergent thinking
- Low energy → More structured approaches

---

## CIS Session Templates

### Brainstorming Session
```
Participant: [Your name]
Challenge: [Clear problem statement]
Context: [Relevant background]
Constraints: [Time, budget, technical limits]
Goal: [What success looks like]
Techniques: [Let Carson suggest, or specify]
```

### Design Thinking Session
```
User Type: [Borrower/Lender/Admin]
Problem: [User pain point]
Current Experience: [As-is journey]
Desired Outcome: [To-be experience]
Constraints: [Technical, business, time]
```

### Problem-Solving Session
```
Problem Statement: [Specific issue]
Symptoms: [What we observe]
Impact: [Business/user effect]
Data: [Metrics, logs, feedback]
Previous Attempts: [What we've tried]
```

### Innovation Strategy Session
```
Current State: [Where we are]
Market Context: [Competition, trends]
Opportunity: [Where we could go]
Constraints: [Resources, time, capabilities]
Vision: [5-year goal]
```

### Storytelling Session
```
Audience: [Who we're speaking to]
Message: [Core idea to convey]
Format: [Case study, pitch, blog, etc.]
Tone: [Professional, inspirational, technical]
Length: [Word count or time]
```

---

## Measuring CIS Impact

Track the value of CIS sessions:

### Quantitative
- Ideas generated per session
- Ideas implemented
- Time saved vs. traditional approaches
- User satisfaction improvements

### Qualitative
- Team energy and engagement
- Quality of solutions
- Alignment on vision
- Innovation culture growth

---

## CIS Agent Availability

All CIS agents are available via:
```bash
cd /Users/adamjudeh/everyday-lending/BMAD-METHOD
agent cis/[agent-name]
```

**Agent Names**:
- `brainstorming-coach` (Carson)
- `design-thinking-coach` (Maya)
- `creative-problem-solver` (Dr. Quinn)
- `innovation-strategist` (Victor)
- `storyteller` (Sophia)

---

## Quick Decision Tree

**Need creative ideas?** → Carson
**Need user insights?** → Maya
**Stuck on a problem?** → Dr. Quinn
**Strategic decision?** → Victor
**Need compelling content?** → Sophia

---

## Configuration

CIS configuration located at:
```
/Users/adamjudeh/everyday-lending/bmad/cis/config.yaml
```

Current settings:
- User: adam
- Language: English
- Output: `/Users/adamjudeh/everyday-lending/docs`

---

## Next Steps

1. ✅ CIS module installed
2. ⏳ Schedule first Carson brainstorming session
3. ⏳ Run Maya design thinking for key user journey
4. ⏳ Use Dr. Quinn for current technical challenge
5. ⏳ Consult Victor for quarterly strategy
6. ⏳ Engage Sophia for documentation

---

*"The best way to have a good idea is to have lots of ideas."* - Linus Pauling

---

*Last Updated: October 11, 2025*
*Module: Creative Intelligence Suite (CIS)*
*Version: 6.0.0-alpha.0*
