import { Input } from "@/app/templates/Input/Input";

const meta = {
  title: "Form/Input",
  component: Input,
};

export default meta;

export const Default = {
  args: {
    placeholder: "값을 입력해주세요",
    disabled: false,
    label: "라벨",
  },
};

export const Disabled = {
  args: {
    placeholder: "값을 입력해주세요",
    disabled: true,
    label: "",
  },
};
