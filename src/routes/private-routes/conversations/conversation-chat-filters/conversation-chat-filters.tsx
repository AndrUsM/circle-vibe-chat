import { useTranslation } from 'react-i18next';

import {
  Button,
  ClusterLayout,
  ExtendedReactFunctionalComponent,
  FormControl,
  Icon,
  Input,
  Show,
  StackLayout,
  useIcons,
} from '@circle-vibe/components';
import { DEFAULT_PAGINATION_PAGE } from '@circle-vibe/shared';

import {
  conversationFilterBarValuesToRequestMap,
  ConversationsFilterBar,
  ConversationsFilterBarFormValues,
  CONVERSATOINS_FILTER_BAR_FORM_INITIAL_VALUES,
} from '@features/conversation';
import { PaginatedChatsFilters } from '@features/conversation/types';
import { Filters } from '@shared/components';

interface ConversationChatFiltersProps {
  isChatsFiltersBarVisible: boolean;
  isChatsNotEmpty: boolean;
  onChange: (page: number, filters?: PaginatedChatsFilters) => void;
  triggerChatsFiltersBarVisibility: VoidFunction;
  toggleOpenChatCreationModal: VoidFunction;
}

export const ConversationChatFilters: ExtendedReactFunctionalComponent<
  ConversationChatFiltersProps
> = ({
  onChange,
  isChatsNotEmpty,
  isChatsFiltersBarVisible,
  triggerChatsFiltersBarVisibility,
  toggleOpenChatCreationModal,
}) => {
  const { t } = useTranslation();
  const { cilFilter } = useIcons();

  return (
    <Filters
      onChange={(filters) => {
        onChange(
          DEFAULT_PAGINATION_PAGE,
          conversationFilterBarValuesToRequestMap(filters as ConversationsFilterBarFormValues),
        );
      }}
      initialValue={CONVERSATOINS_FILTER_BAR_FORM_INITIAL_VALUES}
    >
      {({ isActive, setFilter }) => (
        <StackLayout
          space='1rem'
          justifyContent='justify-between'
          className='flex-wrap chats-section_desktop-only-content'
        >
          <FormControl className='w-full'>
            <Input
              className='p-4 rounded-2'
              placeholder={t('input.search.placeholder')}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setFilter('name', e.target.value as never);
              }}
            />
          </FormControl>

          <Show.When isTrue={isChatsFiltersBarVisible}>
            <ConversationsFilterBar />
          </Show.When>

          <ClusterLayout space='0.75rem'>
            <Button size='medium' className='w-full' onClick={toggleOpenChatCreationModal}>
              {t('button.actions.create')}
            </Button>

            <Show.When isTrue={isChatsNotEmpty}>
              <Button
                size='medium'
                className='w-10'
                color={isActive ? 'primary' : 'secondary'}
                onClick={triggerChatsFiltersBarVisibility}
              >
                <Icon name={cilFilter} color='var(--cv-light)' size={16} />
              </Button>
            </Show.When>
          </ClusterLayout>
        </StackLayout>
      )}
    </Filters>
  );
};
