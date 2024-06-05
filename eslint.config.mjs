import { fixupConfigRules, fixupPluginRules } from "@eslint/compat";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import compat from "eslint-plugin-compat";
import _import from "eslint-plugin-import";
import jsdoc from "eslint-plugin-jsdoc";
import prettier from "eslint-plugin-prettier";
import tsdoc from "eslint-plugin-tsdoc";
import unicorn from "eslint-plugin-unicorn";
import regexp from "eslint-plugin-regexp";
import vue from "eslint-plugin-vue";
import globals from "globals";
import markdownlint from "eslint-plugin-markdownlint";
import parser from "eslint-plugin-markdownlint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [{
    ignores: [
        "node_modules/*",
        "*/dist/*",
        "**/*.user.js",
        "build/**/*.js",
        "docs/.vuepress/*.js",
        "docs/.vuepress/.cache",
        "docs/.vuepress/.temp",
        "docs/.vuepress/dist",
        "docs/.vuepress/node_modules",
        "docs/.vuepress/components/.temp",
        "prebuild/*.js",
        "scripts/**/*.js",
        "src/userscript.js",
        "src/config.js",
        "static/fontawesome_*.min.js",
        "static/missions/*",
        "static/releasenotes/*",
        "src/modules/support/*",
        "src/modules/renameFz/*",
    ],
}, ...fixupConfigRules(compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:compat/recommended",
    "plugin:import/typescript",
    "plugin:jsdoc/recommended",
    "plugin:regexp/recommended",
    "plugin:vue/essential",
    "prettier",
)), {
    plugins: {
        "@typescript-eslint": fixupPluginRules(typescriptEslint),
        compat: fixupPluginRules(compat),
        import: fixupPluginRules(_import),
        jsdoc: fixupPluginRules(jsdoc),
        prettier,
        tsdoc,
        unicorn,
        regexp: fixupPluginRules(regexp),
        vue: fixupPluginRules(vue),
    },

    languageOptions: {
        globals: {
            ...globals.browser,
            ...globals.commonjs,
            Atomics: "readonly",
            SharedArrayBuffer: "readonly",
            process: "readonly",
            __dirname: "readonly",
            PREFIX: "readonly",
            MODE: "readonly",
            VERSION: "readonly",
            BRANCH: "readonly",
            LOADSCRIPT_EVENT_START: "readonly",
            LOADSCRIPT_EVENT_END: "readonly",
        },

        ecmaVersion: 2018,
        sourceType: "module",

        parserOptions: {
            parser: "@typescript-eslint/parser",

            project: [
                "./tsconfig.json",
                "./build/tsconfig.json",
                "./docs/.vuepress/tsconfig.json",
                "./prebuild/tsconfig.json",
                "./scripts/tsconfig.json",
                "./src/tsconfig.userscript.json",
            ],

            extraFileExtensions: [".vue"],
        },
    },

    settings: {
        jsdoc: {
            mode: "typescript",
        },
    },

    rules: {
        "@typescript-eslint/array-type": ["error"],
        "@typescript-eslint/consistent-indexed-object-style": ["error", "record"],
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/consistent-type-imports": ["error"],
        "@typescript-eslint/method-signature-style": ["error", "method"],
        "@typescript-eslint/no-duplicate-enum-values": ["off"],
        "@typescript-eslint/sort-type-constituents": ["error"],
        "array-callback-return": ["error"],
        "block-scoped-var": "warn",
        curly: ["error", "multi-or-nest", "consistent"],
        "default-case-last": "error",
        "guard-for-in": "error",

        "import/order": ["error", {
            groups: [
                ["builtin"],
                ["external"],
                ["internal"],
                ["parent", "sibling"],
                ["index"],
                ["object"],
                ["type"],
            ],

            pathGroups: [{
                pattern: "vue",
                group: "builtin",
                position: "before",
            }],

            pathGroupsExcludedImportTypes: ["vue"],
            "newlines-between": "always",
        }],

        "jsdoc/check-syntax": ["error"],

        "jsdoc/check-tag-names": ["error", {
            definedTags: ["alpha", "beta"],
        }],

        "jsdoc/no-types": ["error"],
        "jsdoc/require-asterisk-prefix": ["error"],
        "jsdoc/require-description": ["error"],
        "jsdoc/require-description-complete-sentence": ["error"],
        "jsdoc/require-hyphen-before-param-description": ["error"],
        "jsdoc/require-param-type": ["off"],
        "jsdoc/require-returns-type": ["off"],
        "no-constant-binary-expression": "error",

        "no-duplicate-imports": ["error", {
            includeExports: true,
        }],

        "no-eval": "error",
        "no-floating-decimal": "warn",

        "no-implicit-coercion": ["error", {
            allow: ["!!"],
        }],

        "no-loop-func": "error",
        "no-loss-of-precision": "error",
        "no-multi-str": "warn",
        "no-new-native-nonconstructor": "error",
        "no-param-reassign": "error",
        "no-prototype-builtins": "off",
        "no-self-compare": "error",
        "no-sequences": "error",
        "no-template-curly-in-string": "warn",
        "no-unmodified-loop-condition": "error",
        "no-unreachable-loop": "error",
        "no-unsafe-optional-chaining": "error",
        "no-unused-expressions": "error",
        "no-useless-concat": "warn",
        "no-useless-rename": "error",
        "no-useless-return": "warn",
        "no-var": "error",

        "object-shorthand": ["error", "always", {
            avoidQuotes: true,
        }],

        "prefer-arrow-callback": "error",
        "prefer-const": "error",

        "prefer-regex-literals": ["error", {
            disallowRedundantWrapping: true,
        }],

        "prefer-rest-params": "error",
        "prefer-spread": "error",
        "prefer-template": "error",
        "prettier/prettier": "error",
        "regexp/hexadecimal-escape": ["error", "never"],
        "regexp/letter-case": ["error"],
        "regexp/no-control-character": ["error"],
        "regexp/no-empty-character-class": ["error"],
        "regexp/no-extra-lookaround-assertions": ["error"],
        "regexp/no-misleading-unicode-character": ["error"],
        "regexp/no-missing-g-flag": ["error"],
        "regexp/no-octal": ["error"],
        "regexp/no-standalone-backslash": ["error"],
        "regexp/prefer-escape-replacement-dollar-char": ["error"],
        "regexp/prefer-lookaround": ["error"],
        "regexp/prefer-named-backreference": ["error"],
        "regexp/prefer-named-replacement": ["error"],
        "regexp/prefer-result-array-groups": ["error"],
        "regexp/prefer-regexp-test": ["error"],
        "regexp/require-unicode-regexp": ["error"],
        "regexp/sort-alternatives": ["error"],
        "regexp/sort-character-class-elements": ["error"],
        "regexp/unicode-escape": ["error", "unicodeEscape"],
        "regexp/use-ignore-case": ["error"],
        semi: ["error", "always"],

        "sort-imports": ["warn", {
            allowSeparatedGroups: true,
            ignoreCase: true,
            memberSyntaxSortOrder: ["none", "all", "single", "multiple"],
        }],

        "template-curly-spacing": "error",
        "tsdoc/syntax": "warn",
        "unicorn/consistent-destructuring": ["error"],
        "unicorn/no-array-push-push": ["error"],
        "unicorn/no-for-loop": ["error"],
        "unicorn/no-unnecessary-await": ["error"],
        "unicorn/no-unreadable-iife": ["error"],
        "unicorn/no-useless-switch-case": ["error"],
        "unicorn/no-zero-fractions": ["error"],
        "unicorn/numeric-separators-style": ["error"],
        "unicorn/prefer-add-event-listener": ["error"],
        "unicorn/prefer-array-index-of": ["error"],

        "unicorn/prefer-array-find": ["error", {
            checkFromLast: true,
        }],

        "unicorn/prefer-array-flat": ["error"],
        "unicorn/prefer-array-flat-map": ["error"],
        "unicorn/prefer-array-some": ["error"],
        "unicorn/prefer-at": ["error"],
        "unicorn/prefer-dom-node-append": ["error"],
        "unicorn/prefer-dom-node-remove": ["error"],
        "unicorn/prefer-dom-node-text-content": ["error"],
        "unicorn/prefer-keyboard-event-key": ["error"],
        "unicorn/prefer-modern-dom-apis": ["error"],
        "unicorn/prefer-modern-math-apis": ["error"],
        "unicorn/prefer-native-coercion-functions": ["error"],
        "unicorn/prefer-negative-index": ["error"],
        "unicorn/prefer-object-from-entries": ["error"],
        "unicorn/prefer-query-selector": ["off"],
        "unicorn/switch-case-braces": ["error", "avoid"],
        "vue/no-unused-refs": "warn",
        "vue/prefer-true-attribute-shorthand": "warn",

        yoda: ["error", "never", {
            exceptRange: true,
        }],
    },
}, {
    files: ["./src/**/*"],

    rules: {
        "no-console": "warn",
    },
}, {
    files: ["**/*.md"],

    plugins: {
        markdownlint,
    },

    languageOptions: {
        parser: parser,
    },

    rules: {
        "prettier/prettier": ["off"],
        "markdownlint/md001": ["error"],

        "markdownlint/md003": ["error", {
            style: "atx",
        }],

        "markdownlint/md004": ["error", {
            style: "asterisk",
        }],

        "markdownlint/md005": ["error"],

        "markdownlint/md007": ["error", {
            indent: 4,
        }],

        "markdownlint/md009": ["error"],

        "markdownlint/md010": ["error", {
            spaces_per_tab: 4,
        }],

        "markdownlint/md011": ["error"],
        "markdownlint/md012": ["error"],
        "markdownlint/md014": ["error"],
        "markdownlint/md018": ["error"],
        "markdownlint/md019": ["error"],
        "markdownlint/md020": ["error"],
        "markdownlint/md021": ["error"],

        "markdownlint/md022": ["error", {
            lines_above: 1,
            lines_below: 0,
        }],

        "markdownlint/md023": ["error"],

        "markdownlint/md024": ["error", {
            siblings_only: true,
        }],

        "markdownlint/md025": ["off"],
        "markdownlint/md026": ["error"],
        "markdownlint/md027": ["error"],
        "markdownlint/md028": ["error"],

        "markdownlint/md029": ["error", {
            style: "ordered",
        }],

        "markdownlint/md030": ["error"],
        "markdownlint/md031": ["error"],
        "markdownlint/md032": ["error"],

        "markdownlint/md033": ["error", {
            allowed_elements: ["discord", "a"],
        }],

        "markdownlint/md034": ["error"],

        "markdownlint/md035": ["error", {
            style: "***",
        }],

        "markdownlint/md036": ["error"],
        "markdownlint/md037": ["error"],
        "markdownlint/md038": ["error"],
        "markdownlint/md039": ["error"],
        "markdownlint/md040": ["error"],
        "markdownlint/md041": ["off"],
        "markdownlint/md042": ["error"],

        "markdownlint/md044": ["error", {
            names: ["LSSM"],
        }],

        "markdownlint/md045": ["error"],

        "markdownlint/md046": ["error", {
            style: "fenced",
        }],

        "markdownlint/md047": ["error"],

        "markdownlint/md048": ["error", {
            style: "backtick",
        }],

        "markdownlint/md049": ["error", {
            style: "asterisk",
        }],

        "markdownlint/md050": ["error", {
            style: "asterisk",
        }],
    },
}];