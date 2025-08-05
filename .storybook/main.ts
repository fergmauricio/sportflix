import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  stories: [
    "../app/**/*.stories.@(js|jsx|ts|tsx|mdx)", // Componentes no App Router
    "../components/**/*.stories.@(js|jsx|ts|tsx)", // Componentes compartilhados
    "../src/**/*.stories.@(js|jsx|ts|tsx)", // Fallback para estrutura antiga
  ],
  addons: [
    "@storybook/addon-essentials", // Inclui docs, controls e actions
    "@storybook/addon-interactions", // Para testes interativos
    "@storybook/addon-a11y", // Acessibilidade
    "@storybook/addon-vitest", // Testes
  ],
  framework: {
    name: "@storybook/nextjs-vite",
    options: {},
  },
  staticDirs: ["../public"], // Diretório de assets estáticos
  docs: {
    autodocs: "tag", // Gera docs automáticos para componentes marcados
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
};

export default config;
