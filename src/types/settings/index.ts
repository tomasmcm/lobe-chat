import { DeepPartial } from 'utility-types';

import type { LobeAgentSession } from '@/types/session';

import { GlobalBaseSettings } from './base';
import { GlobalLLMConfig } from './modelProvider';
import { GlobalSyncSettings } from './sync';
import { GlobalTTSConfig } from './tts';

export type GlobalDefaultAgent = Pick<LobeAgentSession, 'config' | 'meta'>;

export * from './base';
export * from './modelProvider';
export * from './sync';
export * from './tts';

export interface GlobalTool {
  [key: string]: any;
}

export interface GlobalServerConfig {
  customModelName?: string;
  defaultAgent?: DeepPartial<GlobalDefaultAgent>;
  enabledOAuthSSO?: boolean;
  languageModel?: DeepPartial<GlobalLLMConfig>;
  telemetry: {
    langfuse?: boolean;
  };
}

/**
 * 配置设置
 */
export interface GlobalSettings extends GlobalBaseSettings {
  defaultAgent: GlobalDefaultAgent;
  languageModel: GlobalLLMConfig;
  sync: GlobalSyncSettings;
  tool: GlobalTool;
  tts: GlobalTTSConfig;
}
