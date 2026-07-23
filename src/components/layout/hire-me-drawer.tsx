"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Country, State, City } from "country-state-city";
import { Loader2Icon, RotateCcwIcon, SendHorizontalIcon } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/lib/hooks/use-media";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Context — a single "Hire Me" drawer is rendered once (in <Providers>) and
// opened from anywhere via useHireMe() or the <HireMeButton> helper.
// ---------------------------------------------------------------------------

interface HireMeContextValue {
  open: () => void;
}

const HireMeContext = createContext<HireMeContextValue | null>(null);

export function useHireMe(): HireMeContextValue {
  const ctx = useContext(HireMeContext);
  if (!ctx) throw new Error("useHireMe must be used within <HireMeProvider>");
  return ctx;
}

export function HireMeProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HireMeContext.Provider value={{ open: () => setIsOpen(true) }}>
      {children}
      <HireMeDrawer open={isOpen} onOpenChange={setIsOpen} />
    </HireMeContext.Provider>
  );
}

/** Styled button that opens the shared drawer (keeps the site's `.btn` look). */
export function HireMeButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { open } = useHireMe();
  return (
    <button type="button" className={className} onClick={open}>
      {children}
    </button>
  );
}

// ---------------------------------------------------------------------------
// Validation schema (zod)
// ---------------------------------------------------------------------------

const APPLIANCES = [
  "Air Condition Split",
  "Air Condition Room",
  "Air Condition Inverter",
  "Single Door Fridge",
  "Double Door Fridge",
  "Single Door Inverter Fridge",
  "Double Door Inverter Fridge",
  "Washing Machine",
  "Geyser",
  "Microwave Oven",
  "Mixer Grinder",
  "Water Purifier",
  "Induction Oven",
  "Other",
];

// Brands that manufacture the appliances above (India market).
const COMPANIES = [
  "AO Smith",
  "Bajaj",
  "Blue Star",
  "Bosch",
  "Butterfly",
  "Carrier",
  "Crompton",
  "Daikin",
  "Electrolux",
  "Eureka Forbes (Aquaguard)",
  "Faber",
  "Godrej",
  "Haier",
  "Havells",
  "Hitachi",
  "IFB",
  "Kelvinator",
  "Kent",
  "LG",
  "Livpure",
  "Lloyd",
  "Midea",
  "Mitsubishi Electric",
  "Morphy Richards",
  "O General",
  "Onida",
  "Panasonic",
  "Philips",
  "Pigeon",
  "Preethi",
  "Prestige",
  "Pureit (HUL)",
  "Racold",
  "Samsung",
  "Sharp",
  "Sujata",
  "Toshiba",
  "Usha",
  "V-Guard",
  "Videocon",
  "Voltas",
  "Voltas Beko",
  "Whirlpool",
  "Wonderchef",
  "Other",
];

const hireMeSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  mobile: z
    .string()
    .trim()
    .min(1, "Mobile number is required")
    .regex(/^[+]?[\d\s()-]{6,20}$/, "Enter a valid mobile number"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  subject: z.string().trim().optional(),
  appliance: z.string().min(1, "Please select an appliance"),
  company: z.string().optional(),
  country: z.string().min(1, "Please select a country"),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().trim().optional(),
  zip: z.string().trim().min(1, "Zip code is required"),
  message: z.string().trim().optional(),
}).superRefine((data, ctx) => {
  const zip = data.zip.trim();
  if (!zip) return; // handled by the required check above
  const isIndia = data.country === "India";
  const valid = isIndia
    ? /^\d{6}$/.test(zip)
    : /^[A-Za-z0-9][A-Za-z0-9\s-]{2,11}$/.test(zip);
  if (!valid) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["zip"],
      message: isIndia
        ? "Enter a valid 6-digit PIN code"
        : "Enter a valid zip / postal code",
    });
  }
});

type HireMeValues = z.infer<typeof hireMeSchema>;

const DEFAULTS: HireMeValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  email: "",
  subject: "",
  appliance: "",
  company: "",
  country: "",
  state: "",
  city: "",
  address: "",
  zip: "",
  message: "",
};

// ---------------------------------------------------------------------------
// Drawer + form
// ---------------------------------------------------------------------------

