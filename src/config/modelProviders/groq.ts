import { ModelProviderCard } from '@/types/llm';

// ref https://console.groq.com/docs/models
const Groq: ModelProviderCard = {
  chatModels: [
    {
      displayName: 'LLaMA3-3-70B',
      functionCall: true,
      id: 'llama3-70b-8192',
      private: false,
      tokens: 8192,
    },
    {
      displayName: 'Mixtral-8x7b',
      functionCall: true,
      id: 'mixtral-8x7b-32768',
      private: false,
      tokens: 32_768,
    },
    {
      displayName: 'LLaMA3-3-8B',
      functionCall: true,
      id: 'llama3-8b-8192',
      private: false,
      tokens: 8192,
    },
    {
      displayName: 'Gemma-7b-it',
      functionCall: true,
      id: 'gemma-7b-it',
      private: false,
      tokens: 8192,
    },
  ],
  id: 'groq',
};

export default Groq;
