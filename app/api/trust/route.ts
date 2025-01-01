export const POST = async (req: Request) => {
  // Imports
  const formData = await req.formData();

  // Extract uploaded files
  const td = formData.get("trustDocument") as File;
  const tps = formData.get("trustedPartySignature") as File;

  // Encrypt documents
  const doHash = async (file: File) => {
    // Import module
    const { createHash } = await import("node:crypto");

    // Generate trust document file buffer
    const tdU8Buffer = await file.arrayBuffer();
    const tdBuffer = Buffer.from(tdU8Buffer);

    // Encrypt trust document
    const cryptoInstance = createHash("SHA-256");
    const init = cryptoInstance.update(tdBuffer);
    return init.digest("hex");
  };

  // Prepare request body for database
  const body = {
    trustName: formData.get("trustName"),
    trustDescription: formData.get("trustDescription"),
    trustedFileHash: await doHash(td),
    trustFileLink: formData.get("trustFileLink"),
    trustedPartyName: formData.get("trustedPartyName"),
    trustedPartySignature: tps,
  };

  console.log(body);
  return Response.json({ msg: "Success" }, { status: 200 });
};
