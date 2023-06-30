'use-client'
import { ChangeEvent, useState } from "react"

export function MediaPicker() {
    const [preview, setpreview] = useState<string | null>(null)

    function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
        const { files } = event.target

        if (!files) {
            return
        }
        const previewURL = URL.createObjectURL(files[0])

        setpreview(previewURL)
    }

    return (
        <>
            <input
                onChange={(onFileSelected)}
                name="coverUrl"
                type="file"
                id="media"
                accept="image/*"
                className="invisible h-0 w-0"
            />
            {preview && (
                <img
                    src={preview}
                    alt=""
                    className="w-full aspect-video roundend-lg object-cover"
                />
            )}
        </>
    )
}