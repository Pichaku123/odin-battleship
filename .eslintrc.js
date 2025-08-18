// .eslintrc.js
module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: ["airbnb-base", "plugin:prettier/recommended"],
    plugins: ["prettier"],
    parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
    },
    rules: {
        "no-console": "off",
        "import/prefer-default-export": "off",
        "object-shorthand": "off",
        "func-names": "off",
        "prettier/prettier": "warn",
    },
};
