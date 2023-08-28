import React, { useEffect, useState } from 'react'
import classnames from 'classnames'

/** Moving the SPACER_GIF definition here instead of the constants.ts file,
 * as webpack was exporting that entire file, including use of the File
 * WebAPI; this was causing server-side site generators to break (#1250). */

const SPACER_GIF =
  'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'

export const FilePreview = ({
  imageId,
  file,
}) => {

  const [isLoading, setIsLoading] = useState(true)
  const [previewSrc, setPreviewSrc] = useState(SPACER_GIF)
  const [showGenericPreview, setShowGenericPreview] = useState(false)
  
  useEffect(() => {
    const fileReader = new FileReader();

    fileReader.onloadend = (e) => {
      setIsLoading(false)
      setPreviewSrc(e.target.result)
    }
    
    fileReader.readAsDataURL(file)

    return () => {
      fileReader.onloadend = null
    }
  }, [file])

  const { name } = file

  const onImageError = () => {
    setPreviewSrc(SPACER_GIF)
    setShowGenericPreview(true)
  }

  const isPDF = name.indexOf('.pdf') > 0
  const isWord = name.indexOf('.doc') > 0 || name.indexOf('.pages') > 0
  const isVideo = name.indexOf('.mov') > 0 || name.indexOf('.mp4') > 0
  const isExcel = name.indexOf('.xls') > 0 || name.indexOf('.numbers') > 0
  const isGeneric = !isPDF && !isWord && !isVideo && !isExcel

  const imageClasses = classnames('usa-file-input__preview-image', {
    'is-loading': isLoading,
    'usa-file-input__preview-image--pdf': showGenericPreview && isPDF,
    'usa-file-input__preview-image--word': showGenericPreview && isWord,
    'usa-file-input__preview-image--video': showGenericPreview && isVideo,
    'usa-file-input__preview-image--excel': showGenericPreview && isExcel,
    'usa-file-input__preview-image--generic': showGenericPreview && isGeneric,
  })

  return (
    <div
      data-testid="file-input-preview"
      className="usa-file-input__preview"
      aria-hidden="true">
      <img
        id={imageId}
        data-testid="file-input-preview-image"
        src={previewSrc}
        alt=""
        className={imageClasses}
        onError={onImageError}
      />
      {name}
    </div>
  )
}
