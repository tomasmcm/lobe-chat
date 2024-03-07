import { ModelProviderCard } from '@/types/llm';

const Anthropic: ModelProviderCard = {
  chatModels: [
    {
      description:
        'Fastest and most compact model for near-instant responsiveness. Quick and accurate targeted performance',
      displayName: 'Claude 3 Haiku (Light & Fast)',
      id: 'claude-3-haiku-20240307',
      maxOutput: 4096,
      price: '€0.69',
      tokens: 200_000,
      vision: true,
    },
    {
      displayName: 'Claude Instant 1.2',
      id: 'claude-instant-1.2',
      maxOutput: 4096,
      price: '€1.47',
      tokens: 100_000,
    },
    {
      description:
        'Ideal balance of intelligence and speed for enterprise workloads. Maximum utility at a lower price, dependable, balanced for scaled deployments',
      displayName: 'Claude 3 Sonnet (Hard-working)',
      id: 'claude-3-sonnet-20240229',
      maxOutput: 4096,
      price: '€8.26',
      tokens: 200_000,
      vision: true,
    },
    {
      displayName: 'Claude 2.1',
      id: 'claude-2.1',
      maxOutput: 4096,
      price: '€14.7',
      tokens: 200_000,
    },
    {
      displayName: 'Claude 2.0',
      hidden: true,
      id: 'claude-2.0',
      maxOutput: 4096,
      price: '€14.7',
      tokens: 100_000,
    },
    {
      description:
        'Most powerful model for highly complex tasks. Top-level performance, intelligence, fluency, and understanding',
      displayName: 'Claude 3 Opus (Powerful)',
      id: 'claude-3-opus-20240229',
      maxOutput: 4096,
      price: '€41.3',
      tokens: 200_000,
      vision: true,
    },
  ],
  id: 'anthropic',
};

export default Anthropic;
