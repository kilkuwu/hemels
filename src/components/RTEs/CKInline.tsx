import { CKEditor, CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import { Inline } from "../../ckeditor-super-build/ckeditor.js";

const CKBalloonBlock = (props: CKPropsWithoutEditor) => {
  return <CKEditor editor={Inline} {...props} />;
};

export default CKBalloonBlock;
