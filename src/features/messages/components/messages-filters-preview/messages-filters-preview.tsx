import { useTranslation } from 'react-i18next';

import {
  CenteredVertialLayout,
  ClusterLayout,
  Icon,
  Show,
  StackLayout,
  Tooltip,
  useIcons,
} from '@circle-vibe/components';

import { MessagesFilterBarFormValues } from '../messages-filter-bar';

interface MessagesFilterPreviewProps {
  filters: MessagesFilterBarFormValues;
  resetFilters: VoidFunction;
  triggerFiltersBarVisibility: VoidFunction;
}

export const MessagesFilterPreview: React.FC<MessagesFilterPreviewProps> = ({
  filters,
  resetFilters,
  triggerFiltersBarVisibility,
}) => {
  const {t} = useTranslation();
  const { cilChevronBottom, cilClearAll } = useIcons();

  return (
    <CenteredVertialLayout
      justifyContent='space-between'
      className='bg-primary text-light p-3 rounded-tl-2 rounded-bl-2'
    >
      <StackLayout space='0.15rem'>
        <div>{t('filters.search-by.label')}: "{filters?.content}"</div>

        <Show.When isTrue={Boolean(filters.senderIds?.length)}>
          <div>{t('filters.conversation.selected-participants.label')}: {filters.senderIds?.length}</div>
        </Show.When>
      </StackLayout>

      <ClusterLayout alignItems='center' space='0.75rem'>
        <Tooltip title={t('filters.clear-filters.label')}>
          <Icon
            className='cursor-pointer'
            name={cilClearAll}
            color='var(--cv-light)'
            size={20}
            onClick={resetFilters}
          />
        </Tooltip>

        <Tooltip title={t('filters.open-filters.label')}>
          <Icon
            className='cursor-pointer'
            name={cilChevronBottom}
            color='var(--cv-light)'
            size={20}
            onClick={triggerFiltersBarVisibility}
          />
        </Tooltip>
      </ClusterLayout>
    </CenteredVertialLayout>
  );
};
