import { useState, useRef } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import {
  Upload,
  FileImage,
  Fuel,
  Wrench,
  UtensilsCrossed,
  MapPin,
  FileText,
  Save,
  X,
  CheckCircle,
  ArrowLeft,
} from "lucide-react";
import { Link } from "wouter";

type ExpenseType = "fuel" | "maintenance" | "food" | "mileage" | "";

interface ExtractedData {
  date: string;
  amount: string;
  description: string;
  vendor: string;
  gallons?: string;
  pricePerGallon?: string;
  miles?: string;
}

export default function DocumentExtractor() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [expenseType, setExpenseType] = useState<ExpenseType>("");
  const [extractedData, setExtractedData] = useState<ExtractedData>({
    date: "",
    amount: "",
    description: "",
    vendor: "",
    gallons: "",
    pricePerGallon: "",
    miles: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload an image or PDF file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setSaved(false);
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl("");
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please upload an image or PDF file",
          variant: "destructive",
        });
        return;
      }
      setSelectedFile(file);
      setSaved(false);
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      } else {
        setPreviewUrl("");
      }
    }
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setExtractedData({
      date: "",
      amount: "",
      description: "",
      vendor: "",
      gallons: "",
      pricePerGallon: "",
      miles: "",
    });
    setSaved(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSave = async () => {
    if (!expenseType) {
      toast({
        title: "Select expense type",
        description: "Please select what type of expense this is",
        variant: "destructive",
      });
      return;
    }

    if (!extractedData.date || !extractedData.amount) {
      toast({
        title: "Missing required fields",
        description: "Please fill in at least the date and amount",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      let endpoint = "";
      let payload: Record<string, unknown> = {};

      switch (expenseType) {
        case "fuel":
          endpoint = "/api/fuel-expenses";
          payload = {
            truckerClientId: "demo-client",
            expenseDate: extractedData.date,
            gallons: extractedData.gallons || "0",
            costPerGallon: extractedData.pricePerGallon || "0",
            totalCost: extractedData.amount || "0",
            location: extractedData.vendor || null,
          };
          break;
        case "maintenance":
          endpoint = "/api/maintenance-expenses";
          payload = {
            truckerClientId: "demo-client",
            expenseDate: extractedData.date,
            description: extractedData.vendor 
              ? `${extractedData.vendor}: ${extractedData.description}` 
              : extractedData.description || "Maintenance",
            cost: extractedData.amount || "0",
          };
          break;
        case "food":
          endpoint = "/api/food-expenses";
          payload = {
            truckerClientId: "demo-client",
            expenseDate: extractedData.date,
            description: extractedData.vendor 
              ? `${extractedData.vendor}: ${extractedData.description}` 
              : extractedData.description || "Food expense",
            cost: extractedData.amount || "0",
            location: extractedData.vendor || null,
          };
          break;
        case "mileage":
          endpoint = "/api/mileage-logs";
          payload = {
            truckerClientId: "demo-client",
            logDate: extractedData.date,
            milesDriven: extractedData.miles || extractedData.amount || "0",
            notes: extractedData.description || null,
          };
          break;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to save expense");
      }

      setSaved(true);
      toast({
        title: "Expense saved!",
        description: `Your ${expenseType} expense has been recorded`,
      });
    } catch (error) {
      console.error("Save error:", error);
      toast({
        title: "Save failed",
        description: "Could not save the expense. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const expenseTypeOptions = [
    { value: "fuel", label: "Fuel Expense", icon: Fuel, color: "text-yellow-400" },
    { value: "maintenance", label: "Maintenance", icon: Wrench, color: "text-orange-400" },
    { value: "food", label: "Food/Meals", icon: UtensilsCrossed, color: "text-green-400" },
    { value: "mileage", label: "Mileage Log", icon: MapPin, color: "text-blue-400" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="icon" data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-heading font-bold text-white">
              Document Extractor
            </h1>
            <p className="text-muted-foreground">
              Upload receipts or documents to quickly log expenses
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                Upload Document
              </CardTitle>
              <CardDescription>
                Upload a receipt, invoice, or document image
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!selectedFile ? (
                <div
                  className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                  data-testid="dropzone-upload"
                >
                  <FileImage className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Drag and drop or click to upload
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports images (JPG, PNG) and PDF files
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleFileSelect}
                    className="hidden"
                    data-testid="input-file"
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative">
                    {previewUrl ? (
                      <img
                        src={previewUrl}
                        alt="Document preview"
                        className="w-full h-auto max-h-[300px] object-contain rounded-lg bg-black/20"
                        data-testid="img-preview"
                      />
                    ) : (
                      <div className="w-full h-[200px] flex items-center justify-center bg-secondary/50 rounded-lg">
                        <FileText className="h-16 w-16 text-muted-foreground" />
                        <span className="ml-2 text-muted-foreground">PDF Document</span>
                      </div>
                    )}
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={clearFile}
                      data-testid="button-clear"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {selectedFile.name}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Expense Details
              </CardTitle>
              <CardDescription>
                Enter the information from your document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Expense Type</Label>
                <Select value={expenseType} onValueChange={(v) => setExpenseType(v as ExpenseType)}>
                  <SelectTrigger data-testid="select-expense-type">
                    <SelectValue placeholder="Select expense type" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseTypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center gap-2">
                          <option.icon className={`h-4 w-4 ${option.color}`} />
                          {option.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={extractedData.date}
                    onChange={(e) => setExtractedData(prev => ({ ...prev, date: e.target.value }))}
                    data-testid="input-date"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">
                    {expenseType === "mileage" ? "Miles" : "Amount ($)"}
                  </Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    placeholder={expenseType === "mileage" ? "0" : "0.00"}
                    value={expenseType === "mileage" ? extractedData.miles : extractedData.amount}
                    onChange={(e) => setExtractedData(prev => ({
                      ...prev,
                      [expenseType === "mileage" ? "miles" : "amount"]: e.target.value
                    }))}
                    data-testid="input-amount"
                  />
                </div>
              </div>

              {expenseType === "fuel" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gallons">Gallons</Label>
                    <Input
                      id="gallons"
                      type="number"
                      step="0.001"
                      placeholder="0.000"
                      value={extractedData.gallons}
                      onChange={(e) => setExtractedData(prev => ({ ...prev, gallons: e.target.value }))}
                      data-testid="input-gallons"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricePerGallon">Price/Gallon ($)</Label>
                    <Input
                      id="pricePerGallon"
                      type="number"
                      step="0.001"
                      placeholder="0.000"
                      value={extractedData.pricePerGallon}
                      onChange={(e) => setExtractedData(prev => ({ ...prev, pricePerGallon: e.target.value }))}
                      data-testid="input-price-per-gallon"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="vendor">Vendor/Location</Label>
                <Input
                  id="vendor"
                  placeholder="e.g., Shell Gas Station, Joe's Repair Shop"
                  value={extractedData.vendor}
                  onChange={(e) => setExtractedData(prev => ({ ...prev, vendor: e.target.value }))}
                  data-testid="input-vendor"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Notes/Description</Label>
                <Textarea
                  id="description"
                  placeholder="Additional details about this expense..."
                  rows={3}
                  value={extractedData.description}
                  onChange={(e) => setExtractedData(prev => ({ ...prev, description: e.target.value }))}
                  data-testid="input-description"
                />
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleSave}
                disabled={isSaving || saved}
                data-testid="button-save"
              >
                {saved ? (
                  <>
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Saved Successfully
                  </>
                ) : isSaving ? (
                  "Saving..."
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Save Expense
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border bg-secondary/30">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileImage className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">How it works</h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>1. Upload a photo of your receipt or document</li>
                  <li>2. Select the expense type (fuel, maintenance, food, or mileage)</li>
                  <li>3. Enter the details from your document</li>
                  <li>4. Save to automatically add it to your expense records</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
