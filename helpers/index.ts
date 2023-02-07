const getErrorMessage = (err: unknown): string => {
  const errorMessage = err instanceof Error
    ? err.message
    : String(err)

  return errorMessage
}

const stripHtmlTags = (string: string): string =>
  string.replaceAll(/(<([^>]+)>)/gi, '')

export { getErrorMessage, stripHtmlTags }
