import {
  Button,
  ClusterLayout,
  Icon,
  Modal,
  Tooltip,
  useIcons,
} from '@circle-vibe/components';
import { useState, FC } from 'react';
import { UploadFileTypeEnum } from './types';

interface UploadFileMenuModalProps {
  isOpen: boolean;
  onClose: VoidFunction;
  onSuccess: (type: UploadFileTypeEnum) => void;
}

export const UploadFileMenuModal: FC<UploadFileMenuModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { cilImage, cilFile, cilVideo } = useIcons();
  const [type, setType] = useState<UploadFileTypeEnum>(UploadFileTypeEnum.FILE);

  return (
    <Modal.Root isOpen={isOpen} onClose={onClose}>
      <Modal.Header onClose={onClose}>Upload as:</Modal.Header>

      <Modal.Body>
        <ClusterLayout space='3rem' alignItems='center' justifyContent='center'>
          <Tooltip title='Compressed image'>
            <Button
              size='medium'
              color={type === 'IMAGE' ? 'primary' : 'secondary'}
              onClick={() => setType(UploadFileTypeEnum.IMAGE)}
            >
              <Icon name={cilImage} size={60} color='primary' />
            </Button>
          </Tooltip>

          <Tooltip title='Compressed video'>
            <Button
              size='medium'
              color={type === 'VIDEO' ? 'primary' : 'secondary'}
              onClick={() => setType(UploadFileTypeEnum.VIDEO)}
            >
              <Icon name={cilVideo} size={60} color='primary' />
            </Button>
          </Tooltip>

          <Tooltip title='Raw file'>
            <Button
              size='medium'
              color={type === 'FILE' ? 'primary' : 'secondary'}
              onClick={() => setType(UploadFileTypeEnum.FILE)}
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
