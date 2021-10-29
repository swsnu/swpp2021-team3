module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        node: true,
        jest: true
    },
    "extends": [
        "plugin:react/recommended",
        "google"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
};
