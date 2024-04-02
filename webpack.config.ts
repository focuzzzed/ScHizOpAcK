import Webpack from 'webpack';
import { buildWebpack } from "./config/buildWebpack";
import { BuildPlatform, BuildMode } from "./config/enums/enums";
import { BuildPaths } from './config/types/types';
import path from 'path';

interface EnvVariables {
  mode?: BuildMode;
  port?: number;
  analyzer?: boolean;
  platform?: BuildPlatform;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public'),
  }

  const config: Webpack.Configuration = buildWebpack({
    port: env.port ?? 3000,
    mode: env.mode ?? BuildMode.Development,
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? BuildPlatform.Desktop,
  });

  return config;
}