import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Heart, BookOpen, Zap, Briefcase, Trophy } from "lucide-react";

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: "Fiction",
      description: "Novels, short stories, and literary fiction",
      icon: Book,
      count: 1247,
      color: "bg-blue-100 text-blue-700",
      books: ["The Silent Patient", "Seven Husbands of Evelyn Hugo"]
    },
    {
      id: 2,
      name: "Non-Fiction",
      description: "Biography, history, science, and educational books",
      icon: BookOpen,
      count: 856,
      color: "bg-green-100 text-green-700",
      books: ["Educated", "Atomic Habits"]
    },
    {
      id: 3,
      name: "Self-Help",
      description: "Personal development and motivational books",
      icon: Zap,
      count: 534,
      color: "bg-yellow-100 text-yellow-700",
      books: ["Psychology of Money", "Atomic Habits"]
    },
    {
      id: 4,
      name: "Business",
      description: "Entrepreneurship, finance, and business strategy",
      icon: Briefcase,
      count: 423,
      color: "bg-purple-100 text-purple-700",
      books: ["The Lean Startup", "Good to Great"]
    },
    {
      id: 5,
      name: "Romance",
      description: "Love stories and romantic fiction",
      icon: Heart,
      count: 672,
      color: "bg-pink-100 text-pink-700",
      books: ["Beach Read", "People We Meet on Vacation"]
    },
    {
      id: 6,
      name: "Thriller",
      description: "Mystery, suspense, and crime novels",
      icon: Trophy,
      count: 389,
      color: "bg-red-100 text-red-700",
      books: ["Gone Girl", "The Girl with the Dragon Tattoo"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="space-y-4 mb-8">
          <h1 className="text-3xl font-bold">Book Categories</h1>
          <p className="text-muted-foreground">
            Explore our collection by category and find your next favorite read
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon;
            return (
              <Link key={category.id} to={`/shop?category=${category.name.toLowerCase()}`}>
                <Card className="card-hover h-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className={`p-3 rounded-lg ${category.color}`}>
                        <IconComponent className="h-6 w-6" />
                      </div>
                      <Badge variant="secondary">
                        {category.count} books
                      </Badge>
                    </div>
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground text-sm">
                      {category.description}
                    </p>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Popular titles:</h4>
                      <div className="space-y-1">
                        {category.books.map((book, index) => (
                          <p key={index} className="text-xs text-muted-foreground">
                            • {book}
                          </p>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6">
            Browse our complete collection or use the search to find specific titles
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Browse All Books
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;