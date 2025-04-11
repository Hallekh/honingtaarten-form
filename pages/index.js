import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";

const validCodes = [
  "U94TVBY5OI", "O266MJQZJ3", "3650U2RO16", "X4BKY6ZLUJ", "8Q7RD7VDT6",
  "OFMLJBMVTG", "1TRC4KE6N4", "W6MSRQ1ZKE", "PLO02GGMS6", "R086Y1ZL2D",
  "A9D561IF36", "X1FQ9GF7G3", "45K9HPMC9D", "1D6D7WWHZ4", "QRINF7XXLV",
  "AS4MHHBNZ7", "SH462ZBFTE", "NM1EQI4DAV", "CYN3B7IACZ", "OOZLIHF72F",
  "83T6NY6TWI", "8AZG7CZDWC", "42DIE79SEO", "SRNQYVEIXE", "PFT0NO7ME0",
  "Y8ACW38GDA", "PPN37YKDO6", "DV31UMWZNI", "AK6RXFTJRU", "ZA3QEEGXE2",
  "A5KVE67NU2", "OPTW5HJLCY", "9SG8XHLTXV", "EU0ZS5327H", "0SFA5A6O8N",
  "SDJCGQW8N5", "COB9YMK5O7", "2Q8VS8L19R", "7Q10XUK21Q", "452YMBN5DJ",
  "XCPVA1DMFN", "AKTWUTH4FJ", "ADR4AZPU77", "VVTHI2JQOE", "X3256T10FN",
  "VCN6XGY62U", "CIR3TPV7OI", "RJ74BCVECJ", "PIHZGCU9U4", "O1ETTNZ0GV",
  "ZSGVLTD7CU", "8EY6UNIKJH", "3JYBSAW83R", "3SGD4MALW4", "ZX4UTR6UUL",
  "XS3WSKRNQU", "3E1EFIWGXL", "2BAT26S052", "1BGI91FM0F", "UZ2NA6PI37",
  "D0ROE0P71R", "2S7W47PPC4", "ECZN6KMLE5", "ACE4FE2ZTC", "EQBHXS1AP6",
  "Z54AN7YLSN", "CKOC3I77AW", "K0GV09PT8Z", "M07D2F8YWF", "TKI6M24ZDA",
  "XYYMCS48PS", "QW1O9L58IN", "KHBK4W7B1Q", "RN2OEMRF25", "TLQ91VVF92",
  "T31L6MRYBD", "LIZLMV12HS", "RITWQRZNF9", "FND6AO2RPF", "3D2S0VCLSK",
  "UDRVS27TH5", "F9Y8CMYLB6", "ABAZDJTLHT", "U0ZY6CZJYW", "E209UO9B8V",
  "HMTEMUU0QV", "XY09O3ILCQ", "H219KG23I1", "BVRV7KEE7J", "BOGAPJ95MR",
  "CAEWXFSZ2Y", "LAJN0QD31E", "ZBSU3N5U2F", "ESU8L8V43N", "C4ZL5RFETZ",
  "Q7NZMV8RTY", "24W14LDZAF", "ZS79ZUQ3EE", "LVO06TLKPX", "B6X8VKNDRV"
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
