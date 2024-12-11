function generateUniqueId() {
  return Math.random() + new Date().getTime();
}

export const navLinks = [
  {
    id: generateUniqueId(),
    label: "Lessons",
    href: "/lessons",
  },
  {
    id: generateUniqueId(),
    label: "Tutorials",
    href: "/tutorials",
  },
];
