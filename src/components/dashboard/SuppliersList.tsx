
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const suppliers = [
  {
    id: 1,
    name: "Fournitures Pro SAS",
    complianceRate: 98,
    country: "France",
    status: "conforme",
  },
  {
    id: 2,
    name: "EcoPack GmbH",
    complianceRate: 85,
    country: "Allemagne",
    status: "à surveiller",
  },
  {
    id: 3,
    name: "Matières Premières Inc.",
    complianceRate: 76,
    country: "Canada",
    status: "à surveiller",
  },
  {
    id: 4,
    name: "FoodTech Solutions",
    complianceRate: 45,
    country: "États-Unis",
    status: "critique",
  },
  {
    id: 5,
    name: "Organic Supplies Ltd",
    complianceRate: 92,
    country: "Royaume-Uni",
    status: "conforme",
  },
];

export function SuppliersList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Fournisseurs à surveiller</CardTitle>
        <CardDescription>
          Les fournisseurs avec des exigences critiques ou expirées
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {suppliers.map((supplier) => (
            <div key={supplier.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {supplier.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{supplier.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {supplier.country}
                  </p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium">
                    {supplier.complianceRate}%
                  </span>
                  <Badge
                    variant={
                      supplier.status === "conforme"
                        ? "default"
                        : supplier.status === "à surveiller"
                        ? "outline"
                        : "destructive"
                    }
                  >
                    {supplier.status}
                  </Badge>
                </div>
                <Progress
                  value={supplier.complianceRate}
                  className="h-1.5 w-24"
                  indicatorClassName={
                    supplier.complianceRate > 80
                      ? "bg-green-500"
                      : supplier.complianceRate > 50
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
