import React, { ChangeEventHandler } from 'react'
import commentTextareaCSS from './CommentTextarea.module.css'

type Props = {
  isReadonly?: boolean,
  comments: string,
  handleCommentChange: ChangeEventHandler,
  labelText: string
}
const CommentTextarea: React.FunctionComponent<Props> = ({ isReadonly, comments, handleCommentChange, labelText }) => {
  return (
    <div className={commentTextareaCSS.CommentTextarea}>
      <label htmlFor='comment'>{labelText}</label>
      <textarea
        readOnly={isReadonly ? true : false}
        name='comment'
        value={comments}
        onChange={handleCommentChange}
      />
    </div>
  )
}

export default CommentTextarea
