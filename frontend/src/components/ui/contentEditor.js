import { useEffect, useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Link as LinkIcon,
  ImagePlus,
  Undo2,
  Redo2,
} from "lucide-react";

const BlogImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      localImageId: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-local-image-id"),
        renderHTML: (attributes) =>
          attributes.localImageId
            ? { "data-local-image-id": attributes.localImageId }
            : {},
      },
    };
  },
});

export default function ContentEditor({
  value = "",
  onChange,
  onImageFilesChange,
  disabled = false,
}) {
  const imageInputRef = useRef(null);
  const imageFilesRef = useRef(new Map());
  const objectUrlsRef = useRef(new Set());

  const editor = useEditor({
    immediatelyRender: false,
    editable: !disabled,
    extensions: [
      StarterKit.configure({
        bulletList: {
          keepMarks: true,
          keepAttributes: false,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: false,
        },
        blockquote: {},
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      BlogImage.configure({
        inline: false,
        allowBase64: false,
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },

    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[300px] px-4 py-3 focus:outline-none text-[#33281F] [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:my-1 [&_blockquote]:border-l-4 [&_blockquote]:border-[#B28B4C] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#6B5841]",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
  }, [editor, value]);

  useEffect(() => {
    editor?.setEditable(!disabled);
  }, [editor, disabled]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current.clear();
      imageFilesRef.current.clear();
      onImageFilesChange?.([]);
    };
  }, []);

  const notifyImageFiles = () => {
    onImageFilesChange?.(
      Array.from(imageFilesRef.current.entries()).map(([id, file]) => ({
        id,
        file,
      })),
    );
  };

  const insertImages = (event) => {
    const files = Array.from(event.target.files || []);
    event.target.value = "";

    if (!editor || !files.length) return;

    const validFiles = files.filter((file) => {
      if (!file.type.startsWith("image/")) return false;

      if (file.size > 5 * 1024 * 1024) return false;

      return true;
    });

    if (!validFiles.length) return;

    const images = validFiles.map((file) => {
      const id = crypto.randomUUID();
      const url = URL.createObjectURL(file);

      imageFilesRef.current.set(id, file);
      objectUrlsRef.current.add(url);

      return {
        src: url,
        alt: file.name,
        localImageId: id,
      };
    });

    editor
      .chain()
      .focus()
      .insertContent(
        images.map((image) => ({
          type: "image",
          attrs: image,
        })),
      )
      .run();

    notifyImageFiles();
  };

  const addLink = () => {
    if (!editor) return;

    const existingLink = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL", existingLink || "https://");

    if (url === null) return;

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    try {
      const parsedUrl = new URL(url);

      if (!["http:", "https:", "mailto:"].includes(parsedUrl.protocol)) {
        return;
      }

      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch {
      return;
    }
  };

  if (!editor) return null;

  const buttonClass = (active = false) =>
    `inline-flex h-9 w-9 items-center justify-center rounded-lg transition ${
      active
        ? "bg-[#EDE1CA] text-[#76572A]"
        : "text-[#6B5841] hover:bg-[#F3E8D0]"
    } disabled:cursor-not-allowed disabled:opacity-40`;

  return (
    <div className="overflow-hidden rounded-xl border border-[#DDD3C1] bg-white">
      <div className="flex flex-wrap gap-1 border-b border-[#E7DDCA] bg-[#FCFBF8] p-2">
        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("bold"))}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
        >
          <Bold size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("italic"))}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
        >
          <Italic size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("underline"))}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
        >
          <UnderlineIcon size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("heading", { level: 2 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Heading 2"
        >
          <Heading2 size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("heading", { level: 3 }))}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label="Heading 3"
        >
          <Heading3 size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("bulletList"))}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet list"
        >
          <List size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("orderedList"))}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Numbered list"
        >
          <ListOrdered size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("blockquote"))}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
        >
          <Quote size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass(editor.isActive("link"))}
          onClick={addLink}
          aria-label="Insert link"
        >
          <LinkIcon size={17} />
        </button>

        <button
          type="button"
          disabled={disabled}
          className={buttonClass()}
          onClick={() => imageInputRef.current?.click()}
          aria-label="Insert image"
        >
          <ImagePlus size={17} />
        </button>

        <input
          ref={imageInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          hidden
          onChange={insertImages}
        />

        <button
          type="button"
          disabled={disabled || !editor.can().undo()}
          className={buttonClass()}
          onClick={() => editor.chain().focus().undo().run()}
          aria-label="Undo"
        >
          <Undo2 size={17} />
        </button>

        <button
          type="button"
          disabled={disabled || !editor.can().redo()}
          className={buttonClass()}
          onClick={() => editor.chain().focus().redo().run()}
          aria-label="Redo"
        >
          <Redo2 size={17} />
        </button>
      </div>

      <EditorContent editor={editor} />

      <div className="border-t border-[#E7DDCA] bg-[#FCFBF8] px-4 py-2 text-xs text-[#88765E]">
        Images are uploaded when you save the blog. Maximum 5 MB per image.
      </div>
    </div>
  );
}
