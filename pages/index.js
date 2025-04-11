import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import Head from "next/head";

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
    customOrder: "",
    code: "",
    serves: "",
    consent: false
  });
  const [result, setResult] = useState(null);

  const checkCode = async () => {
    const normalized = formData.code.trim().toUpperCase();
    if (!normalized) return;
    const response = await fetch("https://script.google.com/macros/s/AKfycbxRD3SV1Ui3suG0L2G-bIyw7d-siOL2nhflaOYUuQrDnCs1_eLi0yKq1axjZGXfV1Zy/exec", {
      method: "POST",
      body: JSON.stringify({ code: normalized }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setResult(res.status);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? value || true : false,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://script.google.com/macros/s/AKfycbxRD3SV1Ui3suG0L2G-bIyw7d-siOL2nhflaOYUuQrDnCs1_eLi0yKq1axjZGXfV1Zy/exec", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setResult(res.status);
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet" />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[#fff8f2] p-6 font-['Pacifico']">
        <Card className="w-full max-w-3xl shadow-2xl bg-white rounded-3xl border border-[#f1d3a1]">
          <CardContent className="p-10 space-y-6">
            <h1 className="text-4xl font-bold text-center text-[#5c3d25]">Order/Замовлення/Bestell 🍯 HoningTaarten by Halyna</h1>
            <p className="text-center text-[#4b3a2f] italic text-lg">Hier kun je je bestelling plaatsen</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">Your Name <span className="text-red-500">*</span></Label>
                <Input name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">Email Address</Label>
                <Input name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">Phone Number (with WhatsApp) <span className="text-red-500">*</span></Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} required />
              </div>
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">Enter the date you need the cake</Label>
                <Input name="date" type="date" value={formData.date} onChange={handleChange} required />
              </div>
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">Pick-up or Delivery? <span className="text-red-500">*</span></Label>
                <select name="delivery" value={formData.delivery} onChange={handleChange} required className="w-full border rounded p-2">
                  <option value="">Select</option>
                  <option value="pickup">Pick-up</option>
                  <option value="delivery">Delivery (within 20km of Den Haag)</option>
                </select>
              </div>
              {formData.delivery === "delivery" && (
                <div>
                  <Label className="text-lg font-semibold text-[#4b3a2f]">Delivery address <span className="text-red-500">*</span></Label>
                  <Textarea name="address" value={formData.address} onChange={handleChange} required />
                  <p className="text-sm text-[#6c4f36] italic mt-1">The delivery cost is calculated separately based on your distance.</p>
                </div>
              )}
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">What would you like to order? <span className="text-red-500">*</span></Label>
                <div className="space-y-2 mt-2">
                  {["Honey cake (fillings possible)", "Chockolade honey cake", "Meringue roll with cream-cheese"].map((item) => (
                    <label key={item} className="flex items-center space-x-2 text-[#4b3a2f]">
                      <input
                        type="checkbox"
                        value={item}
                        checked={formData.description === item}
                        onChange={handleChange}
                        required
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                  <p className="text-sm text-[#4b3a2f] italic">or enter your request:</p>
                  <Textarea
                    name="customOrder"
                    value={formData.customOrder}
                    onChange={handleChange}
                    placeholder="Your request…"
                  />
                </div>
              </div>
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">How many people should your order serve?</Label>
                <Input name="serves" value={formData.serves} onChange={handleChange} />
              </div>
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">Any other notes, ideas, or special requests?</Label>
                <Textarea name="ideas" value={formData.ideas} onChange={handleChange} placeholder="Please write here about fillings, preferred delivery time or other wishes." />
              </div>
              <div>
                <Label className="text-lg font-semibold text-[#4b3a2f]">Do you have any allergy or dietary requests? <span className="text-red-500">*</span></Label>
                <Textarea name="allergies" value={formData.allergies} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label className="text-lg font-semibold text-[#4b3a2f]">Promo Code (if you have)</Label>
                <div className="flex items-center gap-2">
                  <Input name="code" value={formData.code} onChange={handleChange} className="uppercase flex-1" />
                  <Button type="button" onClick={checkCode} className="bg-[#8b5c2d] text-white">Check</Button>
                </div>
                {result === "valid" && (
                  <p className="text-green-700 font-semibold">✅ Your code is accepted! Discount will be applied.</p>
                )}
                {result === "invalid" && (
                  <p className="text-red-600 font-medium">❌ Invalid or used promo code.</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" name="consent" onChange={handleChange} />
                <label className="text-sm text-[#4b3a2f]">Ik ga akkoord met het verstrekken van mijn gegevens</label>
              </div>
              <Button
                type="submit"
                disabled={!formData.consent}
                className={`w-full text-white text-lg py-3 rounded-xl ${
                  formData.consent ? "bg-[#d6a65a] hover:bg-[#c08d3e]" : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                Place Order
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}