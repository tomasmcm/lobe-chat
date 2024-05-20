import { ActionIcon, Icon } from '@lobehub/ui';
import { Upload } from 'antd';
import { useTheme } from 'antd-style';
import { WebPDFLoader } from 'langchain/document_loaders/web/pdf';
import { LucideFileUp, LucideLoader2 } from 'lucide-react';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Center } from 'react-layout-kit';

import { useChatStore } from '@/store/chat';
import { useFileStore } from '@/store/file';
import { useGlobalStore } from '@/store/global';
import { modelProviderSelectors } from '@/store/global/selectors';
import { useSessionStore } from '@/store/session';
import { agentSelectors } from '@/store/session/selectors';

const FileUpload = memo(() => {
  const { t } = useTranslation('chat');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const upload = useFileStore((s) => s.uploadFile);

  const model = useSessionStore(agentSelectors.currentAgentModel);
  const [enabledVision] = useGlobalStore((s) => [
    modelProviderSelectors.modelEnabledVision(model)(s),
  ]);

  const [chatValue, updateInputMessage] = useChatStore((s) => [
    s.inputMessage,
    s.updateInputMessage,
  ]);

  const parsePdf = async (file: File) => {
    const loader = new WebPDFLoader(file, {
      parsedItemSeparator: '',
      splitPages: false,
    });
    const docs = await loader.load();
    updateInputMessage(
      chatValue + `\n<pdf>\n${docs.map((doc) => doc.pageContent).join('\n')}\n</pdf>`,
    );
  };

  return (
    <Upload
      accept={enabledVision ? 'image/*,application/pdf' : 'application/pdf'}
      beforeUpload={async (file) => {
        setLoading(true);

        if (file.type === 'application/pdf') {
          await parsePdf(file);
        } else {
          await upload(file);
        }

        setLoading(false);
        return false;
      }}
      multiple={true}
      showUploadList={false}
    >
      {loading ? (
        <Center height={36} width={36}>
          <Icon
            color={theme.colorTextSecondary}
            icon={LucideLoader2}
            size={{ fontSize: 18 }}
            spin
          ></Icon>
        </Center>
      ) : (
        <ActionIcon icon={LucideFileUp} placement={'bottom'} title={t('upload.actionTooltip')} />
      )}
    </Upload>
  );
});

export default FileUpload;
