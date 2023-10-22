module.exports =  {
  "extends": ["airbnb-base"],
  "env": {
    "node": true,
    "es6": true,
    "browser": true
  },
  parser: '@typescript-eslint/parser',
  "rules": {
    "no-console": "off",
    "@typescript-eslint/no-explicit-any": "error"
  }
}
