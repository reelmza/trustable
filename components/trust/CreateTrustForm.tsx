"use client";
import { Label } from "@/components/ui/label";
import axios, { AxiosProgressEvent } from "axios";
import { FormEvent, RefObject, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import ThemeSpacer from "../layout/ThemeSpacer";
import { Loader2, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { Switch } from "../ui/switch";

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
          // @ts-expect-error Dividing implicity undefined vairable
          (progressEvent.loaded * 100) / progressEvent.total
        );

        setFileUploadProgress(+percentCompleted.toFixed(2));
        console.log(+percentCompleted.toFixed(2));
      },
    };

    setLoading("createTrust");
    try {
      const res = axios.post(`/api/trust`, formData, axiosConfig);

      setTimeout(() => {
        setLoading(null);
      }, 3000);
    } catch (error) {
      console.log(error);
      setLoading(null);
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
    <form onSubmit={createTrust} className="lg:w-[55%]">
      {/* File to upload*/}
      <div className="w-full lg:flex gap-2">
        {/* File Label */}
        <Label className="w-1/4" htmlFor="trustDocument">
          Trust Document
        </Label>

        {/* Input */}
        <div className="grow">
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
      </div>
      <ThemeSpacer size="components" />

      {/* Trust Name */}
      <div className="w-full lg:flex gap-2">
        <Label className="w-1/4" htmlFor="trustName">
          Trust Title
        </Label>

        <div className="grow">
          <Input
            type="text"
            name="trustName"
            id="trustName"
            placeholder="e.g James Powell's Will"
          />
        </div>
      </div>
      <ThemeSpacer size="components" />

      {/* Trust Description */}
      <div className="w-full lg:flex gap-2">
        <Label className="w-1/4" htmlFor="trustDescription">
          Trust Description
        </Label>

        <div className="grow">
          <Textarea
            name="trustDescription"
            id="trustDescription"
            placeholder="Enter more details"
            maxLength={120}
          />
        </div>
      </div>
      <ThemeSpacer size="components" />

      {/* Trust File Link */}
      <div className="w-full lg:flex gap-2">
        <Label className="w-1/4" htmlFor="trustFileLink">
          Link to file
        </Label>
        <div className="grow">
          <Input
            type="text"
            name="trustFileLink"
            id="trustFileLink"
            placeholder="https://example.com"
          />
        </div>
      </div>
      <ThemeSpacer size="components" />

      {/* Trusted Party Name */}
      <div className="w-full lg:flex gap-2">
        <Label className="w-1/4" htmlFor="trustedPartyName">
          Trusted Party Name
        </Label>

        <div className="grow">
          <Input
            type="text"
            name="trustedPartyName"
            id="trustedPartyName"
            placeholder="Name of trusable party"
          />
        </div>
      </div>
      <ThemeSpacer size="components" />

      {/* Trusted Party Signature */}
      <div className="w-full lg:flex gap-2">
        <Label className="w-1/4" htmlFor="trustedPartySignature">
          Trusted Party Signature
        </Label>

        <div className="grow">
          <div className="flex gap-2">
            <Input
              type="file"
              name="trustedPartySignature"
              id="trustedPartySignature"
              ref={trustedPartySignature}
              onChange={(e) => {
                setFileSizes((prev) => {
                  const fileLoaded = e.target.files !== null;
                  let fileSize = 0;

                  if (fileLoaded) {
                    fileSize = e.target.files![0]?.size / 1000000;

                    // If file loading interupted return former value
                    if (!fileSize) return [prev[0], 0];

                    // If file size is > 10mb
                    if (fileSize > 10) {
                      toast({
                        description: "File size too large",
                        variant: "destructive",
                        duration: 1000,
                      });

                      e.target.value = "";

                      return [prev[0], 0];
                    }

                    // Return new file size
                    return [
                      prev[0] > 0 ? prev[0] : 0,
                      Number(fileSize.toFixed(2)),
                    ];
                  }

                  return prev;
                });
              }}
            />

            <Button
              type="button"
              variant={"ghost"}
              onClick={() => clearFileField(trustedPartySignature)}
            >
              <X size={20} strokeWidth={1.5} />
            </Button>
          </div>
          <ThemeSpacer size="elements" />

          {/* File size indicator */}
          {fileSizes[1] > 0 ? (
            <div className="text-sm text-gray-600">
              File Size: {fileSizes[1]}MB
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <ThemeSpacer size="components" />

      {/* Checkbox */}
      <div className="w-full lg:flex gap-2">
        <div className="w-1/4"></div>
        <div className="flex items-center space-x-2">
          <Checkbox id="isPublic" />

          <Label
            htmlFor="isPublic"
            className="text-sm font-normal cursor-pointer"
          >
            Make this trust publicly accessible
          </Label>
        </div>
      </div>
      <ThemeSpacer size="components" />

      <div className="w-full lg:flex gap-2">
        <div className="w-1/4"></div>
        <Button type="submit" className="w-full lg:w-2/6">
          {loading === "createTrust" ? (
            <>
              <Loader2 className="animate-spin" />
              <span className="">Uploading</span>
              <span className="font-normal text-xs">{fileUploadProgress}%</span>
            </>
          ) : (
            <> Create Trust</>
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateTrustForm;
