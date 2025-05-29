'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler, Control } from 'react-hook-form';
import * as z from 'zod';
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
// Ensure these components are installed via shadcn-ui
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from "sonner";
import { useRouter } from 'next/navigation';

// Zod schema for validation - mirroring ITool structure
const toolFormSchema = z.object({
  name: z.string().min(2, { message: 'שם הכלי חייב להכיל לפחות 2 תווים' }).max(100, { message: 'שם הכלי יכול להכיל עד 100 תווים' }),
  link: z.string().url({ message: 'קישור לא תקין' }),
  logo: z.string().url({ message: 'קישור ללוגו לא תקין' }).optional().or(z.literal('')),
  description: z.string().min(10, { message: 'תיאור הכלי חייב להכיל לפחות 10 תווים' }),
  limitations: z.string().optional().or(z.literal('')),
  advantages: z.string().optional().or(z.literal('')),
  disadvantages: z.string().optional().or(z.literal('')),
  // rating: z.number().min(1).max(5).optional(), // Will use a custom component later if needed
  usageInTeaching: z.string().optional().or(z.literal('')),
  difficultyLevel: z.enum(['קל', 'בינוני', 'קשה']).optional(),
  hebrewSupport: z.boolean().optional(),
  isFree: z.boolean().optional(),
  outputType: z.string().optional().or(z.literal('')),
  pedagogicalContext: z.array(z.enum(['הקניה', 'תרגול', 'הערכה'])).default([]),
  communicationFormat: z.string().optional().or(z.literal('')),
});

export type ToolFormValues = z.infer<typeof toolFormSchema>;

// Default values for the form
const defaultValues: Partial<ToolFormValues> = {
  name: '',
  link: '',
  logo: '',
  description: '',
  limitations: '',
  advantages: '',
  disadvantages: '',
  usageInTeaching: '',
  difficultyLevel: undefined, // Explicitly undefined for optional enum
  hebrewSupport: false,
  isFree: false,
  outputType: '',
  pedagogicalContext: [],
  communicationFormat: '',
};

const difficultyLevels: { value: 'קל' | 'בינוני' | 'קשה'; label: string }[] = [
  { value: 'קל', label: 'קל' },
  { value: 'בינוני', label: 'בינוני' },
  { value: 'קשה', label: 'קשה' },
];

const pedagogicalContextOptions: { id: 'הקניה' | 'תרגול' | 'הערכה'; label: string }[] = [
  { id: 'הקניה', label: 'הקניית ידע ומיומנויות' },
  { id: 'תרגול', label: 'תרגול ויישום' },
  { id: 'הערכה', label: 'הערכה ומדידה' },
];

