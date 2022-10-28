declare module "@ckeditor/ckeditor5-react" {
  import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
  import BalloonBlockEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor.js";
  import Event from "@ckeditor/ckeditor5-utils/src/eventinfo";
  import { EditorConfig } from "@ckeditor/ckeditor5-core/src/editor/editorconfig";
  import * as React from "react";
  type Editor = typeof ClassicEditor | typeof BalloonBlockEditor;
  type EditorClass = ClassicEditor | BalloonBlockEditor;
  interface CKPropsWithoutEditor {
    disabled?: boolean;
    data?: string;
    id?: string;
    config?: EditorConfig;
    onReady?: (editor: EditorClass) => void;
    onChange?: (event: Event, editor: EditorClass) => void;
    onBlur?: (event: Event, editor: EditorClass) => void;
    onFocus?: (event: Event, editor: EditorClass) => void;
    onError?: (event: Event, editor: EditorClass) => void;
  }

  interface CKProps extends CKPropsWithoutEditor {
    editor: Editor;
  }
  const CKEditor: React.FunctionComponent<CKProps>;
  export { CKEditor, CKProps, CKPropsWithoutEditor };
}
