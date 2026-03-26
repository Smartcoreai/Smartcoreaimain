#!/usr/bin/env node
// SmartcoreAI Website Agent
// Usage:
//   node agent.js fix                    — auto-fix incorrect services/prices
//   node agent.js check                  — scan for problems
//   node agent.js update "<instruction>" — make a specific change

const Anthropic = require("@anthropic-ai/sdk");
const fs = require("fs");
const path = require("path");

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const ROOT = path.resolve(__dirname);

// ─── Tool definitions ────────────────────────────────────────────────────────

const TOOLS = [
  {
    name: "list_files",
    description: "List all source files in a directory (excludes node_modules, .next, .git)",
    input_schema: {
      type: "object",
      properties: {
        directory: { type: "string", description: "Directory path relative to project root, e.g. 'components' or 'app'" },
        extension: { type: "string", description: "Optional: filter by extension, e.g. '.tsx'" },
      },
      required: ["directory"],
    },
  },
  {
    name: "read_file",
    description: "Read the full contents of a file",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "File path relative to project root, e.g. 'components/Hero.tsx'" },
      },
      required: ["file_path"],
    },
  },
  {
    name: "write_file",
    description: "Write content to a file, overwriting it completely",
    input_schema: {
      type: "object",
      properties: {
        file_path: { type: "string", description: "File path relative to project root" },
        content: { type: "string", description: "Full new content for the file" },
      },
      required: ["file_path", "content"],
    },
  },
  {
    name: "search_files",
    description: "Search for a text pattern across all source files in a directory",
    input_schema: {
      type: "object",
      properties: {
        pattern: { type: "string", description: "Text to search for (case-insensitive)" },
        directory: { type: "string", description: "Directory to search in, e.g. 'components'" },
        extensions: {
          type: "array",
          items: { type: "string" },
          description: "File extensions to include, e.g. ['.tsx', '.ts']. Defaults to ['.tsx', '.ts', '.js']",
        },
      },
      required: ["pattern", "directory"],
    },
  },
];

// ─── Tool implementations ─────────────────────────────────────────────────────

const SKIP_DIRS = new Set(["node_modules", ".next", ".git", "dist", ".cache"]);

function walkDir(dir, relBase, extFilter, results = []) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); }
  catch { return results; }

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name) || entry.name.startsWith(".")) continue;
    const relPath = path.join(relBase, entry.name);
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(fullPath, relPath, extFilter, results);
    } else if (!extFilter || entry.name.endsWith(extFilter)) {
      results.push(relPath);
    }
  }
  return results;
}

function executeTool(name, input) {
  try {
    switch (name) {

      case "list_files": {
        const dirFull = path.join(ROOT, input.directory);
        if (!fs.existsSync(dirFull)) return { error: `Directory not found: ${input.directory}` };
        const files = walkDir(dirFull, input.directory, input.extension || null);
        return { files, count: files.length };
      }

      case "read_file": {
        const full = path.join(ROOT, input.file_path);
        if (!fs.existsSync(full)) return { error: `File not found: ${input.file_path}` };
        const content = fs.readFileSync(full, "utf8");
        return { content, lines: content.split("\n").length };
      }

      case "write_file": {
        const full = path.join(ROOT, input.file_path);
        // Safety: only allow writing inside project, never .env files
        if (!full.startsWith(ROOT)) return { error: "Path outside project root" };
        if (path.basename(full).startsWith(".env")) return { error: "Cannot write .env files" };
        fs.mkdirSync(path.dirname(full), { recursive: true });
        fs.writeFileSync(full, input.content, "utf8");
        return { success: true, written: input.file_path, bytes: input.content.length };
      }

      case "search_files": {
        const dirFull = path.join(ROOT, input.directory);
        if (!fs.existsSync(dirFull)) return { error: `Directory not found: ${input.directory}` };
        const exts = input.extensions || [".tsx", ".ts", ".js"];
        const files = walkDir(dirFull, input.directory, null).filter(f => exts.some(e => f.endsWith(e)));
        const matches = [];
        for (const relPath of files) {
          const content = fs.readFileSync(path.join(ROOT, relPath), "utf8");
          content.split("\n").forEach((line, i) => {
            if (line.toLowerCase().includes(input.pattern.toLowerCase())) {
              matches.push({ file: relPath, line: i + 1, text: line.trim() });
            }
          });
        }
        return { matches, count: matches.length };
      }

      default:
        return { error: `Unknown tool: ${name}` };
    }
  } catch (e) {
    return { error: e.message };
  }
}

// ─── Agentic loop ─────────────────────────────────────────────────────────────

