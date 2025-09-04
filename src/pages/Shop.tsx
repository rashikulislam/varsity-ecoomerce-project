import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Filter,
  Grid,
  List,
  Star,
  Heart,
  ShoppingCart,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";

const Shop = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const { addToCart } = useCart();

  // Mock data for books
  const books = [
    {
      id: 1,
      title: "The Hallmarked Man: A Cormoran Strike Novel",
      author: "Alex Michaelides",
      price: 3000,
      originalPrice: 4000,
      rating: 4.5,
      reviews: 2847,
      image: "./src/assets/51+vV+aSJOL._AC_UY266_FMwebp_.webp",
      category: "Thriller",
      format: "Hardcover",
      inStock: true,
      bestseller: true,
    },
    {
      id: 2,
      title: "Buckeye: A Read with Jenna Pick: A Novel",
      author: "James Clear",
      price: 2500,
      rating: 4.8,
      reviews: 3000,
      image: "./src/assets/41r8wjxCplL._AC_UY266_FMwebp_.webp",
      category: "Self-Help",
      format: "Paperback",
      inStock: true,
      bestseller: true,
    },
    {
      id: 3,
      title: "The First Witch of Boston: A Novel",
      author: "Taylor Jenkins Reid",
      price: 1500,
      rating: 4.7,
      reviews: 2100,
      image: "./src/assets/41+Y8u4+p0L._AC_UY266_FMwebp_.webp",
      category: "Fiction",
      format: "Paperback",
      inStock: false,
    },
    {
      id: 4,
      title: "Framed in Death",
      author: "Tara Westover",
      price: 2200,
      rating: 4.6,
      reviews: 3000,
      image: "./src/assets/51s3qOZi-AL._AC_UY266_FMwebp_.webp",
      category: "Memoir",
      format: "Hardcover",
      inStock: true,
    },
    {
      id: 5,
      title: "The Things We Do for Love: A Novel",
      author: "Morgan Housel",
      price: 2000,
      rating: 4.4,
      reviews: 1872,
      image: "./src/assets/411ht3CS0SL._AC_UY266_FMwebp_.webp",
      category: "Finance",
      format: "Paperback",
      inStock: true,
    },
    {
      id: 6,
      title: "Death Row (Alibis collection)",
      author: "Andy Weir",
      price: 3000,
      rating: 4.9,
      reviews: 6547,
      image: "./src/assets/41IQFfbHU9L._AC_UY266_FMwebp_.webp",
      category: "Sci-Fi",
      format: "Hardcover",
      inStock: true,
      bestseller: true,
    },
  ];

  const categories = [
    "Fiction",
    "Non-Fiction",
    "Self-Help",
    "Thriller",
    "Romance",
    "Sci-Fi",
    "Biography",
    "Finance",
  ];
  const formats = ["Hardcover", "Paperback", "E-book", "Audiobook"];
  const languages = ["English", "Spanish", "French", "German", "Italian"];

  const FilterSidebar = ({ mobile = false }) => (
    <div className="space-y-6">
      {/* Search within results */}
      <div className="space-y-2">
        <Label htmlFor="search">Search Books</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search titles, authors..."
            className="pl-10"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Category</Label>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox id={`category-${category}`} />
              <Label
                htmlFor={`category-${category}`}
                className="text-sm font-normal"
              >
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <Label className="text-base font-semibold">Price Range</Label>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={100}
            step={5}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  const BookCard = ({ book }: { book: (typeof books)[0] }) => {
    const handleAddToCart = () => {
      addToCart({
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        image: book.image,
        format: book.format,
      });
    };

    return (
      <Card className="card-hover">
        <CardHeader className="pb-3">
          <div className="relative">
            <img
              src={book.image}
              alt={book.title}
              className="w-full object-cover rounded-lg bg-muted"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
            {book.bestseller && (
              <Badge className="absolute top-2 left-2">Bestseller</Badge>
            )}
            {!book.inStock && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Badge variant="secondary">Out of Stock</Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-3 space-y-2">
          <div className="space-y-1">
            <h3 className="font-semibold line-clamp-2">{book.title}</h3>
            <p className="text-sm text-muted-foreground">by {book.author}</p>
          </div>
          <div className="flex items-center space-x-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(book.rating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({book.reviews})
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold">{book.price} Tk</span>
            {book.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {book.originalPrice} Tk
              </span>
            )}
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {book.category}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {book.format}
            </Badge>
          </div>
        </CardContent>
        <CardFooter className="pt-0 space-y-2">
          <div className="flex space-x-2 w-full">
            <Button asChild className="flex-1" disabled={!book.inStock}>
              <Link to={`/product/${book.id}`}>View Details</Link>
            </Button>
            <Button
              size="icon"
              disabled={!book.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">Books Collection</h1>
          <p className="text-muted-foreground">
            Discover amazing books from our curated collection
          </p>
        </div>

        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Showing {books.length} results
            </span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Sort */}
            <Select defaultValue="relevance">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Customer Rating</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            {/* View Toggle */}
            <div className="flex items-center border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>

            {/* Mobile Filter */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar mobile />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Desktop Filters */}
          <div className="hidden md:block">
            <div className="sticky top-24">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <FilterSidebar />
            </div>
          </div>

          {/* Books Grid */}
          <div className="lg:col-span-3">
            {viewMode === "grid" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {books.map((book) => (
                  <Card key={book.id} className="card-hover">
                    <div className="flex p-6 space-x-4">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="w-24 h-32 object-cover rounded bg-muted flex-shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <h3 className="text-lg font-semibold">{book.title}</h3>
                        <p className="text-muted-foreground">
                          by {book.author}
                        </p>
                        <div className="flex items-center space-x-1">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < Math.floor(book.rating)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-muted-foreground"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            ({book.reviews})
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline" className="text-xs">
                            {book.category}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {book.format}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex flex-col justify-between items-end">
                        <div className="text-right">
                          <div className="text-lg font-semibold">
                            ${book.price}
                          </div>
                          {book.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              ${book.originalPrice}
                            </div>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button asChild>
                            <Link to={`/product/${book.id}`}>View Details</Link>
                          </Button>
                          <Button
                            size="icon"
                            onClick={() =>
                              addToCart({
                                id: book.id,
                                title: book.title,
                                author: book.author,
                                price: book.price,
                                image: book.image,
                                format: book.format,
                              })
                            }
                          >
                            <ShoppingCart className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