export default function AddToolForm() {
  const router = useRouter();
  const form = useForm<ToolFormValues>({
    resolver: zodResolver(toolFormSchema),
    defaultValues,
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<ToolFormValues> = async (data) => {
    // Ensure boolean values are not undefined if schema expects boolean (after transformations)
    const dataToSend = {
        ...data,
        hebrewSupport: data.hebrewSupport ?? false,
        isFree: data.isFree ?? false,
    };

    try {
      const response = await fetch('/api/tools', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        toast.success("הכלי נוסף בהצלחה!");
        form.reset(defaultValues);
      } else {
        toast.error(result.message || "שגיאה בהוספת הכלי. נסה שוב.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("אירעה שגיאה בלתי צפויה. בדוק את החיבור שלך ונסה שוב.");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as SubmitHandler<Record<string, any>>)} className="space-y-8">
        <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-slate-50/50 dark:bg-slate-800/30">
          <h3 className="text-lg font-medium text-primary border-b pb-2 mb-4">מידע בסיסי</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control as unknown as Control<ToolFormValues>}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>שם הכלי <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="לדוגמה: Canva, ChatGPT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as Control<ToolFormValues>}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>קישור לכלי <span className="text-destructive">*</span></FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control as unknown as Control<ToolFormValues>}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>קישור ללוגו (אופציונלי)</FormLabel>
                <FormControl>
                  <Input placeholder="https://www.example.com/logo.png" {...field} value={field.value || ''} />
                </FormControl>
                <FormDescription>הכנס קישור ישיר לתמונת הלוגו.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control as unknown as Control<ToolFormValues>}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>תיאור הכלי <span className="text-destructive">*</span></FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="תאר בקצרה את הכלי, מה הוא עושה, ולמי הוא מיועד..."
                    className="resize-y min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 p-4 border rounded-lg shadow-sm bg-slate-50/50 dark:bg-slate-800/30">
            <h3 className="text-lg font-medium text-primary border-b pb-2 mb-4">פרטים נוספים</h3>
            <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-6">
                <FormField
                control={form.control as unknown as Control<ToolFormValues>}
                name="limitations"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>מגבלות (אופציונלי)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="מגבלות ידועות של הכלי..." {...field} value={field.value || ''} className="min-h-[80px]" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control as unknown as Control<ToolFormValues>}
                name="advantages"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>יתרונות (אופציונלי)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="מהם היתרונות הבולטים?" {...field} value={field.value || ''} className="min-h-[80px]" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control as unknown as Control<ToolFormValues>}
                name="disadvantages"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>חסרונות (אופציונלי)</FormLabel>
                    <FormControl>
                        <Textarea placeholder="מהם החסרונות שיש לקחת בחשבון?" {...field} value={field.value || ''} className="min-h-[80px]" />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            </div>
        </div>

        <div className="space-y-6 p-4 border rounded-lg shadow-sm bg-slate-50/50 dark:bg-slate-800/30">
          <h3 className="text-lg font-medium text-primary border-b pb-2 mb-4">מידע פדגוגי וטכני</h3>
          <FormField
            control={form.control as unknown as Control<ToolFormValues>}
            name="usageInTeaching"
            render={({ field }) => (
              <FormItem>
                <FormLabel>שימוש בהוראה (אופציונלי)</FormLabel>
                <FormControl>
                  <Textarea placeholder="כיצד ניתן להשתמש בכלי זה בהקשרים פדגוגיים שונים? רעיונות, הצעות..." {...field} value={field.value || ''} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
            <FormField
              control={form.control as unknown as Control<ToolFormValues>}
              name="difficultyLevel"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>רמת קושי (אופציונלי)</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value}
                      className="flex space-x-2 rtl:space-x-reverse"
                    >
                      {difficultyLevels.map((level) => (
                        <FormItem key={level.value} className="flex items-center space-x-2 rtl:space-x-reverse space-y-0">
                          <FormControl>
                            <RadioGroupItem value={level.value} id={`diff-${level.value}`} />
                          </FormControl>
                          <FormLabel htmlFor={`diff-${level.value}`} className="font-normal cursor-pointer hover:text-primary">
                            {level.label}
                          </FormLabel>
                        </FormItem>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control as unknown as Control<ToolFormValues>}
              name="pedagogicalContext"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>הקשר פדגוגי (אופציונלי)</FormLabel>
                  <FormDescription>בחר את ההקשרים המתאימים לשימוש בכלי.</FormDescription>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 pt-2">
                  {pedagogicalContextOptions.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control as unknown as Control<ToolFormValues>}
                      name="pedagogicalContext"
                      render={({ field: itemField }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 rtl:space-x-reverse space-y-0 rounded-md border p-3 hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                          >
                            <FormControl>
                              <Checkbox
                                checked={(itemField.value || []).includes(item.id)}
                                onCheckedChange={(checked: boolean) => {
                                  const currentValue = itemField.value || [];
                                  return checked
                                    ? itemField.onChange([...currentValue, item.id])
                                    : itemField.onChange(
                                        currentValue.filter(
                                          (value) => value !== item.id
                                        )
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer w-full">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 pt-4">
            <FormField
                control={form.control as unknown as Control<ToolFormValues>}
                name="outputType"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>סוג התוצר (אופציונלי)</FormLabel>
                    <FormControl>
                        <Input placeholder="לדוגמה: תמונה, וידאו, טקסט, מצגת" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
            <FormField
                control={form.control as unknown as Control<ToolFormValues>}
                name="communicationFormat"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>פורמט תקשורת (אופציונלי)</FormLabel>
                    <FormControl>
                        <Input placeholder="לדוגמה: אנגלית, עברית חלקית, אינטראקציה קולית" {...field} value={field.value || ''} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
          </div>

          <div className="flex items-center space-x-4 rtl:space-x-reverse pt-4">
            <FormField
              control={form.control as unknown as Control<ToolFormValues>}
              name="hebrewSupport"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm space-x-3 rtl:space-x-reverse space-y-0 bg-white dark:bg-slate-900/50">
                  <div className="space-y-0.5">
                    <FormLabel>תמיכה בעברית?</FormLabel>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control as unknown as Control<ToolFormValues>}
              name="isFree"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm space-x-3 rtl:space-x-reverse space-y-0 bg-white dark:bg-slate-900/50">
                  <div className="space-y-0.5">
                    <FormLabel>הכלי חינמי?</FormLabel>
                  </div>
                  <FormControl>
                    <Checkbox
                      checked={field.value ?? false}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 rtl:space-x-reverse">
            <Button type="button" variant="outline" onClick={() => form.reset(defaultValues)} disabled={form.formState.isSubmitting}>
                איפוס טופס
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting || !form.formState.isDirty || !form.formState.isValid}>
                {form.formState.isSubmitting ? "שומר..." : "הוסף כלי"}
            </Button>
        </div>
      </form>
    </Form>
  );
} 