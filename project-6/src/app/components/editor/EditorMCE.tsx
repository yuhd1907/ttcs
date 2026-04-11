import { Editor } from "@tinymce/tinymce-react";

const EDITOR_INIT_CONFIG = {
  height: 500,
  menubar: true,
  plugins: [
    "anchor",
    "autolink",
    "charmap",
    "codesample",
    "emoticons",
    "link",
    "lists",
    "media",
    "searchreplace",
    "table",
    "visualblocks",
    "wordcount",
    "image",
    "code",
    "help",
  ],
  toolbar:
    "undo redo | blocks fontfamily fontsize | " +
    "bold italic underline strikethrough | link image media table | " +
    "align lineheight | numlist bullist indent outdent | " +
    "emoticons charmap | removeformat | code help",
  images_upload_url: `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
  content_style:
    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
};

const EditorMCE = (props: {
  value?: string;
  id?: string;
  onEditorChange?: (content: string) => void;
}) => {
  const { value = "", id = "", onEditorChange } = props;

  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API}
      value={value}
      onEditorChange={(content) => {
        if (onEditorChange) {
          onEditorChange(content);
        }
      }}
      init={EDITOR_INIT_CONFIG}
      id={id}
    />
  );
};

export default EditorMCE;
