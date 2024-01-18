import WidthWrapper from "@/components/WidthWrapper";
import { PRODUCT_CATEGORY } from "../../config";
import React from "react";
import ProductReel from "@/components/ProductReel";

type Param = string | string[] | undefined;

type ProductsPageProps = {
  searchParams: {
    [key: string]: Param;
  };
};

const parse = (param: Param) => {
  return typeof param === "string" ? param : undefined;
};

const Page = ({ searchParams }: ProductsPageProps) => {
  const sort = parse(searchParams.sort);
  const category = parse(searchParams.category);

  const label = PRODUCT_CATEGORY.find((item) => item.label === category)?.name;

  return (
    <WidthWrapper>
      <ProductReel
        title={label ?? "Browse product"}
        query={{
          category,
          limit: 40,
          sort: sort === "desc" || sort === "asc" ? sort : undefined,
        }}
      />
    </WidthWrapper>
  );
};

export default Page;
