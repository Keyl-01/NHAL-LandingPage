import type {
  CollectionAfterChangeHook,
  CollectionBeforeChangeHook,
  CollectionBeforeOperationHook,
  PayloadRequest,
} from 'payload'
import fs from 'fs/promises'
import path from 'path'

// Payload always pipes these types through sharp (to support animation), which re-encodes
// them lossily at sharp's default quality. JPEG/PNG are already stored byte-for-byte.
const REENCODED_MIME_TYPES = ['image/avif', 'image/webp', 'image/gif']

const CONTEXT_KEY = 'originalUpload'

type OriginalUpload = { data: Buffer; size: number }

// Payload replaces req.file with its re-encoded copy before any change hook runs,
// so the raw bytes have to be captured before the operation starts.
export const captureOriginalUpload: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  const file = req.file
  if (
    (operation === 'create' || operation === 'update') &&
    file?.data?.length &&
    REENCODED_MIME_TYPES.includes(file.mimetype)
  ) {
    req.context[CONTEXT_KEY] = { data: file.data, size: file.size } satisfies OriginalUpload
  }

  return args
}

/** The captured upload, unless the editor cropped/resized it in the admin */
const getOriginalUpload = (req: PayloadRequest) => {
  const original = req.context[CONTEXT_KEY] as OriginalUpload | undefined
  if (!original) return null

  const edits = req.query?.uploadEdits as
    | { crop?: unknown; heightInPixels?: unknown; widthInPixels?: unknown }
    | undefined
  if (edits?.crop || edits?.heightInPixels || edits?.widthInPixels) return null

  return original
}

export const keepOriginalFilesize: CollectionBeforeChangeHook = ({ data, req }) => {
  const original = getOriginalUpload(req)
  if (original) data.filesize = original.size

  return data
}

// Runs after Payload has written its re-encoded copy, so this overwrites it with the raw bytes
export const restoreOriginalUpload: CollectionAfterChangeHook = async ({ collection, doc, req }) => {
  const original = getOriginalUpload(req)
  const staticDir = collection.upload?.staticDir
  if (original && staticDir && doc.filename) {
    await fs.writeFile(path.join(staticDir, doc.filename), original.data)
  }

  return doc
}
