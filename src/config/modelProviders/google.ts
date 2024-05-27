import { ModelProviderCard } from '@/types/llm';

const Google: ModelProviderCard = {
  chatModels: [
    {
      description: 'The best image understanding model to handle a broad range of applications',
      displayName: 'Gemini 1.0 Pro Vision',
      id: 'gemini-1.0-pro-vision',
      maxOutput: 4096,
      private: false,
      tokens: 12_288 + 4096,
      vision: true,
    },
    {
      description: 'The best model for scaling across a wide range of tasks.',
      displayName: 'Gemini 1.0 Pro',
      id: 'gemini-1.0-pro',
      maxOutput: 2048,
      private: false,
      tokens: 30_720 + 2048,
    },
    {
      description: 'Fast and versatile multimodal model for scaling across diverse tasks',
      displayName: 'Gemini 1.5 Flash',
      functionCall: true,
      id: 'gemini-1.5-flash',
      maxOutput: 8192,
      private: false,
      tokens: 1_048_576 + 8192,
      vision: true,
    },
    {
      description: 'Mid-size multimodal model that supports up to 1 million tokens',
      displayName: 'Gemini 1.5 Pro',
      functionCall: true,
      id: 'gemini-1.5-pro',
      maxOutput: 8192,
      private: false,
      tokens: 1_048_576 + 8192,
      vision: true,
    },
  ],
  id: 'google',
};

export default Google;
