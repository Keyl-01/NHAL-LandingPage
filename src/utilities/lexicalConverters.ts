import type { JSXConvertersFunction } from '@payloadcms/richtext-lexical/react'
import { TypographyJSXConverters } from 'payload-lexical-typography/converters'

export const jsxConverters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...TypographyJSXConverters,
})
