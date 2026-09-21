import { describe, expect, it } from 'vitest'

import { getSafeRedirectPath } from '@/utilities/getSafeRedirectPath'

describe('getSafeRedirectPath', () => {
  it.each([
    ['/', '/'],
    ['/abc?x=1#h', '/abc?x=1#h'],
    // Encoded CR/LF stays encoded, so it can't inject headers
    ['/%0d%0a', '/%0d%0a'],
  ])('allows same-origin path %s', (input, expected) => {
    expect(getSafeRedirectPath(input)).toBe(expected)
  })

  it.each([
    '//evil.com',
    '/\\evil.com',
    '/\\/evil.com',
    'https://evil.com',
    'evil',
    '/\r\nLocation: https://evil.com',
    '/\tevil',
    '',
    null,
    undefined,
  ])('rejects %j', (input) => {
    expect(getSafeRedirectPath(input)).toBeNull()
  })
})
