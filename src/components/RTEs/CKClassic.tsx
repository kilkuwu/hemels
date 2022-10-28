import { CKEditor, CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import { Classic } from "../../ckeditor-super-build/ckeditor.js";

const CKClassic = (props: CKPropsWithoutEditor) => {
  return <CKEditor editor={Classic} {...props} />;
};

export default CKClassic;
