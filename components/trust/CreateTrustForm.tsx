"use client";
import { Label } from "@/components/ui/label";
import axios, { AxiosProgressEvent } from "axios";
import { ChangeEvent, FormEvent, RefObject, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ThemeSpacer from "../layout/ThemeSpacer";
import { X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CreateTrustForm = () => {
  const { toast } = useToast();

  // Component states
  const [loading, setLoading] = useState<string | null>(null);
  const [fileUploadProgress, setFileUploadProgress] = useState<number>(0);
  const [fileSizes, setFileSizes] = useState<number[]>([0, 0]);

  // DOM Refferences
  const trustDocument = useRef<HTMLInputElement | null>(null); // Any file
  const trustedPartySignature = useRef<HTMLInputElement | null>(null); // Image

  // Create trust
  const createTrust = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(e.currentTarget);

    // Axios config
    const axiosConfig = {
      onUploadProgress: function (progressEvent: AxiosProgressEvent) {
        const percentCompleted = Math.round(
          // @ts-expect-error Dividing ainplicity undefined vairable
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setFileUploadProgress(+percentCompleted.toFixed(2));
        console.log(+percentCompleted.toFixed(2));
      },
    };

    try {
      const res = axios.post(`/api/trust`, formData, axiosConfig);
    } catch (error) {
      console.log(error);
    }
  };

  // Clear file input field
  const clearFileField = (target: RefObject<HTMLInputElement | null>) => {
    target.current!.value = "";
    const targetName = target.current!.name;

    // Clear trustDocument
    if (targetName === "trustDocument") {
      setFileSizes((prev) => {
        return [0, prev[1]];
      });
    }

    // Clear trustSignature
    if (targetName === "trustedPartySignature") {
      setFileSizes((prev) => {
        return [prev[0], 0];
      });
    }
  };

  return (
    <form onSubmit={createTrust} className="lg:w-[40%]">
      {/* File to upload*/}
      <div>
        {/* File Label */}
        <Label className="mr-5" htmlFor="trustDocument">
          Trust Document
        </Label>
        <ThemeSpacer size="elements" />

        {/* File input and clear button */}
        <div className="flex gap-2">
          <Input
            type="file"
            name="trustDocument"
            id="trustDocument"
            className="cursor-pointer"
            ref={trustDocument}
            onChange={(e) =>
              setFileSizes((prev) => {
                const fileLoaded = e.target.files !== null;
                let fileSize = 0;

                if (fileLoaded) {
                  fileSize = e.target.files![0]?.size / 1000000;

                  // If file loading interupted return former value
                  if (!fileSize) return [0, prev[1]];

                  // If file size is > 10mb
                  if (fileSize > 10) {
                    toast({
                      description: "File size too large",
                      variant: "destructive",
                      duration: 1000,
                    });

                    e.target.value = "";

                    return [0, prev[1]];
                  }

                  // Return new file size
                  return [
                    Number(fileSize.toFixed(2)),
                    prev[1] > 0 ? prev[1] : 0,
                  ];
                }

                return prev;
              })
            }
          />
          <Button
            type="button"
            variant={"ghost"}
            onClick={() => clearFileField(trustDocument)}
          >
            <X size={20} strokeWidth={1.5} />
          </Button>
        </div>
        <ThemeSpacer size="elements" />

        {/* File size indicator */}
        {fileSizes[0] > 0 ? (
          <div className="text-sm text-gray-600">
            File Size: {fileSizes[0]}MB
          </div>
        ) : (
          ""
        )}
      </div>
      <ThemeSpacer size="components" />

      {/* Trust Name */}
      <div className="flex mb-4">
        <label htmlFor="trustName" className="mr-5">
          Trust Title
        </label>
        <input
          type="text"
          name="trustName"
          id="trustName"
          placeholder="e.g James Powell's Will"
        />
      </div>

      {/* Trust Description */}
      <div className="flex mb-4">
        <label htmlFor="trustDescription" className="mr-5">
          Trust Description
        </label>
        <textarea
          name="trustDescription"
          id="trustDescription"
          placeholder="Enter more details"
        />
      </div>

      {/* Trust File Link */}
      <div className="flex mb-4">
        <label htmlFor="trustFileLink" className="mr-5">
          Link to file
        </label>
        <input
          type="text"
          name="trustFileLink"
          id="trustFileLink"
          placeholder="Link to original file"
        />
      </div>

      {/* Trusted Party Name */}
      <div className="flex mb-4">
        <label htmlFor="trustedPartyName" className="mr-5">
          Trusted Party Name
        </label>
        <input
          type="text"
          name="trustedPartyName"
          id="trustedPartyName"
          placeholder="Name of trusable party"
        />
      </div>

      {/* Trusted Party Signature */}
      <div className="flex mb-4">
        <label className="mr-5">Trusted Party Signature</label>
        <input
          type="file"
          name="trustedPartySignature"
          id="trustedPartySignature"
          ref={trustedPartySignature}
        />

        <button
          type="button"
          onClick={() => clearFileField(trustedPartySignature)}
        >
          x
        </button>

        <button type="submit">Create Trust</button>
      </div>
    </form>
  );
};

export default CreateTrustForm;
