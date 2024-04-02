import { BuildMode } from "../enums/enums";
import { BuildOptions } from "../types/types";
import { removeDataTestIdBabelPlugin } from "./removeDataTestIdBabelPlugin";

export function buildBabelLoader({ mode }: BuildOptions) {
  const isDev = mode === BuildMode.Development;
  const isProd = mode === BuildMode.Production;
  
  const plugins = [];

  if(isProd) {
    plugins.push([ removeDataTestIdBabelPlugin, { props: ['data-testId'] }]);
  }

  return {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: [
          "@babel/preset-env",
          "@babel/preset-typescript",
          [
            "@babel/preset-react",
            { runtime: "automatic" }
          ]
        ],
        plugins,
      }
    }
  }
}