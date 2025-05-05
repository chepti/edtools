import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllTools } from "@/lib/actions/tool.actions";
import ToolCard from "@/components/shared/ToolCard"; // Assuming ToolCard component exists
import { ITool } from "@/models/Tool"; // Import the ITool interface

export default async function Home() {
  // Fetch initial tools to display on the homepage
  const result = await getAllTools({ limit: 6 }); // Get first 6 tools for example
  const tools = result?.data || [];

  return (
    <>
      {/* Hero Section - Basic Example */}
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">גלו, שתפו והעשירו: מאגר כלי AI שיתופי למורים!</h1>
            <p className="p-regular-20 md:p-regular-24">מצאו את כלי הבינה המלאכותית המושלמים להוראה שלכם, תרמו מהידע שלכם ובנו יחד קהילה לומדת.</p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="/tools">
                מצאו כלים עכשיו
              </Link>
            </Button>
          </div>

          {/* Optional: Add an image here */}
          {/* <Image 
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          /> */}
        </div>
      </section>

      {/* Tools Section */}
      <section id="tools" className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">כלים אחרונים שהוספו</h2>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
            {tools.length > 0 ? (
                tools.map((tool: ITool) => (
                <ToolCard key={tool._id} tool={tool} />
                ))
            ) : (
                <div className="col-span-full text-center text-muted-foreground">
                <p>עדיין לא הוספו כלים למאגר.</p>
                {/* Optional: Link for admins/teachers to add tools if applicable */}
                </div>
            )}
        </div>

        {/* Optional: Add pagination or a 'view all' button if needed */}
        {result && result.totalPages > 1 && (
             <div className="flex justify-center mt-4">
                <Button asChild size="lg" className="button flex gap-1">
                    <Link href="/tools">
                        <span>צפו בכל הכלים</span>
                        {/* <ArrowRight className="ml-1" /> */}
                    </Link>
                </Button>
            </div>
        )}
      </section>
    </>
  );
} 