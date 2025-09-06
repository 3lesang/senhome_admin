import type { ProductVariantDataType } from "@/features/product/components/product-form/product-schema";

const variantData: ProductVariantDataType = {
  attributes: {
    qhYn: {
      id: "qhYn",
      name: "kich thuoc",
      options: {
        "5vQU": {
          id: "5vQU",
          name: "34cm",
          status: "new",
        },
        EI94: {
          id: "EI94",
          name: "38cm",
          status: "new",
        },
      },
      status: "new",
    },
    Fr2M: {
      id: "Fr2M",
      name: "chat lieu",
      options: {
        IfJD: {
          id: "IfJD",
          name: "304",
          status: "new",
        },
        "8dPD": {
          id: "8dPD",
          name: "201",
          status: "new",
        },
      },
      status: "new",
    },
  },
  variants: {
    "5vQU|IfJD": {
      "5vQU": {
        option: {
          id: "5vQU",
          name: "34cm",
          status: "new",
        },
        variant: {
          id: "5vQU|IfJD",
          price: 0,
          discount: 0,
          stock: 0,
          sku: "",
          status: "new",
        },
      },
      IfJD: {
        option: {
          id: "IfJD",
          name: "304",
          status: "new",
        },
        variant: {
          id: "5vQU|IfJD",
          price: 0,
          discount: 0,
          stock: 0,
          sku: "",
          status: "new",
        },
      },
    },
    "5vQU|8dPD": {
      "5vQU": {
        option: {
          id: "5vQU",
          name: "34cm",
          status: "new",
        },
        variant: {
          id: "5vQU|8dPD",
          price: 0,
          discount: 0,
          stock: 0,
          sku: "",
          status: "new",
        },
      },
      "8dPD": {
        option: {
          id: "8dPD",
          name: "201",
          status: "new",
        },
        variant: {
          id: "5vQU|8dPD",
          price: 0,
          discount: 0,
          stock: 0,
          sku: "",
          status: "new",
        },
      },
    },
    "EI94|IfJD": {
      EI94: {
        option: {
          id: "EI94",
          name: "38cm",
          status: "new",
        },
        variant: {
          id: "EI94|IfJD",
          price: 0,
          discount: 0,
          stock: 0,
          sku: "",
          status: "new",
        },
      },
      IfJD: {
        option: {
          id: "IfJD",
          name: "304",
          status: "new",
        },
        variant: {
          id: "EI94|IfJD",
          price: 0,
          discount: 0,
          stock: 0,
          sku: "",
          status: "new",
        },
      },
    },
    "8dPD|EI94": {
      EI94: {
        option: {
          id: "EI94",
          name: "38cm",
          status: "new",
        },
        variant: {
          id: "8dPD|EI94",
          price: 0,
          discount: 0,
          stock: 0,
          sku: "",
          status: "new",
        },
      },
      "8dPD": {
        option: {
          id: "8dPD",
          name: "201",
          status: "new",
        },
        variant: {
          id: "8dPD|EI94",
          price: 0,
          discount: 0,
          stock: 0,
          sku: "",
          status: "new",
        },
      },
    },
  },
};

export { variantData };
