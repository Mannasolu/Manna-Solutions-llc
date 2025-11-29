import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { ArrowLeft, Plus, Trash2, Download } from "lucide-react";
import { Link } from "wouter";

interface PaperworkDocument {
  id: string;
  documentDate: string;
  documentType: string;
  description: string;
  fileUrl?: string;
}

const documentTypes = [
  "Invoice",
  "Receipt",
  "Bill of Lading",
  "Shipping Document",
  "Inspection Report",
  "Maintenance Record",
  "Other",
];

export default function PaperworkManagement() {
  const [documents, setDocuments] = useState<PaperworkDocument[]>([
    {
      id: "1",
      documentDate: "2025-01-29",
      documentType: "Receipt",
      description: "Fuel receipt from Pilot",
    },
    {
      id: "2",
      documentDate: "2025-01-28",
      documentType: "Invoice",
      description: "Delivery invoice for shipment #2847",
    },
  ]);
  const [formData, setFormData] = useState({
    documentDate: new Date().toISOString().split("T")[0],
    documentType: "",
    description: "",
    fileUrl: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.documentType || !formData.description) return;

    const newDocument: PaperworkDocument = {
      id: Date.now().toString(),
      documentDate: formData.documentDate,
      documentType: formData.documentType,
      description: formData.description,
      fileUrl: formData.fileUrl,
    };

    setDocuments([newDocument, ...documents]);
    setFormData({
      documentDate: new Date().toISOString().split("T")[0],
      documentType: "",
      description: "",
      fileUrl: "",
    });
  };

  const handleDelete = (id: string) => {
    setDocuments(documents.filter((d) => d.id !== id));
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard">
            <a className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <ArrowLeft className="h-6 w-6 text-muted-foreground" />
            </a>
          </Link>
          <div>
            <h1 className="text-4xl font-heading font-bold text-white">
              Paperwork Management
            </h1>
            <p className="text-muted-foreground">
              Store and organize your documents and receipts
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 border-border">
              <h2 className="text-lg font-heading font-bold text-white mb-4">
                Add Document
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-muted-foreground">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.documentDate}
                    onChange={(e) =>
                      setFormData({ ...formData, documentDate: e.target.value })
                    }
                    data-testid="input-doc-date"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="docType" className="text-muted-foreground">
                    Document Type
                  </Label>
                  <Select value={formData.documentType} onValueChange={(value) =>
                    setFormData({ ...formData, documentType: value })
                  }>
                    <SelectTrigger data-testid="select-doc-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-muted-foreground">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Brief description of document..."
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    data-testid="input-doc-description"
                    className="resize-none"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fileUrl" className="text-muted-foreground">
                    File URL (Optional)
                  </Label>
                  <Input
                    id="fileUrl"
                    placeholder="Link to document"
                    value={formData.fileUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, fileUrl: e.target.value })
                    }
                    data-testid="input-file-url"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full rounded-lg"
                  data-testid="button-submit-doc"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Document
                </Button>
              </form>
            </Card>

            <Card className="p-6 border-border mt-4 bg-secondary/30">
              <p className="text-muted-foreground text-sm">Total Documents</p>
              <p className="text-3xl font-bold text-white">{documents.length}</p>
            </Card>
          </div>

          {/* Documents List */}
          <div className="lg:col-span-2">
            <div className="space-y-3">
              {documents.length > 0 ? (
                documents.map((doc) => (
                  <Card
                    key={doc.id}
                    data-testid={`doc-item-${doc.id}`}
                    className="p-4 border-border hover:border-primary/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div>
                            <p className="font-semibold text-white">
                              {doc.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(doc.documentDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {doc.documentType}
                          </span>
                        </div>
                        {doc.fileUrl && (
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-primary/80 text-sm mt-3"
                          >
                            <Download className="h-4 w-4" />
                            Download
                          </a>
                        )}
                      </div>
                      <button
                        onClick={() => handleDelete(doc.id)}
                        data-testid={`button-delete-${doc.id}`}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="h-5 w-5 text-destructive" />
                      </button>
                    </div>
                  </Card>
                ))
              ) : (
                <Card className="p-8 border-border text-center">
                  <p className="text-muted-foreground">No documents yet</p>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
