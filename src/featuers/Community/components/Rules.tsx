"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQItem } from "./DetailSidebar";

// Define the type for FAQ items

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function Rules({ items }: FAQAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item,i) => (
        <AccordionItem key={item.id} value={item.id} className="px-4">
              <AccordionTrigger className="">{i + 1}{ " " }{ item.question}</AccordionTrigger>
          <AccordionContent className="text-paragraph text-sm">{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
