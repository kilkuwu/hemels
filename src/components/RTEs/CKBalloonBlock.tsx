import { CKEditor, CKPropsWithoutEditor } from "@ckeditor/ckeditor5-react";
import { BalloonBlock } from "../../ckeditor-super-build/ckeditor.js";

const CKBalloonBlock = (props: CKPropsWithoutEditor) => {
  return <CKEditor editor={BalloonBlock} {...props}  />
};

export default CKBalloonBlock;
