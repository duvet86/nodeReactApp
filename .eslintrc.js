module.exports = {
    "extends": ["eslint:recommended", "plugin:react/recommended"],
    "plugins": [
        "babel",
        "react",
        "flow-vars"
    ],
    "parser": "babel-eslint",
    "rules": {
        "strict": 0,
        "flow-vars/define-flow-type": 1,
        "flow-vars/use-flow-type": 1
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "modules": true,
            "experimentalObjectRestSpread": true
        }
    },
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    }
};