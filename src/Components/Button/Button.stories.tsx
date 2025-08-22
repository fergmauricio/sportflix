import { Button } from ".";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  component: Button,
  decorators: [Story => (<div className="w-full h-full flex items-center justify-center"><Story /></div>)]
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    children: "Texto do botão",
  },
};

export const Danger: Story = {
  args: {
    children: "Texto do botão",
    variant: 'danger',
    size: 'lg'
  },
};

export const Ghost: Story = {
  args: {
    children: "Texto do botão",
    variant: 'ghost',
    size: 'lg'
  },
};
