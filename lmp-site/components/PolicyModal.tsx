"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PRIVACY_POLICY, BOOKING_TERMS } from "@/lib/policies";

type PolicyType = "privacy" | "terms" | null;

export function PolicyModal() {
  const [open, setOpen] = useState(false);
  const [policyType, setPolicyType] = useState<PolicyType>(null);

  useEffect(() => {
    // Check hash on mount and when hash changes
    const checkHash = () => {
      const hash = window.location.hash.slice(1); // Remove the #
      
      if (hash === "privacy") {
        setPolicyType("privacy");
        setOpen(true);
      } else if (hash === "terms") {
        setPolicyType("terms");
        setOpen(true);
      } else {
        setOpen(false);
        setPolicyType(null);
      }
    };

    // Check on mount
    checkHash();

    // Listen for hash changes
    window.addEventListener("hashchange", checkHash);

    return () => {
      window.removeEventListener("hashchange", checkHash);
    };
  }, []);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    
    // Clear hash when closing
    if (!isOpen) {
      // Use history.replaceState to remove hash without triggering scroll
      if (window.location.hash) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
      setPolicyType(null);
    }
  };

  const policy = policyType === "privacy" ? PRIVACY_POLICY : policyType === "terms" ? BOOKING_TERMS : null;

  if (!policy) return null;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="overflow-y-auto flex flex-col">
        <DialogHeader className="flex-shrink-0 pb-4 border-b" style={{ borderColor: "rgba(0, 79, 110, 0.1)" }}>
          <DialogTitle className="text-left text-2xl font-semibold" style={{ color: "#004F6E" }}>
            {policy.title}
          </DialogTitle>
        </DialogHeader>
        <div 
          className="flex-1 overflow-y-auto mt-6 pr-2 prose prose-sm max-w-none"
          style={{ 
            color: "#004F6E",
            lineHeight: "1.75"
          }}
          dangerouslySetInnerHTML={{ 
            __html: (() => {
              const lines = policy.content.split("\n");
              let html = "";
              let inList = false;
              let listType: "ul" | "ol" | null = null;
              
              const closeList = () => {
                if (inList) {
                  html += listType === "ul" ? "</ul>" : "</ol>";
                  inList = false;
                  listType = null;
                }
              };
              
              const processInline = (text: string) => {
                // Process bold text **text**
                text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                // Process links [text](url)
                text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="underline hover:no-underline" style="color: #004F6E">$1</a>');
                // Process email addresses
                text = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g, '<a href="mailto:$1" class="underline hover:no-underline" style="color: #004F6E">$1</a>');
                return text;
              };
              
              lines.forEach((line) => {
                const trimmed = line.trim();
                
                // Headers
                if (trimmed.startsWith("# ")) {
                  closeList();
                  html += `<h1 class="text-2xl font-bold mb-4 mt-6" style="color: #004F6E">${processInline(trimmed.slice(2))}</h1>`;
                  return;
                }
                if (trimmed.startsWith("## ")) {
                  closeList();
                  html += `<h2 class="text-xl font-semibold mb-3 mt-5" style="color: #004F6E">${processInline(trimmed.slice(3))}</h2>`;
                  return;
                }
                if (trimmed.startsWith("### ")) {
                  closeList();
                  html += `<h3 class="text-lg font-semibold mb-2 mt-4" style="color: #004F6E">${processInline(trimmed.slice(4))}</h3>`;
                  return;
                }
                
                // Lists
                if (trimmed.match(/^\d+\)/)) {
                  // Numbered list
                  if (!inList || listType !== "ol") {
                    closeList();
                    inList = true;
                    listType = "ol";
                    html += '<ol class="list-decimal list-inside mb-3 ml-4 space-y-1" style="color: #004F6E">';
                  }
                  const content = trimmed.replace(/^\d+\)\s*/, "");
                  html += `<li>${processInline(content)}</li>`;
                  return;
                }
                if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                  // Bullet list
                  if (!inList || listType !== "ul") {
                    closeList();
                    inList = true;
                    listType = "ul";
                    html += '<ul class="list-disc list-inside mb-3 ml-4 space-y-1" style="color: #004F6E">';
                  }
                  const content = trimmed.slice(2);
                  html += `<li>${processInline(content)}</li>`;
                  return;
                }
                
                // Empty line
                if (trimmed === "") {
                  closeList();
                  return;
                }
                
                // Regular paragraph
                closeList();
                html += `<p class="mb-3" style="color: #004F6E">${processInline(trimmed)}</p>`;
              });
              
              closeList(); // Close any open list at the end
              return html;
            })()
          }}
        />
      </DialogContent>
    </Dialog>
  );
}

