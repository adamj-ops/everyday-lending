# Greenfield Architecture Decisions

## Status
⏳ **Pending** - Greenfield build mode not yet executed

## How to Run Greenfield Mode

Execute from BMAD-METHOD directory:
```bash
cd /Users/adamjudeh/everyday-lending/BMAD-METHOD
npx bmad dev --project everyday-lending --mode greenfield
```

## Expected Proposals

Greenfield mode will generate three architectural proposals:

### 1. Frontend Architecture
**Location**: `/Users/adamjudeh/everyday-lending/ui-v6/`
**Agent**: Frontend Architect
**Scope**:
- Rebuilds visual hierarchy using BMAD v6 design system
- Component structure and organization
- State management patterns
- Design token system
- Accessibility improvements

**Output**: `proposal.md` + code scaffolding

### 2. Service Architecture
**Location**: `/Users/adamjudeh/everyday-lending/services/`
**Agent**: Service Architect
**Scope**:
- REST and RPC endpoints aligned with Drizzle schema
- API design and versioning
- Service layer organization
- Authentication/authorization patterns
- Error handling strategies

**Output**: `proposal.md` + code scaffolding

### 3. Data Architecture
**Location**: `/Users/adamjudeh/everyday-lending/db-v6/`
**Agent**: Data Architect
**Scope**:
- Normalized Drizzle schema
- Migration strategy
- Seed data
- Query optimization
- Database indexes

**Output**: `proposal.md` + code scaffolding

---

## Decision Framework

For each proposal, evaluate:

### 1. Alignment with Current Architecture
- How different is the proposal from existing implementation?
- What are the migration costs?
- What are the benefits?

### 2. Implementation Effort
- Time to implement
- Team capacity
- Risk assessment

### 3. Value Delivered
- User impact
- Developer experience improvement
- Performance gains
- Maintainability improvement

### 4. Decision Categories

**Adopt Fully**: Replace existing implementation with greenfield proposal
**Adopt Partially**: Integrate selected elements from proposal
**Iterate Existing**: Use proposal as inspiration to improve current code
**Defer**: Good ideas but not right timing
**Reject**: Not aligned with project goals

---

## Decisions Log

### Frontend Architecture

#### Status
⏳ Pending proposal generation

#### Proposal Summary
*To be filled after greenfield mode runs*

#### Decision
- [ ] Adopt Fully
- [ ] Adopt Partially
- [ ] Iterate Existing
- [ ] Defer
- [ ] Reject

#### Rationale
*To be documented*

#### Components to Adopt
*List specific components/patterns if partially adopting*

#### Implementation Plan
*If adopting, outline migration steps*

---

### Service Architecture

#### Status
⏳ Pending proposal generation

#### Proposal Summary
*To be filled after greenfield mode runs*

#### Decision
- [ ] Adopt Fully
- [ ] Adopt Partially
- [ ] Iterate Existing
- [ ] Defer
- [ ] Reject

#### Rationale
*To be documented*

#### Services to Adopt
*List specific services/patterns if partially adopting*

#### Implementation Plan
*If adopting, outline migration steps*

---

### Data Architecture

#### Status
⏳ Pending proposal generation

#### Proposal Summary
*To be filled after greenfield mode runs*

#### Decision
- [ ] Adopt Fully
- [ ] Adopt Partially
- [ ] Iterate Existing
- [ ] Defer
- [ ] Reject

#### Rationale
*To be documented*

#### Schema Changes to Adopt
*List specific changes if partially adopting*

#### Migration Plan
*If adopting, outline database migration strategy*

---

## Cross-Cutting Concerns

### Design System
**Current State**: Using Shadcn UI components with Tailwind CSS
**Greenfield Proposal**: *TBD*
**Decision**: *TBD*

### State Management
**Current State**: React hooks (useState, useEffect) + client-side hooks
**Greenfield Proposal**: *TBD*
**Decision**: *TBD*

### API Layer
**Current State**: Next.js API routes with route handlers
**Greenfield Proposal**: *TBD*
**Decision**: *TBD*

### Database Layer
**Current State**: Drizzle ORM with PostgreSQL
**Greenfield Proposal**: *TBD*
**Decision**: *TBD*

### Testing Strategy
**Current State**: Vitest + Playwright
**Greenfield Proposal**: *TBD*
**Decision**: *TBD*

---

## Implementation Priority

Once decisions are made, prioritize implementation:

### High Priority (Implement First)
*Items with high value, low risk, reasonable effort*

### Medium Priority (Implement Second)
*Items with good value but higher effort or risk*

### Low Priority (Implement Later)
*Nice-to-haves, lower impact items*

### Backlog (Future Consideration)
*Good ideas deferred for now*

---

## Review Checklist

Before finalizing decisions:

- [ ] All three proposals reviewed
- [ ] Team consensus on major decisions
- [ ] Migration effort estimated
- [ ] Risk assessment completed
- [ ] Implementation priorities set
- [ ] Documentation updated
- [ ] Tests planned
- [ ] Rollback strategy defined

---

## Notes

### Compatibility Considerations
Document any compatibility concerns between proposals:
- Frontend + Services integration
- Services + Data layer interaction
- Migration dependencies

### Phased Rollout
If adopting multiple proposals, define rollout order:
1. *TBD*
2. *TBD*
3. *TBD*

### Success Metrics
Define how we'll measure success:
- *TBD*

---

*Last Updated: October 11, 2025*
*Status: Awaiting Greenfield Proposals*
