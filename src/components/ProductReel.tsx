"use client";
import { TQueryValidate } from "@/lib/validators/query-validator-product";
import { Product } from "@/payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import ProductList from "./ProductList";

type ProductReelProps = {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidate;
};

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, href, subtitle, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getAllProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextPage,
      }
    );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let item: (Product | null)[] = [];
  if (products && products.length) {
    item = products;
  } else if (isLoading) {
    item = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-xl font-medium sm:text-2xl">{title}s</h1>
          ) : null}
          {subtitle ? (
            <h1 className="text-xs text-muted-foreground ">{subtitle}</h1>
          ) : null}
        </div>
        {href ? (
          <Link
            href={href}
            className="hidden sm:block text-rose-700 hover:text-rose-500 text-sm font-medium"
          >
            Shop products &rarr;
          </Link>
        ) : null}
      </div>

      <div className="relative animate-in duration-500 fade-in-5">
        <div className="mt-5 flex items-center w-full">
          <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
            {item.map((product, idx) => (
              <ProductList product={product} index={idx} key={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