async function runAgent(systemPrompt, userMessage) {
  const messages = [{ role: "user", content: userMessage }];
  let iterations = 0;
  const MAX_ITERATIONS = 30; // safety limit

  while (iterations++ < MAX_ITERATIONS) {
    const response = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 4096,
      system: systemPrompt,
      tools: TOOLS,
      messages,
    });

    // Collect assistant turn
    messages.push({ role: "assistant", content: response.content });

    // Print any text the agent outputs
    for (const block of response.content) {
      if (block.type === "text" && block.text.trim()) {
        console.log("\n" + block.text);
      }
    }

    if (response.stop_reason === "end_turn") break;
    if (response.stop_reason !== "tool_use") break;

    // Execute all tool calls and collect results
    const toolResults = [];
    for (const block of response.content) {
      if (block.type !== "tool_use") continue;

      const inputStr = JSON.stringify(block.input);
      const preview = inputStr.length > 100 ? inputStr.slice(0, 97) + "..." : inputStr;
      process.stdout.write(`  ⚙  ${block.name} ${preview}\n`);

      const result = executeTool(block.name, block.input);

      // Print a short result summary
      const resultStr = JSON.stringify(result);
      const resultPreview = resultStr.length > 120 ? resultStr.slice(0, 117) + "..." : resultStr;
      process.stdout.write(`     → ${resultPreview}\n`);

      toolResults.push({
        type: "tool_result",
        tool_use_id: block.id,
        content: JSON.stringify(result),
      });
    }

    messages.push({ role: "user", content: toolResults });
  }

  if (iterations >= MAX_ITERATIONS) {
    console.log("\n⚠  Reached iteration limit — agent stopped.");
  }
}

// ─── System prompts ───────────────────────────────────────────────────────────

const CORRECT_SERVICES = `
CORRECT SERVICES AND PRICES (absolute source of truth):
  1. AI Chatbot             — $399/month
  2. Booking System         — $499/month
  3. CRM System             — $899/month
  4. Custom AI Integrations — $1,500/month

WRONG services that must NEVER appear on the site:
  - Google Review Automation
  - Quote Calculator
  - AI Pipeline Dashboard
  - Any price for the above services that differs from the list above
`;

const FIX_SYSTEM = `You are the Content Agent for SmartcoreAI's website (Next.js 14, TypeScript).
Your job: scan ALL source files and fix any incorrect service names or prices.

${CORRECT_SERVICES}

Directories to scan: components, app (including app/api)

Process:
1. List files in components and app
2. For each .tsx / .ts file, search for price or service-name mentions
3. Read any file that contains wrong values
4. Fix ONLY the service names and prices — do not alter any other code, styling, or logic
5. Write the corrected file back
6. Report every change: which file, what was wrong, what it was changed to

End with a summary of all files changed (or "No issues found" if everything was correct).`;

const CHECK_SYSTEM = `You are the QA Agent for SmartcoreAI's website.
Perform a thorough audit and report every issue you find.

Checks to run:
1. SERVICES & PRICES — compare all mentions against the correct values below
2. INTERNAL LINKS — every href="#id" should correspond to an actual section id on the page
3. PAGE STRUCTURE — app/page.tsx should import and render: Navbar, Hero, Ticker, Services, Pricing, Objections, BookingSection, ContactSection, Footer, ChatWidget
4. ORPHANED COMPONENTS — components that exist in /components but are NOT used in page.tsx (informational)
5. PLACEHOLDER CONTENT — any TODO, FIXME, "lorem ipsum", or "coming soon" text
6. CHATBOT SYSTEM PROMPT — in app/api/chat/route.ts, verify the system prompt uses only correct service names and prices

${CORRECT_SERVICES}

Format your report as:
  [PASS] or [FAIL] — <check name>
  Details for each failure

End with: OVERALL: PASS or OVERALL: FAIL (N issues found)`;

const UPDATE_SYSTEM = `You are the Update Agent for SmartcoreAI's website (Next.js 14, TypeScript).
You receive a plain-English instruction and apply that exact change across all relevant files.

${CORRECT_SERVICES}

Rules:
- Only make the change explicitly requested — nothing more
- Search for all files where the change applies before editing anything
- Read each file fully before writing it back
- Apply the change consistently across every file that needs it (components, API routes, chatbot prompt, etc.)
- Report each file changed and exactly what was modified`;

// ─── CLI ──────────────────────────────────────────────────────────────────────

async function main() {
  const [, , command, ...rest] = process.argv;

  const HELP = `
SmartcoreAI Website Agent
─────────────────────────
Commands:
  node agent.js fix                     Auto-fix incorrect services and prices
  node agent.js check                   Full QA scan — report all issues
  node agent.js update "<instruction>"  Apply a specific change

Examples:
  node agent.js fix
  node agent.js check
  node agent.js update "change CRM price to $999"
  node agent.js update "rename Booking System to Scheduling System"
`;

  if (!command || command === "help") {
    console.log(HELP);
    process.exit(0);
  }

  console.log(`\n🤖 SmartcoreAI Agent — mode: ${command}`);
  console.log("─".repeat(60));

  switch (command) {
    case "fix":
      await runAgent(
        FIX_SYSTEM,
        "Scan all website source files and fix every incorrect service name or price you find. Start by listing files in the 'components' and 'app' directories."
      );
      break;

    case "check":
      await runAgent(
        CHECK_SYSTEM,
        "Run a full QA audit of the website. Check components, app/page.tsx, and app/api/chat/route.ts. Produce a complete issue report."
      );
      break;

    case "update": {
      const instruction = rest.join(" ").trim();
      if (!instruction) {
        console.error('Error: provide an instruction.\nExample: node agent.js update "change chatbot price to $449"');
        process.exit(1);
      }
      await runAgent(
        UPDATE_SYSTEM,
        `Apply this change to the website: "${instruction}"\n\nSearch for all affected files first, then make the changes.`
      );
      break;
    }

    default:
      console.error(`Unknown command: "${command}"\nRun "node agent.js help" for usage.`);
      process.exit(1);
  }
}

main().catch((e) => {
  console.error("\n✗ Agent error:", e.message);
  process.exit(1);
});
