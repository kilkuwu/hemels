import { CKEditor, CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import { Classic } from "../../ckeditor-super-build/ckeditor.js";

export default function CKClassic(props: CKPropsWithoutEditor) {
  return <CKEditor editor={Classic} {...props} />;
}
