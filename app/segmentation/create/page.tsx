"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Plus,
  Trash2,
  Save,
  Info,
  ArrowLeft,
  Clock,
  Repeat,
  Star,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Common operators
const commonOperators = {
  equals: "is",
  notEquals: "is not",
  greaterThan: "is greater than",
  lessThan: "is less than",
  greaterThanOrEqual: "is greater than or equal to",
  lessThanOrEqual: "is less than or equal to",
};

const timeOperators = {
  before: "is before",
  after: "is after",
  on: "is on",
  withinLast: "is within last",
  notWithinLast: "is not within last",
};

type FilterConfig = {
  type: "number" | "date" | "text" | "boolean" | "multiselect" | "select" | "compound";
  operators: string[];
  options?: string[];
  prefix?: string;
  suffix?: string;
  unit?: string;
  fields?: {
    [key: string]: string[] | { type: string; units: string[] };
  };
};

type FilterSections = {
  [section: string]: {
    [property: string]: FilterConfig;
  };
};

const filterSections: FilterSections = {
  General: {
    "Average visits": {
      type: "number",
      operators: Object.values(commonOperators),
      unit: "visits per month", 
    },
    "Recent visits": {
      type: "compound",
      operators: Object.values(commonOperators),
    },
    "Total visits": {
      type: "number", 
      operators: Object.values(commonOperators),
    },
    "Last wash date": {
      type: "number",
      operators: ["is within last", "is not within last"],
      unit: "days",
    },
    "First visit": {
      type: "number",
      operators: ["is within last", "is not within last"],
      unit: "days",
    },
    "Is a member": {
      type: "boolean",
      operators: ["is"],
    },
  },
  Membership: {
    "Membership join date": {
      type: "number", 
      operators: ["is within last", "is not within last"],
      unit: "days",
    },
    "Membership plan name": {
      type: "multiselect",
      operators: ["is", "is not"],
      options: [
        "Unl Taxi Basic",
        "Unl Taxi Carnauba", 
        "Unl Taxi Graphene",
        "Unl Taxi Super",
        "Unlimited Basic",
        "Unlimited Carnauba",
        "Unlimited Graphene",
        "Unlimited Super"
      ],
    },
    "Membership status": {
      type: "multiselect",
      operators: ["is", "is not"],
      options: [
        "Plan Used",
        "Joined", 
        "Transfer In",
        "Renewed",
        "Resumed",
        "Discontinuing",
        "Plan Expired",
        "Discontinued",
        "Terminated",
        "Transfer Out",
        "Suspended",
        "Card Expired",
        "Card Declined",
        "Recharge Problem",
        "Enter/Swipe New Credit Card",
        "New Card is Approved",
        "Credit Card Changed",
        "Join Date Changed"
      ],
    },
    "Membership last charge date": {
      type: "number",
      operators: ["is within last", "is not within last"],
      unit: "days",
    },
    "Membership failed recharge attempts": {
      type: "number",
      operators: Object.values(commonOperators),
      unit: "last 30 days",
    },
    "Membership cancellation date": {
      type: "number",
      operators: ["is within last", "is not within last"],
      unit: "days",
    },
  },

};

type Filter = {
  id: string;
  property: string;
  operator: string;
  value: any;
  timeUnit?: string;
};

type TimeframeValue = {
  number: number;
  unit: string;
};

