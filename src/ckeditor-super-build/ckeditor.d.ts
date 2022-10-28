/**
 * @license Copyright (c) 2014-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import ClassicEditor from "@ckeditor/ckeditor5-editor-classic/src/classiceditor.js";
import BalloonEditor from "@ckeditor/ckeditor5-editor-balloon/src/ballooneditor.js";
import InlineEditor from "@ckeditor/ckeditor5-editor-inline/src/inlineeditor.js";

export class Balloon extends BalloonEditor {}
export class Classic extends ClassicEditor {}
export class Inline extends InlineEditor {}
