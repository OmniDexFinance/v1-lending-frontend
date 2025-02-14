import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { useThemeContext } from '@omnidex/omnidex-ui-kit';

import staticStyles from './style';

import animationCircle from '../../../images/animationCircle.svg';
import animationCircleDark from '../../../images/animationCircleDark.svg';

interface CaptionProps {
  title: string;
  description?: string | ReactNode;
  color?: 'primary' | 'secondary' | 'dark';
  className?: string;
  marginBottom?: number;
  withAnimationCircle?: boolean;
  onWhiteBackground?: boolean;
}

export default function Caption({
  title,
  description,
  color = 'primary',
  className,
  marginBottom,
  withAnimationCircle,
  onWhiteBackground,
}: CaptionProps) {
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  return (
    <div
      className={classNames('Caption', `Caption__${color}`, className)}
      style={{ marginBottom: `${marginBottom}px` }}
    >
      <h2 className={classNames({ Caption__titleWithCircle: withAnimationCircle })}>
        {title}{' '}
        {withAnimationCircle && (
          <img src={isCurrentThemeDark ? animationCircleDark : animationCircle} alt="" />
        )}
      </h2>
      {description && <div className="Caption__description">{description}</div>}

      <style jsx={true}>{staticStyles}</style>
      <style jsx={true}>{`
        .Caption {
          &__market {
            h2 {
              color: ${currentTheme.primary.hex};
            }
          }

          &__primary {
            h2 {
              color: ${currentTheme.primary.hex};
            }
          }

          &__secondary {
            h2 {
              color: ${currentTheme.secondary.hex};
            }
          }

          &__dark {
            h2 {
              color: ${onWhiteBackground
                ? currentTheme.darkBlue.hex
                : currentTheme.textDarkBlue.hex};
            }
          }

          &__description {
            color: ${currentTheme.textDarkBlue.hex};
          }
        }
      `}</style>
    </div>
  );
}
