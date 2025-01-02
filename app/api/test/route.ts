import prisma from "@/lib/PrismaClient";
export const GET = async () => {
  try {
    const data = await prisma.trust.create({
      data: { name: "First Nigerian Trust Limited" },
    });

    console.log(data);
    return Response.json({ data });
  } catch (error) {
    console.log(error);
    return Response.json({ msg: "Server error" });
  }
};
