import Button from "./Button";

export default {
  title: "Atoms/Button",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { Button },
    template: `<Button style="width:200px" v-bind="$props">更新</Button>`,
  };
};

export const Default = Template.bind();

export const Primary = Template.bind();
Primary.args = { color: "primary" };

export const PrimaryWithIcon = Template.bind();
PrimaryWithIcon.args = { color: "primary", startIconName: "update" };

export const DefaultSmall = Template.bind();
DefaultSmall.args = { size: "sm" };
