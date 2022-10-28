import { CKEditor, CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import { Balloon } from "../../ckeditor-super-build/ckeditor.js";

const CKBalloonBlock = (props: CKPropsWithoutEditor) => {
  return <CKEditor editor={Balloon} {...props} />;
};

export default CKBalloonBlock;