function HireMeDrawer({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  // Desktop → slide in from the right; mobile → slide up from the bottom.
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const form = useForm<HireMeValues>({
    resolver: zodResolver(hireMeSchema),
    defaultValues: DEFAULTS,
    mode: "onTouched",
  });

  // Cascading location data from `country-state-city`. We store the human
  // -readable NAME as each field's value (so the trigger shows "India", not
  // "IN"), and look the isoCode back up for the dependent queries.
  const countryName = form.watch("country");
  const stateName = form.watch("state");

  const countries = useMemo(() => Country.getAllCountries(), []);
  const selectedCountry = useMemo(
    () => countries.find((c) => c.name === countryName),
    [countries, countryName],
  );
  const states = useMemo(
    () =>
      selectedCountry ? State.getStatesOfCountry(selectedCountry.isoCode) : [],
    [selectedCountry],
  );
  const selectedState = useMemo(
    () => states.find((s) => s.name === stateName),
    [states, stateName],
  );
  const cities = useMemo(
    () =>
      selectedCountry && selectedState
        ? City.getCitiesOfState(selectedCountry.isoCode, selectedState.isoCode)
        : [],
    [selectedCountry, selectedState],
  );

  // Best-effort: preselect Country/State/City from the visitor's current
  // location. Precise DEVICE geolocation (GPS) + reverse geocoding is accurate
  // down to the state/city. If the user denies it or it's unavailable we fall
  // back to IP lookup for the COUNTRY ONLY — IP region data is unreliable and
  // often resolves to the ISP's region rather than where the user actually is.
  // Cached per page load; never overrides a value the user already chose.
  const geoRef = useRef<{
    country: string;
    state?: string;
    city?: string;
  } | null>(null);
  useEffect(() => {
    if (!open) return;
    let aborted = false;
    const controller = new AbortController();

    const apply = (geo: { country: string; state?: string; city?: string }) => {
      if (aborted || form.getValues("country")) return;
      form.setValue("country", geo.country);
      if (geo.state) form.setValue("state", geo.state);
      if (geo.city) form.setValue("city", geo.city);
    };

    // Map raw place names/codes onto our country-state-city dataset.
    const resolve = (
      countryName?: string,
      countryCode?: string,
      regionName?: string,
      cityName?: string,
    ) => {
      const country =
        countries.find((c) => c.isoCode === countryCode) ??
        countries.find((c) => c.name === countryName);
      if (!country) return;
      const st = regionName
        ? State.getStatesOfCountry(country.isoCode).find(
            (s) => s.name.toLowerCase() === regionName.toLowerCase(),
          )
        : undefined;
      const ct =
        st && cityName
          ? City.getCitiesOfState(country.isoCode, st.isoCode).find(
              (c) => c.name.toLowerCase() === cityName.toLowerCase(),
            )
          : undefined;
      geoRef.current = { country: country.name, state: st?.name, city: ct?.name };
      apply(geoRef.current);
    };

    if (geoRef.current) {
      apply(geoRef.current);
      return () => {
        aborted = true;
        controller.abort();
      };
    }

    // Fallback: IP → country only (region/city from IP is not trustworthy).
    const ipCountryFallback = async () => {
      try {
        const res = await fetch("https://get.geojs.io/v1/ip/geo.json", {
          signal: controller.signal,
        });
        if (!res.ok || aborted) return;
        const d: { country_code?: string; country?: string } = await res.json();
        resolve(d.country, d.country_code);
      } catch {
        /* offline / blocked — leave the fields empty */
      }
    };

    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          if (aborted) return;
          try {
            const { latitude, longitude } = pos.coords;
            const res = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
              { signal: controller.signal },
            );
            if (!res.ok || aborted) return;
            const d: {
              countryName?: string;
              countryCode?: string;
              principalSubdivision?: string;
              city?: string;
              locality?: string;
            } = await res.json();
            resolve(
              d.countryName,
              d.countryCode,
              d.principalSubdivision,
              d.city || d.locality,
            );
          } catch {
            void ipCountryFallback();
          }
        },
        () => void ipCountryFallback(), // permission denied / unavailable
        { enableHighAccuracy: false, timeout: 8000, maximumAge: 600000 },
      );
    } else {
      void ipCountryFallback();
    }

    return () => {
      aborted = true;
      controller.abort();
    };
  }, [open, countries, form]);

  const isSubmitting = form.formState.isSubmitting;

  const close = () => {
    form.reset(DEFAULTS);
    onOpenChange(false);
  };

  const onSubmit = form.handleSubmit(async () => {
    // Simulate a network round-trip so the in-button loader is visible.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    toast.success("Thanks! Your request has been sent — I'll be in touch soon.");
    close();
  });

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        if (!v) form.reset(DEFAULTS);
        onOpenChange(v);
      }}
    >
      <SheetContent
        side={isDesktop ? "right" : "bottom"}
        className={cn(
          "gap-0 overflow-y-auto",
          isDesktop
            ? "w-full sm:w-120 sm:max-w-[92vw]"
            : "max-h-[92vh] rounded-t-2xl",
        )}
      >
        <SheetHeader className="pb-2">
          <SheetTitle className="text-2xl">Book a repair</SheetTitle>
          <SheetDescription className="text-xs">
            Tell me about the appliance that needs fixing and I&apos;ll get back
            to you shortly to schedule a visit. Fields marked{" "}
            <span className="text-destructive">*</span> are required.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            onSubmit={onSubmit}
            noValidate
            className="hire-form grid grid-cols-1 gap-4 px-6 pb-0 sm:grid-cols-2 sm:pb-8"
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="First Name*"
                      aria-label="First Name"
                      autoComplete="given-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Last Name*"
                      aria-label="Last Name"
                      autoComplete="family-name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="Mobile No*"
                      aria-label="Mobile No"
                      autoComplete="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Email Id*"
                      aria-label="Email Id"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormControl>
                    <Input placeholder="Subject" aria-label="Subject" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Appliance + brand dropdowns */}
            <FormField
              control={form.control}
              name="appliance"
              render={({ field }) => (
                <FormItem>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full" aria-label="Appliance">
                        <SelectValue placeholder="Select appliance*" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {APPLIANCES.map((a) => (
                        <SelectItem key={a} value={a}>
                          {a}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full" aria-label="Appliance Company">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {COMPANIES.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Country → State → City cascade (country-state-city) */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value}
                    onValueChange={(v) => {
                      field.onChange((v as string) ?? "");
                      form.setValue("state", "");
                      form.setValue("city", "");
                    }}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full" aria-label="Country">
                        <SelectValue placeholder="Select country*" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((c) => (
                        <SelectItem key={c.isoCode} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value}
                    onValueChange={(v) => {
                      field.onChange((v as string) ?? "");
                      form.setValue("city", "");
                    }}
                    disabled={states.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full" aria-label="State">
                        <SelectValue
                          placeholder={
                            states.length ? "Select state" : "No states"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((s) => (
                        <SelectItem key={s.isoCode} value={s.name}>
                          {s.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <Select
                    value={field.value}
                    onValueChange={(v) => field.onChange((v as string) ?? "")}
                    disabled={cities.length === 0}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full" aria-label="City">
                        <SelectValue
                          placeholder={
                            cities.length ? "Select city" : "No cities"
                          }
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {cities.map((c) => (
                        <SelectItem key={c.name} value={c.name}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="zip"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      inputMode="numeric"
                      placeholder="Zip Code*"
                      aria-label="Zip Code"
                      autoComplete="postal-code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormControl>
                    <Input
                      placeholder="Address"
                      aria-label="Address"
                      autoComplete="street-address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="sm:col-span-2">
                  <FormControl>
                    <Textarea
                      rows={8}
                      className="min-h-48"
                      placeholder="Message"
                      aria-label="Message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="sticky bottom-0 z-10 -mx-6 flex gap-3 border-t border-border bg-background px-6 py-4 sm:static sm:z-auto sm:mx-0 sm:border-0 sm:bg-transparent sm:px-0 sm:pt-2 sm:col-span-2">
              <button
                type="submit"
                className="btn btn--pill flex-1 justify-center disabled:pointer-events-none disabled:opacity-60"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon
                      className="animate-spin"
                      width={18}
                      height={18}
                    />
                    Submitting…
                  </>
                ) : (
                  <>
                    <SendHorizontalIcon width={18} height={18} />
                    Submit Request
                  </>
                )}
              </button>
              <button
                type="button"
                className="btn btn--outline flex-1 justify-center disabled:pointer-events-none disabled:opacity-60"
                onClick={() => form.reset(DEFAULTS)}
                disabled={isSubmitting}
              >
                <RotateCcwIcon width={18} height={18} />
                Reset Request
              </button>
            </div>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
