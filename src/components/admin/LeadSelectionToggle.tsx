"use client";

export default function LeadSelectionToggle() {
  function handleToggleAll(checked: boolean) {
    const boxes = document.querySelectorAll<HTMLInputElement>('input[name="ids"]');
    boxes.forEach((box) => {
      box.checked = checked;
    });
  }

  return (
    <input
      type="checkbox"
      className="h-4 w-4 rounded border-white/20 bg-black/20"
      onChange={(e) => handleToggleAll(e.currentTarget.checked)}
      aria-label="Select all leads"
    />
  );
}