import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { UploadPhoto } from "../Services/Photo/PhotoService";
import { ENDPOINT } from "../Services/Service";

export default function RichTextEditor({ handleChange, ...props }) {
  const editorRef = useRef();
  const [editorLoaded, setEditorLoaded] = useState(false);
  const { CKEditor, ClassicEditor } = editorRef.current || {};

  useEffect(() => {
    editorRef.current = {
      // CKEditor: require('@ckeditor/ckeditor5-react'), // depricated in v3
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, // v3+
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic')
    }
    setEditorLoaded(true)
  }, [])


  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file.then((file) => {
            body.append("files", file);
            // let headers = new Headers();
            // headers.append("Origin", "http://localhost:3000");
            UploadPhoto(body).then((res) => res.json())
            .then((res) => {
              resolve({
                default: `${ENDPOINT}/public/uploads/${res.filename}`
              });
            })
            .catch((err) => {
              toast.error('Não foi possível enviar imagem');
            });;
          });
        });
      }
    };
  }
  function uploadPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return uploadAdapter(loader);
    };
  }

  if (!editorLoaded)
    return (<>Carregando editor...</>);

  return (
    <div className="App">
      <CKEditor
        config={{
          extraPlugins: [uploadPlugin]
        }}
        editor={ClassicEditor}
        onReady={(editor) => { }}
        onBlur={(event, editor) => { }}
        onFocus={(event, editor) => { }}
        {...props}
      />
    </div>
  );

}