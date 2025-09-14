// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  plugins: [
    'expo',
  ],
  
  extends: ['expo', 'plugin:expo/use-dom-exports'],
  ignorePatterns: ['/dist/*'],
  "rules": {
    "no-unused-vars": 0,
    "react-hooks/exhaustive-deps":0
  },
};
