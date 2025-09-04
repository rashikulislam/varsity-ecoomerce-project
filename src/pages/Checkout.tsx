import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  CreditCard, 
  Truck, 
  Shield, 
  AlertCircle,
  CheckCircle
} from "lucide-react";

const Checkout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Address
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    saveAddress: false,
    
    // Payment
    paymentMethod: "card",
    cardholderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvc: "",
    saveCard: false,
    billingAddress: "same",
    
    // Order
    acceptTerms: false,
  });

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      title: "The Hallmarked Man: A Cormoran Strike Novel",
      author: "Alex Michaelides",
      price: 3000,
      quantity: 1,
      format: "Hardcover",
      image: "./src/assets/51+vV+aSJOL._AC_UY266_FMwebp_.webp",
      inStock: true,
    },
    {
      id: 2,
      title: "Buckeye: A Read with Jenna Pick: A Novel",
      author: "James Clear",
      price: 2500,
      quantity: 2,
      format: "Paperback",
      image: "./src/assets/41r8wjxCplL._AC_UY266_FMwebp_.webp",
      inStock: true,
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    // Handle order submission
    setCurrentStep(4);
  };

  const steps = [
    { number: 1, title: "Shipping", icon: Truck },
    { number: 2, title: "Payment", icon: CreditCard },
    { number: 3, title: "Review", icon: Check },
    { number: 4, title: "Complete", icon: CheckCircle },
  ];

  const StepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.number 
              ? 'bg-primary border-primary text-primary-foreground' 
              : 'border-muted-foreground text-muted-foreground'
          }`}>
            {currentStep > step.number ? (
              <Check className="h-5 w-5" />
            ) : (
              <step.icon className="h-5 w-5" />
            )}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep >= step.number ? 'text-foreground' : 'text-muted-foreground'
          }`}>
            {step.title}
          </span>
          {index < steps.length - 1 && (
            <div className={`w-8 h-px ml-4 ${
              currentStep > step.number ? 'bg-primary' : 'bg-muted-foreground'
            }`} />
          )}
        </div>
      ))}
    </div>
  );

  const OrderSummary = ({ compact = false }) => (
    <Card className={compact ? "" : "sticky top-24"}>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!compact && (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex space-x-3">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-16 h-20 object-cover rounded bg-muted"
                />
                <div className="flex-1 space-y-1">
                  <h4 className="font-medium text-sm">{item.title}</h4>
                  <p className="text-xs text-muted-foreground">by {item.author}</p>
                  <p className="text-xs text-muted-foreground">{item.format}</p>
                  <p className="text-sm">Qty: {item.quantity}</p>
                </div>
                <div className="text-sm font-medium">
                  {(item.price * item.quantity).toFixed(2)} Tk
                </div>
              </div>
            ))}
            <Separator />
          </div>
        )}
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)} Tk</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping.toFixed(2)} Tk</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>{tax.toFixed(2)} Tk</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>{total.toFixed(2)} Tk</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (currentStep === 4) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md text-center">
          <CardHeader className="pb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Order Confirmed!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Thank you for your order. We've received your payment and will process your order shortly.
              </p>
              <div className="p-3 bg-muted rounded-lg">
                <p className="font-medium">Order #ORD-12345</p>
                <p className="text-sm text-muted-foreground">
                  A confirmation email has been sent to {formData.email}
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link to="/account">
                  View Order Details
                </Link>
              </Button>
              <Button asChild variant="outline" className="w-full">
                <Link to="/shop">
                  Continue Shopping
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link to="/cart" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Cart
            </Link>
            <h1 className="text-3xl font-bold">Checkout</h1>
          </div>

          <StepIndicator />

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Step 1: Shipping Address */}
              {currentStep === 1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="apartment">Apartment, suite, etc.</Label>
                      <Input
                        id="apartment"
                        value={formData.apartment}
                        onChange={(e) => handleInputChange("apartment", e.target.value)}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange("zipCode", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="saveAddress"
                        checked={formData.saveAddress}
                        onCheckedChange={(checked) => handleInputChange("saveAddress", checked as boolean)}
                      />
                      <Label htmlFor="saveAddress" className="text-sm">
                        Save this address for future orders
                      </Label>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 2: Payment Method */}
              {currentStep === 2 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={(value) => handleInputChange("paymentMethod", value)}
                    >
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1">
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-5 w-5" />
                            <span>Credit/Debit Card</span>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex-1">
                          Cash on Delivery
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg opacity-50">
                        <RadioGroupItem value="wallet" id="wallet" disabled />
                        <Label htmlFor="wallet" className="flex-1">
                          Mobile Wallet (Coming Soon)
                        </Label>
                      </div>
                    </RadioGroup>

                    {formData.paymentMethod === "card" && (
                      <div className="space-y-4 p-4 border rounded-lg">
                        <div className="space-y-2">
                          <Label htmlFor="cardholderName">Cardholder Name *</Label>
                          <Input
                            id="cardholderName"
                            value={formData.cardholderName}
                            onChange={(e) => handleInputChange("cardholderName", e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Card Number *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiryMonth">Month *</Label>
                            <Input
                              id="expiryMonth"
                              placeholder="MM"
                              value={formData.expiryMonth}
                              onChange={(e) => handleInputChange("expiryMonth", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="expiryYear">Year *</Label>
                            <Input
                              id="expiryYear"
                              placeholder="YY"
                              value={formData.expiryYear}
                              onChange={(e) => handleInputChange("expiryYear", e.target.value)}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvc">CVC *</Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                              value={formData.cvc}
                              onChange={(e) => handleInputChange("cvc", e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="saveCard"
                            checked={formData.saveCard}
                            onCheckedChange={(checked) => handleInputChange("saveCard", checked as boolean)}
                          />
                          <Label htmlFor="saveCard" className="text-sm">
                            Save this card for future purchases
                          </Label>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3">
                      <Label className="text-base font-medium">Billing Address</Label>
                      <RadioGroup
                        value={formData.billingAddress}
                        onValueChange={(value) => handleInputChange("billingAddress", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="same" id="same" />
                          <Label htmlFor="same">Same as shipping address</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="different" id="different" />
                          <Label htmlFor="different">Use different billing address</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Review Your Order</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Shipping Address Review */}
                      <div className="space-y-2">
                        <h3 className="font-semibold">Shipping Address</h3>
                        <div className="p-3 bg-muted rounded-lg text-sm">
                          <p>{formData.firstName} {formData.lastName}</p>
                          <p>{formData.address}</p>
                          {formData.apartment && <p>{formData.apartment}</p>}
                          <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                          <p>{formData.phone}</p>
                        </div>
                      </div>

                      {/* Payment Method Review */}
                      <div className="space-y-2">
                        <h3 className="font-semibold">Payment Method</h3>
                        <div className="p-3 bg-muted rounded-lg text-sm">
                          {formData.paymentMethod === "card" ? (
                            <p>Credit/Debit Card ending in {formData.cardNumber.slice(-4)}</p>
                          ) : (
                            <p>Cash on Delivery</p>
                          )}
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="space-y-2">
                        <h3 className="font-semibold">Order Items</h3>
                        <div className="space-y-3">
                          {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 p-3 border rounded-lg">
                              <img
                                src={item.image}
                                alt={item.title}
                                className="w-16 h-20 object-cover rounded bg-muted"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium">{item.title}</h4>
                                <p className="text-sm text-muted-foreground">by {item.author}</p>
                                <p className="text-sm text-muted-foreground">{item.format}</p>
                                <p className="text-sm">Quantity: {item.quantity}</p>
                              </div>
                              <div className="font-medium">
                                {(item.price * item.quantity).toFixed(2)} Tk
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Terms and Conditions */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="acceptTerms"
                          checked={formData.acceptTerms}
                          onCheckedChange={(checked) => handleInputChange("acceptTerms", checked as boolean)}
                          required
                        />
                        <Label htmlFor="acceptTerms" className="text-sm">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms and Conditions
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                
                {currentStep < 3 ? (
                  <Button onClick={handleNext}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button 
                    onClick={handleSubmit}
                    disabled={!formData.acceptTerms}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Place Order
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;