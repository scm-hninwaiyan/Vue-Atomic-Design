import Modal from "./Modal";

export default {
  title: "Molecules/Modal",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { Modal },
    template: "<Modal>content</Modal>",
  };
};

export const Default = Template.bind();
