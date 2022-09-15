import MenuItem from "./MenuItem";

export default {
  title: "molecules/MenuItem",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { MenuItem },
    template: '<MenuItem :menus="menus"/>',
  };
};

export const Default = Template.bind();
Default.args = {
  menus: {
    name: "R21 ランチ華ちらしｾｯﾄ",
    src: "https://dummyimage.com/300x221/000/fff",
  },
};
