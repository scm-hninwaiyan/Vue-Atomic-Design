import Overlay from "./Overlay";

export default {
  title: "Atoms/Overlay",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { Overlay },
    template: "<Overlay>content</Overlay>",
  };
};

export const Default = Template.bind();
