"use client";

import { use as usePromise, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import MainLayout from "../../components/main-layout";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  const { slug } = usePromise(params);
  const categoryName = decodeURIComponent(slug);

  useEffect(() => {
    fetchCategoryProducts();
  }, [categoryName]);

  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/category/${encodeURIComponent(
          categoryName
        )}`
      );
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="text-center">Loading products...</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Categories
          </Button>
        </Link>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 capitalize">
          {categoryName}
        </h2>
        <p className="text-gray-600">
          {products.length} {products.length === 1 ? "product" : "products"}{" "}
          found
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square relative mb-4 bg-white rounded-lg overflow-hidden">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.title}
                  fill
                  className="object-contain p-4"
                />
              </div>
              <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">
                {product.title}
              </h3>
              <p className="text-lg font-bold text-gray-900 mb-4">
                ${product.price.toFixed(2)}
              </p>
              <Button
                onClick={() => handleAddToCart(product)}
                className="w-full"
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found in this category.</p>
        </div>
      )}
    </MainLayout>
  );
}
