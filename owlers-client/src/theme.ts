
import { defaultConfig, defineConfig, createSystem } from '@chakra-ui/react'

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        primary1: { value: "#1F3434" },
        primary2: { value: "#495A5A" },

        primary3: { value: "#4F6868" },
        primary4: { value: "#6BB6A8" },

        beige1: { value: "#E3E1D4" },
        beige2: { value: "#F2F1EE" },

        danger1: { value: "#560E07" },
        danger2: { value: "#A84449" },
        danger3: { value: "#DA6163" },

        black: { value: "#121212" },
        green: { value: "#60CB6B" },
        blue: { value: "#6165DA" },

      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    }
  },
});

export const system = createSystem(defaultConfig, config)
