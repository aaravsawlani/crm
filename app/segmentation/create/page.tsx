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
  DollarSign,
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
  Members: {
    "Membership average visits": {
      type: "number",
      operators: Object.values(commonOperators),
      unit: "visits per month",
    },
    "Membership cancellation": {
      type: "compound",
      operators: ["is", "is not"],
      fields: {
        reason: ["Service", "Price", "Usage", "Moving", "Other"],
        timeframe: {
          type: "timeframe",
          units: ["days", "weeks", "months", "years"],
        },
      },
    },
    "Membership downsell accepted date": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Membership downsell declined date": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Membership failed recharge attempts": {
      type: "number",
      operators: Object.values(commonOperators),
    },
    "Membership involuntary churn": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Membership join date": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Membership last charge date": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Membership last wash date": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Membership location": {
      type: "multiselect",
      operators: ["is one of", "is not one of"],
      options: [], // These would be dynamically loaded
    },
    "Membership next charge date": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Membership plan name": {
      type: "text",
      operators: ["is", "is not", "contains", "does not contain"],
    },
    "Membership plan price": {
      type: "number",
      operators: Object.values(commonOperators),
      prefix: "$",
    },
    "Membership plan type": {
      type: "multiselect",
      operators: ["is one of", "is not one of"],
      options: [], // These would be dynamically loaded
    },
    "Membership recent visits": {
      type: "number",
      operators: Object.values(commonOperators),
      suffix: "visits in the last 30 days",
    },
    "Membership replication group": {
      type: "multiselect",
      operators: ["is one of", "is not one of"],
      options: [], // These would be dynamically loaded
    },
    "Membership status": {
      type: "select",
      operators: ["is", "is not"],
      options: ["Active", "Former", "Never members"],
    },
    "Membership total visits": {
      type: "number",
      operators: Object.values(commonOperators),
    },
    "Membership voluntary churn": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Membership whitelist": {
      type: "multiselect",
      operators: ["is one of", "is not one of"],
      options: [], // These would be dynamically loaded
    },
  },
  Contacts: {
    "Contact birth date": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Contact created": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Contact list": {
      type: "multiselect",
      operators: ["is one of", "is not one of"],
      options: [], // These would be dynamically loaded
    },
    "Contact location": {
      type: "multiselect",
      operators: ["is one of", "is not one of"],
      options: [], // These would be dynamically loaded
    },
  },
  "Retail Wash": {
    "Last retail wash": {
      type: "date",
      operators: Object.values(timeOperators),
    },
    "Retail wash count": {
      type: "number",
      operators: Object.values(commonOperators),
    },
    "Retail segment": {
      type: "multiselect",
      operators: ["is one of", "is not one of"],
      options: ["Bargain Hunters", "Early Birds", "Weekend Warriors"],
    },
  },
  Other: {
    "Redeemed voucher": {
      type: "compound",
      operators: ["is", "is not"],
      fields: {
        type: [], // These would be dynamically loaded
        timeframe: {
          type: "timeframe",
          units: ["days", "weeks", "months"],
        },
      },
    },
    "Unredeemed voucher": {
      type: "compound",
      operators: ["is", "is not"],
      fields: {
        type: [], // These would be dynamically loaded
        timeframe: {
          type: "timeframe",
          units: ["days", "weeks", "months"],
        },
      },
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
  const [valueType, setValueType] = React.useState<"text" | "number" | "date" | "boolean">("text");

  const renderValueInput = () => {
    if (!filterConfig) return null;

    switch (valueType) {
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
    <div className="flex items-center gap-2 p-2 bg-background border rounded-md">
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

      {filterConfig && (
        <Select
          value={valueType}
          onValueChange={(type) => setValueType(type as "text" | "number" | "date" | "boolean")}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Value type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="number">Number</SelectItem>
            <SelectItem value="date">Date</SelectItem>
            <SelectItem value="boolean">True/False</SelectItem>
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

// Segment presets organized by category
const segmentPresets = {
  "Spend Habit": [
    {
      name: "Price Conscious Washer",
      description: "Someone whose average spend in the trailing 6 months is less than or equal to the 25th percentile",
      filters: [
        {
          property: "Average spend trailing 6 months",
          operator: "is less than or equal to",
          value: "25",
          valueType: "number",
          unit: "percentile"
        },
        {
          property: "Last visit date",
          operator: "is within last",
          value: "6",
          valueType: "number",
          unit: "months"
        }
      ]
    },
    {
      name: "Splurge Washer",
      description: "Someone whose average spend in the trailing 6 months is greater than or equal to the 75th percentile",
      filters: [
        {
          property: "Average spend trailing 6 months",
          operator: "is greater than or equal to",
          value: "75",
          valueType: "number",
          unit: "percentile"
        },
        {
          property: "Last visit date",
          operator: "is within last",
          value: "6",
          valueType: "number",
          unit: "months"
        }
      ]
    },
    {
      name: "Spending Surge",
      description: "Someone whose average spend over the last 6 months has increased by $5 or more compared to previous 6 months",
      filters: [
        {
          property: "Spend increase last 6 months",
          operator: "is greater than or equal to",
          value: "5",
          valueType: "number",
          unit: "dollars"
        }
      ]
    }
  ],
  "Time Habit": [
    {
      name: "Weekend Washer",
      description: "Someone who washes on weekends 75% of the time or more",
      filters: [
        {
          property: "Weekend wash percentage",
          operator: "is greater than or equal to",
          value: "75",
          valueType: "number",
          unit: "percent"
        }
      ]
    },
    {
      name: "Weekday Washer",
      description: "Someone who washes on weekdays 75% of the time or more",
      filters: [
        {
          property: "Weekday wash percentage",
          operator: "is greater than or equal to",
          value: "75",
          valueType: "number",
          unit: "percent"
        }
      ]
    },
    {
      name: "Early Bird",
      description: "Someone who washes between 5am to 12pm at least 75% of the time",
      filters: [
        {
          property: "Morning wash percentage",
          operator: "is greater than or equal to",
          value: "75",
          valueType: "number",
          unit: "percent"
        }
      ]
    },
    {
      name: "Night Owl",
      description: "Someone who washes between 6pm and midnight at least 75% of the time",
      filters: [
        {
          property: "Evening wash percentage",
          operator: "is greater than or equal to",
          value: "75",
          valueType: "number",
          unit: "percent"
        }
      ]
    }
  ],
  "Frequency Habit": [
    {
      name: "Dormant Washer",
      description: "Someone who has not visited in the last 6 months",
      filters: [
        {
          property: "Last visit date",
          operator: "is before",
          value: "6",
          valueType: "number",
          unit: "months ago"
        }
      ]
    },
    {
      name: "Recent Wash Enthusiast",
      description: "Someone who has visited 3 or more times in the last month",
      filters: [
        {
          property: "Visit count last month",
          operator: "is greater than or equal to",
          value: "3",
          valueType: "number"
        }
      ]
    },
    {
      name: "New Retail Customer",
      description: "First retail wash within the last 2 months",
      filters: [
        {
          property: "First visit date",
          operator: "is within last",
          value: "2",
          valueType: "number",
          unit: "months"
        }
      ]
    },
    {
      name: "Monthly Visitor",
      description: "Purchased retail wash in at least 10 of last 12 months",
      filters: [
        {
          property: "Active months count",
          operator: "is greater than or equal to",
          value: "10",
          valueType: "number",
          unit: "months"
        }
      ]
    },
    {
      name: "Above Average Washer",
      description: "Washes more than average over last 6 months",
      filters: [
        {
          property: "Wash frequency percentile",
          operator: "is greater than",
          value: "50",
          valueType: "number",
          unit: "percentile"
        }
      ]
    },
    {
      name: "Below Average Washer",
      description: "Washes less than average over last 6 months",
      filters: [
        {
          property: "Wash frequency percentile",
          operator: "is less than",
          value: "50",
          valueType: "number",
          unit: "percentile"
        }
      ]
    },
    {
      name: "Bronze Tier Washer",
      description: "Wash count in top 25% over last 6 months",
      filters: [
        {
          property: "Wash count percentile",
          operator: "is greater than",
          value: "75",
          valueType: "number",
          unit: "percentile"
        }
      ]
    },
    {
      name: "Silver Tier Washer",
      description: "Wash count in top 10% over last 6 months",
      filters: [
        {
          property: "Wash count percentile",
          operator: "is greater than",
          value: "90",
          valueType: "number",
          unit: "percentile"
        }
      ]
    },
    {
      name: "Gold Tier Washer",
      description: "Wash count in top 1% over last 6 months",
      filters: [
        {
          property: "Wash count percentile",
          operator: "is greater than",
          value: "99",
          valueType: "number",
          unit: "percentile"
        }
      ]
    }
  ],
  "Other Behavior": [
    {
      name: "Cash King",
      description: "Paid with cash at least 50% of time in last 6 months",
      filters: [
        {
          property: "Cash payment percentage",
          operator: "is greater than or equal to",
          value: "50",
          valueType: "number",
          unit: "percent"
        }
      ]
    },
    {
      name: "Loyalty Participant",
      description: "Received text messages as part of Loyalty Program",
      filters: [
        {
          property: "Loyalty program status",
          operator: "is",
          value: "true",
          valueType: "boolean"
        }
      ]
    },
    {
      name: "Recent Former Member",
      description: "Had membership within last 3 months, now retail customer",
      filters: [
        {
          property: "Former member status",
          operator: "is",
          value: "true",
          valueType: "boolean"
        },
        {
          property: "Last membership date",
          operator: "is within last",
          value: "3",
          valueType: "number",
          unit: "months"
        }
      ]
    }
  ]
};

const PresetCard = ({ 
  preset, 
  onSelect 
}: { 
  preset: { name: string; description: string; filters: any[] };
  onSelect: () => void;
}) => (
  <Card className="cursor-pointer hover:bg-accent/50" onClick={onSelect}>
    <CardContent className="p-4">
      <h3 className="font-medium">{preset.name}</h3>
      <p className="text-sm text-muted-foreground mt-1">{preset.description}</p>
      <div className="mt-3 space-y-1">
        {preset.filters.map((filter, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Badge variant="secondary" className="font-normal text-xs">
              {filter.property}
            </Badge>
            <span>{filter.operator}</span>
            <Badge variant="outline" className="font-normal text-xs">
              {filter.value} {filter.unit}
            </Badge>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const PresetsSection = ({ onSelectPreset }: { onSelectPreset: (filters: any[]) => void }) => {
  const categoryIcons = {
    "Spend Habit": <DollarSign className="h-4 w-4" />,
    "Time Habit": <Clock className="h-4 w-4" />,
    "Frequency Habit": <Repeat className="h-4 w-4" />,
    "Other Behavior": <Star className="h-4 w-4" />
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-medium">Segment Presets</CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {Object.entries(segmentPresets).map(([category, presets]) => (
            <AccordionItem key={category} value={category}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center gap-2">
                  {categoryIcons[category as keyof typeof categoryIcons]}
                  <span>{category}</span>
                  <Badge variant="secondary" className="ml-2">
                    {presets.length}
                  </Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid gap-4 pt-3">
                  {presets.map((preset) => (
                    <PresetCard
                      key={preset.name}
                      preset={preset}
                      onSelect={() => onSelectPreset(preset.filters)}
                    />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
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

  const handleSelectPreset = (presetFilters: any[]) => {
    setFilters(presetFilters.map(filter => ({
      id: Math.random().toString(36).substr(2, 9),
      ...filter
    })));
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

  const handleSaveSegment = () => {
    const formData = form.getValues();
    console.log("Saving segment:", {
      name: formData.name,
      filters,
      excludedAudiences,
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">New Audience</h1>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <PresetsSection onSelectPreset={handleSelectPreset} />

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
            <Button variant="outline">Preview Audience</Button>
            <Button onClick={handleSaveSegment}>
              <Save className="h-4 w-4 mr-2" />
              Save Audience
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
} 