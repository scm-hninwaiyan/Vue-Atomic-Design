import StoryRouter from "storybook-vue-router";
import SideMenu from "./SideMenu";

export default {
  title: "Organisms/SideMenu",
  decorators: [StoryRouter()],
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { SideMenu },
    template: `<SideMenu v-bind="$props"/>`,
  };
};

export const Default = Template.bind();
Default.args = {
  loginShopType: 2,
  actorName: "司令塔",
  storeName: "品川駅前店",
  storeCode: 1111,
};
