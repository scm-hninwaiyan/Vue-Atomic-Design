import Vue from "vue";
import VTooltip from "v-tooltip";
import Slip from "./Slip";
import { genSlip } from "@/models/Slip/dummySlipFactory";

Vue.use(VTooltip);

export default {
  title: "molecules/Slip",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { Slip },
    template: '<Slip :slip="slip" :loginShopType="2"/>',
  };
};

export const Default = Template.bind();
Default.args = {
  slip: genSlip(),
};
