import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultDescription =
  'Participants will get virtual money and will have to make a maximum profit by trading shares of different company';
const defaultOGURL = '';
const defaultOGImage = '';

const Head = (props) => (
  <NextHead>
    <meta charSet='UTF-8' />
    <title>{props.title || ''}</title>
    <meta
      name='description'
      content={props.description || defaultDescription}
    />
    <link
      rel='apple-touch-icon'
      sizes='57x57'
      href='/pwa/apple-icon-57x57.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='60x60'
      href='/pwa/apple-icon-60x60.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='72x72'
      href='/pwa/apple-icon-72x72.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='76x76'
      href='/pwa/apple-icon-76x76.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='114x114'
      href='/pwa/apple-icon-114x114.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='120x120'
      href='/pwa/apple-icon-120x120.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='144x144'
      href='/pwa/apple-icon-144x144.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='152x152'
      href='/pwa/apple-icon-152x152.png'
    />
    <link
      rel='apple-touch-icon'
      sizes='180x180'
      href='/pwa/apple-icon-180x180.png'
    />
    <link
      rel='icon'
      type='image/png'
      sizes='192x192'
      href='/pwa/android-icon-192x192.png'
    />
    <link rel='manifest' href='/manifest.json' />
    <meta name='msapplication-TileColor' content='#ffffff' />
    <meta name='msapplication-TileImage' content='/pwa/ms-icon-144x144.png' />
    <meta name='theme-color' content='#ffffff'></meta>
    <meta name='viewport' content='width=device-width, initial-scale=1' />
    <meta property='og:url' content={props.url || defaultOGURL} />
    <meta property='og:title' content={props.title || ''} />
    <meta
      property='og:description'
      content={props.description || defaultDescription}
    />
    <meta name='twitter:site' content={props.url || defaultOGURL} />
    <meta name='twitter:card' content='summary_large_image' />
    <meta name='twitter:image' content={props.ogImage || defaultOGImage} />
    <meta property='og:image' content={props.ogImage || defaultOGImage} />
    <meta property='og:image:width' content='1200' />
    <meta property='og:image:height' content='630' />
  </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;
