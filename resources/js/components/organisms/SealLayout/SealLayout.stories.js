import SealLayout from "./SealLayout";
import { PATTERN_1, PATTERN_2, PATTERN_3, PATTERN_4 } from "@/models/Seal/dummySealFactory";

export default {
  title: "Organisms/SealLayout",
};

const Template = (args, { argTypes }) => {
  return {
    props: Object.keys(argTypes),
    components: { SealLayout },
    template: `
    <div>
    <button @click="onClick">伝票データセット</button>
    <SealLayout ref="sealLayout"/>
    </div>
    `,
    methods: {
      onClick() {
        const sealLayout = this.$refs.sealLayout;
        const event = {
          data: {
            type: "SEND_TARGET",
            seals: [PATTERN_1, PATTERN_2, PATTERN_3, PATTERN_4],
          },
        };
        sealLayout.receiveMessage(event);
      },
    },
  };
};

export const Default = Template.bind();
