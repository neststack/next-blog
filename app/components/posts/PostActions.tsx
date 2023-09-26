'use client';

import { useCallback } from 'react';
import Button from '../Button';

interface CategoryViewProps {
  onActionPrimary?: (id: string) => void;
  onActionSecondary?: (id: string) => void;
  disabled?: boolean;
  actionLabelPrimary?: string;
  actionLabelSecondary?: string;
  actionId?: string;
}

const CategoryView: React.FC<CategoryViewProps> = ({
  onActionPrimary,
  onActionSecondary,
  disabled,
  actionLabelPrimary,
  actionLabelSecondary,
  actionId = '',
}) => {
  const primaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onActionPrimary?.(actionId);
    },
    [disabled, onActionPrimary, actionId]
  );

  const secondaryAction = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onActionSecondary?.(actionId);
    },
    [disabled, onActionSecondary, actionId]
  );
  return (
    <div className='flex gap-4'>
      {onActionPrimary && actionLabelPrimary && (
        <Button
          disabled={disabled}
          small
          label={actionLabelPrimary}
          onClick={primaryAction}
        />
      )}
      {onActionSecondary && actionLabelSecondary && (
        <Button
          disabled={disabled}
          small
          outline
          label={actionLabelSecondary}
          onClick={secondaryAction}
        />
      )}
    </div>
  );
};

export default CategoryView;
