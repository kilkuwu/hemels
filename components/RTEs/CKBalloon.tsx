import { CKEditor, CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import { Balloon } from "../../ckeditor-super-build/ckeditor.js";

export default function CKBalloon(props: CKPropsWithoutEditor) {
  return <CKEditor editor={Balloon} {...props} />;
}
