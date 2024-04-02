import Webpack from 'webpack';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/types';
import { BuildMode } from './enums/enums';

export function buildWebpack(options: BuildOptions): Webpack.Configuration {
  const {mode, paths} = options;
  const isDev = mode === BuildMode.Development;

  return {
    mode: mode ?? BuildMode.Development,
    entry: paths.entry,
    output: {
      path: paths.output,
      filename: 'bundle.[fullhash].js',
      chunkFilename: 'chank.[id].js',
      clean: true,
    },
    plugins: buildPlugins(options),
    module: { rules: buildLoaders(options) },
    resolve: buildResolvers(options),
    devtool: isDev && 'inline-source-map',
    devServer: isDev && buildDevServer(options),
  }
}