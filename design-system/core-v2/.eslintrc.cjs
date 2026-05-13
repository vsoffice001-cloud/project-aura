'use strict';

/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  env: {
    browser: true,
    es2020: true,
  },
  extends: [
    // TODO (Step 10): add 'plugin:@typescript-eslint/recommended'
    // TODO (Step 10): add 'plugin:react/recommended'
    // TODO (Step 10): add 'plugin:react-hooks/recommended'
  ],
  rules: {
    // TODO (Step 10): Add custom rule — @promotedFrom JSDoc tag enforcement
    // TODO (Step 10): Add custom rule — no hardcoded hex/rgba in src/atoms src/molecules src/organisms
    // TODO (Step 10): Add custom rule — 'use client' required for atoms using hooks
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
