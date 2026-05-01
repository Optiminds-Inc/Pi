<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Writing — 惜字如金

Every word must earn its place.

- No filler taglines, no marketing fluff, no sentences that restate the section title.
- Skip "uses these everywhere it works"-style copy. Cut the half of a sentence that adds nothing.
- A subtitle that doesn't tell the user *what to do* or *what just happened* doesn't ship.
- Only express the core product value. If you can't, say nothing.

Applies to UI copy, comments, commit messages, and chat replies alike.

# Setup / settings page

This is a foundation page, not a feed.

- Focus: connections + the firm's core info. No activity items, no "first N articles published"-style milestones, no shipped-work history. Activity belongs on the agent pages.
- Pi-managed vs user-editable must be visible at a glance. Pi-managed = set during onboarding, locked in the dashboard, "message your partner to change". User-editable = anything the user should be able to update without us.
- User data fields default to **read-only**. An explicit `Edit` button unlocks them; `Save` commits, `Cancel` reverts. Never leave editable inputs always-hot — it invites accidental edits.

# Always read CLAUDE.md first

Every task: read `CLAUDE.md` and any files it imports (e.g. this `AGENTS.md`) before writing or editing code. The harness auto-loads them, but read them anyway — the principles override defaults.
