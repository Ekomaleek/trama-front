const getErrorMessage = (err: unknown): string => {
  const errorMessage = err instanceof Error
    ? err.message
    : String(err)

  return errorMessage
}

export { getErrorMessage }
