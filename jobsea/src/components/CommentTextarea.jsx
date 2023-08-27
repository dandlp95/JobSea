import commentTextareaCSS from './CommentTextarea.module.css'

const CommentTextarea = props => {
  return (
    <div className={commentTextareaCSS.CommentTextarea}>
      <label for='comment'>{props.labelText}</label>
      <textarea
        type='text'
        name='comment'
        value={props.comments}
        onChange={props.handleCommentChange}
      />
    </div>
  )
}

export default CommentTextarea
