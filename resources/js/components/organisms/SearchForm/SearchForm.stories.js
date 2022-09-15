import SearchForm from "./SearchForm";

export default {
  title: "Organisms/SearchForm",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { SearchForm },
    template: "<SearchForm />",
  };
};

export const Default = Template.bind();
