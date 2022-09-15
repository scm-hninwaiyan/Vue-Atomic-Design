import SelectBoxPanel from "./SelectBoxPanel";

const templateDecorator = () => ({
  template: `
  <div style="margin: 3em;">
     <story/>
  </div>
      `,
});

export default {
  title: "molecules/SelectBoxPanel",
  components: { SelectBoxPanel },
  decorators: [templateDecorator],
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { SelectBoxPanel },
    template: "<SelectBoxPanel />",
  };
};

export const Default = Template.bind();
