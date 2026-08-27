"use client";

import { useEffect, useState } from "react";
import { EnquiryForm } from "@/components/EnquiryForm";

export function EnquiryModal() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const timer = window.setTimeout(() => setOpen(true), 900);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open]);

    if (!open) return null;

    return (
        <div className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title" onClick={() => setOpen(false)}>
            <div className="enquiry-modal-content" onClick={(event) => event.stopPropagation()}>
                <button className="lightbox-close enquiry-modal-close" type="button" onClick={() => setOpen(false)} aria-label="Close enquiry form">X</button>
                <div className="enquiry-modal-heading">
                    <span className="eyebrow">Start your project</span>
                    <h2 id="enquiry-modal-title" className="display">Tell us what you want built.</h2>
                    <p className="muted">Share a few details and our team will contact you with the right material and next step.</p>
                </div>
                <EnquiryForm className="enquiry-modal-form" />
            </div>
        </div>
    );
}