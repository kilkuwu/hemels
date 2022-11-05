import { CKEditor, CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import { Inline } from "../../ckeditor-super-build/ckeditor.js";

export default function CKInline(props: CKPropsWithoutEditor) {
  return <CKEditor editor={Inline} {...props} />;
}
