module.exports =  {
  "extends": [
    "airbnb-base",
    'airbnb-typescript'
  ],
  "env": {
    "node": true,
    "es6": true,
    "browser": true
  },
  parser: '@typescript-eslint/parser',
  "rules": {
    "no-console": "off",
    "no-explicit-any": "error"
  }
}
