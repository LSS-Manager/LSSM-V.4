// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueLoaderPlugin = require('vue-loader/lib/plugin');
import svgToMiniDataURI from 'mini-svg-data-uri';

export default {
    target: 'web',
    bail: true,
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.runtime.esm.js',
            'vue.esm.js$': 'vue/dist/vue.runtime.esm.js',
        },
        extensions: ['.tsx', '.ts', '.js', '.vue', '.json'],
        // modules: ['node_modules', path.resolve(__dirname, 'src')],
    },
    module: {
        rules: [
            {
                test: /\.(gif|jpg|png)$/iu,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/iu,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            generator: (content: Buffer): string =>
                                svgToMiniDataURI(content.toString()),
                        },
                    },
                ],
            },
            {
                test: /\.tsx?$/u,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            appendTsSuffixTo: [/\.vue$/u],
                            transpileOnly: true,
                        },
                    },
                ],
                exclude: /node_modules/u,
            },
            {
                test: /\.vue$/u,
                loader: 'vue-loader',
            },
            {
                test: /\.sass$/u,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            implementation: require('sass'),
                            sassOptions: {
                                indentedSyntax: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.html?$/u,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src'],
                    },
                },
            },
        ],
    },
    plugins: [new VueLoaderPlugin()],
};
