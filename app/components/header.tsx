"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart-context";

interface HeaderProps {
  showCartButton?: boolean;
}

export default function Header({ showCartButton = true }: HeaderProps) {
  const { getTotalItems } = useCart();

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/">
            <h1 className="text-xl font-semibold text-gray-900 cursor-pointer">
              Store
            </h1>
          </Link>
          {showCartButton && (
            <Link href="/cart">
              <Button
                variant="outline"
                size="sm"
                className="relative bg-transparent"
              >
                <ShoppingCart className="h-4 w-4" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
