'use client';

import AddToolForm from '@/components/tools/AddToolForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddToolPage() {
  return (
    <div className="container mx-auto py-10 min-h-screen">
      <Card className="max-w-2xl mx-auto shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-primary">הוספת כלי חדש</CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            מלא את הפרטים הבאים כדי להוסיף כלי חדש למאגר "חולמים תקשוב"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AddToolForm />
        </CardContent>
      </Card>
    </div>
  );
} 