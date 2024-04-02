import { ResolveOptions } from "webpack";
import { BuildOptions } from "./types/types";

export const buildResolvers = (options: BuildOptions): ResolveOptions => ({ 
  extensions: ['.tsx', '.ts', '.js'],
  alias: {
    '@': options.paths.src
  } 
});