import test from "node:test";
import assert from "node:assert/strict";

function formatEnquiryWhatsAppMessage(data) {
  const parts = [
    `*NEW PROJECT ENQUIRY — SPARSH TRADING*`,
    `──────────────────────────`,
    `Ref ID: ${data.enquiryId}`,
    `Client Name: ${data.name}`,
    `Contact: +91 ${data.phone}`,
    data.location ? `Site Location: ${data.location}` : null,
    `Service: ${data.service}`,
    data.requirement ? `Details: ${data.requirement}` : null,
    data.dimensions ? `Dimensions: ${data.dimensions}` : null,
    data.message ? `Notes: ${data.message}` : null,
    `──────────────────────────`,
    `Submitted from sparshtrading.shop`
  ].filter(Boolean);

  return parts.join("\n");
}

function getWhatsAppEnquiryUrl(data, phone = "8795662161") {
  const targetPhone = phone.replace(/[^0-9]/g, "");
  const text = formatEnquiryWhatsAppMessage(data);
  return `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
}

test("WhatsApp Automation Message Formatter & URL Generator", async () => {
  const sample = {
    enquiryId: "ST-ENQ-2026-999999",
    name: "Akarsh Mishra",
    phone: "8795662161",
    location: "Pratapgarh, Civil Lines",
    service: "Tata Steel Door Frames (Chaukhat)",
    requirement: "12 units, 16 gauge single rebate"
  };

  const text = formatEnquiryWhatsAppMessage(sample);
  assert.ok(text.includes("ST-ENQ-2026-999999"), "Contains Enquiry ID");
  assert.ok(text.includes("Akarsh Mishra"), "Contains client name");
  assert.ok(text.includes("Tata Steel Door Frames"), "Contains service");

  const url = getWhatsAppEnquiryUrl(sample);
  assert.ok(url.startsWith("https://wa.me/"), "Generates valid WhatsApp URL");
  assert.ok(url.includes("ST-ENQ-2026-999999"), "URL contains encoded Enquiry ID");
});
