import { ActionIcon } from '@lobehub/ui';
import { BrainCog } from 'lucide-react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import ModelSwitchPanel from '@/features/ModelSwitchPanel';
import { useSessionStore } from '@/store/session';
import { agentSelectors } from '@/store/session/selectors';

const ModelSwitch = memo(() => {
  const { t } = useTranslation('chat');
  const model = useSessionStore(agentSelectors.currentAgentModel);

  return (
    <ModelSwitchPanel>
      <ActionIcon
        icon={BrainCog}
        placement={'bottom'}
        style={{ padding: '0 .5rem', width: 'auto' }}
      >
        <span>
          &nbsp;{t('ModelSwitch.title')}: {model}
        </span>
      </ActionIcon>
    </ModelSwitchPanel>
  );
});

export default ModelSwitch;
