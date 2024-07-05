import Image from "next/image";
import { useEffect, useState } from "react"
import Cropper from 'react-easy-crop'
import { getCroppedImg, getRotatedImage } from './canvasUtils'
import Compressor from "compressorjs";
import { Button } from "@/app/components/common/button";

export function AvaterUploadArea(props: {setAvater: any, cropStep: boolean, setCropStep: any}) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const [preview, setPreview] = useState<string | null>(null);
    const [previewCroped, setPreviewCroped] = useState<string | null>(null);

    const convertBlobToBase64 = async (blobUrl: string) => {
      try {
        const response = await fetch(blobUrl);
        const blob = await response.blob();

        const compressedBlob = await new Promise((resolve, reject) => {
            new Compressor(blob, {
              quality: 0.9, // Adjust the desired image quality (0.0 - 1.0)
              maxWidth: 300, // Adjust the maximum width of the compressed image
              maxHeight: 300, // Adjust the maximum height of the compressed image
              mimeType: "image/jpeg", // Specify the output image format
              success(result) {
                resolve(result);
              },
              error(error) {
                reject(error);
              },
            });
        });
        const base64String: any = await blobToBase64(compressedBlob);
        props.setAvater(base64String);
        console.log(base64String)
      } catch (error) {
        console.error('Error converting blob to base64:', error);
      }
    };
  
    const blobToBase64 = (blob: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve(reader.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
      });
    };
  
    useEffect(() => {
        convertBlobToBase64(previewCroped as unknown as string)
    }, [previewCroped])

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        console.log(croppedAreaPixels)
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const showCroppedImage = async () => {
        try {
          const croppedImage = await getCroppedImg(
            preview,
            croppedAreaPixels,
            rotation
          )
          
          setPreviewCroped(croppedImage)
          props.setCropStep(false)
        } catch (e) {
          console.error(e)
        }
    }
    
    async function uploadHandler(files: FileList | null) {
        if(files && files.length > 0) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setPreviewCroped(reader.result as string)
            };
            reader.readAsDataURL(files[0] as File);              
        } else if(files && files.length > 0 && files[0]?.size as number > 60000000) {
            alert("The avater size must be less than 60 KB.")
        }
    }

    return (
        <div className="flex mb-6 items-center justify-center w-full">
        {preview == null || previewCroped == null ? 
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50/40 hover:bg-gray-100">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload your avater</span></p>
                <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 300x300px)</p>
            </div>
            <input onChange={(e) => {uploadHandler(e.target.files)}} id="dropzone-file" type="file" className="hidden" />
        </label>
        :
        <div>
            {props.cropStep ? 
            <div className="w-[300px] flex flex-col items-center">
                <div className="relative h-[250px] w-[250px]">
                    <Cropper
                    image={preview}
                    crop={crop}
                    rotation={rotation}
                    zoom={zoom}
                    aspect={1/1}
                    onCropChange={setCrop}
                    onRotationChange={setRotation}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                    />
                </div>
                <div className="py-2 text-cBlue">Zoom</div>
                <input onChange={(e) => {setZoom(Number(e.target.value))}} id="labels-range-input" type="range" value={zoom} min="1" max="5" step={0.25} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer outline-none" />
                <div className="py-2 text-cBlue">Rotation</div>
                <input onChange={(e) => {setRotation(Number(e.target.value))}} id="labels-range-input" type="range" value={rotation} min="0" max="270" className="mb-4 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer" />
                <Button name="Complete" handler={showCroppedImage}/>
            </div>
            :
            <div>
                <Image
                    className="glass shadow rounded-2xl h-[250px] w-[250px]"
                    src={previewCroped}
                    width={250}
                    height={250}
                    alt="Picture of the author"
                />
                <div className="py-3 flex justify-around">
                    <div onClick={()=>{
                    props.setCropStep(true)
                    }}
                    className='flex cursor-pointer justify-center items-center'>
                        <div>Crop</div>
                        <Image
                        className="mx-1 rounded h-[20px] w-[20px]"
                        src='./tool-crop.png'
                        width={20}
                        height={20}
                        alt="Picture of the author"
                        />
                    </div>
                    <div onClick={()=>{
                    props.setAvater(null)
                    setPreview(null)
                    }}
                    className='flex cursor-pointer justify-center items-center'>
                        <div>Reset avater</div>
                        <Image
                        className="mx-1 h-[20px] w-[20px]"
                        src='./rotate-right.png'
                        width={15}
                        height={15}
                        alt="Picture of the author"
                        />
                    </div>
                </div>
            </div>
            }
        </div>
        }
    </div>
    )
}