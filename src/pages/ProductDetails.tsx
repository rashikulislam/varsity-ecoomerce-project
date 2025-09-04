import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Heart, ShoppingCart, Star, Truck, RotateCcw, Shield, Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import img1 from "../assets/51+vV+aSJOL._AC_UY266_FMwebp_.webp";
import img2 from "../assets/41r8wjxCplL._AC_UY266_FMwebp_.webp";
import img3 from "../assets/41+Y8u4+p0L._AC_UY266_FMwebp_.webp";

const ProductDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedFormat, setSelectedFormat] = useState("hardcover");
  const { addToCart } = useCart();

  // Mock product data
  const product = {
    id: 1,
      title: "The Hallmarked Man: A Cormoran Strike Novel",
      author: "Alex Michaelides",
      price: 3000,
      originalPrice: 4000,
      rating: 4.5,
      reviews: 2847,
    images: [img1, img2, img3],
    category: "Thriller",
    formats: [
      { type: "hardcover", price: 3000, inStock: true },
      { type: "paperback", price: 1500, inStock: true },
      { type: "ebook", price: 1000, inStock: true },
      { type: "audiobook", price: 2000, inStock: false },
    ],
    description: "Alicia Berenson's life is seemingly perfect. A famous painter married to an in-demand fashion photographer, she lives in a grand house overlooking a park in one of London's most desirable areas. One evening her husband Gabriel returns home late from a fashion shoot, and Alicia shoots him five times in the face, and then never speaks another word.",
    specifications: {
      "ISBN-13": "978-1250301697",
      "ISBN-10": "1250301696",
      "Publisher": "Celadon Books",
      "Publication Date": "February 5, 2019",
      "Language": "English",
      "Pages": "336",
      "Dimensions": "6.14 x 1.26 x 9.21 inches",
      "Weight": "1.1 pounds"
    },
    inStock: true,
    bestseller: true,
  };

  const selectedFormatData = product.formats.find(f => f.type === selectedFormat);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      rating: 5,
      date: "2 weeks ago",
      title: "Absolutely gripping!",
      content: "I couldn't put this book down. The psychological thriller aspects were perfectly executed, and the ending was completely unexpected."
    },
    {
      id: 2,
      name: "Mike Chen",
      rating: 4,
      date: "1 month ago",
      title: "Great read",
      content: "Well-written and engaging. The character development was excellent, though I found some parts a bit slow."
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 5,
      date: "2 months ago",
      title: "Highly recommend",
      content: "This book kept me guessing until the very end. Brilliant storytelling and complex characters."
    }
  ];

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  const handleAddToCart = () => {
    addToCart({
      id: parseInt(id || '1'),
      title: product.title,
      author: product.author,
      price: selectedFormatData?.price || product.price,
      image: product.images[0],
      format: selectedFormat,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="space-y-4">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-96 object-cover rounded-lg bg-muted"
                />
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.title} ${index + 2}`}
                      className="w-full h-24 object-cover rounded bg-muted cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge variant="outline">{product.category}</Badge>
                {product.bestseller && <Badge>Bestseller</Badge>}
              </div>
              
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-xl text-muted-foreground">by {product.author}</p>
              
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium">{product.rating}</span>
                <span className="text-muted-foreground">({product.reviews} reviews)</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold">{selectedFormatData?.price || product.price} Tk</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice} Tk
                  </span>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Format Selection */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Format</h3>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {product.formats.map((format) => (
                    <SelectItem 
                      key={format.type} 
                      value={format.type}
                      disabled={!format.inStock}
                    >
                      <div className="flex justify-between items-center w-full">
                        <span className="capitalize">{format.type}</span>
                        <span className="ml-4">{format.price} Tk</span>
                        {!format.inStock && <span className="ml-2 text-xs">(Out of stock)</span>}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Quantity */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Quantity</h3>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Purchase Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-semibold">{selectedFormatData?.price || product.price} Tk</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{quantity}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total:</span>
                    <span>{((selectedFormatData?.price || product.price) * quantity).toFixed(2)} Tk</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg" 
                    disabled={!selectedFormatData?.inStock}
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Heart className="mr-2 h-5 w-5" />
                    Add to Wishlist
                  </Button>
                  <Button variant="secondary" className="w-full" size="lg" disabled={!selectedFormatData?.inStock}>
                    Buy Now
                  </Button>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center space-x-3 text-sm">
                    <Truck className="h-4 w-4 text-muted-foreground" />
                    <span>Free shipping on orders over 5000 Tk</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <RotateCcw className="h-4 w-4 text-muted-foreground" />
                    <span>30-day return policy</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm">
                    <Shield className="h-4 w-4 text-muted-foreground" />
                    <span>Secure checkout guaranteed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviews})</TabsTrigger>
              <TabsTrigger value="qa">Q&A</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>About This Book</CardTitle>
                </CardHeader>
                <CardContent className="prose max-w-none">
                  <p>{product.description}</p>
                  <p>
                    This gripping psychological thriller takes readers on a journey through the human psyche, 
                    exploring themes of trauma, art, and the complexity of human relationships. The author 
                    masterfully weaves together multiple narratives to create a story that will keep you 
                    guessing until the very last page.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-2 border-b">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${
                              i < Math.floor(product.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xl font-bold">{product.rating} out of 5</span>
                      <span className="text-muted-foreground">({product.reviews} global ratings)</span>
                    </div>
                  </CardHeader>
                </Card>

                <div className="space-y-4">
                  {reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="pt-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{review.name}</span>
                              <span className="text-muted-foreground text-sm">{review.date}</span>
                            </div>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-muted-foreground"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <h4 className="font-semibold">{review.title}</h4>
                          <p className="text-muted-foreground">{review.content}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="qa" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Questions & Answers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No questions have been asked about this product yet.</p>
                    <Button className="mt-4">Ask a Question</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;