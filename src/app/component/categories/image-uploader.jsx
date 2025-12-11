"use client";

import { useState } from "react";

import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

// Register plugins
registerPlugin(FilePondPluginImagePreview, FilePondPluginImageExifOrientation);

export default function ImageUploader() {
    const [files, setFiles] = useState([]);

    return (
        <div className="space-y-3 setFilePondCOntainer ">
            <label htmlFor=" " className='text-white font-medium block text-[14px] mb-3'>
                Image Upload
            </label>

            <FilePond
                files={files}
                onupdatefiles={setFiles}
                allowMultiple={false}
                allowImagePreview={true}
                acceptedFileTypes={["image/*"]}
                labelIdle='Drag & Drop your image or <span class="filepond--label-action">Browse</span>'
                className="border rounded-md "
            />

            {/* Image preview if needed manually */}

        </div>
    );
}
