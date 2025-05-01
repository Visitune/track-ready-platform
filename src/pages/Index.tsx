
import React from "react";
import { BarChart3, FileText, Users, ClipboardCheck } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { ConformityChart } from "@/components/dashboard/ConformityChart";
import { SuppliersList } from "@/components/dashboard/SuppliersList";
import { ExpiringDocuments } from "@/components/dashboard/ExpiringDocuments";
import AppLayout from "@/components/layout/AppLayout";

const conformityData = [
  { name: "Conformes", value: 68, color: "#22c55e" },
  { name: "À renouveler", value: 18, color: "#f59e0b" },
  { name: "Manquantes", value: 14, color: "#ef4444" },
];

const byCategoryData = [
  { name: "Certifications", value: 36, color: "#6366f1" },
  { name: "Techniques", value: 24, color: "#0ea5e9" },
  { name: "Réglementaires", value: 30, color: "#14b8a6" },
  { name: "Autres", value: 10, color: "#8b5cf6" },
];

const Index = () => {
  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="dashboard-title">Tableau de bord</h1>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard
          title="Taux de conformité global"
          value="86%"
          icon={<BarChart3 className="h-6 w-6" />}
          trend={{ value: 4.6, label: "depuis le mois dernier", positive: true }}
        />
        <StatCard
          title="Fournisseurs actifs"
          value="124"
          icon={<Users className="h-6 w-6" />}
          trend={{ value: 12, label: "depuis le mois dernier", positive: true }}
        />
        <StatCard
          title="Documents actifs"
          value="892"
          icon={<FileText className="h-6 w-6" />}
        />
        <StatCard
          title="Exigences à traiter"
          value="28"
          icon={<ClipboardCheck className="h-6 w-6" />}
          trend={{ value: 8, label: "depuis la semaine dernière", positive: false }}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 mb-6">
        <ConformityChart data={conformityData} title="État des exigences" />
        <ConformityChart data={byCategoryData} title="Répartition par catégorie" />
      </div>

      {/* Lists Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <SuppliersList />
        <ExpiringDocuments />
      </div>
    </AppLayout>
  );
};

export default Index;
