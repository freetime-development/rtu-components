import RCTooltip from 'rc-tooltip';
import { memo } from 'react';
import { FadeIn } from '../../animation/FadeIn';
import { splitText } from '@/utils/textUtils';

interface TooltipProps {
  text: React.ReactNode;
  placement?: 'top' | 'right' | 'bottom' | 'left';
}

export const Tooltip = memo(({ text, placement = 'top' }: TooltipProps) => {
  const parsedText = splitText(text);

  return (
    <RCTooltip
      placement={placement}
      trigger={['hover']}
      overlayClassName="max-w-xs"
      overlay={
        <FadeIn>
          <span className="text-white">{parsedText}</span>
        </FadeIn>
      }
    >
      <i className="icon-info text-black" />
    </RCTooltip>
  );
});

Tooltip.displayName = 'Tooltip';
