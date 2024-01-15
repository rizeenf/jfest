import {
  AfterChangeHook,
  BeforeChangeHook,
} from "payload/dist/collections/config/types";
import { Access, CollectionConfig } from "payload/types";
import { PRODUCT_CATEGORY } from "../../config";
import { stripe } from "../../lib/stripe";
import { Product, User } from "../../payload-types";

const addUser: BeforeChangeHook<Product> = ({ data, req }) => {
  const { user } = req;

  return { ...data, user: user.id };
};

const syncUser: AfterChangeHook<Product> = async ({ req, doc }) => {
  const fulluser = await req.payload.findByID({
    collection: "users",
    id: req.user.id,
  });

  if (fulluser && typeof fulluser === "object") {
    const { products } = fulluser;

    const allId = [
      ...(products?.map((product) =>
        typeof product === "object" ? product.id : product
      ) || []),
    ];

    const createdProductID = allId.filter(
      (id, index) => allId.indexOf(id) === index
    );

    const dataToUpdate = [...createdProductID, doc.id];

    await req.payload.update({
      collection: "users",
      id: fulluser.id,
      data: {
        products: dataToUpdate,
      },
    });
  }
};

const isAdminOrOwner =
  (): Access =>
  ({ req: { user: _user } }) => {
    const user = _user as User | undefined;

    if (!user) return false;
    if (user.role === "admin") return true;

    const userProductIds = (user.products || []).reduce<Array<string>>(
      (acc, curr) => {
        if (!curr) return acc;

        if (typeof curr === "string") {
          acc.push(curr);
        } else {
          acc.push(curr.id);
        }
        return acc;
      },
      []
    );

    return {
      id: {
        in: userProductIds,
      },
    };
  };

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {
    read: isAdminOrOwner(),
    update: isAdminOrOwner(),
    delete: isAdminOrOwner(),
  },
  hooks: {
    afterChange: [syncUser],
    beforeChange: [
      addUser,
      async (args) => {
        if (args.operation === "create") {
          const data = args.data as Product;

          const createdProd = await stripe.products.create({
            name: data.name,
            default_price_data: {
              currency: "IDR",
              unit_amount: Math.round(data.price * 100),
            },
          });

          const updated: Product = {
            ...data,
            stripeId: createdProd.id,
            priceId: createdProd.default_price as string,
          };

          return updated;
        } else if (args.operation === "update") {
          const data = args.data as Product;

          const updatedProd = await stripe.products.update(data.stripeId!, {
            name: data.name,
            default_price: data.priceId!,
          });

          const updated: Product = {
            ...data,
            stripeId: updatedProd.id,
            priceId: updatedProd.default_price as string,
          };

          return updated;
        }
      },
    ],
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
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Products description",
      type: "textarea",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      min: 0,
      type: "number",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: PRODUCT_CATEGORY.map(({ label, name }) => ({
        label: name,
        value: label,
      })),
      required: true,
    },
    {
      name: "product_files",
      label: "Product file(s)",
      type: "relationship",
      required: true,
      relationTo: "product_files",
      hasMany: false,
    },
    {
      name: "approvedForSale",
      label: "Product status",
      type: "select",
      defaultValue: "pending",
      access: {
        create: ({ req }) => req.user.role === "admin",
        read: ({ req }) => req.user.role === "admin",
        update: ({ req }) => req.user.role === "admin",
      },
      options: [
        {
          label: "Pending verification",
          value: "pending",
        },
        {
          label: "Approved",
          value: "approved",
        },
        {
          label: "Denied",
          value: "denied",
        },
      ],
    },
    {
      name: "priceId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "stripeId",
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: "text",
      admin: {
        hidden: true,
      },
    },
    {
      name: "images",
      labels: {
        singular: "Image",
        plural: "Images",
      },
      type: "array",
      label: "Product images",
      minRows: 1,
      maxRows: 4,
      required: true,
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
  ],
};
