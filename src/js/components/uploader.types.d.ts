declare module 'filepond/locale/ru-ru' {
  const labels: Labels

  export default labels
}

type Labels = {
  labelIdle: string
  labelInvalidField: string
  labelFileWaitingForSize: string
  labelFileSizeNotAvailable: string
  labelFileLoading: string
  labelFileLoadError: string
  labelFileProcessing: string
  labelFileProcessingComplete: string
  labelFileProcessingAborted: string
  labelFileProcessingError: string
  labelFileProcessingRevertError: string
  labelFileRemoveError: string
  labelTapToCancel: string
  labelTapToRetry: string
  labelTapToUndo: string
  labelButtonRemoveItem: string
  labelButtonAbortItemLoad: string
  labelButtonRetryItemLoad: string
  labelButtonAbortItemProcessing: string
  labelButtonUndoItemProcessing: string
  labelButtonRetryItemProcessing: string
  labelButtonProcessItem: string
  labelMaxFileSizeExceeded: string
  labelMaxFileSize: string
  labelMaxTotalFileSizeExceeded: string
  labelMaxTotalFileSize: string
  labelFileTypeNotAllowed: string
  fileValidateTypeLabelExpectedTypes: string
  imageValidateSizeLabelFormatError: string
  imageValidateSizeLabelImageSizeTooSmall: string
  imageValidateSizeLabelImageSizeTooBig: string
  imageValidateSizeLabelExpectedMinSize: string
  imageValidateSizeLabelExpectedMaxSize: string
  imageValidateSizeLabelImageResolutionTooLow: string
  imageValidateSizeLabelImageResolutionTooHigh: string
  imageValidateSizeLabelExpectedMinResolution: string
  imageValidateSizeLabelExpectedMaxResolution: string
}
