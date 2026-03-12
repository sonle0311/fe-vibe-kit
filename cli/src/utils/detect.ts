import { existsSync } from 'node:fs';
import { join } from 'node:path';
import type { AIType } from '../types/index.js';

interface DetectionResult {
  detected: AIType[];
  suggested: AIType | null;
}

// Mapping: folder name → AIType
const FOLDER_TO_AI_TYPE: Record<string, AIType> = {
  '.claude': 'claude',
  '.cursor': 'cursor',
  '.windsurf': 'windsurf',
  '.agent': 'antigravity',
  '.github': 'copilot',
  '.kiro': 'kiro',
  '.codex': 'codex',
  '.roo': 'roocode',
  '.qoder': 'qoder',
  '.gemini': 'gemini',
  '.trae': 'trae',
  '.opencode': 'opencode',
  '.continue': 'continue',
  '.codebuddy': 'codebuddy',
  '.factory': 'droid',
};

// Mapping: AIType → display description
const AI_TYPE_DESCRIPTIONS: Record<AIType, string> = {
  claude: 'Claude Code (.claude/skills/)',
  cursor: 'Cursor (.cursor/skills/)',
  windsurf: 'Windsurf (.windsurf/skills/)',
  antigravity: 'Antigravity (.agent/skills/)',
  copilot: 'GitHub Copilot (.github/prompts/)',
  kiro: 'Kiro (.kiro/steering/)',
  codex: 'Codex (.codex/skills/)',
  roocode: 'RooCode (.roo/skills/)',
  qoder: 'Qoder (.qoder/skills/)',
  gemini: 'Gemini CLI (.gemini/skills/)',
  trae: 'Trae (.trae/skills/)',
  opencode: 'OpenCode (.opencode/skills/)',
  continue: 'Continue (.continue/skills/)',
  codebuddy: 'CodeBuddy (.codebuddy/skills/)',
  droid: 'Droid (Factory) (.factory/skills/)',
  all: 'All AI assistants',
};

export function detectAIType(cwd: string = process.cwd()): DetectionResult {
  const detected: AIType[] = [];

  for (const [folder, aiType] of Object.entries(FOLDER_TO_AI_TYPE)) {
    if (existsSync(join(cwd, folder))) {
      detected.push(aiType);
    }
  }

  let suggested: AIType | null = null;
  if (detected.length === 1) {
    suggested = detected[0];
  } else if (detected.length > 1) {
    suggested = 'all';
  }

  return { detected, suggested };
}

export function getAITypeDescription(aiType: AIType): string {
  return AI_TYPE_DESCRIPTIONS[aiType];
}
