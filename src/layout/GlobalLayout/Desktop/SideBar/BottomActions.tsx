import { ActionIcon, Icon } from '@lobehub/ui';
import { Dropdown, MenuProps } from 'antd';
import { HardDriveDownload, HardDriveUpload, Settings, Settings2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Flexbox } from 'react-layout-kit';

import DataImporter from '@/features/DataImporter';
import { configService } from '@/services/config';
import { GlobalStore } from '@/store/global';
import { SidebarTabKey } from '@/store/global/initialState';

export interface BottomActionProps {
  tab?: GlobalStore['sidebarKey'];
}

const BottomActions = memo<BottomActionProps>(({ tab }) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const items: MenuProps['items'] = [
    {
      icon: <Icon icon={HardDriveUpload} />,
      key: 'import',
      label: <DataImporter>{t('import')}</DataImporter>,
    },
    {
      children: [
        {
          key: 'allAgent',
          label: <div>{t('exportType.allAgent')}</div>,
          onClick: configService.exportAgents,
        },
        {
          key: 'allAgentWithMessage',
          label: <div>{t('exportType.allAgentWithMessage')}</div>,
          onClick: configService.exportSessions,
        },
        {
          key: 'globalSetting',
          label: <div>{t('exportType.globalSetting')}</div>,
          onClick: configService.exportSettings,
        },
        {
          type: 'divider',
        },
        {
          key: 'all',
          label: <div>{t('exportType.all')}</div>,
          onClick: configService.exportAll,
        },
      ],
      icon: <Icon icon={HardDriveDownload} />,
      key: 'export',
      label: t('export'),
    },
    {
      type: 'divider',
    },
    {
      icon: <Icon icon={Settings} />,
      key: 'setting',
      label: (
        <Flexbox align={'center'} distribution={'space-between'} gap={8} horizontal>
          {t('setting')}
        </Flexbox>
      ),
      onClick: () => {
        router.push('/settings/common');
      },
    },
  ];

  return (
    <Dropdown arrow={false} menu={{ items }} trigger={['click']}>
      <ActionIcon active={tab === SidebarTabKey.Setting} icon={Settings2} />
    </Dropdown>
  );
});

export default BottomActions;
