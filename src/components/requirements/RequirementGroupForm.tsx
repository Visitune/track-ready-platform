
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom du groupe doit comporter au moins 2 caractères",
  }),
  description: z.string().optional(),
  supplierType: z.array(z.string()),
  productFamily: z.array(z.string()),
  country: z.array(z.string()),
  certification: z.array(z.string()),
  documentTypes: z.array(z.string()),
  priority: z.string(),
  isActive: z.boolean().default(true),
});

type RequirementGroupFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialData?: z.infer<typeof formSchema>;
};

const supplierTypes = [
  { id: "manufacturer", label: "Fabricant" },
  { id: "distributor", label: "Distributeur" },
  { id: "importer", label: "Importateur" },
  { id: "agent", label: "Agent commercial" },
];

const productFamilies = [
  { id: "raw_materials", label: "Matières premières" },
  { id: "packaging", label: "Emballages" },
  { id: "finished_goods", label: "Produits finis" },
  { id: "equipment", label: "Équipements" },
];

const documentTypes = [
  { id: "iso_9001", label: "Certification ISO 9001" },
  { id: "technical_sheet", label: "Fiche technique" },
  { id: "certificate_analysis", label: "Certificat d'analyse" },
  { id: "reach_declaration", label: "Déclaration REACH" },
  { id: "organic_certification", label: "Certification BIO" },
  { id: "safety_data_sheet", label: "Fiche de données de sécurité" },
  { id: "origin_certificate", label: "Certificat d'origine" },
];

export function RequirementGroupForm({ onSubmit, initialData }: RequirementGroupFormProps) {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      supplierType: [],
      productFamily: [],
      country: [],
      certification: [],
      documentTypes: [],
      priority: "medium",
      isActive: true,
    },
  });

  function handleSubmit(values: z.infer<typeof formSchema>) {
    onSubmit(values);
    toast({
      title: "Groupe d'exigences sauvegardé",
      description: `Le groupe "${values.name}" a été enregistré avec succès.`,
    });
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {initialData ? "Modifier le groupe d'exigences" : "Nouveau groupe d'exigences"}
        </CardTitle>
        <CardDescription>
          Définissez les critères qui détermineront quels documents sont exigés de quels fournisseurs et produits.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du groupe</FormLabel>
                    <FormControl>
                      <Input placeholder="ex: Matières premières biologiques" {...field} />
                    </FormControl>
                    <FormDescription>
                      Un nom explicite qui décrit ce groupe d'exigences
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priorité</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une priorité" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="low">Basse</SelectItem>
                        <SelectItem value="medium">Moyenne</SelectItem>
                        <SelectItem value="high">Haute</SelectItem>
                        <SelectItem value="critical">Critique</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Niveau de priorité des exigences de ce groupe
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description des critères et objectifs de ce groupe d'exigences..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4">Critères de filtrage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="supplierType"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Types de fournisseurs</FormLabel>
                      </div>
                      {supplierTypes.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="supplierType"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="productFamily"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Familles de produits</FormLabel>
                      </div>
                      {productFamilies.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="productFamily"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="border rounded-md p-4">
              <h3 className="text-lg font-medium mb-4">Documents requis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="documentTypes"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>Types de documents</FormLabel>
                        <FormDescription>
                          Sélectionnez les documents requis pour ce groupe
                        </FormDescription>
                      </div>
                      {documentTypes.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="documentTypes"
                          render={({ field }) => {
                            return (
                              <FormItem
                                key={item.id}
                                className="flex flex-row items-start space-x-3 space-y-0 mb-2"
                              >
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...field.value, item.id])
                                        : field.onChange(
                                            field.value?.filter(
                                              (value) => value !== item.id
                                            )
                                          )
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal cursor-pointer">
                                  {item.label}
                                </FormLabel>
                              </FormItem>
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="isActive"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Activer ce groupe d'exigences</FormLabel>
                    <FormDescription>
                      Ce groupe sera actif et appliquera automatiquement ses exigences
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline">
                Annuler
              </Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
