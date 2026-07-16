import type { IPerson, IPersonResponse } from "./types.js";
import { OBJECT_BI_VALIDATOR } from "@src/shared/schemas/commons.js";

export const getMixeiroVerifiedInformation = (bi: string) => {
  return new Promise<IPerson>((resolve, reject) => {
    OBJECT_BI_VALIDATOR.parseAsync(bi)
      .then((validatedBI) => {
        fetch(`https://digital.ao/ao/actions/bi.ajcall.php?bi=${validatedBI}`)
          .then(async (response) => {
            if (!response.ok) {
              reject(
                new Error(`Failed to validate BI`, {
                  cause: response.status,
                }),
              );
            }

            const data: IPersonResponse = await response.json();

            if (!data.sucess) {
              reject(new Error(`BI validation failed: ${data.message}`));
            }

            resolve(data.data);
          })
          .catch((error) => reject(error));
      })
      .catch((error) => reject(error));
  });
};
