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
    description: [],
    customOrder: "",
    code: "",
    serves: "",
    consent: false
  });
  const [result, setResult] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [codeChecked, setCodeChecked] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox" && name === "description") {
      setFormData((prev) => {
        const isChecked = prev.description.includes(value);
        return {
          ...prev,
          description: isChecked
            ? prev.description.filter((item) => item !== value)
            : [...prev.description, value],
        };
      });
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        [name]: checked ? value || true : false,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const checkPromoCode = async () => {
    if (!formData.code.trim()) return;
    setLoading(true);
    const response = await fetch("https://script.google.com/macros/s/AKfycbxRD3SV1Ui3suG0L2G-bIyw7d-siOL2nhflaOYUuQrDnCs1_eLi0yKq1axjZGXfV1Zy/exec", {
      method: "POST",
      body: JSON.stringify({ code: formData.code }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setResult(res.status);
    setLoading(false);
    setCodeChecked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://script.google.com/macros/s/AKfycbxRD3SV1Ui3suG0L2G-bIyw7d-siOL2nhflaOYUuQrDnCs1_eLi0yKq1axjZGXfV1Zy/exec", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    setLoading(false);
    setResult(res.status);
    if (res.status === "valid" || res.status === "") {
      setSubmitted(true);
    }
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
            {submitted ? (
              <p className="text-white bg-green-500 rounded-xl py-4 px-6 text-center text-xl font-semibold shadow-md">🎉 Thank you! Your order has been submitted.</p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* форма без змін */}

                <div className="space-y-2">
                  <Label className="text-lg font-semibold text-[#4b3a2f]">Promo Code (if you have)</Label>
                  <div className="flex items-center gap-2">
                    <Input name="code" value={formData.code} onChange={handleChange} className="uppercase flex-1" />
                    <Button type="button" onClick={checkPromoCode} disabled={loading} className="bg-[#8b5c2d] text-white">
                      {loading ? "Checking..." : "Check"}
                    </Button>
                  </div>
                  {codeChecked && result === "valid" && (
                    <p className="text-green-700 font-semibold">✅ Your code is accepted! Discount will be applied.</p>
                  )}
                  {codeChecked && result === "invalid" && (
                    <p className="text-red-600 font-medium">❌ Invalid or used promo code.</p>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <input type="checkbox" name="consent" onChange={handleChange} />
                  <label className="text-sm text-[#4b3a2f]">Ik ga akkoord met het verstrekken van mijn gegevens</label>
                </div>

                <Button
                  type="submit"
                  disabled={!formData.consent || loading}
                  className={`w-full text-white text-lg py-3 rounded-xl ${
                    formData.consent ? "bg-[#d6a65a] hover:bg-[#c08d3e]" : "bg-gray-300 cursor-not-allowed"
                  }`}
                >
                  {loading ? "Submitting..." : "Place Order"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
