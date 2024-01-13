import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const isAdminOrHasAccessImages = (): Access => {
  // return type Access because it uses for filing accessFields
  return async ({ req }) => {
    const user = req.user as User | undefined;

    //if user not log in
    if (!user) return false;

    //if user login is an admin
    if (user.role === "admin") return true;

    //if user login is but not an admin
    return {
      user: {
        equals: req.user.id,
      },
    };
  };
};

// Create another media
export const Media: CollectionConfig = {
  slug: "media",
  hooks: {
    //before Changeing, always add an user data with req user id
    //it mean, every media has an user related
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user.id };
      },
    ],
  },
  access: {
    read: async ({ req }) => {
      const referer = req.headers.referer;

      if (!req.user || !referer?.includes("sell")) {
        return true;
      }

      return await isAdminOrHasAccessImages()({ req });
    },
    delete: ({ req }) => isAdminOrHasAccessImages()({ req }), //this is the same
    update: isAdminOrHasAccessImages(), // this also the same
  },
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  upload: {
    staticURL: "/media",
    staticDir: "media",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "tablet",
        width: 1024,
        height: undefined,
        position: "centre",
      },
    ],
    mimeTypes: ["image/*"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      required: true,
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
  ],
};
