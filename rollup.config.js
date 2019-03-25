import ts from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",

  output: [
    {
      dir: "dist/cjs",
      extend: true,
      format: "cjs"
    },
    {
      dir: "dist/esm",
      extend: true,
      format: "esm"
    }
  ],

  external: [
    "react",
    "prop-types",
    "cnbuilder",
    "react-ez-dropdown",
    "react-scrollbars-custom"
  ],

  plugins: [
    ts({
      clean: true,
      useTsconfigDeclarationDir: true,
      tsconfigOverride: {
        compilerOptions: {
          module: "esnext",
          target: "esnext",
          declaration: true,
          declarationDir: "dist/types"
        }
      }
    })
  ]
};
