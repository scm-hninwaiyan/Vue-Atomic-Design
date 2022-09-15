import Border from "./Border";

export default {
  title: "Atoms/Border",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { Border },
    template: "<Border />",
  };
};

export const Default = Template.bind();
