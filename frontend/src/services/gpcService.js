import { getGPCData } from "../utils/importGPC";

export const gpcService = {
  getSegments: async () => {
    const data = getGPCData("segments");
    return { data };
  },

  getFamilies: (segmentId) => {
    const data = getGPCData("families").filter(
      (f) => f.segmentId === Number(segmentId),
    );
    return { data };
  },

  getClasses: (familyId) => {
    const data = getGPCData("classes").filter(
      (c) => c.familyId === Number(familyId),
    );
    return { data };
  },

  getBricks: (classId) => {
    const data = getGPCData("bricks").filter(
      (b) => b.classId === Number(classId),
    );
    return { data };
  },

  getAttributes: (brickId) => {
    const data = getGPCData("attributes").filter(
      (a) => a.brickId === Number(brickId),
    );
    return { data };
  },
};
