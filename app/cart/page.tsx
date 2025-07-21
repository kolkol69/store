"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/lib/cart-context";
import MainLayout from "../components/main-layout";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getTotalItems } =
    useCart();

  if (cart.length === 0) {
    return (
      <MainLayout showCartButton={false}>
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        </div>

        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link href="/">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout showCartButton={false}>
      <div className="mb-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </Button>
        </Link>
        <h2 className="text-2xl font-bold text-gray-900">Shopping Cart</h2>
        <p className="text-gray-600">
          {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} in your
          cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4">
                  <div className="w-20 h-20 relative bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image || "/product-placeholder.png"}
                      alt={item.title}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div className="flex flex-col lg:flex-row items-center lg:space-x-4">
                    <h3 className="font-medium text-gray-900 text-center lg:text-left">
                      {item.title}
                    </h3>
                    <p className="text-lg font-bold text-gray-900 mt-1">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center lg:space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        updateQuantity(item.id, Math.max(0, item.quantity - 1))
                      }
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-lg font-bold">
                      ${getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
