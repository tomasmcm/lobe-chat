import { ModelProviderCard } from '@/types/llm';

const Google: ModelProviderCard = {
  chatModels: [
    {
      displayName: 'Gemini 1.5 Pro',
      id: 'gemini-1.5-pro',
      private: false,
      tokens: 1_048_576,
    },
    {
      displayName: 'Gemini 1.0 Pro',
      id: 'gemini-pro',
      private: false,
      tokens: 30_720,
    },
    {
      displayName: 'Gemini 1.0 Pro Vision',
      id: 'gemini-pro-vision',
      private: false,
      tokens: 12_288,
      vision: true,
    },
  ],
  id: 'google',
};

export default Google;
