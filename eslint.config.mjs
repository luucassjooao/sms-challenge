import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  {files: ['**/*.{js,mjs,cjs,ts}']},
  {languageOptions: { globals: globals.node }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      quotes: ['error', 'single'],
      semi: ['error', 'always'],
      'max-len': [
        'error',
        {
          code: 100,
          tabWidth: 2,
          ignoreComments: true,
          ignoreUrls: true,
          ignoreStrings: true
        }
      ],
      indent: ['error', 2]
    }
  }
];
