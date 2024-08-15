import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'inline-flex items-center rounded-lg bg-green-700 px-4 py-2.5 text-center text-sm text-white font-medium hover:bg-green-800 focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900'],
    ['btn_secondary', 'inline-flex items-center rounded-lg bg-red-700 px-4 py-2.5 text-center text-sm text-white font-medium hover:bg-red-800 focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900'],
    ['icon-btn', 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-green-600'],
    ['header1', 'lg:text-5xl text-2xl font-bold'],
    ['btn_black', 'inline-flex items-center rounded-lg px-4 py-2.5 text-center text-sm dark:text-white text-black font-medium hover:bg-gray-200 border border-gray-300 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-900'],
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
