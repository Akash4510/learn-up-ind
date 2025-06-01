"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  // Create a read-only editor instance
  const editor = useEditor({
    extensions: [StarterKit], // Add necessary extensions
    content: value, // Set the initial content
    editable: false, // Make the editor read-only
  });

  // Update the content when the `value` prop changes
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  return (
    <div className="bg-background/60 rounded-md">
      <EditorContent editor={editor} />
    </div>
  );
};
