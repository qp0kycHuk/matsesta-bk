const plugin = require('tailwindcss/plugin')
const { default: flattenColorPalette } = require('tailwindcss/lib/util/flattenColorPalette')
const { parseColor, formatColor } = require('tailwindcss/lib/util/color')

const defaultOptions = {
  className: 'checkbox',
  disabledOpacity: 0.6,
  lightColorOpacity: 0.2,
  baseCss: {},
}

module.exports = plugin.withOptions(
  (opts) =>
    function ({ addComponents, matchUtilities, addBase, theme }) {
      const sizeName = '--tw-checkbox-size'
      const colorName = '--tw-checkbox-color'
      const colorLightName = '--tw-checkbox-color-light'
      const sizeVar = 'var(--tw-checkbox-size)'
      const colorVar = 'var(--tw-checkbox-color)'
      const colorLightVar = 'var(--tw-checkbox-color-light)'
      const options = {
        ...defaultOptions,
        ...opts,
      }
      options.className = options.className.trim()

      addBase({
        ':root': {
          [sizeName]: theme('checkboxSize.base'),
          [colorName]: theme('colors.primary'),
          [colorLightName]: `theme('colors.primary / 20%')`,
        },
      })
      addComponents({
        [`.${options.className}`]: {
          display: 'block',
          appearance: 'none',
          height: sizeVar,
          width: sizeVar,
          border: "1px solid theme('colors.black / 40%')",
          outline: 'none !important',
          transition: '.15s',
          boxShadow: '0 0 0 0px ' + colorVar,
          ...options.baseCss,



          '&:focus, &:focus-within, &:is(.dark &):focus, &:is(.dark &):focus-within': {
            borderColor: colorVar,
            boxShadow: '0 0 0 1px ' + colorVar,
            zIndex: 2,
          },
          '@media(hover) ': {
            '&:hover': {
              boxShadow: `0 0 0 calc(${sizeVar} / 3) ${colorLightVar}`
            },
          },
          '&:checked': {
            background: `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e"), ${colorVar}`,
            borderColor: colorVar,
            boxShadow: 'none',
            boxShadow: `0 0 0 calc(${sizeVar} / 2) rgba(0, 0, 0, 0)`
          },

          '&:disabled': {
            opacity: options.disabledOpacity,
          },
        },
      })

      // size
      matchUtilities(
        {
          [options.className]: (size) => {
            // check is not color
            const string = size.DEFAULT || size[500] || size
            const parsed = parseColor(string)
            if (!!parsed?.color) return null

            return { [sizeName]: size }
          },
        },
        { values: theme('checkboxSize') }
      )

      // colors
      matchUtilities(
        {
          [options.className]: (color) => {
            // check is color
            const string = color.DEFAULT || color[500] || color
            const parsed = parseColor(string)
            if (!parsed?.color) return null

            return {
              [colorName]: string,
              [colorLightName]: formatColor({
                mode: 'rgba',
                color: parsed.color,
                alpha: options.lightColorOpacity,
              }),
            }
          },
        },
        {
          values: flattenColorPalette(theme('colors')),
          type: 'color',
        }
      )
    },
  (options) => ({
    theme: {
      extend: {
        checkboxSize: {
          xs: '16px',
          sm: '20px',
          base: '24px',
          lg: '32px',
          xl: '40px',
        },
      },
    },
  })
)
