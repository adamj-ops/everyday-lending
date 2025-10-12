# Figma MCP Setup Status

## Current Setup ✅

1. **MCP Server Added**: `figma-desktop` configured in `.claude.json`
2. **WebSocket Server Running**: `bunx cursor-talk-to-figma-socket` running on port 3055
3. **Configuration**: HTTP transport to `http://127.0.0.1:3845/mcp`

## Next Steps

### Option A: Direct Figma Plugin Setup
The `cursor-talk-to-figma-socket` is running, but we need to:
1. Open Figma Desktop app
2. Install the Cursor Figma plugin
3. Open the Attio design file
4. The plugin will communicate with the WebSocket server

### Option B: Manual Design Token Extraction (Faster)
While MCP setup is being configured, we can:
1. Take screenshots of key components from Figma
2. Manually extract design specifications
3. Create design tokens file
4. Rebuild components

## What I Need from You

**To proceed with automated extraction (Option A):**
- Open Figma Desktop
- Open this file: `https://www.figma.com/design/BlK331Wp1CJ9fUG1q98Gmt/Attio---Customer-Relationship-SaaS-UI--Community-`
- Install the Cursor Figma plugin (if needed)
- The plugin should connect to port 3055

**To proceed with manual extraction (Option B - Recommended for speed):**
Please share screenshots of:

1. **Data Table Component**
   - Default state
   - Hover state (row highlighted)
   - Selected state
   - Header with sort indicator
   - Screenshot showing spacing/measurements (if possible)

2. **Detail Drawer/Panel**
   - Full drawer view (header + content)
   - Tab navigation
   - Content sections
   - Close-up of header area

3. **Form Inputs**
   - Text input (default, focus, filled, error states)
   - Select dropdown (closed and open)
   - Button variants (primary, secondary, ghost)

4. **Status Indicators**
   - Badge variants (different statuses)
   - Progress bars
   - Any other visual indicators

5. **Typography & Colors**
   - Font styles (if there's a style guide page)
   - Color palette (if documented)

## Current MCP Status

```json
{
  "server": "figma-desktop",
  "transport": "http",
  "url": "http://127.0.0.1:3845/mcp",
  "websocket_server": "running on port 3055"
}
```

**Once you confirm Figma is open with the plugin, I can start automated extraction!**
