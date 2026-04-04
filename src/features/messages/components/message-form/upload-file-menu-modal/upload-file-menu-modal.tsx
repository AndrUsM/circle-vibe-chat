import { useState, FC, useEffect } from 'react';

import { Button, ClusterLayout, Icon, Modal, Tooltip, useIcons } from '@circle-vibe/components';
import { MessageType } from '@circle-vibe/shared';

interface UploadFileMenuModalProps {
  isOpen: boolean;
  initialType?: MessageType;
  onClose: VoidFunction;
  onSuccess: (type: MessageType) => void;
}

export const UploadFileMenuModal: FC<UploadFileMenuModalProps> = ({
  isOpen,
  onClose,
  initialType,
  onSuccess,
}) => {
  const { cilImage, cilFile, cilVideo, cilAudio } = useIcons();
  const [type, setType] = useState<MessageType>(initialType ?? MessageType.FILE);

  useEffect(() => {
    setType(initialType ?? MessageType.FILE);
  }, [initialType]);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header onClose={onClose}>Upload as:</Modal.Header>

      <Modal.Body>
        <ClusterLayout space='3rem' alignItems='center' justifyContent='center'>
          <Tooltip title='Compressed image'>
            <Button
              size='medium'
              color={type === 'IMAGE' ? 'primary' : 'secondary'}
              onClick={() => setType(MessageType.IMAGE)}
            >
              <Icon name={cilImage} size={60} color='primary' />
            </Button>
          </Tooltip>

          <Tooltip title='Compressed video'>
            <Button
              size='medium'
              color={type === 'VIDEO' ? 'primary' : 'secondary'}
              onClick={() => setType(MessageType.VIDEO)}
            >
              <Icon name={cilVideo} size={60} color='primary' />
            </Button>
          </Tooltip>

          <Tooltip title='Compressed audio'>
            <Button
              size='medium'
              color={type === 'AUDIO' ? 'primary' : 'secondary'}
              onClick={() => setType(MessageType.AUDIO)}
            >
              <Icon name={cilAudio} size={60} color='primary' />
            </Button>
          </Tooltip>

          <Tooltip title='Raw file'>
            <Button
              size='medium'
              color={type === 'FILE' ? 'primary' : 'secondary'}
              onClick={() => setType(MessageType.FILE)}
            >
              <Icon name={cilFile} size={60} color='primary' />
            </Button>
          </Tooltip>
        </ClusterLayout>
      </Modal.Body>

      <Modal.Footer justifyContent='center'>
        <Button size='medium' type='button' color='primary' onClick={onSuccess}>
          Upload file
        </Button>
      </Modal.Footer>
    </Modal.Root>
  );
};
