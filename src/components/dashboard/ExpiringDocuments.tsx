
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const expiringDocs = [
  {
    id: 1,
    name: "Certification BIO",
    supplier: "Organic Supplies Ltd",
    expiryDate: "12/06/2025",
    daysLeft: 15,
    priority: "haute",
  },
  {
    id: 2,
    name: "ISO 9001",
    supplier: "EcoPack GmbH",
    expiryDate: "25/06/2025",
    daysLeft: 28,
    priority: "moyenne",
  },
  {
    id: 3,
    name: "FDA Compliance",
    supplier: "FoodTech Solutions",
    expiryDate: "30/05/2025",
    daysLeft: 2,
    priority: "critique",
  },
  {
    id: 4,
    name: "Certificat d'origine",
    supplier: "Matières Premières Inc.",
    expiryDate: "20/06/2025",
    daysLeft: 23,
    priority: "moyenne",
  },
];

export function ExpiringDocuments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Documents expirant prochainement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expiringDocs.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between border-b pb-3 last:border-0"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium">{doc.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {doc.supplier}
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <Badge
                  variant={
                    doc.priority === "critique"
                      ? "destructive"
                      : doc.priority === "haute"
                      ? "default"
                      : "outline"
                  }
                  className="flex items-center gap-1"
                >
                  {doc.priority === "critique" && <AlertCircle className="h-3 w-3" />}
                  {doc.daysLeft} jours
                </Badge>
                <div className="text-xs text-muted-foreground">
                  Expire le {doc.expiryDate}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
