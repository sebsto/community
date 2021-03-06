import {css} from '@emotion/core';
import {Link, useStaticQuery, graphql} from 'gatsby';
import {FaArrowCircleRight} from 'react-icons/fa';
import {
  ORANGE_PEEL_COLOR,
  BIG_STONE_COLOR,
  GRAY_COLOR,
  MAX_WIDTH,
  mq,
} from '~/constants';
import {IoLogoGithub, IoLogoTwitter} from 'react-icons/io';
import awsLogoSrc from '~/assets/images/aws-logo.png';
import bugleGraphicSrc from '~/assets/images/bugle.svg';
import {map, join} from 'ramda';
import Text from './Text';
import ExternalLink from './ExternalLink';

const styles = css`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: #fff;
  margin-top: 3.25rem;

  > div {
    display: flex;
    flex: 1;
    width: 100%;
    max-width: ${MAX_WIDTH};
    margin: 0 auto;

    > a {
      display: flex;
      flex: 1;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 1.75rem 1rem;

      &:hover {
        background: linear-gradient(
          to left,
          rgb(255, 255, 255),
          rgb(250, 250, 250),
          rgb(255, 255, 255)
        );
      }

      > * {
        display: inline;
      }

      .text {
        font-size: 0.875rem;
        line-height: 1.3125rem;
        font-weight: 400;
      }

      .primary,
      svg {
        color: ${ORANGE_PEEL_COLOR};
      }

      svg,
      img {
        margin: 0 0.625rem;
        display: none;

        ${mq.tablet} {
          display: initial;
        }
      }

      .secondary {
        color: ${BIG_STONE_COLOR};
      }

      span {
        display: inline;
      }
    }

    &.upper {
      direction: row;

      img {
        height: 1.75rem;
      }
    }

    &.lower {
      flex-direction: column-reverse;
      align-items: center;
      padding: 4rem 3rem;

      ${mq.tablet} {
        flex-direction: row;
      }

      .copyright {
        display: flex;
        flex: 1;
        flex-direction: column;
        text-align: center;
        align-items: center;

        ${mq.tablet} {
          flex-direction: column-reverse;
          align-items: flex-start;
          text-align: left;
        }

        > img {
          width: 4.6875rem;
          margin: 1rem 0;
        }

        .text {
          max-width: 22.5rem;
          color: ${GRAY_COLOR};
          margin: 1rem 0;
          font-size: 0.75rem;
          line-height: 1.3125rem;
          font-weight: 200;
        }
      }

      .social {
        display: flex;
        flex: 1;
        flex-direction: row;
        padding: 0.5rem 0;

        ${mq.tablet} {
          justify-content: flex-end;
        }

        > * {
          margin: 0 1rem;

          ${mq.tablet} {
            margin: 0 0 0 2rem;
          }
        }
      }
    }
  }

  > hr {
    display: block;
    width: 100%;
    height: 0.0625rem;
    margin: 0;
    border-width: 0;
    background-color: #eee;
  }
`;

export default () => {
  const {sitePage} = useStaticQuery(graphql`
    {
      sitePage(path: {eq: "/newsletters"}) {
        context {
          latestSlug
        }
      }
    }
  `);
  const {latestSlug} = sitePage.context;

  return (
    <footer css={styles}>
      <div className='upper'>
        <Link to={latestSlug}>
          <img src={bugleGraphicSrc} alt='bugle' />
          <span>
            <Text
              h4
              className='secondary'
              children=' The latest newsletter is out!'
            />
            <Text h4 className='primary' children=' Read the latest' />
          </span>
          <FaArrowCircleRight size={22} />
        </Link>
      </div>

      <hr />

      <div className='lower'>
        <div className='copyright'>
          <Text>
            {`The Amplify Community is supported by Amazon Web Services © ${new Date().getFullYear()}, Amazon Web Services, Inc. or its affiliates. All rights reserved.`}
          </Text>
          <img src={awsLogoSrc} alt='aws' />
        </div>

        <div className='social'>
          {map(
            ({Icon, size, ...linkProps}) => {
              const {className: key} = linkProps;
              return (
                <ExternalLink {...{key}} {...linkProps}>
                  <Icon {...{size}} />
                </ExternalLink>
              );
            },
            [
              {
                className: 'github',
                href: 'https://github.com/aws-amplify/community',
                Icon: IoLogoGithub,
                size: 42,
              },
              {
                className: 'twitter',
                href: 'https://twitter.com/AWSAmplify',
                Icon: IoLogoTwitter,
                size: 45,
              },
            ],
          )}
        </div>
      </div>
    </footer>
  );
};
