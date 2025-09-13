import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TechStackCards() {
  return (
    <div className="grid gap-6 md:grid-cols-3 mt-10">
      <Card className="bg-zinc-900 border border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge>Bun</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-400">
          Ultra-fast JavaScript runtime used for installing, running, and
          bundling. Say goodbye to slow installs and builds.
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge>Next.js</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-400">
          The React framework for the web — with routing, API routes, SSR, and
          everything you need for production.
        </CardContent>
      </Card>

      <Card className="bg-zinc-900 border border-zinc-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Badge>Payload CMS</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-400">
          A headless CMS built with TypeScript. Models, APIs, and admin
          dashboard out of the box.
        </CardContent>
      </Card>
    </div>
  );
}
