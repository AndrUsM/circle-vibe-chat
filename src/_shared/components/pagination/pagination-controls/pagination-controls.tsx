import { Button, CenteredVertialLayout, ExtendedReactFunctionalComponent, Show } from "@circle-vibe/components";
import { PaginatedResponse } from "@circle-vibe/shared";

interface PaginationControlsProps {
  paginatedResponse: PaginatedResponse<any> | null;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export const PaginationControls: ExtendedReactFunctionalComponent<PaginationControlsProps> = ({
  paginatedResponse,
  currentPage,
  onPageChange,
}) => {
  return (
    <Show.When
      isTrue={Boolean(paginatedResponse?.totalPages && paginatedResponse?.totalPages > 1)}
    >
      <CenteredVertialLayout
        space="0.25rem"
        className="min-h-8 overflow-y-hidden overflow-x-auto"
      >
        {Array(paginatedResponse?.totalPages)
          .fill(null)
          .map((_, index) => (
            <Button
              key={`pagination-messages-button-${index}`}
              size="small"
              className="font-bold"
              color={currentPage === index + 1 ? "primary" : "secondary"}
              onClick={() => onPageChange(index + 1)}
            >
              {index + 1}
            </Button>
          ))}
      </CenteredVertialLayout>
    </Show.When>
  );
};