const FilterRow = ({
  filter,
  onDelete,
  onUpdate,
}: {
  filter: Filter;
  onDelete: () => void;
  onUpdate: (updatedFilter: Filter) => void;
}) => {
  const findFilterConfig = (): FilterConfig | null => {
    for (const [section, properties] of Object.entries(filterSections)) {
      if (filter.property in properties) {
        return properties[filter.property];
      }
    }
    return null;
  };

  const filterConfig = findFilterConfig();
  const inputType = filterConfig?.type;

  const renderValueInput = () => {
    if (!filterConfig) return null;

    // If this is a relative date operator (within last) we expect a numeric input even though base type is date
    const relativeDate =
      inputType === "date" && filter.operator === "is within last";

    if (relativeDate) {
      return (
        <Input
          type="number"
          value={filter.value}
          onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
          className="w-[100px]"
          placeholder="Days"
        />
      );
    }

    switch (inputType) {
      case "date":
        return (
          <Input
            type="date"
            value={filter.value}
            onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
            className="w-[200px]"
          />
        );

      case "number":
        return (
          <div className="flex items-center gap-2">
            {filterConfig.prefix && (
              <span className="text-muted-foreground">{filterConfig.prefix}</span>
            )}
            <Input
              type="number"
              value={filter.value}
              onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
              className="w-[100px]"
            />
            {filterConfig.unit && (
              <span className="text-muted-foreground">{filterConfig.unit}</span>
            )}
          </div>
        );

      case "compound":
        if (filter.property === "Recent visits") {
          return (
            <div className="flex items-center gap-2 text-sm">
              <Input
                type="number"
                value={filter.value?.count || ""}
                onChange={(e) => onUpdate({ 
                  ...filter, 
                  value: { ...filter.value, count: e.target.value }
                })}
                className="w-[80px]"
                placeholder="0"
              />
              <span className="text-muted-foreground">within last</span>
              <Input
                type="number"
                value={filter.value?.days || ""}
                onChange={(e) => onUpdate({ 
                  ...filter, 
                  value: { ...filter.value, days: e.target.value }
                })}
                className="w-[80px]"
                placeholder="0"
              />
              <span className="text-muted-foreground">days</span>
            </div>
          );
        }
        return null;

      case "select":
        return (
          <Select
            value={filter.value}
            onValueChange={(value) => onUpdate({ ...filter, value })}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              {filterConfig.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "boolean":
        return (
          <Select
            value={filter.value}
            onValueChange={(value) => onUpdate({ ...filter, value })}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">True</SelectItem>
              <SelectItem value="false">False</SelectItem>
            </SelectContent>
          </Select>
        );

      case "multiselect":
        const selectedValues = Array.isArray(filter.value) ? filter.value : (filter.value ? [filter.value] : []);
        return (
          <div className="w-[300px]">
            <Select
              onValueChange={(value) => {
                const currentValues = Array.isArray(filter.value) ? filter.value : [];
                const newValues = currentValues.includes(value)
                  ? currentValues.filter(v => v !== value)
                  : [...currentValues, value];
                onUpdate({ ...filter, value: newValues });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={selectedValues.length > 0 ? `${selectedValues.length} selected` : "Select options..."} />
              </SelectTrigger>
              <SelectContent>
                {filterConfig.options?.map((option) => (
                  <SelectItem 
                    key={option} 
                    value={option}
                    className={selectedValues.includes(option) ? "bg-accent" : ""}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 border rounded ${selectedValues.includes(option) ? 'bg-primary border-primary' : 'border-input'}`}>
                        {selectedValues.includes(option) && <div className="w-2 h-2 bg-white rounded-sm m-auto" />}
                      </div>
                      {option}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedValues.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {selectedValues.map((value) => (
                  <Badge key={value} variant="secondary" className="text-xs">
                    {value}
                    <button
                      onClick={() => {
                        const newValues = selectedValues.filter(v => v !== value);
                        onUpdate({ ...filter, value: newValues });
                      }}
                      className="ml-1 text-xs hover:text-destructive"
                    >
                      ×
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
        );

      case "text":
      default:
        return (
          <Input
            value={filter.value}
            onChange={(e) => onUpdate({ ...filter, value: e.target.value })}
            className="w-[200px]"
          />
        );
    }
  };

  return (
    <div className="flex items-center gap-2 p-3 bg-muted/20 border rounded-md">
      <Select
        value={filter.property}
        onValueChange={(property) => onUpdate({ ...filter, property })}
      >
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select property" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(filterSections).map(([section, properties]) => (
            <React.Fragment key={section}>
              <SelectItem value={section} disabled className="font-semibold">
                {section}
              </SelectItem>
              {Object.keys(properties).map((property) => (
                <SelectItem key={property} value={property} className="pl-4">
                  {property}
                </SelectItem>
              ))}
            </React.Fragment>
          ))}
        </SelectContent>
      </Select>

      {filterConfig && (
        <Select
          value={filter.operator}
          onValueChange={(operator) => onUpdate({ ...filter, operator })}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            {filterConfig.operators.map((op: string) => (
              <SelectItem key={op} value={op}>
                {op}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}

      {renderValueInput()}

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={onDelete}
              className="text-destructive ml-auto"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Remove filter</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default function CreateSegmentPage() {
  const form = useForm({
    defaultValues: {
      name: "",
      filters: [] as Filter[],
    },
  });

  const [filters, setFilters] = React.useState<Filter[]>([]);
  const [excludedAudiences, setExcludedAudiences] = React.useState<string[]>([]);

  // ODBC test state and handler
  const [odbcOutput, setOdbcOutput] = React.useState<string | null>(null);
  const [runningOdbc, setRunningOdbc] = React.useState(false);
  const [odbcRows, setOdbcRows] = React.useState<any[]>([]);
  const [page, setPage] = React.useState(1);
  const pageSize = 50;

  const runOdbcTest = async () => {
    setRunningOdbc(true);
    setOdbcOutput(null);
    setOdbcRows([]);
    try {
      const res = await fetch("/api/segmentation/odbc");
      const data = await res.json();
      if (data.success) {
        if (Array.isArray(data.rows)) {
          setOdbcRows(data.rows);
          if (data.rows.length === 0) {
            setOdbcOutput(data.info ?? "Query returned 0 rows.");
          }
        } else {
          const text = [data.stdout, data.stderr].filter(Boolean).join("\n").trim();
          setOdbcOutput(text || data.info || "No output returned.");
        }
        setPage(1);
      } else {
        setOdbcOutput(data.error ?? "Unknown error.");
      }
    } catch (err: any) {
      setOdbcOutput(err?.message ?? String(err));
    } finally {
      setRunningOdbc(false);
    }
  };

  const handleAddFilter = () => {
    const newFilter: Filter = {
      id: Math.random().toString(36).substr(2, 9),
      property: "",
      operator: "",
      value: "",
    };

    setFilters([...filters, newFilter]);
  };

  const handleDeleteFilter = (id: string) => {
    setFilters(filters.filter((f) => f.id !== id));
  };

  const handleUpdateFilter = (updatedFilter: Filter) => {
    setFilters(
      filters.map((f) => (f.id === updatedFilter.id ? updatedFilter : f))
    );
  };

  const handleSaveSegment = async () => {
    const formData = form.getValues();
    
    // Validation
    if (!formData.name || !formData.name.trim()) {
      alert("Please enter a segment name");
      return;
    }
    
    if (filters.length === 0) {
      alert("Please add at least one filter");
      return;
    }
    
    try {
      const response = await fetch("/api/segments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          filters,
          excludedAudiences,
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert("Segment saved successfully!");
        // Reset form
        form.reset();
        setFilters([]);
        setExcludedAudiences([]);
        // Optionally redirect to view page
        // window.location.href = "/segmentation/view";
      } else {
        alert(`Error saving segment: ${data.error}`);
      }
    } catch (error: any) {
      console.error("Error saving segment:", error);
      alert(`Error saving segment: ${error.message}`);
    }
  };

  const handlePreview = async () => {
    const res = await fetch("/api/segmentation/preview", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filters }),
    });
    const data = await res.json();
    if (data.success) {
      setOdbcRows(data.rows);
      setOdbcOutput(null);
      setPage(1);
    } else {
      setOdbcRows([]);
      setOdbcOutput(data.error ?? "Unknown error");
      setPage(1);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold">New Audience</h1>

        <Button variant="outline" onClick={runOdbcTest} disabled={runningOdbc}>
          {runningOdbc ? "Running ODBC Test..." : "Run ODBC Test"}
        </Button>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Audience Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter audience name..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <p className="text-sm text-muted-foreground">
                    Add filters to define your audience
                  </p>
                </div>
                <Button onClick={handleAddFilter} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Filter
                </Button>
              </div>

              {filters.length > 0 ? (
                <ScrollArea className="h-[300px]">
                  <div className="space-y-2">
                    {filters.map((filter) => (
                      <FilterRow
                        key={filter.id}
                        filter={filter}
                        onDelete={() => handleDeleteFilter(filter.id)}
                        onUpdate={handleUpdateFilter}
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No filters added</AlertTitle>
                  <AlertDescription>
                    Add filters to define your audience criteria
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium">Excluded Audiences</h2>
                  <p className="text-sm text-muted-foreground">
                    Select audiences to exclude
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Exclusion
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-between">
            <Button variant="outline" onClick={handlePreview}>Preview Audience</Button>
            {odbcRows.length > 0 && (
              <div className="flex items-center text-sm text-muted-foreground">
                <span className="font-medium">{odbcRows.length} members</span>
              </div>
            )}
            <Button onClick={handleSaveSegment}>
              <Save className="h-4 w-4 mr-2" />
              Save Audience
            </Button>
          </div>
        </div>
      </Form>

      {(odbcRows.length > 0 || odbcOutput) && (
        <Card>
          <CardHeader>
            <CardTitle>ODBC Test Output</CardTitle>
          </CardHeader>
          <CardContent>
            {odbcRows.length > 0 ? (
              <ScrollArea className="h-[400px] w-full overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {[
                        "LASTCUSTCODE",
                        "FIRSTNAME",
                        "LASTNAME",
                        "MAINPHONE",
                        "EMAIL",
                        "ADDRESS1",
                        "CITY",
                        "STATE",
                        "ZIPCODE",
                      ].map((col) => (
                        <TableHead key={col}>{col}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {odbcRows.slice((page-1)*pageSize, page*pageSize).map((row, idx) => (
                      <TableRow key={idx}>
                        {[
                          "LASTCUSTCODE",
                          "FIRSTNAME",
                          "LASTNAME",
                          "MAINPHONE",
                          "EMAIL",
                          "ADDRESS1",
                          "CITY",
                          "STATE",
                          "ZIPCODE",
                        ].map((col) => (
                          <TableCell key={col}>{row[col] ?? ""}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : (
              <pre className="text-sm whitespace-pre-wrap">{odbcOutput}</pre>
            )}
            {odbcRows.length > pageSize && (
              <div className="flex items-center justify-between mt-2 text-sm">
                <span>
                  Page {page} of {Math.ceil(odbcRows.length / pageSize)}
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  >
                    Prev
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= Math.ceil(odbcRows.length / pageSize)}
                    onClick={() =>
                      setPage((p) => Math.min(Math.ceil(odbcRows.length / pageSize), p + 1))
                    }
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
} 