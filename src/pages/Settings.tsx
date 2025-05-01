
import React from "react";
import AppLayout from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import {
  Settings as SettingsIcon,
  Mail,
  Users,
  Bell,
  Palette,
  Database,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Settings() {
  const { toast } = useToast();

  // Schéma pour le formulaire de paramètres de l'entreprise
  const companyFormSchema = z.object({
    companyName: z.string().min(2, {
      message: "Le nom de l'entreprise doit comporter au moins 2 caractères",
    }),
    email: z.string().email({
      message: "Veuillez entrer une adresse email valide",
    }),
    phone: z.string().optional(),
    address: z.string().optional(),
    logo: z.instanceof(FileList).optional(),
  });

  // Schéma pour le formulaire des emails
  const emailFormSchema = z.object({
    senderName: z.string().min(2, {
      message: "Le nom d'expéditeur doit comporter au moins 2 caractères",
    }),
    senderEmail: z.string().email({
      message: "Veuillez entrer une adresse email valide",
    }),
    emailSignature: z.string().optional(),
    smtpHost: z.string().min(1, {
      message: "Veuillez entrer un hôte SMTP",
    }),
    smtpPort: z.string().refine((val) => !isNaN(parseInt(val)), {
      message: "Le port doit être un nombre",
    }),
    smtpUsername: z.string().min(1, {
      message: "Veuillez entrer un nom d'utilisateur SMTP",
    }),
    smtpPassword: z.string().min(1, {
      message: "Veuillez entrer un mot de passe SMTP",
    }),
    enableSsl: z.boolean().default(true),
  });

  // Schéma pour le formulaire des notifications
  const notificationFormSchema = z.object({
    emailNotifications: z.boolean().default(true),
    reminderFrequency: z.string().default("weekly"),
    documentExpirationWarning: z.number().min(1).max(90).default(30),
    dailyDigest: z.boolean().default(false),
  });

  // Initialisation des formulaires
  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "Votre Entreprise",
      email: "contact@entreprise.com",
      phone: "+33 1 23 45 67 89",
      address: "123 rue des Exemples, 75000 Paris, France",
    },
  });

  const emailForm = useForm<z.infer<typeof emailFormSchema>>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      senderName: "Support TrackReady",
      senderEmail: "no-reply@entreprise.com",
      emailSignature: "L'équipe conformité",
      smtpHost: "smtp.entreprise.com",
      smtpPort: "587",
      smtpUsername: "smtp-user",
      smtpPassword: "••••••••••",
      enableSsl: true,
    },
  });

  const notificationForm = useForm<z.infer<typeof notificationFormSchema>>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      reminderFrequency: "weekly",
      documentExpirationWarning: 30,
      dailyDigest: false,
    },
  });

  // Gestion de la soumission des formulaires
  const onCompanySubmit = (data: z.infer<typeof companyFormSchema>) => {
    console.log(data);
    toast({
      title: "Paramètres d'entreprise sauvegardés",
      description: "Les paramètres de votre entreprise ont été mis à jour avec succès.",
    });
  };

  const onEmailSubmit = (data: z.infer<typeof emailFormSchema>) => {
    console.log(data);
    toast({
      title: "Paramètres email sauvegardés",
      description: "Les paramètres d'email ont été mis à jour avec succès.",
    });
  };

  const onNotificationSubmit = (data: z.infer<typeof notificationFormSchema>) => {
    console.log(data);
    toast({
      title: "Paramètres de notification sauvegardés",
      description: "Les paramètres de notification ont été mis à jour avec succès.",
    });
  };

  return (
    <AppLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="md:w-1/4">
          <CardHeader>
            <CardTitle>Configuration</CardTitle>
            <CardDescription>Configurez tous les aspects de l'application</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="company" className="md:flex md:flex-col" orientation="vertical">
              <TabsList className="md:flex md:flex-col h-fit justify-start mb-4">
                <TabsTrigger value="company" className="flex items-center gap-2 justify-start">
                  <SettingsIcon className="h-4 w-4" />
                  <span>Entreprise</span>
                </TabsTrigger>
                <TabsTrigger value="email" className="flex items-center gap-2 justify-start">
                  <Mail className="h-4 w-4" />
                  <span>Emails</span>
                </TabsTrigger>
                <TabsTrigger value="users" className="flex items-center gap-2 justify-start">
                  <Users className="h-4 w-4" />
                  <span>Utilisateurs</span>
                </TabsTrigger>
                <TabsTrigger value="notifications" className="flex items-center gap-2 justify-start">
                  <Bell className="h-4 w-4" />
                  <span>Notifications</span>
                </TabsTrigger>
                <TabsTrigger value="appearance" className="flex items-center gap-2 justify-start">
                  <Palette className="h-4 w-4" />
                  <span>Apparence</span>
                </TabsTrigger>
                <TabsTrigger value="database" className="flex items-center gap-2 justify-start">
                  <Database className="h-4 w-4" />
                  <span>Base de données</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </CardContent>
        </Card>

        <div className="flex-1">
          <Tabs defaultValue="company">
            <TabsContent value="company">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres d'entreprise</CardTitle>
                  <CardDescription>
                    Configurez les informations de base de votre entreprise
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...companyForm}>
                    <form 
                      onSubmit={companyForm.handleSubmit(onCompanySubmit)} 
                      className="space-y-6"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={companyForm.control}
                          name="companyName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom de l'entreprise</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom de votre entreprise" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={companyForm.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="contact@entreprise.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={companyForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Téléphone</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="+33 1 23 45 67 89" 
                                  {...field}
                                  value={field.value || ""}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={companyForm.control}
                          name="logo"
                          render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                              <FormLabel>Logo</FormLabel>
                              <FormControl>
                                <Input 
                                  type="file" 
                                  accept="image/*"
                                  {...fieldProps}
                                  onChange={(event) => {
                                    onChange(event.target.files);
                                  }}
                                />
                              </FormControl>
                              <FormDescription>
                                Format recommandé: PNG, JPG ou SVG (max 2 MB)
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={companyForm.control}
                        name="address"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Adresse</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Adresse complète de votre entreprise"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Enregistrer les modifications</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="email">
              <Card>
                <CardHeader>
                  <CardTitle>Configuration des emails</CardTitle>
                  <CardDescription>
                    Configurez les paramètres d'envoi des emails
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...emailForm}>
                    <form 
                      onSubmit={emailForm.handleSubmit(onEmailSubmit)} 
                      className="space-y-6"
                    >
                      <h3 className="text-lg font-medium mb-4">Paramètres généraux d'envoi</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={emailForm.control}
                          name="senderName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom d'expéditeur</FormLabel>
                              <FormControl>
                                <Input placeholder="Support TrackReady" {...field} />
                              </FormControl>
                              <FormDescription>
                                Nom qui apparaîtra comme expéditeur des emails
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={emailForm.control}
                          name="senderEmail"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email d'expédition</FormLabel>
                              <FormControl>
                                <Input placeholder="no-reply@entreprise.com" {...field} />
                              </FormControl>
                              <FormDescription>
                                Adresse depuis laquelle les emails seront envoyés
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={emailForm.control}
                        name="emailSignature"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Signature d'email</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Signature à ajouter à tous les emails envoyés"
                                {...field}
                                value={field.value || ""}
                              />
                            </FormControl>
                            <FormDescription>
                              Cette signature sera ajoutée à la fin de tous les emails
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Separator className="my-6" />
                      
                      <h3 className="text-lg font-medium mb-4">Configuration SMTP</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={emailForm.control}
                          name="smtpHost"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hôte SMTP</FormLabel>
                              <FormControl>
                                <Input placeholder="smtp.entreprise.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={emailForm.control}
                          name="smtpPort"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Port SMTP</FormLabel>
                              <FormControl>
                                <Input placeholder="587" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={emailForm.control}
                          name="smtpUsername"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nom d'utilisateur SMTP</FormLabel>
                              <FormControl>
                                <Input placeholder="Nom d'utilisateur" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={emailForm.control}
                          name="smtpPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mot de passe SMTP</FormLabel>
                              <FormControl>
                                <Input 
                                  type="password" 
                                  placeholder="••••••••••" 
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={emailForm.control}
                        name="enableSsl"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Utiliser une connexion SSL/TLS
                              </FormLabel>
                              <FormDescription>
                                Active la connexion sécurisée au serveur SMTP
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="flex gap-4">
                        <Button type="submit">Enregistrer</Button>
                        <Button type="button" variant="outline">Tester la connexion</Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Paramètres de notifications</CardTitle>
                  <CardDescription>
                    Configurez la fréquence et le type de notifications envoyées
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...notificationForm}>
                    <form 
                      onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} 
                      className="space-y-6"
                    >
                      <FormField
                        control={notificationForm.control}
                        name="emailNotifications"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Notifications par email
                              </FormLabel>
                              <FormDescription>
                                Active l'envoi des notifications par email
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="reminderFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Fréquence des rappels</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez une fréquence" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="daily">Quotidien</SelectItem>
                                <SelectItem value="weekly">Hebdomadaire</SelectItem>
                                <SelectItem value="biweekly">Bimensuel</SelectItem>
                                <SelectItem value="monthly">Mensuel</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Fréquence d'envoi des rappels pour les documents manquants ou expirés
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="documentExpirationWarning"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Alerte d'expiration (jours)</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                max={90}
                                {...field}
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Nombre de jours avant l'expiration pour déclencher une alerte
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={notificationForm.control}
                        name="dailyDigest"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel className="text-base">
                                Résumé quotidien
                              </FormLabel>
                              <FormDescription>
                                Envoie un récapitulatif quotidien de l'état de conformité
                              </FormDescription>
                            </div>
                            <FormControl>
                              <Switch
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Enregistrer les modifications</Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Gestion des utilisateurs</CardTitle>
                  <CardDescription>
                    Gérez les utilisateurs et leurs permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[300px] border rounded">
                    <p className="text-muted-foreground">
                      La gestion des utilisateurs sera implémentée avec Supabase Auth.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="appearance">
              <Card>
                <CardHeader>
                  <CardTitle>Apparence</CardTitle>
                  <CardDescription>
                    Personnalisez l'apparence de l'application
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[300px] border rounded">
                    <p className="text-muted-foreground">
                      Les options de personnalisation seront implémentées ultérieurement.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="database">
              <Card>
                <CardHeader>
                  <CardTitle>Base de données</CardTitle>
                  <CardDescription>
                    Configurez et gérez votre base de données
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-center h-[300px] border rounded">
                    <p className="text-muted-foreground">
                      Les paramètres de base de données seront configurés via Supabase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}
