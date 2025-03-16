"use client"

import { useState, useEffect } from "react"
import { VachanLogo } from "@/components/vachan-logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoonIcon, SunIcon, BarChart3, TrendingUp, Shield } from "lucide-react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { TrendingGraph } from "@/components/trending-graph"
import { motion } from "framer-motion"
import { MisinformationMap } from "@/components/misinformation-map"
import { FactCheckStats } from "@/components/fact-check-stats"
import { RecentFactChecks } from "@/components/recent-fact-checks"

export default function DashboardPage() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Fix hydration issues
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div
      className={`min-h-screen ${
        resolvedTheme === "dark"
          ? "bg-gradient-to-br from-[#001a2c] via-background to-[#001a2c]"
          : "bg-gradient-to-br from-[#e6f4ff] via-background to-[#e6f4ff]"
      }`}
    >
      <header className="glass border-b border-border sticky top-0 z-10 backdrop-blur-md bg-background/70">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <VachanLogo />
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
            >
              {resolvedTheme === "dark" ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            <Link href="/main">
              <Button variant="outline" size="sm">
                Back to News
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Misinformation Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track and analyze misinformation trends across social media platforms
            </p>
          </div>
          <Link href="/education">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button className="mt-4 md:mt-0 bg-[#0077b6] hover:bg-[#005f8d]">
                <Shield className="mr-2 h-4 w-4" />
                Learn Fact-Checking
              </Button>
            </motion.div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Fact Checks</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,248</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">↑ 12%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">False Information</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">587</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-red-500">↑ 24%</span> from previous period
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">User Submissions</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">842</div>
              <p className="text-sm text-muted-foreground mt-1">
                <span className="text-green-500">↑ 18%</span> from previous period
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="bg-[#0077b6]/10 p-1">
            <TabsTrigger value="trends" className="data-[state=active]:bg-[#0077b6] data-[state=active]:text-white">
              <TrendingUp className="mr-2 h-4 w-4" />
              Trending Misinformation
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#0077b6] data-[state=active]:text-white">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Hashtags</CardTitle>
                  <CardDescription>Potentially misleading hashtags in the last 7 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <TrendingGraph />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                  <CardDescription>Misinformation hotspots across India</CardDescription>
                </CardHeader>
                <CardContent>
                  <MisinformationMap />
                </CardContent>
              </Card>
            </div>
            <RecentFactChecks />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Fact Check Results</CardTitle>
                  <CardDescription>Distribution of fact-checking outcomes</CardDescription>
                </CardHeader>
                <CardContent>
                  <FactCheckStats />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Source Analysis</CardTitle>
                  <CardDescription>Top sources of misinformation</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">WhatsApp</span>
                        <span className="text-sm text-muted-foreground">42%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-[#0077b6] h-full rounded-full" style={{ width: "42%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Facebook</span>
                        <span className="text-sm text-muted-foreground">28%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-[#0077b6] h-full rounded-full" style={{ width: "28%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Twitter</span>
                        <span className="text-sm text-muted-foreground">18%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-[#0077b6] h-full rounded-full" style={{ width: "18%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">YouTube</span>
                        <span className="text-sm text-muted-foreground">8%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-[#0077b6] h-full rounded-full" style={{ width: "8%" }}></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Other</span>
                        <span className="text-sm text-muted-foreground">4%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="bg-[#0077b6] h-full rounded-full" style={{ width: "4%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-card border-t border-border py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">© 2025 Vachan. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="/privacy" className="text-muted-foreground hover:text-primary text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="text-muted-foreground hover:text-primary text-sm">
                Terms of Service
              </a>
              <a href="/contact" className="text-muted-foreground hover:text-primary text-sm">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

