import FilterSection from "./FilterSection";

export default {
  title: "Organisms/FilterSection",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { FilterSection },
    template: "<FilterSection />",
  };
};

export const Default = Template.bind();
