import { Extension } from "@tiptap/react"
import "@tiptap/extension-text-style"

declare module "@tiptap/core" {
    interface Commands<ReturnType> {
        fontSize: {
            setFontSize: (size: string) => ReturnType
            unsetFontSize: () => ReturnType
        }
    }
}

export const FontSizeExtension = Extension.create({
    name: "fontSize",
    addOptions() {
        return {
            types: ["textStyle"]
        }
    },
    addGlobalAttributes() {
        return [
            {
                types: this.options.types,
                attributes: {
                    fontSize: {
                        default: null,
                        parseHTML: (element) => element.style.fontSize,
                        renderHTML: attributes => {
                            if (!attributes) {
                                return {}
                            }

                            return {
                                style: `font-size: ${attributes.fontSize}`
                            }
                        }
                    }
                }
            }
        ]
    },
    addCommands() {
        return {
            setFontSize: (fontSize: string) => ({ chain }) => {
                return chain().setMark("textStyle", { fontSize })
            },
            unsetFontSize: () => ({ chain }) => {
                return chain()
                    .unsetMark("textStyle", { fontSize: null })
                    .removeEmptyStyle()
                    .run()
            }
        }
    }
})