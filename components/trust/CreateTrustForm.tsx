"use client";
import axios, { AxiosProgressEvent } from "axios";
import { FormEvent, RefObject, useRef, useState } from "react";

const CreateTrustForm = () => {
  // Component states
  const [loading, setLoading] = useState<string | null>(null);
  const [fileUploadProgress, setFileUploadProgress] = useState<number>(0);

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
  };

  return (
    <form onSubmit={createTrust}>
      {/* File to upload*/}
      <div className="flex mb-4">
        <label className="mr-5">Trust Document</label>
        <input
          type="file"
          name="trustDocument"
          id="trustDocument"
          ref={trustDocument}
        />
        <button type="button" onClick={() => clearFileField(trustDocument)}>
          x
        </button>
      </div>

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
      </div>

      <br />
      <br />

      <button type="submit">Create Trust</button>
    </form>
  );
};

export default CreateTrustForm;
