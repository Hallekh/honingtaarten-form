import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";



const validCodes = [
  "VJ7M0UBHN1", "JW5B4C9PD2", "8RX19R3N4B", "EP50YL4APE", "PH1P7L8XPQ",
  // додай сюди свої коди
];

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    delivery: "",
    address: "",
    allergies: "",
    ideas: "",
    description: "",
    code: "",
    serves: ""
  });
  const [result, setResult] = useState(null);

  const checkCode = () => {
    const normalized = formData.code.trim().toUpperCase();
    if (!normalized) return;
    if (validCodes.includes(normalized)) {
      setResult("valid");
    } else {
      setResult("invalid");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkCode();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf7ec] p-6 font-['Comic Neue'],sans-serif">
      <Card className="w-full max-w-3xl shadow-md border-0 bg-white rounded-xl">
        <CardContent className="p-6 space-y-6">
          <h1 className="text-3xl font-bold text-center text-[#333]">Order / Замовлення / Bestell</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="text-lg font-semibold">Your Full Name</Label>
              <Input name="name" value={formData.name} onChange={handleChange} required />
            </div>
            <div>
              <Label className="text-lg font-semibold">Email Address</Label>
              <Input name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div>
              <Label className="text-lg font-semibold">Phone Number (with WhatsApp)</Label>
              <Input name="phone" value={formData.phone} onChange={handleChange} required />
            </div>
            <div>
              <Label className="text-lg font-semibold">Enter the date you need the cake</Label>
              <Input name="date" type="date" value={formData.date} onChange={handleChange} required />
            </div>
            <div>
              <Label className="text-lg font-semibold">Pick-up or Delivery?</Label>
              <select name="delivery" value={formData.delivery} onChange={handleChange} className="w-full border rounded p-2">
                <option value="">Select</option>
                <option value="pickup">Pick-up</option>
                <option value="delivery">Delivery (within 20km of Den Haag)</option>
              </select>
            </div>
            {formData.delivery === "delivery" && (
              <div>
                <Label className="text-lg font-semibold">Delivery address (if applicable)</Label>
                <Textarea name="address" value={formData.address} onChange={handleChange} />
              </div>
            )}
            <div>
              <Label className="text-lg font-semibold">What would you like to order?</Label>
              <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="e.g. Honey cake with berries, Meringue roll..." required />
            </div>
            <div>
              <Label className="text-lg font-semibold">How many people should your order serve?</Label>
              <Input name="serves" value={formData.serves} onChange={handleChange} required />
            </div>
            <div>
              <Label className="text-lg font-semibold">Any other notes, ideas, or special requests?</Label>
              <Textarea name="ideas" value={formData.ideas} onChange={handleChange} />
            </div>
            <div>
              <Label className="text-lg font-semibold">Do you have any allergy or dietary requests?</Label>
              <Textarea name="allergies" value={formData.allergies} onChange={handleChange} />
            </div>
            <div>
              <Label className="text-lg font-semibold">Promo Code (if you have)</Label>
              <Input name="code" value={formData.code} onChange={handleChange} className="uppercase" />
              {result === "valid" && (
                <p className="text-green-600 mt-1 font-medium">✅ Valid promo code!</p>
              )}
              {result === "invalid" && (
                <p className="text-red-600 mt-1 font-medium">❌ Invalid or used code.</p>
              )}
            </div>
            <Button type="submit" className="w-full bg-[#7f4ca5] hover:bg-[#6b3d93] text-white text-lg py-3 rounded-xl">
              Place Order
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
