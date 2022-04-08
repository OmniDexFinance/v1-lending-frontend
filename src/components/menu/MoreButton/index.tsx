import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import classNames from 'classnames';
import { rgba, useThemeContext, DropdownWrapper, SocialIcons } from '@omnidex/omnidex-ui-kit';

import { useUserWalletDataContext } from '../../../libs/web3-data-provider';
import Link from '../../basic/Link';
import ConnectionModeSwitcher from '../ConnectionModeSwitcher';

import messages from './messages';
import staticStyles from './style';
import { useProtocolDataContext } from '../../../libs/protocol-data-provider';
import { moreNavigation } from '../navigation';
import { socialIcons } from '../../../ui-config';

interface MoreButtonProps {
  isVisible?: boolean;
}

export default function MoreButton({ isVisible = false }: MoreButtonProps) {
  const intl = useIntl();
  const { currentTheme, isCurrentThemeDark } = useThemeContext();
  const { currentAccount } = useUserWalletDataContext();
  const { currentMarketData } = useProtocolDataContext();

  const [visible, setVisible] = useState(isVisible);

  const borderColor = rgba(`${currentTheme.primary.rgb}, 0.1`);
  const hoverColor = rgba(`${currentTheme.darkBlue.rgb}, 0.05`);

  return (
    <div onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      <DropdownWrapper
        visible={visible}
        setVisible={setVisible}
        className="MoreButton"
        horizontalPosition="right"
        verticalPosition="bottom"
        buttonComponent={
          <button
            className={classNames('MoreButton__button', { MoreButton__buttonActive: visible })}
            type="button"
          >
            <span>...</span>
            <strong>...</strong>
          </button>
        }
      >
        <div className="MoreButton__content">
          <ul className="MoreButton__links">
            {moreNavigation.map((link, index) => (
              <li
                className={classNames('MoreButton__link-inner', {
                  MoreButton__linkHidden:
                    (!currentAccount && link.hiddenWithoutWallet) ||
                    (link.isVisible && !link.isVisible(currentMarketData)),
                })}
                key={index}
              >
                <Link
                  className="MoreButton__link ButtonLink"
                  to={link.link}
                  inNewWindow={link.absolute}
                  absolute={link.absolute}
                  onClick={() => setVisible(false)}
                >
                  <p>{intl.formatMessage(link.title)}</p>
                </Link>
              </li>
            ))}

            <li className="MoreButton__link-inner">
              <SocialIcons
                white={isCurrentThemeDark}
                icons={socialIcons}
                iconHeight={20}
                iconWidth={20}
                linkClassName="MoreButton__socialIcon"
              />
            </li>
          </ul>
        </div>

        <style jsx={true} global={true}>
          {staticStyles}
        </style>
        <style jsx={true} global={true}>{`
          .Menu__link-inner:hover .MoreButton p {
            color: ${currentTheme.textDarkBlue.hex} !important;
          }
          .MoreButton {
            p:hover {
              color: ${currentTheme.primary.hex} !important;
            }
            .DropdownWrapper__contentVisible.DropdownWrapper__content {
              background: ${currentTheme.whiteElement.hex};
              border: 1px solid ${currentTheme.border.hex};
            }
            &__button {
              color: ${currentTheme.textDarkBlue.hex} !important;
            }

            &__links {
              li {
                border-bottom: 1px solid ${borderColor};
              }
            }

            &__link {
              color: ${currentTheme.textDarkBlue.hex} !important;
              &:hover {
                background: ${hoverColor};
              }
            }
          }
        `}</style>
      </DropdownWrapper>
    </div>
  );
}
