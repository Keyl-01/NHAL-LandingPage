import type { GlobalBeforeChangeHook } from 'payload'

export const populatePublishedAt: GlobalBeforeChangeHook = ({ data }) => {
  if (!data.publishedAt) {
    data.publishedAt = new Date()
  }

  return data
}
