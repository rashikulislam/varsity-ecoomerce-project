import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Truck, Shield, Star } from "lucide-react";
import heroImage from "@/assets/hero-books.jpg";
import booksIcon from "@/assets/books-icon.jpg";
import sportsIcon from "@/assets/sports-icon.jpg";
import mensClothingIcon from "@/assets/mens-clothing-icon.jpg";
import skinCareIcon from "@/assets/skincare-icon.jpg";
import gymIcon from "@/assets/gym-icon.jpg";
import atorIcon from "@/assets/ator-icon.jpg";

const Home = () => {
  const projectTypes = [
    {
      id: 1,
      name: "Books Store",
      description: "Discover amazing books across all genres",
      image: booksIcon,
      cta: "Enter Books Store",
      link: "/shop",
      isActive: true,
    },
    {
      id: 2,
      name: "Sports Store",
      description: "Premium sports equipment and gear",
      image: sportsIcon,
      cta: "Visit Project",
      link: "#",
      isActive: false,
    },
    {
      id: 3,
      name: "Men's Clothing",
      description: "Stylish apparel for the modern man",
      image: mensClothingIcon,
      cta: "Visit Project",
      link: "#",
      isActive: false,
    },
    {
      id: 4,
      name: "Ator Brand",
      description: "Premium lifestyle brand experience",
      image: atorIcon,
      cta: "Visit Project",
      link: "#",
      isActive: false,
    },
    {
      id: 5,
      name: "Skin Care & Ornaments",
      description: "Beauty products and elegant accessories",
      image: skinCareIcon,
      cta: "Visit Project",
      link: "#",
      isActive: false,
    },
    {
      id: 6,
      name: "Gym Equipment",
      description: "Professional fitness equipment",
      image: gymIcon,
      cta: "Visit Project",
      link: "#",
      isActive: false,
    },
  ];

  const features = [
    {
      icon: BookOpen,
      title: "Curated Selection",
      description: "Hand-picked books across all genres"
    },
    {
      icon: Truck,
      title: "Fast Shipping",
      description: "Free delivery on orders over $50"
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Safe and secure checkout process"
    }
  ];

  const popularCategories = [
    { name: "Fiction", count: "2,450 books" },
    { name: "Non-fiction", count: "1,890 books" },
    { name: "Self-help", count: "890 books" },
    { name: "Science", count: "1,200 books" },
    { name: "History", count: "750 books" },
    { name: "Romance", count: "1,650 books" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-section bg-gradient-to-br from-background to-muted/20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Welcome to Books Store
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Discover Your Next
                  <span className="text-primary block">Favorite Book</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Explore our carefully curated collection of books across all genres. 
                  From bestsellers to hidden gems, find your perfect read today.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="btn-primary">
                  <Link to="/shop">
                    Shop Books
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  Browse Categories
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="Books collection"
                className="w-full h-auto rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Group Projects Section */}
      <section className="section">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Our Project Portfolio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Explore our diverse range of e-commerce solutions across different industries
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectTypes.map((project) => (
              <Card key={project.id} className="card-hover">
                <CardHeader className="pb-4">
                  <div className="w-full h-48 rounded-lg overflow-hidden mb-4">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    {project.isActive && (
                      <Badge variant="default" className="text-xs">
                        Active
                      </Badge>
                    )}
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button asChild className="w-full" variant={project.isActive ? "default" : "outline"}>
                    <Link to={project.link}>
                      {project.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground">
              Simple steps to get your favorite books
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardHeader>
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Categories Section */}
      <section className="section">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Popular Categories</h2>
            <p className="text-xl text-muted-foreground">
              Browse books by your favorite genres
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularCategories.map((category, index) => (
              <Card key={index} className="card-hover text-center cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                  <CardDescription className="text-sm">{category.count}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/shop">
                View All Categories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;