import { useRef, useState } from "react";
import { FileInput, Label } from "flowbite-react";

type ImageUploaderProps = {
  onImageSelected: (file: File) => void;
  withDropBox: boolean;
};

export function ImageUploader({ onImageSelected, withDropBox }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
      onImageSelected(file);
    }
  };

  return withDropBox?(
      <div className="flex w-full items-center justify-center">
        <Label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            {previewUrl ? (
                <img
                    src={previewUrl}
                    alt="Preview"
                    className="mb-4 h-32 object-contain"
                />
            ) : (
                <>
                  <svg
                      className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                  >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Натисніть щоб завантажити</span> або drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800×400px)
                  </p>
                </>
            )}
          </div>
          <FileInput
              id="dropzone-file"
              ref={inputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
          />
        </Label>
      </div>
  ):(
      <FileInput
          id="file-select"
          ref={inputRef}
          accept="image/*"
          onChange={handleFileChange}
      />
  );
}
