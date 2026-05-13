/**
 * Style Dictionary v4 build config — Ken Research design tokens
 * ESM format required by SD v4 when package.json has "type": "module"
 *
 * Functionally identical to style-dictionary.config.cjs (which is the
 * spec reference). This file is the active build config.
 *
 * Platforms: CSS / JS+TS / SCSS / JSON / iOS Swift / Android
 * Run: pnpm build
 */

export default {
  source: ['tokens.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'build/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: { outputReferences: true },
        },
      ],
    },
    js: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [
        { destination: 'tokens.js',   format: 'javascript/es6' },
        { destination: 'tokens.d.ts', format: 'typescript/es6-declarations' },
      ],
    },
    scss: {
      transformGroup: 'scss',
      buildPath: 'build/',
      files: [{ destination: 'tokens.scss', format: 'scss/variables' }],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'build/',
      files: [{ destination: 'tokens.flat.json', format: 'json/flat' }],
    },
    ios: {
      transformGroup: 'ios-swift',
      buildPath: 'build/ios/',
      files: [
        {
          destination: 'KRTokens.swift',
          format: 'ios-swift/class.swift',
          options: { className: 'KRTokens' },
        },
      ],
    },
    android: {
      transformGroup: 'android',
      buildPath: 'build/android/',
      files: [
        { destination: 'colors.xml', format: 'android/colors' },
        { destination: 'dimens.xml', format: 'android/dimens' },
      ],
    },
  },
};
