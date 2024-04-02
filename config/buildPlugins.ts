import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import Webpack, { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import { BuildMode } from "./enums/enums";
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import path from 'path';
import CopyPlugin from 'copy-webpack-plugin';

const FAVICON_FILENAME = 'techno.ico'

export const buildPlugins = ({mode, paths, analyzer, platform}: BuildOptions): Configuration['plugins'] => {
  const isProd = mode === BuildMode.Production;
  const isDev = mode === BuildMode.Development;

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.html, favicon: path.resolve(paths.public, FAVICON_FILENAME) }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
  ];

  if (isDev) {
    plugins.push(new Webpack.ProgressPlugin());
    plugins.push(new ForkTsCheckerWebpackPlugin())
  }

  if (isProd) {
    plugins.push(new MiniCssExtractPlugin(
      {
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      }
    )),

    plugins.push(new CopyPlugin({
      patterns: [
        { from: path.resolve(paths.public, 'locales'), to: path.resolve(paths.output, 'locales') },
      ],
    }),)
  }

  if(analyzer) {
    plugins.push(new BundleAnalyzerPlugin())
  }

  return plugins;
}