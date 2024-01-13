import AddToCart from "@/components/AddToCart";
import ImageSlide from "@/components/ImageSlide";
import ProductReel from "@/components/ProductReel";
import WidthWrapper from "@/components/WidthWrapper";
import { PRODUCT_CATEGORY } from "@/config";
import { getPayloadClient } from "@/get-payload";
import { formatPrice } from "@/lib/utils";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type PageProps = {
  params: {
    productId: string;
  };
};

const BRDCRMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const Page = async ({ params }: PageProps) => {
  const { productId } = params;
  const payload = await getPayloadClient();

  const { docs: products } = await payload.find({
    collection: "products",
    limit: 1,
    where: {
      id: {
        equals: productId,
      },
      approvedForSale: {
        equals: "approved",
      },
    },
  });

  const [product] = products;

  if (!product) return notFound();

  const label = PRODUCT_CATEGORY.find(
    ({ label }) => label === product?.category
  )?.name;

  const valUrl = product.images
    .map(({ image }) => (typeof image === "string" ? image : image.url))
    .filter(Boolean) as string[];

  return (
    <WidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-16 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          {/* Product Details */}
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BRDCRMBS.map((brd, i) => (
                <li key={brd.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={brd.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {brd.name}
                    </Link>
                    {i !== BRDCRMBS.length - 1 ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#adadad"
                        strokeWidth="2"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-4">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                {product.name}
              </h1>
            </div>

            <section className="mt-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>
                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-muted-foreground text-base">
                  {product.description}
                </p>
              </div>

              <div className="mt-6 flex items-center">
                <Check
                  aria-hidden="true"
                  className="h-4 w-4 flex-shrink-0 text-green-500"
                />
                <span className="text-muted-foreground ml-2 text-sm">
                  Instant delivery
                </span>
              </div>
            </section>
          </div>

          {/* Product Images */}

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlide urls={valUrl} />
            </div>
          </div>

          {/* ADD TO CART */}
          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div className="">
              <div className="mt-10">
                <AddToCart product={product} />
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-sm font-medium">
                  <Shield
                    aria-hidden="true"
                    className="h-4 w-4 flex-shrink-0 text-gray-300"
                  />
                  <span className="ml-2 text-sm text-muted-foreground hover:text-gray-700">
                    30 Days Guarantee
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductReel
        href="/products"
        query={{
          category: product.category,
          limit: 4,
        }}
        title={`Similar ${label}`}
        subtitle={`Browse similar high quality ${label} just like '${product.name}'`}
      />
    </WidthWrapper>
  );
};

export default Page;
